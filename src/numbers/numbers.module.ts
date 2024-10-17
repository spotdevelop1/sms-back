import { Module } from '@nestjs/common';
import { NumbersService } from './numbers.service';
import { NumbersController } from './numbers.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Number } from './entities/number.entity';
import { UsersModule } from 'src/users/users.module';

@Module({
  imports:[
    TypeOrmModule.forFeature([Number]),
    UsersModule
  ],
  controllers: [NumbersController],
  providers: [NumbersService],
  exports: [NumbersService]
})
export class NumbersModule {}
