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

const DriveController = () => import('#drive/controllers/drive_controller')

router.get('/drive', [DriveController, 'index']).use(middleware.auth())
