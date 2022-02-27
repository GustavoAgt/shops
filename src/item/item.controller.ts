import { ItemService } from './item.service';
import { ItemDto } from './../common/dto/item.dto';
import { Body, Controller, Post } from '@nestjs/common';

@Controller('shopsrus/items')
export class ItemController {
  constructor(private readonly itemServ: ItemService) {}

  @Post()
  async createItem(@Body() itemDto: ItemDto) {
     await this.itemServ.createItem(itemDto);

     return "Item Created";
  }
}
