import { Message } from "src/messages/entities/message.entity";
import { User } from "src/users/entities/user.entity";
import { Column, CreateDateColumn, DeleteDateColumn, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class Number {
    @PrimaryGeneratedColumn('increment')
    id:number
    @Column({nullable: false})
    phone:string
    @ManyToOne(() => User, (user) => user.numbers, {nullable:false})
    user: User;
    @OneToMany(()=> Message, (message) => message.number)
    messages:Message[]
    @CreateDateColumn()
    createat:Date
    @UpdateDateColumn()
    updateat:Date
    @DeleteDateColumn()
    deleteat:Date
}

