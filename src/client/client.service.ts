import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Client } from '../entities/client.entity';
import ClientDto from '../common/dto/clientDto.dto';

@Injectable()
export class ClientService {
  constructor(
    @InjectRepository(Client)
    private clientRepository: Repository<Client>,
  ) {}
    
  createClient(clientDto: ClientDto): Promise<Client> {
    const {name, lastName, phoneNumber, email, type} = clientDto;
    const client = new Client(name, lastName, phoneNumber, email, type, new Date());
    return this.clientRepository.save(client);
  }

  findAllClients(): Promise<Client[]> {
    return this.clientRepository.find();
  }

  findClientById(id: number): Promise<Client> {
    return this.clientRepository.findOne(id);
  }

  findClientByName(name: string): Promise<Client> {
    return this.clientRepository.findOne({name});
  }
}
