import type { HttpContext } from '@adonisjs/core/http'
import { businessOrganizationValidator } from '#business/validators/business_organization'
import BusinessOrganization from '#business/models/business_organization'

export default class BusinessOrganizationController {
  async create({ inertia }: HttpContext) {
    return inertia.render('business/create_organization')
  }

  async store({ request, auth, response }: HttpContext) {
    const data = await request.validateUsing(businessOrganizationValidator)
    const user = auth.user!

    const organization = await BusinessOrganization.create({
      ...data,
      ownerId: user.id,
    })

    return response.redirect().toPath(`/business/organizations/${organization.id}`)
  }
}
