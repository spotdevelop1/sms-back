import { User } from "src/users/entities/user.entity";
import { Column, CreateDateColumn, DeleteDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class Payment {
    @PrimaryGeneratedColumn('increment')
    id: number;
    @Column({nullable:false})
    desc:string;
    @Column({nullable:false})
    amount:number;
    @Column({nullable:false})
    order:string;
    @Column({nullable:false})
    status:string;
    @Column('text', {nullable:false})
    response: string;
    @ManyToOne(() => User, (user) => user.payments, {nullable:false})
    user: User;
    @CreateDateColumn()
    createAt: Date;
    @UpdateDateColumn()
    updateAt: Date;
    @DeleteDateColumn()
    deleteAt: Date;
}
