import { Controller, Get, Post, Body, Patch, Param, Delete, NotFoundException, Put, HttpException, HttpStatus } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }



  @Post('userpassword')
  async getPassword(@Body() body:  {uid: string, currentPassword: string}){
    try {
      const { uid, currentPassword } = body;
      const isPasswordValid = await this.usersService.getPasswordByUid(uid, currentPassword)
      
      if(isPasswordValid){
        return { message: 'Contraseña Correcta'};
      }

      return { message: 'Contraseña Incorrecta', statusCode: 401};
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.UNAUTHORIZED)
    }
  }

  @Post('userup')
  userup(@Body() userData: UpdateUserDto) {
    return this.usersService.userup(userData);
  }



  // @Get()
  // findAll() {
  //   return this.usersService.findAll();
  // }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
  //   return this.usersService.update(+id, updateUserDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.usersService.remove(+id);
  // }
}
