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

      await File.create({
        name: file?.clientName,
        mime: file?.type,
        size: file?.size,
        path: path,
        isFolder: false,
        createdBy: auth.user?.id,
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

   async rename({ request, auth, inertia, session }: HttpContext) {
      const name = request.input('name')
      const id = request.param('id')

      const file = await File.find(id)
      if(file) {
        await file.merge({ name, updatedBy: auth.user?.id }).save()
      }
      session.flash('message','File renamed.')


      return inertia.location('/drive')
   }

  async trash({ request, inertia, session }: HttpContext) {
    const id = request.param('id')

    await File.query().where('id', id).update({ deletedAt: new Date() })


    session.flash('message', 'File deleted.')

    return inertia.location('/drive')
  }
}
