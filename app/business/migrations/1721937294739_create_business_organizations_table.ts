import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'business_organizations'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.string('id').primary()
      table.string('name').notNullable()
      table.string('siren_siret', 14).notNullable()
      table.string('naf_nace_noga', 7).notNullable()
      table.string('vat_number').nullable()
      table.string('address').notNullable()
      table.string('address_complement').nullable()
      table.string('postal_code', 10).notNullable()
      table.string('city', 100).notNullable()
      table.string('country', 100).notNullable()
      table.string('phone_number').nullable()
      table.string('website').nullable()

      table.string('owner_id').references('id').inTable('users').onDelete('CASCADE')

      table.timestamp('created_at', { useTz: true }).notNullable()
      table.timestamp('updated_at', { useTz: true }).nullable()
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
