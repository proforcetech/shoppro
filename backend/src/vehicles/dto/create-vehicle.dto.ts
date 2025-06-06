import { IsString, IsUUID, IsInt } from 'class-validator';

export class CreateVehicleDto {
  @IsUUID()
  customerId: string;

  @IsString()
  vin: string;

  @IsString()
  make: string;

  @IsString()
  model: string;

  @IsInt()
  year: number;

  @IsInt()
  mileage: number;
}

