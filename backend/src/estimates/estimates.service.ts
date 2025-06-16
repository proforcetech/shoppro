import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateEstimateDto } from './dto/create-estimate.dto';

@Injectable()
export class EstimatesService {
  constructor(private prisma: PrismaService) {}

  async create(createEstimateDto: CreateEstimateDto) {
    const {
      customerId,
      vehicleId,
      jobs,
      shopFee = 0,
      hazardousDisposalFee = 0,
      isMobile,
      calloutFee = 0,
      mileage = 0,
      mileageRate = 0,
      isTaxable,
      taxRate = 0,
    } = createEstimateDto;

    const laborSubTotal = jobs.reduce((acc, job) => acc + job.laborRate * job.laborTime, 0);
    const partsSubTotal = jobs.reduce((acc, job) => {
        return acc + job.parts.reduce((partAcc, part) => partAcc + part.quantity * part.pricePerUnit, 0);
    }, 0);
    const subTotal = laborSubTotal + partsSubTotal;

    const mileageFee = isMobile ? mileage * mileageRate : 0;
    const feeTotal = shopFee + hazardousDisposalFee + (isMobile ? calloutFee : 0) + mileageFee;

    const taxableAmount = isTaxable ? subTotal : 0;
    const taxTotal = taxableAmount * (taxRate / 100);

    const total = subTotal + feeTotal + taxTotal;
    
    return this.prisma.estimate.create({
      data: {
        customerId,
        vehicleId,
        subTotal,
        shopFee,
        hazardousDisposalFee,
        isMobile,
        calloutFee: isMobile ? calloutFee : null,
        mileage: isMobile ? mileage : null,
        mileageRate: isMobile ? mileageRate : null,
        feeTotal,
        isTaxable,
        taxRate,
        taxTotal,
        total,
        jobs: {
          create: jobs.map(job => ({
            description: job.laborDescription,
            rate: job.laborRate,
            laborHours: job.laborTime,
            parts: {
              create: job.parts.map(part => ({
                // CORRECTED: Use field names from prisma.schema.prisma
                part: part.part,
                sku: part.sku,
                qty: part.qty,
                pricePerUnit: part.pricePerUnit,
              })),
            },
          })),
        },
      },
      include: {
        jobs: {
          include: {
            parts: true,
          },
        },
      },
    });
  }

  findAll() {
    // CORRECTED: Use relation names from prisma.schema.prisma (lowercase)
    return this.prisma.estimate.findMany({ include: { customer: true, vehicle: true } });
  }

  async findOne(id: string) {
    const estimate = await this.prisma.estimate.findUnique({
      where: { id },
      include: {
        // CORRECTED: Use relation names from prisma.schema.prisma (lowercase)
        customer: true,
        vehicle: true,
        jobs: {
          include: {
            parts: true,
          },
        },
      },
    });
    if (!estimate) {
      throw new NotFoundException(`Estimate with ID "${id}" not found`);
    }
    return estimate;
  }

  async update(id: string, dto: any) {
    return this.prisma.estimate.update({
      where: { id },
      data: {
        status: dto.status,
      },
    });
  }

  async approve(id: string, approve: boolean) {
    return this.prisma.estimate.update({
      where: { id },
      data: { status: approve ? 'APPROVED' : 'REJECTED' },
    });
  }

  async remove(id: string) {
    return this.prisma.estimate.delete({ where: { id } });
  }
}