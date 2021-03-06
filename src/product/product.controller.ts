import { Body, Controller, Get, Post, Query } from "@nestjs/common";
import { ProductDto } from "../common/dto/product.dto";

import { ProductService } from './product.service';

@Controller("shopsrus/products")
export class ProductController { 
    
    constructor(private readonly productServ: ProductService) {}
    
    @Post() 
    async createProduct(@Body() productDto: ProductDto) {
         await this.productServ.createProduct(productDto);
         return "Product created";
    }

    @Get()
    async findProductById(@Query('id') id: number) {
        return await this.productServ.findProductById(id);
    }
}