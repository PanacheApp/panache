import OutgoingEmail from '#emails/events/outgoing_email'

export default class HandleOutgoingEmail {
  async handle(payload: OutgoingEmail) {
    console.log('HandleOutgoingEmail', payload)
  }
}
