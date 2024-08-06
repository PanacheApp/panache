import { BaseCommand } from '@adonisjs/core/ace'
import type { CommandOptions } from '@adonisjs/core/types/ace'
import SMTPServer from '#emails/smtp_server'
import env from '#start/env'

export default class SMTP extends BaseCommand {
  static commandName = 'smtp'
  static description = 'Start the SMTP server.'

  static options: CommandOptions = {
    startApp: true,
  }

  async run() {
    const server = new SMTPServer()
    server.on('error', (err: { message: string }) => {
      this.logger.error(err.message)
    })
    this.logger.info(`Listening on port ${env.get('SMTP_PORT')}.`, { prefix: 'SMTP' })
    server.listen(env.get('SMTP_PORT'))
  }
}
