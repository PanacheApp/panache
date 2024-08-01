/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import router from '@adonisjs/core/services/router'

const SignUpController = () => import('#auth/controllers/sign_up_controller')
const SignInController = () => import('#auth/controllers/sign_in_controller')
const SignOutController = () => import('#auth/controllers/sign_out_controller')
const ForgotPasswordController = () => import('#auth/controllers/forgot_password_controller')
const ResetPasswordController = () => import('#auth/controllers/reset_password_controller')

/**
 * Sign up routes.
 */
router.get('/auth/sign_up', [SignUpController, 'show'])
router.post('/auth/sign_up', [SignUpController, 'handle'])

/**
 * Sign in routes.
 */
router.get('/auth/sign_in', [SignInController, 'show'])
router.post('/auth/sign_in', [SignInController, 'handle'])

/**
 * Sign out route.
 */
router.post('/auth/sign_out', [SignOutController, 'handle'])

/**
 * Forgot password routes.
 */
router.get('/auth/forgot_password', [ForgotPasswordController, 'show'])
router.post('/auth/forgot_password', [ForgotPasswordController, 'handle'])

/**
 * Reset password routes.
 */
router.get('/auth/reset_password', [ResetPasswordController, 'show'])
router.post('/auth/reset_password', [ResetPasswordController, 'handle'])
