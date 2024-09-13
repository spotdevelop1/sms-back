import { Module } from '@nestjs/common';
import { WebhookService } from './webhook.service';
import { WebhookController } from './webhook.controller';
import { UsersModule } from 'src/users/users.module';
import { PaymentsModule } from 'src/payments/payments.module';

@Module({
  imports:[UsersModule, PaymentsModule, ],
  controllers: [WebhookController],
  providers: [WebhookService],
})
export class WebhookModule {}
