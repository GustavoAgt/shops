import { Invoice } from './invoice.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Product {
    @PrimaryGeneratedColumn()
    id: number;
    
    @Column()
    type: string;
    
    @Column()
    name: string;
   
    @Column()
    price: number;

    @ManyToOne(type => Invoice, Invoice => Invoice.products)
    invoice: Invoice;
}