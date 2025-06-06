import {
  Controller,
  Post,
  Get,
  Put,
  Delete,
  Param,
  Body,
  Patch,
  UseGuards,
  NotFoundException,
} from '@nestjs/common';
import { EstimatesService } from './estimates.service';
import { CreateEstimateDto } from './dto/create-estimate.dto';
import { UpdateEstimateDto } from './dto/update-estimate.dto';
import { ApproveEstimateDto } from './dto/approve-estimate.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/role.decorator';

@Controller('estimates')
@UseGuards(JwtAuthGuard, RolesGuard)
export class EstimatesController {
  constructor(private readonly estimatesService: EstimatesService) {}

  @Post()
  @Roles('MANAGER')
  async create(@Body() dto: CreateEstimateDto) {
    return await this.estimatesService.create(dto);
  }

  @Get()
  async findAll() {
    return await this.estimatesService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const estimate = await this.estimatesService.findOne(id);
    if (!estimate) throw new NotFoundException(`Estimate ${id} not found`);
    return estimate;
  }

  @Put(':id')
  @Roles('MANAGER')
  async update(@Param('id') id: string, @Body() dto: UpdateEstimateDto) {
    return await this.estimatesService.update(id, dto);
  }

  @Patch(':id/approve')
  @Roles('FRONT_DESK')
  async approve(@Param('id') id: string, @Body() dto: ApproveEstimateDto) {
    return await this.estimatesService.approve(id, dto.approve);
  }

  @Delete(':id')
  @Roles('MANAGER')
  async remove(@Param('id') id: string) {
    return await this.estimatesService.remove(id);
  }
}

