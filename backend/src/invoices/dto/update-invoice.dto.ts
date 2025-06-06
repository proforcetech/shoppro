import { IsEnum, IsOptional } from 'class-validator';

export enum InvoiceStatus {
  DRAFT = 'DRAFT',
  APPROVED = 'APPROVED',
  PAID = 'PAID',
  PARTIALLY_PAID = 'PARTIALLY_PAID',
  OVERDUE = 'OVERDUE',
}

export class UpdateInvoiceDto {
  @IsOptional()
  @IsEnum(InvoiceStatus)
  status?: InvoiceStatus;
}

