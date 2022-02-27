import { ClientService } from './client.service';
import {
  Body,
  Controller,
  ForbiddenException,
  Get,
  ParseIntPipe,
  Post,
  Query,
} from '@nestjs/common';
import ClientDto from '../common/dto/clientDto.dto';

@Controller('shopsrus/clients')
export class ClientController {
  constructor(private readonly clientService: ClientService) {}

  @Post()
  async create(@Body() clientDto: ClientDto) {
    this.clientService.createClient(clientDto);
    return 'Client Created';
  }

  @Get("all")
  async findAll() {
    return await this.clientService.findAllClients();
  }

  @Get("id")
  async findById(@Query('id') id: number) {
    return await this.clientService.findClientById(id);
  }

  @Get("name")
  async findByName(@Query('name') name: string) {
    return await this.clientService.findClientByName(name);
  }
}
