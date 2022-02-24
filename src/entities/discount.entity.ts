import { Column, PrimaryGeneratedColumn } from 'typeorm';
export class Discount {
    
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    type: string;
    
    @Column()
    name: string;
    
    @Column({name: "discount_amount"})
    dicountAmount: number;
}

