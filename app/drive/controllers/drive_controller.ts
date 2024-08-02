import type { HttpContext } from '@adonisjs/core/http'

export default class DriveController {
  async index({ inertia }: HttpContext) {
    return inertia.render('drive/index')
  }
}
