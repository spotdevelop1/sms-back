import { Injectable } from '@nestjs/common';
import { Payment } from './entities/payment.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { AddPaymentDto } from './dto/add-payment.dto';

@Injectable()
export class PaymentsService {

  constructor(
    @InjectRepository(Payment)
    private paymentRepository: Repository<Payment>,
  ){  }

  async doPaymentOpenpay(data){
    const {uid, amount, info, customer, balance } = data

    const Openpay = require('openpay');
    // production
    // Openpay.setProductionMode(true);
    // const openpay = new Openpay('mtnizw0lnm17errvb1rl', 'sk_0a080b3143ee4bf6b428362ddaa4a48c');

    // test
    const openpay = new Openpay('mpxjtlnasipbctyey0js', 'sk_5fdd44dbb4e2488bbeff58176d1dde63');
    
    //test

    // const openpay = new Openpay('mpvtgwbcwdtr7vdrwq8w', 'sk_05d88d591ac646548c7c362800802bde');

    const metadataRequest = {
      'user': uid,
      'comerce': 'sms_app',
      'balance' : balance
    }

    const chargeRequest = {
      'method' : 'card',
      'amount' : amount,
      'description' : info,
      'customer' : customer,
      'metadata' : metadataRequest,
      'send_email' : true,
      'confirm' : false,
      'redirect_url' : 'http://spot1mobile.com/'
    }

   const resOpenpay = new Promise( (resolve, reject) => {
      openpay.charges.create(chargeRequest, function(error, charge) {
        if (error) {
          reject(error);
        } else {
          resolve(charge);
        }
      });
    });

    return resOpenpay;
  }

  savePayment(paymentData: AddPaymentDto) {
    return this.paymentRepository.insert(paymentData);
  }
}
