import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class AnalyticsService {
  constructor(private prisma: PrismaService) {}

  async shopMetrics() {
    const invoices = await this.prisma.invoice.findMany({
      include: {
        estimate: {
          include: {
            jobs: {
              include: {
                parts: {
                  include: { part: true },
                },
              },
            },
          },
        },
      },
    });

    let totalRevenue = 0;
    let totalParts = 0;
    let totalLabor = 0;

    for (const invoice of invoices) {
      totalRevenue += invoice.total;

      for (const job of invoice.estimate.jobs) {
        totalLabor += job.laborHours * job.rate;

        for (const p of job.parts) {
          totalParts += p.qty * p.part.price;
        }
      }
    }

    return {
      totalRevenue,
      partsRevenue: totalParts,
      laborRevenue: totalLabor,
      aro: invoices.length > 0 ? totalRevenue / invoices.length : 0,
      grossMargin: ((totalRevenue - totalParts) / totalRevenue) * 100 || 0,
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
        const duration = (new Date(a.endTime).getTime() - new Date(a.startTime).getTime()) / (1000 * 60 * 60);
        return sum + duration;
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
    const turnoverThreshold = 2;

    const deadStock = parts.filter(p => p.qty > 0 && p.qty > 5); // simplistic rule
    const turnover = parts.map(p => ({
      sku: p.sku,
      qty: p.qty,
      turnoverRate: (Math.random() * 5).toFixed(2), // mock for now
    }));

    return {
      turnover,
      deadStock: deadStock.map(p => ({ sku: p.sku, qty: p.qty })),
    };
  }
}

