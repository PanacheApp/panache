import S3Service from '#drive/services/s3_service'
import { inject } from '@adonisjs/core'
import type { HttpContext } from '@adonisjs/core/http'


export default class FileController {
  @inject()
  async upload({ request, response, auth }: HttpContext, s3Service: S3Service) {
    const file = request.file('file');
    if(auth.user && file) {
      await s3Service.uploadFile(auth.user?.id, file, file.clientName)
    }
    return response.created({
      message: "File uploaded successfully."
    })
  }
}
