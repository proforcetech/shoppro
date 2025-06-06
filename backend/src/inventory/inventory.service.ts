import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreatePartDto } from './dto/create-part.dto';
import { UpdatePartDto } from './dto/update-part.dto';
import { CreateVendorDto } from './dto/create-vendor.dto';
import { UpdateVendorDto } from './dto/update-vendor.dto';

@Injectable()
export class InventoryService {
  constructor(private prisma: PrismaService) {}

  // Parts
  createPart(data: CreatePartDto) {
    return this.prisma.part.create({ data });
  }

  findAllParts() {
    return this.prisma.part.findMany({ include: { vendor: true } });
  }

  async updatePart(id: string, data: UpdatePartDto) {
    return this.prisma.part.update({ where: { id }, data });
  }

  async deletePart(id: string) {
    return this.prisma.part.delete({ where: { id } });
  }

  async reorderCheck() {
    const minThreshold = 5; // example
    return this.prisma.part.findMany({
      where: { qty: { lt: minThreshold } },
    });
  }

  // Vendors
  createVendor(data: CreateVendorDto) {
    return this.prisma.vendor.create({ data });
  }

  getVendors() {
    return this.prisma.vendor.findMany();
  }

  updateVendor(id: string, data: UpdateVendorDto) {
    return this.prisma.vendor.update({ where: { id }, data });
  }

  deleteVendor(id: string) {
    return this.prisma.vendor.delete({ where: { id } });
  }
}

