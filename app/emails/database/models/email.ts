import BaseModel from '#common/database/models/base_model'
import User from '#common/database/models/user'
import { belongsTo, column } from '@adonisjs/lucid/orm'
import { BelongsTo } from '@adonisjs/lucid/types/relations'

export default class Email extends BaseModel {
  /**
   * Regular columns.
   */
  @column()
  declare subject: string

  @column()
  declare from: string

  @column()
  declare to: string

  @column()
  declare cc: string

  @column()
  declare bcc: string

  @column()
  declare text: string

  @column()
  declare html: string

  @column()
  declare folder: 'inbox' | 'sent' | 'drafts' | 'spam' | 'trash'

  /**
   * Relationships.
   */
  @column()
  declare userId: string

  @belongsTo(() => User)
  declare user: BelongsTo<typeof User>
}
