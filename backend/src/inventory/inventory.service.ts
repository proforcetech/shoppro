import { Injectable, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreatePartDto } from './dto/create-part.dto';
import { UpdatePartDto } from './dto/update-part.dto';
import { CreateVendorDto } from './dto/create-vendor.dto';
import { UpdateVendorDto } from './dto/update-vendor.dto';
import { Prisma } from '@prisma/client';

@Injectable()
export class InventoryService {
  constructor(private prisma: PrismaService) {}

  // === Parts Logic ===

  findAllParts() {
    return this.prisma.part.findMany({ include: { Vendor: true } });
  }

async createPart(createPartDto: {
  description: string;
  sku?: string;
  quantity: number;
  price: number;
  cost: number;
  vendorId?: string;
  estimateJobId?: string;
}) {
  const { vendorId, estimateJobId, ...rest } = createPartDto;

  const data: Prisma.PartCreateInput = {
    ...rest,
    Vendor: vendorId
      ? { connect: { id: vendorId } }
      : undefined,
    estimateJob: estimateJobId
      ? { connect: { id: estimateJobId } }
      : undefined,
  };

  return this.prisma.part.create({ data });
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