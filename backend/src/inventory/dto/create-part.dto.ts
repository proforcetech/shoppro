import { IsString, IsNumber, IsUUID, IsOptional } from 'class-validator';

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
  quantity: number; // Renamed from qty

  @IsString()
  location: string;

  @IsUUID()
  vendorId: string;

  @IsString()
  @IsOptional()
  jobId?: string; // Added optional jobId

  @IsString()
  @IsOptional()
  estimateJobId?: string; // Added optional estimateJobId

}
