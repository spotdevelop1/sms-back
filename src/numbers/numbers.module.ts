import { Module } from '@nestjs/common';
import { NumbersService } from './numbers.service';
import { NumbersController } from './numbers.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Number } from './entities/number.entity';

@Module({
  imports:[
    TypeOrmModule.forFeature([Number]),
  ],
  controllers: [NumbersController],
  providers: [NumbersService],
})
export class NumbersModule {}
