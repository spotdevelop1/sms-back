import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ApisService } from './apis.service';
import { SendMessageToSingleNumberDto } from './dto/create-api.dto';
import { UpdateApiDto } from './dto/update-api.dto';

@Controller('apis')
export class ApisController {
  constructor(private readonly apisService: ApisService) {}

  @Post()
  create(@Body() sendMessageToSingleNumberDto: SendMessageToSingleNumberDto) {
    return this.apisService.create(sendMessageToSingleNumberDto);
  }

  @Post('send-sms')
  async sendSMS(
    @Body('msisdn') msisdn: string,
    @Body('message') message:string
  ){
    return this.apisService.sendSMS(msisdn, message);
  }

  @Get()
  findAll() {
    return this.apisService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.apisService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateApiDto: UpdateApiDto) {
    return this.apisService.update(+id, updateApiDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.apisService.remove(+id);
  }
}
