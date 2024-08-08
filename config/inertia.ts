import { defineConfig } from '@adonisjs/inertia'
import type { InferSharedProps } from '@adonisjs/inertia/types'

const inertiaConfig = defineConfig({
  /**
   * Path to the Edge view that will be used as the root view for Inertia responses
   */
  rootView: 'inertia_layout',

  /**
   * Data that should be shared with all rendered pages
   */
  sharedData: {
    errors: (ctx) => ctx.session?.flashMessages.get('errors'),
    message: (ctx) => ctx.session?.flashMessages.get('message'),
    user: (ctx) => ctx.auth.user,
    path: (ctx) => ctx.request.url(true),
    translations: (ctx) => ctx.i18n.localeTranslations,
  },

  /**
   * Path to the client-side entrypoint
   */
  entrypoint: 'app/common/ui/app/app.tsx',

  /**
   * Options for the server-side rendering
   */
  ssr: {
    enabled: true,
    entrypoint: 'app/common/ui/app/ssr.tsx',
  },
})

export default inertiaConfig

declare module '@adonisjs/inertia/types' {
  export interface SharedProps extends InferSharedProps<typeof inertiaConfig> {}
}
