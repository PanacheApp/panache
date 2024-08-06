import User from '#common/database/models/user'
import { BaseEvent } from '@adonisjs/core/events'
import { ParsedMail } from 'mailparser'

export default class OutgoingEmail extends BaseEvent {
  constructor(
    public sender: User,
    public parsedEmail: ParsedMail
  ) {
    super()
  }
}
