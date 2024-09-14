import { Column, CreateDateColumn, DeleteDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class Number {
    @PrimaryGeneratedColumn('increment')
    id:number
    @Column({nullable: false})
    phone:string
    @CreateDateColumn()
    createat:Date
    @UpdateDateColumn()
    updateat:Date
    @DeleteDateColumn()
    deleteat:Date
}

