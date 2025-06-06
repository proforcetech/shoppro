import { IsUUID } from 'class-validator';

export class CreateInvoiceDto {
  @IsUUID()
  estimateId: string;
}

