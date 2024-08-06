import type { HttpContext } from '@adonisjs/core/http'

export default class CalendarController {
  async index({ inertia }: HttpContext) {
    return inertia.render('calendar/index')
  }
}
