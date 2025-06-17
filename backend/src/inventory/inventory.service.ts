import { Injectable, BadRequestException } from '@nestjs/common';
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
    return this.prisma.part.findMany({ include: { Vendor: true } });
  }

  createPart(createPartDto: CreatePartDto) {
    // The database schema requires a `jobId` for every part.
    // This is likely not the desired behavior for creating general inventory parts.
    // The best long-term solution is to make `jobId` optional in `schema.prisma`.
    
    // This code provides a temporary, type-safe workaround.
    const { jobId, ...partData } = createPartDto;

    if (!jobId) {
      // Throw an error because the database constraint cannot be met.
      throw new BadRequestException('A required "jobId" was not provided to create the part due to a database constraint.');
    }
    
    // We now know jobId is a string, so we can safely create the record.
    return this.prisma.part.create({ 
      data: {
        ...partData,
        jobId: jobId,
      } 
    });
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
    return this.prisma.part.findMany({
      where: { quantity: { lt: minThreshold } },
      include: { Vendor: true },
    });
  }
  
  reorderCheck() {
    const REORDER_THRESHOLD = 10;
    return this.findLowStock(REORDER_THRESHOLD);
  }

  // === Vendor Logic ===

  findAllVendors() {
    return this.prisma.vendor.findMany();
  }
  
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