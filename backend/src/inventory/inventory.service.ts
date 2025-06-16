import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreatePartDto } from './dto/create-part.dto';
import { UpdatePartDto } from './dto/update-part.dto';
import { CreateVendorDto } from './dto/create-vendor.dto';
import { UpdateVendorDto } from './dto/update-vendor.dto';

@Injectable()
export class InventoryService {
  constructor(private prisma: PrismaService) {}

  // === Parts Logic ===

  findAllParts() {
    // Corrected: The relation is 'Vendor' (uppercase V)
    return this.prisma.part.findMany({ include: { Vendor: true } });
  }

  createPart(createPartDto: CreatePartDto) {
    // Corrected: The DTO properties now match the schema
    return this.prisma.part.create({ data: createPartDto });
  }

  updatePart(id: string, updatePartDto: UpdatePartDto) {
    return this.prisma.part.update({
      where: { id },
      data: updatePartDto,
    });
  }

  deletePart(id: string) {
    return this.prisma.part.delete({ where: { id } });
  }

  findLowStock(minThreshold: number) {
    // Corrected: The field is 'quantity'
    return this.prisma.part.findMany({
      where: { quantity: { lt: minThreshold } },
      include: { Vendor: true },
    });
  }
  
  // Aliased reorderCheck to findLowStock for clarity
  reorderCheck() {
    const REORDER_THRESHOLD = 10; // Or get from settings
    return this.findLowStock(REORDER_THRESHOLD);
  }

  // === Vendor Logic ===

  findAllVendors() {
    return this.prisma.vendor.findMany();
  }
  // aliased getVendors to findAllVendors
  getVendors() {
    return this.findAllVendors();
  }

  createVendor(createVendorDto: CreateVendorDto) {
    return this.prisma.vendor.create({ data: createVendorDto });
  }

  updateVendor(id: string, updateVendorDto: UpdateVendorDto) {
    return this.prisma.vendor.update({
      where: { id },
      data: updateVendorDto,
    });
  }

  deleteVendor(id: string) {
    return this.prisma.vendor.delete({ where: { id } });
  }
}