import { Injectable } from '@nestjs/common';
import { PaymentsService } from 'src/payments/payments.service';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class WebhookService {
    constructor(
        private readonly userService: UsersService,        
        private readonly paymentService: PaymentsService,
    ){  }

    async Openpay(OpenpayRequest){
        const {type, transaction} = OpenpayRequest
        const {id, metadata} = transaction
        const {user, balance} = metadata
        // const resp = await this.userService.updateUser()

        return metadata;
    }
}
