import { Discount } from './entities/discount.entity';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AppController } from './app.controller';
import { AppService } from './app.service';

import { Client } from './entities/client.entity';
import { Invoice } from './entities/invoice.entity';
import { Product } from './entities/products.entity';


import { ClientModule } from './client/client.module';
import { InvoiceModule } from './invoice/invoice.module';
import { DiscountModule } from './discount/discount.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: '127.0.0.1',
      port: 5432,
      username: 'pgadmin',
      password: 'no-secured',
      database: 'postgres',
      entities: [Client, Invoice, Product, Discount],
      synchronize: true,
    }),
    ClientModule,
    InvoiceModule,
    DiscountModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
