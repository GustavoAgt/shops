import { Invoice } from './invoice.entity';
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Product {
    @PrimaryGeneratedColumn()
    id: number;
    
    @Column()
    type: string;
    
    @Column()
    name: string;
   
    @Column({type: "double precision"})
    price: number;

    @ManyToOne(type => Invoice, invoice => invoice.products)
    invoice: Invoice;

    constructor(type?: string, name?: string, price?: number) {
        this.type = type;
        this.name = name;
        this.price = price;
    }
}