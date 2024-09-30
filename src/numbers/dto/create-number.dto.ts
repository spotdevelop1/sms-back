import { IsArray, IsString } from "class-validator";

export class CreateNumberDto {

    @IsArray() //Validar que sea un array
    @IsString({ each: true }) //Cada elemento en el array debe ser un string
    numbers: string[]

    @IsString()
    message: string;

    @IsString()
    uid: string;
}
