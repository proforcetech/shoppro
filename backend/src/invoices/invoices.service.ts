import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateInvoiceDto } from './dto/create-invoice.dto';
import { UpdateInvoiceDto } from './dto/update-invoice.dto';
import { AddPaymentDto } from './dto/add-payment.dto';

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

  async update(id: string, dto: UpdateInvoiceDto) {
    return this.prisma.invoice.update({ where: { id }, data: dto });
  }

  async addPayment(dto: AddPaymentDto) {
    // Basic implementation
    return this.prisma.payment.create({ data: dto });
  }

  async remove(id: string) {
    return this.prisma.invoice.delete({ where: { id } });
  }
}
