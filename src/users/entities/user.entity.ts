import { Message } from "src/messages/entities/message.entity";
import { Number } from "src/numbers/entities/number.entity";
import { Payment } from "src/payments/entities/payment.entity";
import { Column, CreateDateColumn, DeleteDateColumn, Entity, OneToMany, UpdateDateColumn } from "typeorm";

@Entity()
export class User {
    @Column({primary: true})
    uid: string;
    @Column({nullable:false})
    name: string;
    @Column({nullable:false})
    lastname: string;
    @Column({unique:true, nullable:false})
    email: string;
    @Column({nullable:false})
    password: string;
    @Column({type: "double", default:0})
    balance: number;
    @OneToMany(() => Payment, (payment) => payment.user)
    payments: Payment[]
    @OneToMany(() => Number, (number) => number.user)
    numbers: Number[]
    @OneToMany(()=> Message, (message) => message.user)
    messages: Message[]
    @CreateDateColumn()
    createAt: Date;
    @UpdateDateColumn()
    updateAt: Date;
    @DeleteDateColumn()
    deleteAt: Date;
}
