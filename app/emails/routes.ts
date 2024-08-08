import router from '@adonisjs/core/services/router'
import { middleware } from '#start/kernel'

const EmailsController = () => import('#emails/controllers/emails_controller')

router.get('/emails', (ctx) => ctx.response.redirect('/emails/inbox')).use(middleware.auth())
router
  .get('/emails/:folder', [EmailsController, 'index'])
  .where('folder', 'inbox|sent|drafts|trash')
  .use(middleware.auth())
router.post('/emails', [EmailsController, 'store']).use(middleware.auth()).as('emails.store')
router
  .get('/emails/:emailId/edit', [EmailsController, 'edit'])
  .use(middleware.auth())
  .as('emails.edit')
router
  .patch('/emails/:emailId', [EmailsController, 'update'])
  .use(middleware.auth())
  .as('emails.update')
