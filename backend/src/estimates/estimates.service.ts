import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateEstimateDto } from './dto/create-estimate.dto';

@Injectable()
export class EstimatesService {
  constructor(private prisma: PrismaService) {}

  async create(createEstimateDto: CreateEstimateDto) {
    const { jobs, ...rest } = createEstimateDto;

    // --- Start Calculation Logic ---
    let calculatedSubTotal = 0;
    for (const job of jobs) {
      const laborTotal = job.laborTime * job.laborRate;
      const partsTotal = job.parts.reduce((acc, part) => acc + (part.qty * part.pricePerUnit), 0);
      calculatedSubTotal += laborTotal + partsTotal;
    }

    const shopFee = rest.shopFee || 0;
    const hazardousDisposalFee = rest.hazardousDisposalFee || 0;
    const calloutFee = rest.calloutFee || 0;
    const mileageCharge = (rest.mileage || 0) * (rest.mileageRate || 0);
    
    let calculatedTotal = calculatedSubTotal + shopFee + hazardousDisposalFee + calloutFee + mileageCharge;
    
    if (rest.isTaxable) {
      const taxAmount = calculatedTotal * (rest.taxRate / 100);
      calculatedTotal += taxAmount;
    }
    // --- End Calculation Logic ---

    return this.prisma.estimate.create({
      data: {
        ...rest,
        subTotal: calculatedSubTotal, // Add calculated subTotal
        total: calculatedTotal,       // Add calculated total
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
                price: part.pricePerUnit,
                cost: 0, 
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