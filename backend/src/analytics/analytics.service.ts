import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class AnalyticsService {
  constructor(private prisma: PrismaService) {}

  async shopMetrics() {
    const invoices = await this.prisma.invoice.findMany({});

    let totalRevenue = 0;
    let totalParts = 0;
    let totalLabor = 0;

    for (const invoice of invoices) {
      totalRevenue += invoice.total;

      const estimate = await this.prisma.estimate.findUnique({
        where: { id: invoice.estimateId },
        include: {
          jobs: {
            include: {
              parts: {
                include: {
                  parts: true,
                },
              },
            },
          },
        },
      });

      if (estimate?.jobs) { // Check if estimate exists
        for (const job of estimate.jobs) {
          totalLabor += job.laborHours * job.rate;

          for (const p of job.parts) {
            if (p.part) { // Check if part is loaded
              totalParts += p.quantity * p.part.price;
            }
          }
        }
      }
    }

    return {
      totalRevenue,
      partsRevenue: totalParts,
      laborRevenue: totalLabor,
      aro: invoices.length > 0 ? totalRevenue / invoices.length : 0,
      grossMargin: totalRevenue > 0 ? ((totalRevenue - totalParts) / totalRevenue) * 100 : 0,
    };
  }

  async techPerformance() {
    const techs = await this.prisma.technician.findMany({
      include: {
        jobs: true,
        user: true,
      },
    });

    return techs.map(t => {
      const hoursBilled = t.jobs.reduce((sum, a) => {
        if(a.endTime && a.startTime) {
          const duration = (new Date(a.endTime).getTime() - new Date(a.startTime).getTime()) / (1000 * 60 * 60);
          return sum + duration;
        }
        return sum;
      }, 0);

      return {
        name: t.user.email,
        jobs: t.jobs.length,
        hoursBilled: hoursBilled.toFixed(2),
      };
    });
  }

  async inventoryAnalytics() {
    const parts = await this.prisma.part.findMany();

    const deadStock = parts.filter(p => p.quantity > 5); // simplistic rule
    const turnover = parts.map(p => ({
      sku: p.sku,
      quantity: p.quantity,
      turnoverRate: (Math.random() * 5).toFixed(2), // mock for now
    }));

    return {
      turnover,
      deadStock: deadStock.map(p => ({ sku: p.sku, quantity: p.quantity })),
    };
  }
}