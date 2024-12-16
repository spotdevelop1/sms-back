import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';
import { IsOptional, IsString, IsUUID } from 'class-validator';

export class UpdateUserDto {
    // @IsString()
    @IsUUID()
    uid: string;

    @IsOptional()
    @IsString()
    name?: string;

    @IsOptional()
    @IsString()
    lastname?: string;

    @IsOptional()
    @IsString()
    cellphone?: string;

    @IsOptional()
    @IsString()
    email?: string;

    @IsOptional()
    @IsString()
    password?: string;

    @IsOptional()
    @IsString()
    newPassword?: string;
}
