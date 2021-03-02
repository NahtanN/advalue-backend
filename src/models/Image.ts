import { Column, Entity, ManyToOne, PrimaryColumn } from "typeorm";
import Product from "./Product";

@Entity('images')
export default class Image {
    @PrimaryColumn()
    readonly id: number;

    @Column()
    name: string;

    @Column()
    size: number;

    @Column()
    key: string;

    @Column()
    url: string;

    @Column()
    createdAt: Date;

    @Column()
    product_id: number;

    @ManyToOne(() => Product, product => product.images)
    product: Product;
}