import { Body, Controller, Get, Post, Query } from "@nestjs/common";
import { ProductDto } from "src/common/dto/product.dto";

import { ProductService } from './product.service';

@Controller("shopsrus/products")
export class ProductController { 
    
    constructor(private readonly productServ: ProductService) {}
    
    @Post() 
    async createProduct(@Body() productDto: ProductDto) {
        return await this.productServ.createProduct(productDto);
    }

    @Get()
    async findProductById(@Query('id') id: number) {
        return await this.productServ.findProductById(id);
    }
}