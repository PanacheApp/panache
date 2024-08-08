import BaseModel from '#common/database/models/base_model'
import User from '#common/database/models/user'
import { column, belongsTo } from '@adonisjs/lucid/orm'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'

export default class BusinessOrganization extends BaseModel {
  /**
   * Regular columns.
   */
  @column()
  declare name: string

  @column()
  declare sirenSiret: string

  @column()
  declare nafNaceNoga: string

  @column()
  declare vatNumber: string

  @column()
  declare address: string

  @column()
  declare addressComplement: string

  @column()
  declare postalCode: string

  @column()
  declare city: string

  @column()
  declare country: string

  @column()
  declare phoneNumber: string

  @column()
  declare website: string

  /**
   * Relationships.
   */
  @belongsTo(() => User)
  declare owner: BelongsTo<typeof User>

  @column()
  declare ownerId: string
}
