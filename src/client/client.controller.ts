import { ClientService } from './client.service';
import {
  Body,
  Controller,
  Get,
  ParseIntPipe,
  Post,
  Query,
} from '@nestjs/common';
import ClientDto from 'src/common/dto/clientDto.dto';

@Controller('shopsrus/clients')
export class ClientController {
  constructor(private readonly clientService: ClientService) {}

  @Post()
  async create(@Body() clientDto: ClientDto) {
    this.clientService.createClient(clientDto);
  }

  @Get()
  async findAll() {
    return await this.clientService.findAllClients();
  }

  @Get()
  async findById(@Query('id') id: number) {
    console.log(id);
    return await this.clientService.findClientById(id);
  }

  @Get()
  async findByName(@Query('name') name: string) {
    return await this.clientService.findClientByName(name);
  }
}
