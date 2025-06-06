import { IsUUID, IsDateString, IsString, IsOptional } from 'class-validator';

export class CreateAppointmentDto {
  @IsUUID()
  vehicleId: string;

  @IsUUID()
  techId: string;

  @IsDateString()
  startTime: string;

  @IsDateString()
  endTime: string;

  @IsString()
  type: string;

  @IsString()
  @IsOptional()
  notes?: string;
}

