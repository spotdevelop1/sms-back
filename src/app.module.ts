import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import {TypeOrmModule} from '@nestjs/typeorm'
import { AuthModule } from './auth/auth.module';
import { NumbersModule } from './numbers/numbers.module';
import { BalanceModule } from './balance/balance.module';
import { PaymentsModule } from './payments/payments.module';
import { WebhookModule } from './webhook/webhook.module';
import { MessagesModule } from './messages/messages.module';
import { ApisModule } from './apis/apis.module';
@Module({
  imports: [UsersModule, TypeOrmModule.forRoot({
    type: 'mysql',
    host: 'localhost',
    port: 3306,
    username: 'root',
    password: '',
    database: 'sms-project',
    entities: [__dirname + '/../**/*.entity.js'],
    synchronize: true
  }), AuthModule, BalanceModule, PaymentsModule, WebhookModule, NumbersModule, MessagesModule, ApisModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
