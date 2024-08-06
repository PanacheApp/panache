import hash from '@adonisjs/core/services/hash'
import { compose } from '@adonisjs/core/helpers'
import { afterCreate, column } from '@adonisjs/lucid/orm'
import { withAuthFinder } from '@adonisjs/auth/mixins/lucid'
import BaseModel from './base_model.js'
import UserSignedUp from '#auth/events/user_signed_up'

const AuthFinder = withAuthFinder(() => hash.use('scrypt'), {
  uids: ['localPart'],
  passwordColumnName: 'password',
})

export default class User extends compose(BaseModel, AuthFinder) {
  @column()
  declare firstName: string

  @column()
  declare lastName: string

  @column()
  declare gender: 'male' | 'female'

  @column()
  declare localPart: string

  @column()
  declare backupEmail: string

  @column()
  declare backupEmailConfirmed: boolean

  @column({ serializeAs: null })
  declare password: string

  @afterCreate()
  static async emitCreationEvent(user: User) {
    await UserSignedUp.dispatch(user)
  }
}
