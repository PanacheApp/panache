/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import { middleware } from '#start/kernel'
import router from '@adonisjs/core/services/router'

const CalendarController = () => import('#calendar/controllers/calendar_controller')

router.get('/calendar', [CalendarController, 'index']).use(middleware.auth())
