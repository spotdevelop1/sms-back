import { IsArray, IsString } from "class-validator";

export class SendMessageToSingleNumberDto {
     @IsString()
     readonly message: string

     @IsString()
     readonly number: string

     @IsString()
     readonly uid: string

}
export class SendMessageToMultipleNumbersDto {
     @IsString()
     readonly message: string

     @IsArray()
     @IsString({ each: true })
     readonly number: string

     @IsString()
     readonly uid: string
}
