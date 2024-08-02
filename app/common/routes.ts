import router from '@adonisjs/core/services/router'
const HealthChecksController = () => import('#common/controllers/health_checks_controller')

router.get('/health', [HealthChecksController])
