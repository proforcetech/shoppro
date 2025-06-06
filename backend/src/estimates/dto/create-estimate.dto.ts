import {
  IsUUID,
  IsArray,
  IsEnum,
  ValidateNested,
  IsOptional
} from 'class-validator';
import { Type } from 'class-transformer';

export enum EstimateStatus {
  DRAFT = 'DRAFT',
  APPROVED = 'APPROVED',
  REJECTED = 'REJECTED',
}

class PartItemDto {
  @IsUUID()
  partId: string;

  @IsOptional()
  qty?: number;

  @IsOptional()
  warrantyMonths?: number;
}

class JobDto {
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => PartItemDto)
  parts: PartItemDto[];

  description: string;

  laborHours: number;

  rate: number;
}

export class CreateEstimateDto {
  @IsUUID()
  vehicleId: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => JobDto)
  jobs: JobDto[];

  @IsOptional()
  @IsEnum(EstimateStatus)
  status?: EstimateStatus;
}

