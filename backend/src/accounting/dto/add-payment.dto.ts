import { IsUUID, IsNumber, IsEnum } from 'class-validator';

export enum PaymentMethod {
  CASH = 'CASH',
  CREDIT_CARD = 'CREDIT_CARD',
  STRIPE = 'STRIPE',
  PAYPAL = 'PAYPAL',
  CHECK = 'CHECK'
}

export class AddPaymentDto {
  @IsUUID()
  invoiceId: string;

  @IsNumber()
  amount: number;

  @IsEnum(PaymentMethod)
  method: PaymentMethod;
}

