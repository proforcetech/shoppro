import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateVehicleDto } from './dto/create-vehicle.dto';
import { UpdateVehicleDto } from './dto/update-vehicle.dto';

@Injectable()
export class VehiclesService {
  constructor(private prisma: PrismaService) {}

  create(data: CreateVehicleDto) {
    return this.prisma.vehicle.create({ data });
  }

  findAll() {
    return this.prisma.vehicle.findMany({
      include: {
        customer: true,
        histories: true,
        estimates: true,
      },
    });
  }

  async findOne(id: string) {
    const vehicle = await this.prisma.vehicle.findUnique({
      where: { id },
      include: {
        customer: true,
        histories: true,
        estimates: true,
      },
    });
    if (!vehicle) throw new NotFoundException('Vehicle not found');
    return vehicle;
  }

  async update(id: string, data: UpdateVehicleDto) {
    return this.prisma.vehicle.update({
      where: { id },
      data,
    });
  }

  async remove(id: string) {
    return this.prisma.vehicle.delete({ where: { id } });
  }
}

