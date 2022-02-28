import { ProccessInvoiceData } from './../common/services/processInvoiceData.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';

import { Invoice } from './../entities/invoice.entity';
import { Product } from '../entities/product.entity';
import { Client } from '../entities/client.entity';
import { Discount } from '../entities/discount.entity';
import { Item } from '../entities/item.entity';

import { ProductService } from './../product/product.service';
import { ClientService } from './../client/client.service';
import { InvoiceService } from './invoice.service';
import { DiscountService } from './../discount/discount.service';
import { ItemService } from './../item/item.service';

import { InvoiceController } from './invoice.controller';


@Module({
imports: [TypeOrmModule.forFeature([Invoice, Client, Product, Discount, Item])],
  controllers: [InvoiceController],
  providers: [InvoiceService, ClientService, ProductService, DiscountService, ItemService, ProccessInvoiceData]
})
export class InvoiceModule {}
