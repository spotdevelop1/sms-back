import { Module } from '@nestjs/common';
import { MessagesService } from './messages.service';
import { MessagesController } from './messages.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Message } from './entities/message.entity';
import { NumbersModule } from 'src/numbers/numbers.module';
import { UsersModule } from 'src/users/users.module';
import { ApisModule } from 'src/apis/apis.module';

@Module({
  imports:[
    TypeOrmModule.forFeature([Message]),
    NumbersModule,
    UsersModule,
    ApisModule
  ],
  controllers: [MessagesController],
  providers: [MessagesService],
})
export class MessagesModule {}
