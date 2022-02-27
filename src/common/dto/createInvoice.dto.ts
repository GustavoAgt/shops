import { ItemDto } from './item.dto';
import ClientDto from 'src/common/dto/clientDto.dto';

export interface CreateInvoiceDto {
    date: Date;
    total: number;
    client: ClientDto;
    items: ItemDto[];
}