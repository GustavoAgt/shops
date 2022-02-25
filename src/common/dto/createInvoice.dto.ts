import { ProductDto } from './product.dto';
import ClientDto from 'src/common/dto/clientDto.dto';

export interface CreateInvoiceDto {
    date: Date;
    total: number;
    client: ClientDto;
    products: ProductDto[];
}