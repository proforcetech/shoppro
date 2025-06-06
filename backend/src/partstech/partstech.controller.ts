import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { PartsTechService } from './partstech.service';
import { LookupPartsDto } from './dto/lookup-parts.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/role.decorator';

@Controller('partstech')
@UseGuards(JwtAuthGuard, RolesGuard)
export class PartsTechController {
  constructor(private readonly partsTechService: PartsTechService) {}

  @Get('lookup')
  @Roles('MANAGER')
  lookup(@Query() query: LookupPartsDto) {
    return this.partsTechService.lookup(query);
  }

  @Get('catalog')
  @Roles('MANAGER')
  getCatalog(@Query('vin') vin: string) {
    return this.partsTechService.getCatalog(vin);
  }
}

