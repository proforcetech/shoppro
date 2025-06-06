import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateInvoiceDto } from './dto/create-invoice.dto';
import { UpdateInvoiceDto } from './dto/update-invoice.dto';
import { AddPaymentDto } from './dto/add-payment.dto';

@Injectable()
export class InvoicesService {
  constructor(private prisma: PrismaService) {}

  async create({ estimateId }: CreateInvoiceDto) {
    const estimate = await this.prisma.estimate.findUnique({
      where: { id: estimateId },
      include: { jobs: true },
    });

    if (!estimate || estimate.status !== 'APPROVED') {
      throw new Error('Estimate not approved or not found');
    }

    const laborTotal = estimate.jobs.reduce((sum, job) => sum + job.laborHours * job.rate, 0);
    const parts = await this.prisma.partItem.findMany({
      where: { estimateJob: { estimateId } },
      include: { part: true },
    });

    const partsTotal = parts.reduce((sum, item) => sum + item.qty * item.part.price, 0);
    const total = laborTotal + partsTotal;

    return this.prisma.invoice.create({
      data: {
        estimateId,
        total,
        status: 'DRAFT',
      },
    });
  }

  findAll() {
    return this.prisma.invoice.findMany({
      include: { payments: true, estimate: true },
    });
  }

  findOne(id: string) {
    return this.prisma.invoice.findUnique({
      where: { id },
      include: { payments: true, estimate: true },
    });
  }

  update(id: string, data: UpdateInvoiceDto) {
    return this.prisma.invoice.update({
      where: { id },
      data,
    });
  }

  async addPayment({ invoiceId, amount, method }: AddPaymentDto) {
    const invoice = await this.prisma.invoice.findUnique({
      where: { id: invoiceId },
      include: { payments: true },
    });

    if (!invoice) throw new NotFoundException('Invoice not found');

    const paid = invoice.payments.reduce((sum, p) => sum + p.amount, 0) + amount;
    const status = paid >= invoice.total ? 'PAID' : 'PARTIALLY_PAID';

    await this.prisma.payment.create({
      data: {
        invoiceId,
        amount,
        method,
      },
    });

    return this.prisma.invoice.update({
      where: { id: invoiceId },
      data: { status },
    });
  }

  remove(id: string) {
    return this.prisma.invoice.delete({ where: { id } });
  }
}

