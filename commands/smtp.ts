import { BaseCommand } from '@adonisjs/core/ace'
import type { CommandOptions } from '@adonisjs/core/types/ace'
import SMTPServer from '#emails/smtp/smtp_server'

export default class SMTP extends BaseCommand {
  static commandName = 'smtp'
  static description = ''

  static options: CommandOptions = {
    startApp: true,
  }

  async run() {
    const server = new SMTPServer()
    server.on('error', (err: { message: string }) => {
      this.logger.error(err.message)
    })
    this.logger.info('Listening on port 25.', { prefix: 'SMTP' })
    server.listen(25)
  }
}
