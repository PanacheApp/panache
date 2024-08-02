/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import router from '@adonisjs/core/services/router'

router.get('/', ({ inertia }) => inertia.render('marketing/landing')).as('marketing.landing')
router.get('/pricing', ({ inertia }) => inertia.render('marketing/pricing')).as('marketing.pricing')
