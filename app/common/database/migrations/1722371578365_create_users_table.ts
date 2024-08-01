import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'users'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.string('id').primary()
      table.enum('gender', ['male', 'female']).notNullable()
      table.string('first_name').notNullable()
      table.string('last_name').notNullable()
      table.string('local_part', 255).notNullable().unique()
      table.string('backup_email', 254).nullable()
      table.boolean('backup_email_confirmed').notNullable().defaultTo(false)
      table.string('password').notNullable()

      table.timestamp('created_at').notNullable()
      table.timestamp('updated_at').nullable()
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
