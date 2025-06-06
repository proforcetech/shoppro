import { IsUUID } from 'class-validator';

export class CreateInvoiceDto {
  customerId: string;
  estimateId: string;
  dueDate: string;
}

