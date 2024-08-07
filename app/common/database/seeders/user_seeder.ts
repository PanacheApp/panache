import User from '#common/database/models/user'
import { BaseSeeder } from '@adonisjs/lucid/seeders'

export default class extends BaseSeeder {
  async run() {
    await User.createMany([
      {
        firstName: 'Paul',
        lastName: 'Valéry',
        gender: 'male',
        localPart: 'paul.valery',
        backupEmail: 'paul.valery@exemple.fr',
        backupEmailConfirmed: true,
        password: 'password123',
      },
    ])
  }
}
