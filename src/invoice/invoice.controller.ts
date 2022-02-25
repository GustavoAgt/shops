import { Controller, Get, Post, Body } from '@nestjs/common';

import { ProccessInvoiceData } from './../common/services/processInvoiceData.service';

import { CreateInvoiceDto } from '../common/dto/createInvoice.dto';

import { InvoiceService } from './invoice.service';
import { ClientService } from 'src/client/client.service';
import { Product } from 'src/entities/products.entity';
import { Invoice } from 'src/entities/invoice.entity';


@Controller('shopsrus/invoices')
export class InvoiceController {
  constructor(
    private readonly invoiceServ: InvoiceService,
    private readonly clientServ: ClientService,
    private readonly proccessInvoice: ProccessInvoiceData,
  ) {}

  @Post()
  async createInvoice(@Body() createInvoiceDto: CreateInvoiceDto) {
    const client = await this.clientServ.findClientById(createInvoiceDto?.client?.id);
    const products: Product[] = this.proccessInvoice.fetchProductList(createInvoiceDto.products);
    const percentageOfDiscount = await this.proccessInvoice.proccessDiscounts(client);
    const total = await this.proccessInvoice.calculateDiscount(percentageOfDiscount, products);
    const invoice = new Invoice(new Date(), total, client, products);
    await this.invoiceServ.createInvoice(invoice);
  }

  @Get()
  async findAll() {
    console.log(await this.invoiceServ.findAllInvoices())
  }
}
