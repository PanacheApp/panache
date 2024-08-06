import User from '#common/database/models/user'
import {
  SMTPServer as RawSMTPServer,
  SMTPServerAuthentication,
  SMTPServerAuthenticationResponse,
  SMTPServerDataStream,
  SMTPServerSession,
} from 'smtp-server'
import hash from '@adonisjs/core/services/hash'
import logger from '@adonisjs/core/services/logger'
import { simpleParser } from 'mailparser'
import OutgoingEmail from '#emails/events/outgoing_email'
import IncomingEmail from '#emails/events/incoming_email'

export default class SMTPServer extends RawSMTPServer {
  constructor() {
    super({
      authMethods: ['PLAIN'],
      authOptional: true,
      allowInsecureAuth: true,
    })
  }

  async onAuth(
    auth: SMTPServerAuthentication,
    _session: SMTPServerSession,
    callback: (err?: Error | null, response?: SMTPServerAuthenticationResponse) => void
  ) {
    /**
     * Ensure the user is authenticating with the correct domain,
     * and that a password is provided
     */
    if (!auth.username?.endsWith('@panache.so') || !auth.password) {
      logger.debug('Authentication failed', {
        endsWith: auth.username?.endsWith('@panache.so'),
        hasPassword: !!auth.password,
      })
      return callback(new Error('Authentication failed'))
    }

    /**
     * Find the user by their local part
     */
    const localPart = auth.username.split('@')[0]
    const user = await User.findBy('local_part', localPart)
    if (!user) {
      logger.debug('User not found')
      return callback(new Error('Authentication failed'))
    }

    /**
     * Validate the password
     */
    const isValid = await hash.verify(user.password, auth.password)
    if (isValid) {
      this.logger.debug('User authenticated', { user })
      return callback(null, { user })
    }

    callback(new Error('Authentication failed'))
  }

  async onData(
    stream: SMTPServerDataStream,
    session: SMTPServerSession,
    callback: (err?: Error | null) => void
  ) {
    /**
     * Parse the email.
     */
    const parsedMail = await simpleParser(stream)

    /**
     * Determine whether the email is incoming or outgoing.
     */
    const isOutgoing = parsedMail.from?.value.at(0)?.address?.endsWith('@panache.so')

    /**
     * Emit the appropriate event.
     */
    if (isOutgoing) {
      if (!session.user) {
        return callback(new Error('User not authenticated'))
      }

      await OutgoingEmail.dispatch(session.user as unknown as User, parsedMail)
    } else {
      await IncomingEmail.dispatch(parsedMail)
    }

    callback(null)
  }
}
