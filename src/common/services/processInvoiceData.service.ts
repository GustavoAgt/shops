import { Injectable } from '@nestjs/common';

import { ItemService } from './../../item/item.service';
import { DiscountService } from './../../discount/discount.service';

import { Product } from './../../entities/product.entity';
import { Client } from './../../entities/client.entity';
import { Item } from './../../entities/item.entity';
import { Discount } from './../../entities/discount.entity';

import { ItemDto } from '../dto/item.dto';

import { DiscountsType } from '../enums/DiscountsTypes.enum';

@Injectable()
export class ProccessInvoiceData {
  constructor(
    private readonly itemServ: ItemService,
    private readonly discountServ: DiscountService,
  ) {}

  fetchItemList(itemDto: ItemDto[]): Item[] {
    const items: Item[] = [];

    itemDto.forEach((item) => {
      this.itemServ.findItemById(item?.id).then((data) => {
        if (data) {
          items.push(data);
        }
      });
    });

    return items;
  }

  async processDiscounts(client: Client) {
    const discount: Discount = await this.discountServ.findDiscountByType(client.type);

    try {
      if (
        discount === undefined &&
        this.calculateTimeBeingClient(client.startDate) >= 2
      ) {
        return await this.discountServ.findDiscountByType(DiscountsType.TWO_YEARS);
      }
    } catch (error) {
      // HANDLE ERROR
    }

    return discount;
  }

  async calculateDiscount(discount: Discount, items: Item[]) {
    const hundredDiscount = await this.discountServ.findDiscountByType(
      DiscountsType.ONE_HUNDRED_DOLLARS,
    );

    const t = items.map((item) => {
      let total = 0;

      if (item.type === 'not-edible') {
        if (discount ?? discount.discountAmount) {
          total += item.price - item.price * discount.discountAmount;
        }
      } else {
        total += item.price;
      }

      return total;
    });

    const result = t.reduce((prev, curr) => prev + curr);
    const discoutnOfHundred =
      Math.floor(result / 100) * 100 * hundredDiscount.discountAmount;
    return result - discoutnOfHundred;
  }

  insertItemIntoProducts(items: Item[]): Product[]{
    const products: Product[] = [];
    
    items.forEach((item) => {
      products.push(new Product(item.type, item.name, item.price))
    });

    return products;
  }

  private calculateTimeBeingClient(date: Date) {
    return new Date(Date.now()).getFullYear() - date.getFullYear();
  }
}
