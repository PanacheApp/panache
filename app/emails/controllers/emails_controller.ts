import type { HttpContext } from '@adonisjs/core/http'

export default class EmailsController {
  async index({ inertia }: HttpContext) {
    return inertia.render('emails/index')
  }

  async show({}: HttpContext) {}

  async move({}: HttpContext) {}
}
