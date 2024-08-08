import { belongsTo, column } from '@adonisjs/lucid/orm'
import BaseModel from '#common/database/models/base_model'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'
import { DateTime } from 'luxon'

export default class File extends BaseModel {
  @column()
  declare name: string

  @column()
  declare path: string | null

  @column()
  declare parentId: string | null

  @belongsTo(() => File)
  declare parent: BelongsTo<typeof File> | null

  @column()
  declare isFolder: boolean

  @column()
  declare size: number

  @column()
  declare mime: string;

  @column()
  declare createdBy: string | null

  @column()
  declare updatedBy: string | null

  @column()
  declare deletedAt: DateTime | null

}
