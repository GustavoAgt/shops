import { Product } from './products.entity';
import { Client } from 'src/entities/client.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn, OneToMany } from 'typeorm';

@Entity()
export class Invoice {

    @PrimaryGeneratedColumn()
    id: number; 

    @Column({name: "generated_date"})
    generatedDate: Date;

    @Column()
    total: number;

    @ManyToOne(type => Client, client => client.invoices)
    client: Client; 

    @OneToMany(type => Product, product => product.invoice)
    products: Product[];
}
