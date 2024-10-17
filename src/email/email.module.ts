import { Module } from '@nestjs/common';
import { EmailService } from './email.service';
import { EmailController } from './email.controller';
import { MailerModule } from '@nestjs-modules/mailer';
import { EjsAdapter } from '@nestjs-modules/mailer/dist/adapters/ejs.adapter';
import { join } from 'path';

@Module({
  imports: [  
    MailerModule.forRoot({  
      transport: {  
        host: 'smtp.gmail.com',  
        secure: false,
        auth: {  
          user: 'spotmobileuno@gmail.com',  
          pass: 'dpvn qesc orun thlx',  
        },  
      },  
      defaults: {  
        from: '"From Name" spotmobileuno@gmail.com',  
      },  
      template: {  
        dir: join(__dirname,  '../../src/email/templates'),  
        adapter: new EjsAdapter(),  
        options: {  
          strict: true,  
        },  
      },  
    }),  
  ],  
  controllers: [EmailController],
  providers: [EmailService],
})
export class EmailModule {}
