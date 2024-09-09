import { Controller, Get, Post, Body, UseGuards, Patch, Param, Delete } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignupDto } from './dto/signup.dto';
import { SigninDto } from './dto/signin.dto';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService
  ) {}

  @Post('signup')
  signup(@Body() userData: SignupDto) {
    return this.authService.signup(userData);
  }

  @Post('signin')
  signin(@Body() userData: SigninDto) {
    return this.authService.signin(userData);
  }

}
