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

  get from(): string {
    return this.parsedEmail.from!.text
  }

  get to(): string {
    if (!this.parsedEmail.to) {
      return ''
    }
    if (Array.isArray(this.parsedEmail.to)) {
      return this.parsedEmail.to.map((to) => to.text).join(', ')
    }
    return this.parsedEmail.to.text
  }
}
