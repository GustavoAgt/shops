import { getRepositoryToken } from '@nestjs/typeorm';
import { Test, TestingModule } from '@nestjs/testing';

import { InvoiceService } from './invoice.service';
import { ItemService } from './../item/item.service';

import { InvoiceController } from './invoice.controller';

import ClientDto from '../common/dto/clientDto.dto';
import { ItemDto } from '../common/dto/item.dto';
import { CreateInvoiceDto } from './../common/dto/createInvoice.dto';

import { ProccessInvoiceData } from '../common/services/processInvoiceData.service';
import { ClientService } from '../client/client.service';
import { DiscountService } from '../discount/discount.service';

import { Client } from '../entities/client.entity';
import { Discount } from '../entities/discount.entity';
import { Item } from '../entities/item.entity';
import { Invoice } from './../entities/invoice.entity';

describe('invoice controller testing', () => {
  let controller: InvoiceController;

  const invoiceMock: CreateInvoiceDto = {
    date: new Date('2022-02-25 09:13:49.729'),
    total: 2088,
    client: { id: 1, type: 'AFFILIETE' } as ClientDto,
    items: [
      { id: 1, name: 'KOBE TOMAWAHK MEAT', price: 1500, type: 'edible' },
    ] as ItemDto[],
  };

  const itemsMock: Item[] = [
    {
      id: 1,
      name: 'PS5',
      price: 990,
      type: 'not-edible',
    },
  ];

  const discountMock: Discount = {
    id: 1,
    type: 'AFFILIETE',
    discountAmount: 0.1,
  };

  const clientMock = new Client(
    'BOB',
    'MARTINEZ',
    '9087605432',
    'bob.things@gmail.com',
    'AFFILIETE',
    new Date('2022-02-25 09:04:07.311'),
    1,
  );

  // SERVICE MOCK
  const discountServiceMock = {
    findDiscountByType: jest.fn(),
  };

  const invoiceServiceMock = {
    findAllInvoices: jest.fn().mockReturnValue([invoiceMock]),
  };

  const clientServiceMock = {
    findClientById: jest.fn().mockReturnValue(clientMock),
  };

  const processServiceMock = {
    fetchItemList: jest.fn().mockReturnValue(itemsMock),
    processDiscounts: jest.fn().mockReturnValue(discountMock),
  };

  // REPOSITORY MOCKS
  const mockClientRepository = {
    findOne: jest.fn().mockReturnValue(
      new Promise((resolve, reject) => {
        resolve(discountMock);
      }),
    ),
  };

  const mockInvoiceRepository = {
    find: jest.fn().mockReturnValue(new Promise((resolve, reject) => {
      resolve([invoiceMock]);
    })),
    save: jest.fn().mockReturnValue(new Promise((resolve, reject) => {
      resolve(invoiceMock);
    }))
  };

  const mockDiscountRepository = {
    findOne: jest.fn().mockReturnValue(
      new Promise((resolve, reject) => {
        resolve(clientMock);
      }),
    ),
  };

  const mockItemRepository = {
    findOne: jest.fn().mockReturnValue(
      new Promise<Item>((resolve, reject) => {
        resolve(new Item('MACBOOK PRO M1 PRO MAX', 3000, 'not-edible'));
      }),
    ),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [InvoiceController],
      providers: [
        InvoiceService,
        ClientService,
        DiscountService,
        ProccessInvoiceData,
        ItemService,
        {
          provide: getRepositoryToken(Client),
          useValue: mockClientRepository,
        },

        {
          provide: getRepositoryToken(Discount),
          useValue: mockDiscountRepository,
        },

        {
          provide: getRepositoryToken(Invoice),
          useValue: mockInvoiceRepository,
        },

        {
          provide: getRepositoryToken(Item),
          useValue: mockItemRepository,
        },
      ],
    })
      .overrideProvider([
        InvoiceService,
        ClientService,
        DiscountService,
        ProccessInvoiceData,
      ])
      .useValue([
        invoiceServiceMock,
        clientServiceMock,
        discountServiceMock,
        processServiceMock,
      ])
      .compile();

    controller = module.get<InvoiceController>(InvoiceController);
  });

  it('should create an invoice', async () => {
    expect(await controller.createInvoice(invoiceMock)).toEqual(
      'Invoice Created',
    );
  });

  it('should find all invoices', async () => {
    expect(await controller.findAll()).toEqual([invoiceMock]);
  });
});
