import { Controller, Get, UseGuards } from '@nestjs/common';
import { AnalyticsService } from './analytics.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/role.decorator';

@Controller('analytics')
@UseGuards(JwtAuthGuard, RolesGuard)
export class AnalyticsController {
  constructor(private readonly analyticsService: AnalyticsService) {}

  @Get('shop')
  @Roles('MANAGER')
  shopMetrics() {
    return this.analyticsService.shopMetrics();
  }

  @Get('tech')
  @Roles('MANAGER')
  techPerformance() {
    return this.analyticsService.techPerformance();
  }

  @Get('inventory')
  @Roles('MANAGER')
  inventoryAnalytics() {
    return this.analyticsService.inventoryAnalytics();
  }
}

