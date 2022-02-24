import { Client } from 'src/entities/client.entity';
import { ClientService } from './client.service';
import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Query,
  Res,
} from '@nestjs/common';
import ClientDto from 'src/common/dto/clientDto.dto';

@Controller('shopsrus/clients')
export class ClientController {
  constructor(private readonly clientService: ClientService) {}

  @Post()
  async create(@Body() clientDto: ClientDto) {
    this.clientService.createClient(clientDto);
  }

  @Get('all')
  async findAll() {
    return await this.clientService.findAllClients();
  }

  @Get('findById')
  async findById(@Query('id') id: number) {
    console.log(id);
    return await this.clientService.findClientById(id);
  }

  @Get('findByName')
  async findByName(
    @Query('name') name: string,
  ) {
    return await this.clientService.findClientByName(name);
  }
}
