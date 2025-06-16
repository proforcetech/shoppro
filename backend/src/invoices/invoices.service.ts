import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateInvoiceDto } from './dto/create-invoice.dto';

@Injectable()
export class InvoicesService {
  constructor(private prisma: PrismaService) {}

  async create(createInvoiceDto: CreateInvoiceDto) {
    const estimate = await this.prisma.estimate.findUnique({
      where: { id: createInvoiceDto.estimateId },
    });
    if (!estimate) throw new NotFoundException('Estimate not found');

    return this.prisma.invoice.create({
      data: {
        estimateId: estimate.id,
        customerId: estimate.customerId,
        total: estimate.total,
        status: 'DRAFT',
      },
    });
  }
  
  async findOne(id: string) {
    const invoice = await this.prisma.invoice.findUnique({
      where: { id },
      include: {
        customer: true,
        estimate: { include: { jobs: { include: { parts: true } }, vehicle: true } },
        payments: true,
      },
    });
    if (!invoice) throw new NotFoundException(`Invoice with ID "${id}" not found`);
    return invoice;
  }
  
  findAll() {
    return this.prisma.invoice.findMany({ include: { customer: true } });
  }
  
  // Other methods (update, remove, addPayment) would go here
}