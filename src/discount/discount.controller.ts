import { DiscountDto } from './../common/dto/discount.dto';
import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { DiscountService } from './discount.service';

@Controller('shopsrus/discounts')
export class DiscountController {
  constructor(private readonly discountSev: DiscountService) {}

  @Post()
  async create(@Body() discountDto: DiscountDto) {
      await this.discountSev.createNewDiscount(discountDto);
      return "Discount created" 
  }

  @Get('all')
  async findAll() {
    return await this.discountSev.findAllDiscounts();
  } 

  @Get()
  async findByType(@Query('type') type: string) {
    return await this.discountSev.findDiscountByType(type);
  }
}
