import { Product } from './products.entity';
import { Client } from 'src/entities/client.entity';
import {
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  OneToMany,
} from 'typeorm';

@Entity()
export class Invoice {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'generated_date' })
  generatedDate: Date;

  @Column({ type: 'double precision' })
  total: number;

  @ManyToOne((type) => Client, (client) => client.invoices, {cascade: true})
  client: Client;

  @OneToMany((type) => Product, (product) => product.invoice, {cascade: true})
  products: Product[];

  constructor(
    generatedDate?: Date,
    total?: number,
    client?: Client,
    products?: Product[],
  ) {
    this.generatedDate = generatedDate;
    this.total = total;
    this.client = client;
    this.products = products;
  }
}
