import { belongsTo, column } from '@adonisjs/lucid/orm'
import BaseModel from '#common/database/models/base_model'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'
import User from '#common/database/models/user'
import { DateTime } from 'luxon'

export default class File extends BaseModel {
  @column()
  declare name: string

  @column()
  declare path: string | null

  @belongsTo(() => File)
  declare parent_id: BelongsTo<typeof File> | null

  @column()
  declare is_folder: boolean

  @column()
  declare size: number

  @column()
  declare mime: string;

  @belongsTo(() => User)
  declare created_by: BelongsTo<typeof User>

  @belongsTo(() => User)
  declare updated_by: BelongsTo<typeof User> | null

  @column()
  declare deleted_at: DateTime | null

}
