import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryColumn } from "typeorm";
import { v4 as uuid } from 'uuid';
import Category from "./Category";
import Image from "./Image";

@Entity('products')
export default class Product {
    @PrimaryColumn()
    readonly id: string;

    @Column()
    title: string;

    @Column()
    value: number;
    
    @CreateDateColumn()
    created_at: Date;

    @Column()
    category_id: number;

    @ManyToOne(() => Category, { 
        cascade: ['insert', 'update', 'remove'],
        eager: true 
    })
    @JoinColumn({ name: 'category_id' })
    category: Category;

    @OneToMany(() => Image, image => image.product, {
        cascade: ['insert', 'update', 'remove'],
        eager: true
    })
    @JoinColumn()
    images: Image[];

    constructor() {
        if (!this.id) {
            this.id = uuid();
        }
    }
}