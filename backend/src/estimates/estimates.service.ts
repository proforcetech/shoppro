import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateEstimateDto } from './dto/create-estimate.dto';

@Injectable()
export class EstimatesService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createEstimateDto: CreateEstimateDto) {
    const {
      jobs,
      customerId,
      vehicleId,
      shopFee = 0,
      hazardousDisposalFee = 0,
      calloutFee = 0,
      mileage = 0,
      mileageRate = 0,
      isMobile = false,
      isTaxable = false,
      taxRate = 0,
      serviceLocation = '',
    } = createEstimateDto;

    // --- Calculation Logic ---
    let calculatedSubTotal = 0;
    for (const job of jobs) {
      const laborTotal = job.laborTime * job.laborRate;
      const partsTotal = job.parts.reduce(
        (sum, part) => sum + part.qty * part.pricePerUnit,
        0
      );
      calculatedSubTotal += laborTotal + partsTotal;
    }

    let calculatedTotal =
      calculatedSubTotal + shopFee + hazardousDisposalFee + calloutFee + mileage * mileageRate;
    if (isTaxable) {
      calculatedTotal += calculatedTotal * (taxRate / 100);
    }
    // --- End Calculation Logic ---

    return this.prisma.estimate.create({
      data: {
        customer: { connect: { id: customerId } },
        vehicle: { connect: { id: vehicleId } },
        shopFee,
        hazardousDisposalFee,
        calloutFee,
        mileage,
        mileageRate,
        isMobile,
        isTaxable,
        taxRate,
        serviceLocation,
        subTotal: calculatedSubTotal,
        total: calculatedTotal,
        jobs: {
          create: jobs.map((job) => ({
            description: job.laborDescription,
            rate: job.laborRate,
            laborHours: job.laborTime,
            parts: {
              create: job.parts.map((part) => ({
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
    return this.prisma.estimate.findMany({
      include: { customer: true, vehicle: true },
    });
  }

  async findOne(id: string) {
    const estimate = await this.prisma.estimate.findUnique({
      where: { id },
      include: { customer: true, vehicle: true, jobs: { include: { parts: true } } },
    });
    if (!estimate) throw new NotFoundException(`Estimate "${id}" not found`);
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
