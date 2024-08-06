import env from '#start/env'
import { defineConfig } from '@adonisjs/lucid'

const dbConfig = defineConfig({
  connection: 'postgres',
  connections: {
    postgres: {
      client: 'pg',
      connection: {
        host: env.get('DB_HOST'),
        port: env.get('DB_PORT'),
        user: env.get('DB_USER'),
        password: env.get('DB_PASSWORD'),
        database: env.get('DB_DATABASE'),
      },
      migrations: {
        naturalSort: true,
        paths: [
          './app/auth/database/migrations',
          './app/business/database/migrations',
          './app/calendar/database/migrations',
          './app/common/database/migrations',
          './app/drive/database/migrations',
          './app/emails/database/migrations',
          './app/teams/database/migrations',
        ],
      },
      seeders: {
        paths: [
          './app/auth/database/seeders',
          './app/business/database/seeders',
          './app/calendar/database/seeders',
          './app/common/database/seeders',
          './app/drive/database/seeders',
          './app/emails/database/seeders',
          './app/teams/database/seeders',
        ],
      },
    },
  },
})

export default dbConfig
