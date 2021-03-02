import { Column, Entity, PrimaryColumn } from "typeorm";
import { v4 as uuid } from 'uuid';

@Entity('products')
export default class Product {
    @PrimaryColumn()
    readonly id: string;

    @Column()
    title: string;

    @Column()
    value: number;
    
    @Column()
    category_id: number;

    constructor() {
        if (!this.id) {
            this.id = uuid();
        }
    }
}