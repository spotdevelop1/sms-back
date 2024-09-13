import { BadRequestException, Body, Injectable } from '@nestjs/common';
import { AddBalanceDto } from './dto/add-balance.dto';
import { UsersService } from 'src/users/users.service';
import { JwtService } from '@nestjs/jwt';
import { PaymentsService } from 'src/payments/payments.service';

@Injectable()
export class BalanceService {
  constructor(
    private readonly userService: UsersService,
    private readonly jwtService: JwtService,
    private readonly paymentService: PaymentsService,
  ){  }

  async AddBalance (data:AddBalanceDto){
    const {uid, amount, info } = data

    try {
      const respOpenpay = await this.paymentService.doPaymentOpenpay( data )
      
      const paymentData = {
        'desc':info,
        'amount' : amount,
        'status': respOpenpay['status'],
        'order': respOpenpay['id'],
        'response': JSON.stringify(respOpenpay),
        'user': uid
      }

      await this.paymentService.savePayment(paymentData)

      return { "message": "Success create payment", 'url': respOpenpay['payment_method']['url']}
    } catch (error) {
      throw new BadRequestException('Openpay error')
    }

  }

}
