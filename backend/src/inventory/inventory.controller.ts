import {
  Controller, Get, Post, Body, Put, Delete, Param, UseGuards,
} from '@nestjs/common';
import { InventoryService } from './inventory.service';
import { CreatePartDto } from './dto/create-part.dto';
import { UpdatePartDto } from './dto/update-part.dto';
import { CreateVendorDto } from './dto/create-vendor.dto';
import { UpdateVendorDto } from './dto/update-vendor.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/role.decorator';

@Controller('inventory')
@UseGuards(JwtAuthGuard, RolesGuard)
export class InventoryController {
  constructor(private readonly inventoryService: InventoryService) {}

  // Parts
  @Post('parts')
  @Roles('MANAGER')
  createPart(@Body() dto: CreatePartDto) {
    return this.inventoryService.createPart(dto);
  }

  @Get('parts')
  findAllParts() {
    return this.inventoryService.findAllParts();
  }

  @Put('parts/:id')
  @Roles('MANAGER')
  updatePart(@Param('id') id: string, @Body() dto: UpdatePartDto) {
    return this.inventoryService.updatePart(id, dto);
  }

  @Delete('parts/:id')
  @Roles('ADMIN')
  deletePart(@Param('id') id: string) {
    return this.inventoryService.deletePart(id);
  }

  @Get('parts/reorder-check')
  reorderCheck() {
    return this.inventoryService.reorderCheck();
  }

  // Vendors
  @Post('vendors')
  @Roles('MANAGER')
  createVendor(@Body() dto: CreateVendorDto) {
    return this.inventoryService.createVendor(dto);
  }

  @Get('vendors')
  getVendors() {
    return this.inventoryService.getVendors();
  }

  @Put('vendors/:id')
  updateVendor(@Param('id') id: string, @Body() dto: UpdateVendorDto) {
    return this.inventoryService.updateVendor(id, dto);
  }

  @Delete('vendors/:id')
  deleteVendor(@Param('id') id: string) {
    return this.inventoryService.deleteVendor(id);
  }
}

