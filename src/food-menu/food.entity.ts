import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Food {

    @PrimaryGeneratedColumn()
    id: number

    @Column()
    name: string

    @Column()
    price: number

    @Column({nullable: true})
    image: string
}