import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'emails'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.string('id').primary()

      table.string('subject')
      table.string('from')
      table.string('to')
      table.string('cc')
      table.string('bcc')
      table.text('text')
      table.text('html')
      table.enum('folder', ['inbox', 'sent', 'drafts', 'spam', 'trash']).notNullable()

      table.string('user_id').notNullable().references('id').inTable('users').onDelete('CASCADE')
      table.string('reply_to_id').references('id').inTable('emails').onDelete('SET NULL')

      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
