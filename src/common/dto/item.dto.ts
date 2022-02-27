export class ItemDto {
  id?: number;
  name: string;
  price: number;
  type: string;

  constructor(name: string, price: number, type: string) {}
}
