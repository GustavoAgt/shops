import { Invoice } from './invoice.entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from "typeorm";

@Entity()
export class Client { 
    
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column({name:"last_name"})
    lastName: string;

    @Column({name:"phone_nunber"})
    phoneNumber: string;
    
    @Column()
    email: string;

    @Column({name:"start_date"})
    startDate: Date;

    @OneToMany(type => Invoice, invoice => invoice.client)
    invoices: Invoice[];

    constructor(name?: string, lastName?: string, phoneNumber?: string, email?: string, startDate?: Date) {
        this.name = name;
        this.lastName = lastName;
        this.phoneNumber = phoneNumber;
        this.email = email;
        this.startDate = startDate;
    }
}