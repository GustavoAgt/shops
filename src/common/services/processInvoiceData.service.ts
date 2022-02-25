import { Injectable } from '@nestjs/common';

import { ProductDto } from 'src/common/dto/product.dto';

import { ProductService } from './../../product/product.service';
import { DiscountService } from './../../discount/discount.service';

import { Product } from 'src/entities/products.entity';
import { Client } from 'src/entities/client.entity';
import { Discount } from 'src/entities/discount.entity';
import { ClientType } from '../enums/ClientType.enum';
import { DiscountsType } from '../enums/DiscountsTypes.enum';

@Injectable()
export class ProccessInvoiceData {
  constructor(
    private readonly productServ: ProductService,
    private readonly discountServ: DiscountService,
  ) {}

  fetchProductList(productsDto: ProductDto[]): Product[] {
    const products: Product[] = [];

    productsDto.forEach((product) => {
      this.productServ.findProductById(product?.id).then((data) => {
        if (data) {
          products.push(data);
        }
      });
    });

    return products;
  }

  async proccessDiscounts(client: Client) {
    const discount: Discount = await this.discountServ.findByType(client.type);

    try {
      if (
        discount === undefined &&
        this.calculateTimeBeingClient(client.startDate) >= 2
      ) {
        return await this.discountServ.findByType(DiscountsType.TWO_YEARS);
      }
    } catch (error) {
      // HANDLE ERROR
    }

    return discount;
  }

 async calculateDiscount(discount: Discount, products: Product[]) {
     const hundredDiscount = await this.discountServ.findByType(DiscountsType.ONE_HUNDRED_DOLLARS);
    const t = products.map((product) => {
      let total = 0;

      if (product.type === 'not-edible') {
        if (discount ?? discount.discountAmount) {
          total += product.price - (product.price * discount.discountAmount);
          console.log("not-edible'", total)
        }
      } else {
        total += product.price;
        console.log("ediable", total)
      }

      return total;
    });

    const result = t.reduce((prev, curr) => prev + curr);
    const discoutnOfHundred = (Math.floor((result /100)) * 100) * hundredDiscount.discountAmount;
    return (result - discoutnOfHundred);
  }

  private calculateTimeBeingClient(date: Date) {
    return new Date(Date.now()).getFullYear() - date.getFullYear();
  }
}
