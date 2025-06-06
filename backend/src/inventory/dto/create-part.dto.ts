import { IsString, IsNumber, IsUUID } from 'class-validator';

export class CreatePartDto {
  @IsString()
  sku: string;

  @IsString()
  description: string;

  @IsNumber()
  cost: number;

  @IsNumber()
  price: number;

  @IsNumber()
  qty: number;

  @IsString()
  location: string;

  @IsUUID()
  vendorId: string;
}

