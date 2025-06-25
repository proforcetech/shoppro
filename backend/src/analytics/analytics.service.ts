import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class AnalyticsService {
  constructor(private prisma: PrismaService) {}

  async getShopMetrics() {
    const invoices = await this.prisma.invoice.findMany({
      where: {
        status: 'PAID',
      },
    });

    const totalRevenue = invoices.reduce((sum, invoice) => sum + invoice.total, 0);
    const totalInvoices = invoices.length;
    const averageRevenuePerInvoice = totalInvoices > 0 ? totalRevenue / totalInvoices : 0;

    return {
      totalRevenue,
      totalInvoices,
      averageRevenuePerInvoice,
    };
  }
}

