import { IsNumber, IsNotEmpty } from 'class-validator';
import { ItemDto } from './item.dto';
import ClientDto from '../dto/clientDto.dto';

export class CreateInvoiceDto {
    
    date: Date;

    @IsNotEmpty()
    @IsNumber()
    total: number;

    @IsNotEmpty()
    client: ClientDto;
    
    @IsNotEmpty()
    items: ItemDto[];
}