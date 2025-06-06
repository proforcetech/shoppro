import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateEstimateDto } from './dto/create-estimate.dto';
import { UpdateEstimateDto } from './dto/update-estimate.dto';
import { EstimateStatus } from '@prisma/client';

@Injectable()
export class EstimatesService {
  constructor(private readonly prisma: PrismaService) {}

  async create(dto: CreateEstimateDto) {
    return this.prisma.estimate.create({
      data: {
        vehicleId: dto.vehicleId,
        status: dto.status ?? EstimateStatus.DRAFT,
        jobs: {
          create: dto.jobs.map((job) => ({
            description: job.description,
            laborHours: job.laborHours,
            rate: job.rate,
            parts: {
              create: job.parts.map((part) => ({
                qty: part.qty ?? 0,
                part: {
                  connect: { id: part.partId },
                },
              })),
            },
          })),
        },
      },
      include: {
        jobs: {
          include: {
            parts: {
              include: { part: true },
            },
          },
        },
        vehicle: true,
      },
    });
  }

  async findAll() {
    return this.prisma.estimate.findMany({
      include: {
        jobs: {
          include: {
            parts: {
              include: { part: true },
            },
          },
        },
        vehicle: true,
      },
    });
  }

  async findOne(id: string) {
    const estimate = await this.prisma.estimate.findUnique({
      where: { id },
      include: {
        jobs: {
          include: {
            parts: {
              include: { part: true },
            },
          },
        },
        vehicle: true,
      },
    });

    if (!estimate) {
      throw new NotFoundException(`Estimate with id ${id} not found`);
    }

    return estimate;
  }

  async update(id: string, dto: UpdateEstimateDto) {
    const data = Object.fromEntries(
      Object.entries(dto).filter(([_, value]) => value !== undefined)
    );

    return this.prisma.estimate.update({
      where: { id },
      data,
      include: {
        jobs: {
          include: {
            parts: {
              include: { part: true },
            },
          },
        },
        vehicle: true,
      },
    });
  }

  async approve(id: string, approved: boolean) {
    const estimate = await this.prisma.estimate.findUnique({ where: { id } });
    if (!estimate) {
      throw new NotFoundException(`Estimate with id ${id} not found`);
    }

    const newStatus = approved ? EstimateStatus.APPROVED : EstimateStatus.REJECTED;

    return this.prisma.estimate.update({
      where: { id },
      data: { status: newStatus },
      include: {
        jobs: {
          include: {
            parts: {
              include: { part: true },
            },
          },
        },
        vehicle: true,
      },
    });
  }

  async remove(id: string) {
    return this.prisma.estimate.delete({
      where: { id },
    });
  }
}

