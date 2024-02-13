import { Injectable } from '@nestjs/common';
import { UserEntity } from 'src/users/entity/user.entity';
import { MailerService } from '@nestjs-modules/mailer';

@Injectable()
export class MailService {

  constructor(private readonly mailerService: MailerService) {}

  async sendUserConfirmation(email: string, token: string) {
    const url = `example.com/auth/confirm?token=${token}`;

    await this.mailerService.sendMail({
      to: email,
      subject: 'Hai noroc!',
      template: './confirmation',
      context: {
        name: email,
        url
      }
    })
  }

}
