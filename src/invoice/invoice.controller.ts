import { Controller, Get, Post, Body } from '@nestjs/common';

import { ProccessInvoiceData } from './../common/services/processInvoiceData.service';

import { CreateInvoiceDto } from '../common/dto/createInvoice.dto';

import { InvoiceService } from './invoice.service';
import { ClientService } from '../client/client.service';
import { Invoice } from '../entities/invoice.entity';
import { Item } from '../entities/item.entity';


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
    const items: Item[] = this.proccessInvoice.fetchItemList(createInvoiceDto.items);
    const percentageOfDiscount = await this.proccessInvoice.processDiscounts(client);
    const total = await this.proccessInvoice.calculateDiscount(percentageOfDiscount, items);
    const products = this.proccessInvoice.insertItemIntoProducts(items);
    const invoice = new Invoice(new Date(), total, client, products);
    
    await this.invoiceServ.createInvoice(invoice);

    return "Invoice Created";
  }

  @Get()
  async findAll() {
    return await this.invoiceServ.findAllInvoices();
  }
}