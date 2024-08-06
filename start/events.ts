import emitter from '@adonisjs/core/services/emitter'
import logger from '@adonisjs/core/services/logger'
import UserSignedUp from '#auth/events/user_signed_up'
import IncomingEmail from '#emails/events/incoming_email'
import OutgoingEmail from '#emails/events/outgoing_email'

/**
 * User events.
 */
const CreateStorageBucket = () => import('#drive/listeners/create_storage_bucket')

emitter.on(UserSignedUp, [CreateStorageBucket])

/**
 * Email events.
 */
const HandleIncomingEmail = () => import('#emails/listeners/handle_incoming_email')
const HandleOutgoingEmail = () => import('#emails/listeners/handle_outgoing_email')

emitter.on(OutgoingEmail, [HandleOutgoingEmail])
emitter.on(IncomingEmail, [HandleIncomingEmail])

/**
 * Log errors.
 */
emitter.onError((event, error, data) => {
  logger.error({ event, error, data }, 'Failed to handle event')
})
