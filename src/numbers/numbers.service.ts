import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateNumberDto } from './dto/create-number.dto';
import { UpdateNumberDto } from './dto/update-number.dto';
import { Number } from './entities/number.entity';

@Injectable()
export class NumbersService {

  constructor(
    @InjectRepository(Number)
    private readonly numberRepository: Repository<Number>,
  ){  }
  
  async create(createNumberDto: CreateNumberDto) {
    const numbersToSave =  createNumberDto.numbers.map((number) => {
      const numberEntity = new Number();
      numberEntity.phone = number.phone;
      return numberEntity;
    })

    return this.numberRepository.save(numbersToSave);
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
