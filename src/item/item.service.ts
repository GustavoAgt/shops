import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';

import { ItemDto } from './../common/dto/item.dto';

import { Item } from '../entities/item.entity';

@Injectable()
export class ItemService {
  constructor(@InjectRepository(Item) private itemRepo: Repository<Item>) {}
  createItem(itemDto: ItemDto): Promise<Item> {
    const item = new Item(itemDto.name, itemDto.price, itemDto.type);
    return this.itemRepo.save(item);
  }

  findItemById(id: number): Promise<Item> {
    return this.itemRepo.findOne(id);
  }
}
