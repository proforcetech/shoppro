import {
  Controller, Post, Get, Put, Delete, Param, Body, Query, UseGuards,
} from '@nestjs/common';
import { SchedulingService } from './scheduling.service';
import { CreateAppointmentDto } from './dto/create-appointment.dto';
import { UpdateAppointmentDto } from './dto/update-appointment.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/role.decorator';

@Controller('appointments')
@UseGuards(JwtAuthGuard, RolesGuard)
export class SchedulingController {
  constructor(private readonly schedulingService: SchedulingService) {}

  @Post()
  @Roles('FRONT_DESK')
  create(@Body() dto: CreateAppointmentDto) {
    return this.schedulingService.create(dto);
  }

  @Get()
  findAll() {
    return this.schedulingService.findAll();
  }

  @Get('tech/:techId')
  getTechSchedule(@Param('techId') techId: string) {
    return this.schedulingService.getTechSchedule(techId);
  }

  @Get('day')
  getDaily(@Query('date') date: string) {
    return this.schedulingService.getDailySchedule(date);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.schedulingService.findOne(id);
  }

  @Put(':id')
  @Roles('FRONT_DESK')
  update(@Param('id') id: string, @Body() dto: UpdateAppointmentDto) {
    return this.schedulingService.update(id, dto);
  }

  @Delete(':id')
  @Roles('FRONT_DESK')
  remove(@Param('id') id: string) {
    return this.schedulingService.remove(id);
  }
}

