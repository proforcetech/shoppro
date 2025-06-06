import { Controller, Post, Body, Param, Patch, UseGuards } from '@nestjs/common';
import { MobileService } from './mobile.service';
import { CreateMobileJobDto } from './dto/create-mobile-job.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/role.decorator';

@Controller('mobile')
@UseGuards(JwtAuthGuard, RolesGuard)
export class MobileController {
  constructor(private readonly mobileService: MobileService) {}

  @Post('configure')
  @Roles('FRONT_DESK')
  configureMobileJob(@Body() dto: CreateMobileJobDto) {
    return this.mobileService.configureMobileJob(dto);
  }

  @Patch('apply-invoice/:invoiceId')
  @Roles('MANAGER')
  applyFees(@Param('invoiceId') invoiceId: string) {
    return this.mobileService.applyMobileFeesToInvoice(invoiceId);
  }
}

