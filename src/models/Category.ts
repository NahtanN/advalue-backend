import { Column, Entity, JoinColumn, OneToMany, PrimaryColumn } from "typeorm";
import Product from "./Product";

@Entity('categories')
export default class Category {
    @PrimaryColumn()
    id: number;

    @Column()
    name: string;
}