import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateMobileJobDto } from './dto/create-mobile-job.dto';

@Injectable()
export class MobileService {
  constructor(private prisma: PrismaService) {}

  async configureMobileJob(dto: CreateMobileJobDto) {
    const {
      appointmentId,
      isMobile,
      dispatchFee = 50,
      mileage = 0,
    } = dto;

    const appt = await this.prisma.appointment.findUnique({
      where: { id: appointmentId },
    });
    if (!appt) throw new NotFoundException('Appointment not found');

    return this.prisma.appointment.update({
      where: { id: appointmentId },
      data: {
        isMobile,
        dispatchFee,
        mileage,
      },
    });
  }

  async applyMobileFeesToInvoice(invoiceId: string) {
    const invoice = await this.prisma.invoice.findUnique({
      where: { id: invoiceId },
      include: {
        estimate: {
          include: { vehicle: true },
        },
      },
    });
    if (!invoice) throw new NotFoundException('Invoice not found');
    if (!invoice.estimate) throw new NotFoundException('Estimate not found for invoice');

    const appt = await this.prisma.appointment.findFirst({
      where: { vehicleId: invoice.estimate.vehicleId },
      orderBy: { startTime: 'desc' },
    });
    if (!appt?.isMobile) return invoice;

    const mileageRate = 1.5; // $1.50 per mile
    const mileageFee = (appt.mileage ?? 0) * mileageRate;
    const dispatchFee = appt.dispatchFee ?? 0;

    return this.prisma.invoice.update({
      where: { id: invoiceId },
      data: {
        isMobile: true,
        dispatchFee: dispatchFee,
        mileageCharge: mileageFee,
        total: {
          increment: dispatchFee + mileageFee,
        },
      },
    });
  }
}
