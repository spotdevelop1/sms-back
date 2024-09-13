import { Module } from '@nestjs/common';
import { BalanceService } from './balance.service';
import { BalanceController } from './balance.controller';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from 'src/auth/constants/jwt.constants';
import { UsersModule } from 'src/users/users.module';
import { PaymentsModule } from 'src/payments/payments.module';

@Module({
  imports:[UsersModule, PaymentsModule,
    JwtModule.register({
      global:true,
      secret: jwtConstants.secret,
      signOptions:{expiresIn: '1d'}
    })
  ],
  controllers: [BalanceController],
  providers: [BalanceService],
})
export class BalanceModule {}
