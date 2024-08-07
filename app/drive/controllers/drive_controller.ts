import type { HttpContext } from '@adonisjs/core/http'
import File from '#drive/database/models/files'

export default class DriveController {
  async index({ auth, inertia }: HttpContext) {
    let files = await File.findManyBy('createdBy', auth.user?.id)
    return inertia.render('drive/index', { files })
  }
}
