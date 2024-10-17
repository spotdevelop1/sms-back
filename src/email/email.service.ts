import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';  

@Injectable()
export class EmailService {
  constructor(private readonly mailerService: MailerService) {}  
  
  async emailCode(data) {  
    const { email, name } = data;  
  
    const subject = `Codigo de confirmación`;  
  
    await this.mailerService.sendMail({  
      to: email,  
      subject,  
      template: '../templates/codeMail',  
      context: {  
        name:name,  
      },  
    });  
  }  
}
