import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateInvoiceDto } from './create-invoice.dto';
import { UpdateInvoiceDto } from './update-invoice.dto';
import { AddPaymentDto } from './add-payment.dto';

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
    // Assuming 'partItem' is a typo and should be 'Part' related to jobs
    // This part of the calculation might need adjustment based on your final schema
    const partsInJobs = await this.prisma.part.findMany({
        where: { job: { estimateId: estimateId } }
    });

    const partsTotal = partsInJobs.reduce((sum, part) => sum + part.quantity * part.price, 0);
    const total = laborTotal + partsTotal;

    return this.prisma.invoice.create({
      data: {
        estimateId,
        customerId: estimate.customerId, // Add the customerId from the estimate
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

  async findOne(id: string) {
    const invoice = await this.prisma.invoice.findUnique({
      where: { id },
      include: {
        payments: true,
        estimate: {
          include: {
            customer: true,
            vehicle: true,
            jobs: {
              include: {
                parts: true,
              },
            },
          },
        },
      },
    });
    if (!invoice) {
      throw new NotFoundException(`Invoice with ID "${id}" not found`);
    }
    return invoice;
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