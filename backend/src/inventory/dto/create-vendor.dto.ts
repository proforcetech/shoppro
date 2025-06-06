import { IsString } from 'class-validator';

export class CreateVendorDto {
  @IsString()
  name: string;

  @IsString()
  contact: string;

  @IsString()
  leadTime: string;
}

