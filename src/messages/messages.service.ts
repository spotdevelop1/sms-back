import { Injectable, NotFoundException } from '@nestjs/common';
import { CrearNumber, CreateMessageDto } from './dto/create-message.dto';
import { UpdateMessageDto } from './dto/update-message.dto';
import { Repository } from 'typeorm';
import { Message } from './entities/message.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { NumbersService } from 'src/numbers/numbers.service';
import { UsersService } from 'src/users/users.service';
import { ApisService } from 'src/apis/apis.service';


@Injectable()
export class MessagesService {

  constructor(
    @InjectRepository(Message)
    private readonly messagesRepository: Repository<Message>,
    private readonly numberService: NumbersService,
    private readonly userService: UsersService,
    private readonly apisService: ApisService,
  ){  }

  async createMessage(createMessageDto: CreateMessageDto) {

    const { numbers, message, uid } = createMessageDto;
    const result = [];

    await this.numberService.manyNumber(numbers,uid);

    const user = await this.userService.findOneByUid(uid);

    for (const phone of numbers){
      // console.log(`numeros for: ${phone}`);
      const number = await this.numberService.findOneByPhoneAnduserUid(phone, user.uid);
      //Aquí se envia el SMS después de guardar en la BD 
      try {
        await this.saveMessage(message, uid, number.id);

        await this.apisService.sendSMS(phone, message);
        // console.log(`SMS enviado a ${phone} con mensaje ${message}`);
        result.push( {message:"Los datos se han eviado exitosamente"} );
      } catch (error) {
        // console.log('Error enviando SMS :', error.message);  
        result.push( {message:`Los datos no pudieron ser enviados: ${error.message}`} );
      }
          
    }

    return result;
    // return {message:"Los datos se han eviado exitosamente"};
  }

  
  private async saveMessage(messageText: string, uid:string, numberId: number){

    const user = await this.userService.findOneByUid(uid);
    
    const newMessage = this.messagesRepository.create({
      message:messageText,
      user: user,
      number: {id: numberId}
    })

    await this.messagesRepository.save(newMessage);
  }


  findAll() {
    return `This action returns all messages`;
  }

  findOne(id: number) {
    return `This action returns a #${id} message`;
  }

  update(id: number, updateMessageDto: UpdateMessageDto) {
    return `This action updates a #${id} message`;
  }

  remove(id: number) {
    return `This action removes a #${id} message`;
  }
}
