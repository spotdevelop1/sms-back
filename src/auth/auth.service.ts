import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { SignupDto } from './dto/signup.dto';
import {v4 as uid} from 'uuid';
import { hash, compare } from 'bcrypt';
import { SigninDto } from './dto/signin.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService { 
  constructor(
    private readonly userService: UsersService,
    private readonly jwtService: JwtService,
  ){  }

  async signup(userData:SignupDto) {
    const { password, email } = userData;
    const user = await this.userService.findOneByEmail(email)
    
    if (user) {
      throw new BadRequestException('User alredy exists')
    }

    let uuid = uid();
    const plainToHash = await hash( password, 10 );
    userData = {...userData, password:plainToHash, uid:uuid};

    return await this.userService.create(userData)
  }

  async signin(userData:SigninDto){
    const { password, email } = userData;
    const user = await this.userService.findOneByEmail(email)

    if (!user) {
      throw new UnauthorizedException('Email is wrong')
    }
    
    const isPasswordVal = await compare(password, user.password)

    if (!isPasswordVal) {
      throw new UnauthorizedException('Password is wrong')
    }
    return user
  }

}