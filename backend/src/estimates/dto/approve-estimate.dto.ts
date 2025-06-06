import { IsBoolean } from 'class-validator';

export class ApproveEstimateDto {
  @IsBoolean()
  approve: boolean;
}

