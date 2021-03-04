import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryColumn } from "typeorm";
import Product from "./Product";

@Entity('images')
export default class Image {
    @PrimaryColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    size: number;

    @Column()
    key: string;

    @Column()
    url: string;

    @CreateDateColumn({ select: false })
    createdAt: Date;

    @Column()
    product_id: number;

    @ManyToOne(() => Product, product => product.images)
    @JoinColumn({ name: 'product_id' })
    product: Product;
}