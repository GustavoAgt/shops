import { ProductService } from './product.service';
import { ProductController } from './product.controller';
import { Test, TestingModule } from '@nestjs/testing';

describe('product controller testing', () => {
  let controller: ProductController;

  const productMock = {
    id: 1,
    type: 'not-edible',
    name: 'PS5',
    price: 990,
  };

  const productServiceMock = {
    createProduct: jest.fn(),
    findProductById: jest.fn().mockReturnValue(productMock),  
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProductController],
      providers: [ProductService],
    })
      .overrideProvider(ProductService)
      .useValue(productServiceMock)
      .compile();

    controller = module.get<ProductController>(ProductController);
  });

  it('should create a product', async () => {
    expect(await controller.createProduct(productMock)).toEqual('Product created');
   // expect(controller.createProduct).toHaveBeenCalled();
  });

  it('should find a product by id', async () => {
    expect(await controller.findProductById(productMock.id)).toEqual(productMock);
  });
});
