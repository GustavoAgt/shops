import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { Invoice } from '../entities/invoice.entity';

@Injectable()
export class InvoiceService {
  constructor(
    @InjectRepository(Invoice) private invoiceRepo: Repository<Invoice>,
  ) {}
  createInvoice(invoice: Invoice): Promise<Invoice> {
    return this.invoiceRepo.save(invoice);
  }

  findAllInvoices(): Promise<Invoice[]> {
    return this.invoiceRepo.find();
  }
}
