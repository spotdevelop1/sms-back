import { Number } from "src/numbers/entities/number.entity";
import { User } from "src/users/entities/user.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Message {
    @PrimaryGeneratedColumn('increment')
    id:number
    @Column({nullable: false})
    message:string
    @ManyToOne(()=> User, (user) => user.messages, {nullable:false})
    user:User
    @ManyToOne(()=> Number, (number) => number.messages, {nullable:false})
    number:Number
}
