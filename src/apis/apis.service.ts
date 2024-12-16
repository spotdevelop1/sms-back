import { Injectable } from '@nestjs/common';
import { SendMessageToSingleNumberDto } from './dto/create-api.dto';
import { UpdateApiDto } from './dto/update-api.dto';

import fetch from 'node-fetch';

@Injectable()
export class ApisService {

  private readonly clientId = 'ALT_Spot1';
  private readonly password = 's3Om59X2Uazz26T';

  async accessTokenSMS(): Promise<string>{
    const url = `https://api.gestorcampanas.altanredes.com/auth/api/getAuthToken/${this.clientId}/${this.password}`;

    const response = await fetch(url);

    const data = await  response.json();

    const token = data.response.zrtAuth;
    return token;
  }


  //Enviar SMS
  async sendSMS(msisdn: string, message:string): Promise<any>{
    const accessTokenSMS = await this.accessTokenSMS();
    const url = "https://api.gestorcampanas.altanredes.com/v3/api/sendSms";

    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'ZRTAuth': accessTokenSMS,
      },
      body: JSON.stringify({
        msisdn:`52${msisdn}`,
        clientID: this.clientId,
        sender: "81900",
        message: `${message}`,
      }),
    });
    console.log(msisdn);
    

    const data = await response.json();
    // if(data.error){
    //   throw new Error(`Error al enviar SMS: ${data.error.message}`);
    // }
    return data;
  }

  create(sendMessageToSingleNumberDto: SendMessageToSingleNumberDto) {
    return 'This action adds a new api';
  }

  findAll() {
    return `This action returns all apis`;
  }

  findOne(id: number) {
    return `This action returns a #${id} api`;
  }

  update(id: number, updateApiDto: UpdateApiDto) {
    return `This action updates a #${id} api`;
  }

  remove(id: number) {
    return `This action removes a #${id} api`;
  }
}
