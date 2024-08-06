import UserSignedUp from '#auth/events/user_signed_up'
import S3Service from '#drive/services/s3_service'
import { inject } from '@adonisjs/core'
import logger from '@adonisjs/core/services/logger'

export default class CreateStorageBucket {
  @inject()
  async handle(payload: UserSignedUp, s3Service: S3Service) {
    try {
      await s3Service.createBucket(payload.user.id)
    } catch (error) {
      logger.error({ error }, `Failed to create storage bucket for user ${payload.user.id}`)
    }
  }
}
