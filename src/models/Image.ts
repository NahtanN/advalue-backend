import { Column, Entity, PrimaryColumn } from "typeorm";

@Entity('images')
export default class Image {
    @PrimaryColumn()
    readonly id: number;

    @Column()
    name: string;

    @Column()
    product_id: number;
}