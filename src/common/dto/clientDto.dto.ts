import { IsNotEmpty, IsEmail, IsNumber, IsString } from 'class-validator';
export default class ClientDto {
  @IsNumber()
  id?: number;

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  lastName: string;

  @IsString()
  @IsNotEmpty()
  phoneNumber: string;

  @IsString()
  @IsEmail()
  email: string;

  @IsString()
  @IsEmail()
  type: string;
}
