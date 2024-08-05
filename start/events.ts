import emitter from '@adonisjs/core/services/emitter'
import logger from '@adonisjs/core/services/logger'
import UserSignedUp from '#auth/events/user_signed_up'

const CreateStorageBucket = () => import('#drive/listeners/create_storage_bucket')

emitter.on(UserSignedUp, [CreateStorageBucket])

emitter.onError((event, error, data) => {
  logger.error(
    {
      event,
      error,
      data,
    },
    'Failed to handle event'
  )
})
