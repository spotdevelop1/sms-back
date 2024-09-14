import { Type } from "class-transformer";
import { IsArray, IsObject, IsString, ValidateNested } from "class-validator";

class PhoneDto {
    @IsString()
    phone: string
}

export class CreateNumberDto {
    //Validar que sea un objeto

    @IsArray() //Recibir varios números de télefono
    @ValidateNested({ each: true }) //valida los elementos dentro del array
    @Type(() => PhoneDto) //Convierte cada objeto en array en la clase PhoneDto, transforma los elementos del array numbers en objetos de la calse PhoneDto
    numbers: PhoneDto[]
}
