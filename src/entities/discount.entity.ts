import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Discount {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  type: string;
  
  @Column({ type: "double precision", name: 'discount_amount' })
  discountAmount: number;

  constructor(type?: string, discountAmount?: number) {
    this.type = type;
    this.discountAmount = discountAmount;
  }
}
