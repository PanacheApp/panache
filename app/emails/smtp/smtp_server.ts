import {
  SMTPServer as RawSMTPServer,
  SMTPServerAddress,
  SMTPServerAuthentication,
  SMTPServerAuthenticationResponse,
  SMTPServerDataStream,
  SMTPServerSession,
} from 'smtp-server'
import logger from '@adonisjs/core/services/logger'

export default class SMTPServer extends RawSMTPServer {
  constructor() {
    super({
      authMethods: ['PLAIN'],
      authOptional: true,
      allowInsecureAuth: true,
    })
  }

  onAuth(
    auth: SMTPServerAuthentication,
    session: SMTPServerSession,
    callback: (err?: Error | null, response?: SMTPServerAuthenticationResponse) => void
  ): void {
    logger.info('Authenticating user', auth.username)
    logger.info('Authenticating password', auth.password)
    logger.info('Authenticating method', auth.method)
    callback(null)
  }

  onMailFrom(
    address: SMTPServerAddress,
    session: SMTPServerSession,
    callback: (err?: Error | null) => void
  ) {
    logger.info('Mail from [address]', address.address)
    logger.info('Mail from [session]', session)
    callback(null)
  }

  onRcptTo(
    address: SMTPServerAddress,
    session: SMTPServerSession,
    callback: (err?: Error | null) => void
  ) {
    logger.info('Rcpt to [address]', address.address)
    logger.info('Rcpt to [session]', session)
    callback(null)
  }

  onData(
    stream: SMTPServerDataStream,
    session: SMTPServerSession,
    callback: (err?: Error | null) => void
  ) {
    logger.info('Data [stream]', stream)
    logger.info('Data [session]', session)
    callback(null)
  }
}
