import { Column, Entity, PrimaryColumn } from "typeorm";

@Entity('categories')
export default class Category {
    @PrimaryColumn()
    id: number;

    @Column()
    name: string;
}