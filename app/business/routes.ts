import { middleware } from '#start/kernel'
import router from '@adonisjs/core/services/router'

const BusinessOrganizationsController = () =>
  import('#business/controllers/business_organizations_controller')

router.get('/business', (ctx) => ctx.response.redirect('/business/organizations/create'))
router
  .get('/business/organizations/create', [BusinessOrganizationsController, 'create'])
  .use(middleware.auth())
