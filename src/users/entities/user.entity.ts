import { Column, CreateDateColumn, DeleteDateColumn, Entity, UpdateDateColumn } from "typeorm";

@Entity()
export class User {
    @Column({primary: true})
    uid: string;
    @Column({nullable:true})
    name: string;
    @Column({unique:true, nullable:true})
    email: string;
    @Column({nullable:true})
    password: string;
    @CreateDateColumn()
    createAt: Date;
    @UpdateDateColumn()
    updateAt: Date;
    @DeleteDateColumn()
    deleteAt: Date;
}
