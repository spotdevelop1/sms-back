import { IsNumber, IsString } from "class-validator";

export class AddBalanceDto{
    @IsString()
    uid: string;

    @IsNumber()
    balance: number;
}
