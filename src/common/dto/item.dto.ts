import { IsNumber, IsNotEmpty, IsString } from 'class-validator';

export class ItemDto {
  
  @IsNumber()
  id?: number;

  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNumber()
  @IsNotEmpty()
  price: number;

  @IsNotEmpty()
  @IsString()
  type: string;

  constructor(name: string, price: number, type: string) {}
}
