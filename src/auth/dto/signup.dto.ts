import { Transform } from "class-transformer";
import { IsEmail, IsString, MinLength } from "class-validator";

export class SignupDto {
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
