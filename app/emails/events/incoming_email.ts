import { BaseEvent } from '@adonisjs/core/events'
import { ParsedMail } from 'mailparser'

export default class IncomingEmail extends BaseEvent {
  constructor(public email: ParsedMail) {
    super()
  }
}
