import { IsString, IsOptional } from 'class-validator';

export class LookupPartsDto {
  @IsString()
  keyword: string;

  @IsOptional()
  vin?: string;

  @IsOptional()
  brand?: string;
}

