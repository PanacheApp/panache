import Email from '#emails/database/models/email'
import OutgoingEmail from '#emails/events/outgoing_email'

export default class HandleOutgoingEmail {
  async handle(payload: OutgoingEmail) {
    const email = new Email()
    email.from = payload.from
    email.to = payload.to
    email.subject = payload.parsedEmail.subject || ''
    email.text = payload.parsedEmail.text || ''
    email.html = payload.parsedEmail.html || ''
    email.folder = 'sent'
    email.userId = payload.sender.id
    await email.save()
  }
}
