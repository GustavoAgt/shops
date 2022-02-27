import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';

import { Product } from '../entities/product.entity';
import { ProductDto } from '../common/dto/product.dto';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
  ) {}

  createProduct(product: ProductDto): Promise<Product> {
    const { type, name, price } = product;
    const prod = new Product(type, name, price);
    return this.productRepository.save(prod);
  }

  findProductById(id: number): Promise<Product> {
    return this.productRepository.findOne(id);
  }
}
