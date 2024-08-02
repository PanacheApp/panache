import User from '#common/database/models/user'
import { signInValidator } from '#auth/validators/sign_in_validator'
import type { HttpContext } from '@adonisjs/core/http'

export default class SignInController {
  async show({ inertia }: HttpContext) {
    return inertia.render('auth/sign_in')
  }

  async handle({ auth, request, response, session, i18n }: HttpContext) {
    const { localPart, password } = await request.validateUsing(signInValidator)
    const nextPath = request.input('next')
    try {
      const user = await User.verifyCredentials(localPart, password)
      await auth.use('web').login(user)

      if (nextPath) {
        return response.redirect().toPath(nextPath)
      }

      return response.redirect().toPath('/emails/inbox')
    } catch {
      session.flash('errors.auth', i18n.t('auth.invalid_credentials'))
      let redirectPath = `/auth/sign_in`
      if (nextPath) {
        redirectPath += `?next=${nextPath}`
      }
      return response.redirect().toPath(redirectPath)
    }
  }
}
