import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateEstimateDto } from './dto/create-estimate.dto';

@Injectable()
export class EstimatesService {
  constructor(private prisma: PrismaService) {}

  async create(createEstimateDto: CreateEstimateDto) {
    const { jobs, ...rest } = createEstimateDto;
    // All calculations are now handled on the frontend for simplicity of this feature
    // A production app would re-calculate on the backend for security.

    return this.prisma.estimate.create({
      data: {
        ...rest,
        jobs: {
          create: jobs.map(job => ({
            description: job.laborDescription,
            rate: job.laborRate,
            laborHours: job.laborTime,
            parts: {
              create: job.parts.map(part => ({
                description: part.part,
                sku: part.sku,
                quantity: part.qty,
                pricePerUnit: part.pricePerUnit,
              })),
            },
          })),
        },
      },
    });
  }

  findAll() {
    return this.prisma.estimate.findMany({ include: { customer: true, vehicle: true } });
  }

  async findOne(id: string) {
    const estimate = await this.prisma.estimate.findUnique({
      where: { id },
      include: {
        customer: true,
        vehicle: true,
        jobs: { include: { parts: true } },
      },
    });
    if (!estimate) throw new NotFoundException(`Estimate with ID "${id}" not found`);
    return estimate;
  }
  
  async update(id: string, dto: any) {
    return this.prisma.estimate.update({ where: { id }, data: dto });
  }

  async remove(id: string) {
    return this.prisma.estimate.delete({ where: { id } });
  }

  async approve(id: string, approve: boolean) {
    return this.prisma.estimate.update({
      where: { id },
      data: { status: approve ? 'APPROVED' : 'REJECTED' },
    });
  }
}