import { IsString } from "class-validator";

export class SendMessageToSingleNumberDto {
     @IsString()
     readonly message: string

     @IsString()
     readonly number: string

     @IsString()
     readonly uid: string
}
