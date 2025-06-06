import { IsUUID, IsEnum, IsNumber, IsString } from 'class-validator';

export enum EntryType {
  DEBIT = 'DEBIT',
  CREDIT = 'CREDIT',
}

export class CreateEntryDto {
  @IsUUID()
  accountId: string;

  @IsNumber()
  amount: number;

  @IsEnum(EntryType)
  type: EntryType;

  @IsString()
  description: string;
}

