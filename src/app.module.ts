import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import {TypeOrmModule} from '@nestjs/typeorm'
import { AuthModule } from './auth/auth.module';
import { NumbersModule } from './numbers/numbers.module';
@Module({
  imports: [UsersModule, TypeOrmModule.forRoot({
    type: 'mysql',
    host: 'localhost',
    port: 3306,
    username: 'root',
    password: '',
    database: 'sms-project',
    entities: [__dirname + '/../**/*.entity.js'],
    synchronize: true
  }), AuthModule, NumbersModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
