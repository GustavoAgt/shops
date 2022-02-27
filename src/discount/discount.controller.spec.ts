import { DiscountService } from './discount.service';
import { Test, TestingModule } from '@nestjs/testing';
import { DiscountController } from './discount.controller';

describe('discount controller testing', () => {
  let controller: DiscountController;

  const discountMock = {
    type: 'TWO_YEARS',
    discountAmount: 0.05,
  };

  const discountServiceMock = {
    createNewDiscount: jest.fn(() => {
      return discountMock;
    }),
    findAllDiscounts: jest.fn().mockResolvedValue([discountMock]),
    findDiscountByType: jest.fn().mockResolvedValue(discountMock),
};

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DiscountController],
      providers: [DiscountService],
    })
      .overrideProvider(DiscountService)
      .useValue(discountServiceMock)
      .compile();

    controller = module.get<DiscountController>(DiscountController);
  });

  it('should create a discount', async () => {
    expect(await controller.create(discountMock)).toEqual('Discount created');
    expect(discountServiceMock.createNewDiscount).toHaveBeenCalledWith(
      discountMock,
    );
  });

  it('should find all discounts', async () => {
    expect(await controller.findAll()).toEqual([discountMock]);
    expect(discountServiceMock.findAllDiscounts).toBeCalled();
  });

  it('should find by type', async () => {
    expect(await controller.findByType(discountMock.type)).toEqual(
      discountMock,
    );
    expect(discountServiceMock.findDiscountByType).toBeCalledWith(discountMock.type);
  });
});
