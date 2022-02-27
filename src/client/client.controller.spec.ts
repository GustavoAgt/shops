import { ClientService } from './client.service';
import { Test, TestingModule } from '@nestjs/testing';
import { ClientController } from './client.controller';

describe('client controller testing', () => {
  let controller: ClientController;
 
  const clientMock = {
    id: 1,
    name: 'John',
    lastName: 'Doe',
    type: 'AFFILIETE',
    email: 'test@gmail.com',
    phoneNumber: '777-777-7777',
  };

  const clientServicekeMock = {
    createClient: jest.fn(),

    findClientById: jest.fn().mockReturnValue(clientMock),

    findAllClients: jest.fn().mockReturnValue([
      clientMock
    ]),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ClientController],
      providers: [ClientService],
    })
      .overrideProvider(ClientService)
      .useValue(clientServicekeMock)
      .compile();

    controller = module.get<ClientController>(ClientController);
  });


  it('should create a client', async () => {
    expect(
      await controller.create(clientMock),
    ).toEqual('Client Created');

    expect(clientServicekeMock.createClient).toHaveBeenCalledWith(clientMock);
  });

  it('should find all clients', async () => {
    expect(await controller.findAll()).toEqual([
      clientMock
    ]);
  });

  it('should find a client by id', async () => {
    expect(await controller.findById(1)).toEqual({
      name: expect.any(String),
      lastName: expect.any(String),
      phoneNumber: expect.any(String),
      email: expect.any(String),
      type: expect.any(String),
      id: expect.any(Number),
    });

    expect(clientServicekeMock.findClientById).toHaveBeenCalledWith(1);
  });

  
});
