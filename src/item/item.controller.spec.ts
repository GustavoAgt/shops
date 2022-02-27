import { Item } from './../entities/item.entity';
import { ItemService } from './item.service';
import { ItemController } from './item.controller';
import { Test, TestingModule } from '@nestjs/testing';

describe('item controller testing', () => {
  let controller: ItemController;

  const itemMock: Item = {
    id: 0,
    name: 'MACBOOK PRO M1 PRO MAX',
    price: 3000,
    type: 'not-edible',
  };

  const itemServiceMock = {
    createItem: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ItemController],
      providers: [ItemService],
    })
      .overrideProvider(ItemService)
      .useValue(itemServiceMock)
      .compile();

    controller = module.get<ItemController>(ItemController);
  });

  it('should create an item', async () => {
    expect(await controller.createItem(itemMock)).toEqual("Item Created");
    expect(itemServiceMock.createItem).toHaveBeenCalledWith(itemMock);
  });
});
