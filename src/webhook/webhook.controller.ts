import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { WebhookService } from './webhook.service';

@Controller('webhook')
export class WebhookController {
  constructor(private readonly webhookService: WebhookService) {}

  @Post('openpay')
  openpay(@Body() OpenpayRequest) {
    return this.webhookService.Openpay(OpenpayRequest);
  }

}
