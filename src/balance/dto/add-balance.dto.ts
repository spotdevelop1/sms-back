import { IsNumber, IsObject, IsString } from "class-validator";

export class AddBalanceDto{
    @IsString()
    uid: string;

    @IsNumber()
    amount: number;

    @IsString()
    info: string;

    @IsObject()
    customer: object;
}
