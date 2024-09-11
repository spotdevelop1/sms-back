import { Injectable } from '@nestjs/common';
import { AddBalanceDto } from './dto/add-balance.dto';
import { UsersService } from 'src/users/users.service';
import { JwtService } from '@nestjs/jwt';


@Injectable()
export class BalanceService {
  constructor(
    private readonly userService: UsersService,
    private readonly jwtService: JwtService,
  ){  }

  async AddBalance (data:AddBalanceDto){
    const {uid, balance } = data
    const resp = await this.userService.updateUser(uid, {'balance': balance, 'name':'Jonathan'})
    return resp
  }

}
