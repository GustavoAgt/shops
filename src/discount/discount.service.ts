import { DiscountDto } from './../common/dto/discount.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Discount } from '../entities/discount.entity';

@Injectable()
export class DiscountService {
  constructor(
    @InjectRepository(Discount)
    private discountRepository: Repository<Discount>,
  ) {}

  createNewDiscount(discount: DiscountDto): Promise<Discount> {
    const { type, discountAmount } = discount;
    const disc = new Discount(type, discountAmount);
    return this.discountRepository.save(disc);
  }

  findAllDiscounts(): Promise<Discount[]> {
    return this.discountRepository.find();
  }

  findDiscountByType(type: string): Promise<Discount> {
    return this.discountRepository.findOne({type})
  }
}
