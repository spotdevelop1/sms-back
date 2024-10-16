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
    // console.log(message)

    await this.numberService.manyNumber(numbers,uid);

    const user = await this.userService.findOneByUid(uid);

    if(!user){
      throw new Error ('Usuario no existe');
    }

    for (const phone of numbers){
      const number = await this.numberService.findOneByPhoneAnduserUid(phone, user.uid);
      if(!number){
        throw new NotFoundException(`El número ${phone} no existe para este usuario`);
      }

      await this.saveMessage(message, uid, number.id);

      //Aquí se envia el SMS después de guardar en la BD 
      try {
        await this.apisService.sendSMS(phone, message);
        console.log(`SMS enviado a ${phone} con mensaje ${message}`);
      } catch (error) {
        console.log('Error enviando SMS :', error.message);  
      }
          
    }

    return 'Se cargo correctamente el archivo';
  }

  async crearNumber(crearNumber: CrearNumber){
    const { numbers, message, uid } = crearNumber;
    // console.log("NUMBERS: ", numbers)
    // console.log("MESSAGE: ", message)
    // console.log("UID: ", uid)

    await this.numberService.number(numbers, uid);

    const user = await this.userService.findOneByUid(uid);

    const number = await this.numberService.findOneByPhoneAnduserUid(numbers, user.uid);

    if(!numbers || numbers.length === 0 ){

      throw new Error("Debes enviar al menos un número");

    } else{

      if(!user){
        throw new Error("Usuario no existe");
      }

      if(!number){
        throw new NotFoundException('El número no existe para este usuario');
      }

      await this.saveMessage(message, uid, number.id);

      try {
        await this.apisService.sendSMS(numbers, message);
        console.log(`SMS enviado a ${numbers} con mensaje ${message}`);
      } catch (error) {
        console.log('Error enviando SMS :', error.message);  
      }

      return 'Número y mensaje se han guarado exitosamente';
    }
  }

  
  private async saveMessage(messageText: string, uid:string, numberId: number){

    const user = await this.userService.findOneByUid(uid);

    if(!user){
      throw new NotFoundException('Usuario no existe')
    }
    
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
