import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { BalanceService } from './balance.service';
import { AddBalanceDto } from './dto/add-balance.dto';

@Controller('balance')
export class BalanceController {
  constructor(private readonly balanceService: BalanceService) {}

  @Post('add')
  Add(@Body() data: AddBalanceDto) {
    return this.balanceService.AddBalance(data);
  }


}
