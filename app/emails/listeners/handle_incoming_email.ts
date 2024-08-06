import IncomingEmail from '#emails/events/incoming_email'

export default class HandleIncomingEmail {
  async handle(payload: IncomingEmail) {
    console.log('HandleIncomingEmail', payload)
  }
}
