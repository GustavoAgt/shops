import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Item {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ type: 'double precision' })
  price: number;

  @Column()
  type: string;

  constructor(name?: string, price?: number, type?: string) {
    this.name = name;
    this.price = price;
    this.type = type;
  }
}
