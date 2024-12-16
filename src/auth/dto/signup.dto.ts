import { Transform } from "class-transformer";
import { IsEmail, IsString, IsUUID, MinLength } from "class-validator";

export class SignupDto {
    @IsUUID()
    uid: string;

    @IsString()
    name: string;
    
    @IsString()
    lastname: string;
    
    @IsString()
    cellphone: string;

    code: string;
    
    @IsEmail()
    email: string;

    @Transform(({value})=> value.trim())
    @IsString()
    @MinLength(8)
    password: string;
}
