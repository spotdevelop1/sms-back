import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UpdateNumberDto } from './dto/update-number.dto';
import { Number } from './entities/number.entity';
import { UsersService } from '../users/users.service';

@Injectable()
export class NumbersService {

  constructor(
    @InjectRepository(Number)
    private readonly numberRepository: Repository<Number>,

    private readonly userService: UsersService,
  ){  }
  

  async manyNumber(numbers: string[], uid: string){
    const user = await this.userService.findOneByUid(uid);

    
    if(!numbers || numbers.length === 0 ){
      throw new Error("Debes enviar al menos un número");
    }

    if(!user){
      throw new Error ('Usuario no existe');
    }

    for(const phone of numbers){
      const newNumber = this.numberRepository.create({phone, user});
      await this.numberRepository.save(newNumber);
    }

    return "Números guardados correctamente";
  }

  async findOneByPhoneAnduserUid(phone: string, userUid: string): Promise<Number>{
    return this.numberRepository.findOne({
      where:{
        phone:phone,
        user: { uid: userUid}
      }
    })
  }

  async number(numbers: string, uid: string){
    const user = await this.userService.findOneByUid(uid);
    const phone = numbers;

    if(!phone || phone.length === 0 ){

      throw new Error("Debes enviar al menos un número");

    }else{

      const newNumber = this.numberRepository.create({phone, user});
      await this.numberRepository.save(newNumber);

      return "El números fue guardado correctamente";
    }
  }

  findAll() {
    return `This action returns all numbers`;
  }

  findOne(id: number) {
    return `This action returns a #${id} number`;
  }

  update(id: number, updateNumberDto: UpdateNumberDto) {
    return `This action updates a #${id} number`;
  }

  remove(id: number) {
    return `This action removes a #${id} number`;
  }
}
