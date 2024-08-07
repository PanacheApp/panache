import S3Service from '#drive/services/s3_service'
import { inject } from '@adonisjs/core'
import type { HttpContext } from '@adonisjs/core/http'
import File from '#drive/database/models/files'
import logger from '@adonisjs/core/services/logger'


export default class FileController {
  @inject()
  async upload({ request, response, auth }: HttpContext, s3Service: S3Service) {
    const file = request.file('file')
    
    try {
      const path = `/${new Date().toISOString()}-${file?.clientName}`;
      File.create({
        name: file?.clientName,
        mime: file?.type,
        size: file?.size,
        path: path
      })
      
      if(auth.user && file) {
        await s3Service.uploadFile(auth.user?.id, file, path)
      }
      return response.created({
        message: "File uploaded successfully."
      })
    } catch (error) {
      logger.error({ error }, `An error occur when uploading the file ${auth.user?.id}`)
    }
  }
}
