import { BaseCommand } from '@adonisjs/core/ace'
import type { CommandOptions } from '@adonisjs/core/types/ace'
import { createTransport } from 'nodemailer'
import env from '#start/env'

export default class TestEmail extends BaseCommand {
  static commandName = 'test:email'
  static description = ''

  static options: CommandOptions = {}

  private readonly transporter = createTransport({
    host: env.get('SMTP_HOST'),
    port: Number.parseInt(env.get('SMTP_PORT')),
    secure: false,
    ignoreTLS: true,
    authMethod: 'PLAIN',
    auth: {
      user: 'paul.valery@panache.so',
      pass: 'password123',
    },
  })

  async run() {
    await this.transporter.sendMail({
      from: 'paul.valery@panache.so',
      to: 'panache.so.contact@gmail.com',
      subject: 'Test email',
      text: 'Hello world!',
    })

    this.logger.info('Email sent')
  }
}
