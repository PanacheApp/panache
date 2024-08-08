import Email from '#emails/database/models/email'
import type { HttpContext } from '@adonisjs/core/http'
import db from '@adonisjs/lucid/services/db'

export default class EmailsController {
  private async getCounts(userId: string) {
    const [{ inboxCount }] = await db
      .from('emails')
      .where('user_id', userId)
      .where('folder', 'inbox')
      .count({ inboxCount: '*' })
    const [{ draftsCount }] = await db
      .from('emails')
      .where('user_id', userId)
      .where('folder', 'drafts')
      .count({ draftsCount: '*' })
    return { inboxCount, draftsCount }
  }

  /**
   * This method is responsible for rendering the emails list.
   */
  async index({ auth, inertia }: HttpContext) {
    const counts = await this.getCounts(auth.user!.id)
    return inertia.render('emails/index', { ...counts })
  }

  /**
   * This method is responsible for creating a new draft.
   */
  async store({ auth, response }: HttpContext) {
    const email = new Email()
    email.from = auth.user!.localPart + '@panache.so'
    email.folder = 'drafts'
    email.userId = auth.user!.id
    await email.save()
    return response.redirect().toRoute('emails.edit', { emailId: email.id })
  }

  async show({ auth, params, inertia, response }: HttpContext) {
    const counts = await this.getCounts(auth.user!.id)
    const email = await Email.query()
      .where('id', params.emailId)
      .andWhere('user_id', auth.user!.id)
      .first()
    if (email === null) {
      return response.notFound()
    }
    if (email.folder === 'drafts') {
      return response.redirect().toRoute('emails.edit', { emailId: email.id })
    }
    return inertia.render('emails/show', { email, ...counts })
  }

  /**
   * This method is responsible for editing a draft.
   */
  async edit({ auth, params, inertia, response }: HttpContext) {
    const counts = await this.getCounts(auth.user!.id)
    const email = await Email.query()
      .where('id', params.emailId)
      .andWhere('user_id', auth.user!.id)
      .first()
    if (email === null) {
      return response.notFound()
    }
    return inertia.render('emails/edit', { email, ...counts })
  }

  /**
   * This method is responsible for updating the draft.
   */
  async update({ auth, params, inertia, response }: HttpContext) {
    const email = await Email.query()
      .where('id', params.emailId)
      .andWhere('user_id', auth.user!.id)
      .first()
    if (email === null) {
      return response.notFound()
    }
    return inertia.render('emails/edit', { email })
  }

  /**
   * This method is responsible for sending a draft.
   */
  async send({}: HttpContext) {}

  async move({}: HttpContext) {}

  async destroy({}: HttpContext) {}
}
