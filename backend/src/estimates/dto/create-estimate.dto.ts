import { Type } from 'class-transformer';
import { IsString, IsNumber, IsArray, ValidateNested, IsOptional, IsBoolean } from 'class-validator';

class PartDto {
  @IsString()
  part: string;

  @IsString()
  @IsOptional()
  sku?: string;

  @IsNumber()
  qty: number;

  @IsNumber()
  pricePerUnit: number;
}

class JobDto {
  @IsString()
  laborDescription: string;

  @IsNumber()
  laborRate: number;

  @IsNumber()
  laborTime: number;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => PartDto)
  parts: PartDto[];
}

export class CreateEstimateDto {
  @IsString()
  customerId: string;

  @IsString()
  vehicleId: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => JobDto)
  jobs: JobDto[];

  @IsNumber()
  @IsOptional()
  shopFee?: number;

  @IsNumber()
  @IsOptional()
  hazardousDisposalFee?: number;

  @IsBoolean()
  @IsOptional()
  isMobile?: boolean;

  @IsString()
  @IsOptional()
  serviceLocation?: string;

  @IsNumber()
  @IsOptional()
  calloutFee?: number;

  @IsNumber()
  @IsOptional()
  mileage?: number;

  @IsNumber()
  @IsOptional()
  mileageRate?: number;

  @IsBoolean()
  isTaxable: boolean;
  
  @IsNumber()
  taxRate: number;
}

