import { Column, Entity, OneToMany, PrimaryColumn } from "typeorm";
import Product from "./Product";

@Entity('categories')
export default class Category {
    @PrimaryColumn()
    readonly id: number;

    @Column()
    name: string;

    @OneToMany(() => Product, product => product.category_id)
    products: Product[];
}