import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/users/entities/user.entity';
import { Repository } from 'typeorm';
import { UpdateApiDto } from 'src/apis/dto/update-api.dto';
import * as bcrypt from 'bcrypt';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {

  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ){  }

  create(createUserDto: CreateUserDto) {
    return this.userRepository.save(createUserDto);
  }

  findOneByEmail(email: string) {
    return this.userRepository.findOneBy({email});
  }

  async findOneByUid(uid: string) {
    const user = await this.userRepository.findOneBy({uid});
    return user 
  }



  async getPasswordByUid(uid: string, currentPassword: string): Promise<boolean> {
    const user = await this.userRepository.findOne({ where: { uid }});

    if(!user){
      throw new Error('Usuario no encontrado')
    }

    const isMatch = await bcrypt.compare(currentPassword, user.password);
    // console.log("isMatch", isMatch);

    if(!isMatch){
      return false;
      // console.log('Contraseña incorrecta')      
    }
    
    return true
  }

  async userup(userData: UpdateUserDto) {

    const { uid, newPassword, ...updateData } = userData;

    if(newPassword){
      updateData.password = await  bcrypt.hash(newPassword, 10);
    }

    return this.userRepository.update({uid}, updateData);
  }



}
