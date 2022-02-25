import { ProccessInvoiceData } from './../common/services/processInvoiceData.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';

import { Invoice } from './../entities/invoice.entity';
import { Product } from 'src/entities/products.entity';
import { Client } from '../entities/client.entity';
import { Discount } from 'src/entities/discount.entity';

import { ProductService } from './../product/product.service';
import { ClientService } from './../client/client.service';
import { InvoiceService } from './invoice.service';
import { DiscountService } from './../discount/discount.service';
import { InvoiceController } from './invoice.controller';

@Module({
imports: [TypeOrmModule.forFeature([Invoice, Client, Product, Discount])],
  controllers: [InvoiceController],
  providers: [InvoiceService, ClientService, ProductService, DiscountService, ProccessInvoiceData]
})
export class InvoiceModule {}
