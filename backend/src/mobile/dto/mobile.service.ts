import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateMobileJobDto } from './create-mobile-job.dto';

@Injectable()
export class MobileService {
  constructor(private readonly prisma: PrismaService) {}

  async handleMobileJob(apptId: string, invoiceId: string, dto: CreateMobileJobDto) {
    const appt = await this.prisma.appointment.findUnique({
      where: { id: apptId },
    });

    if (!appt) {
      throw new NotFoundException(`Appointment with ID ${apptId} not found`);
    }

    const invoice = await this.prisma.invoice.findUnique({
      where: { id: invoiceId },
      include: {
        estimate: true,
      },
    });

    if (!invoice?.estimate?.vehicleId) {
      throw new Error('Invoice or associated estimate.vehicleId is missing');
    }

    const vehicleId = invoice.estimate.vehicleId;

    // Null-safe values
    const mileage = appt.mileage ?? 0;
    const mileageRate = 0.5; // Replace with your dynamic rate if needed
    const mileageFee = mileage * mileageRate;

    const dispatchFee = appt.dispatchFee ?? 0;

    // Example use of these values
    await this.prisma.account.update({
      where: { id: 'MOBILE_SERVICE_REVENUE_ACCOUNT_ID' }, // Replace with actual account ID
      data: {
        balance: {
          increment: dispatchFee + mileageFee,
        },
      },
    });

    // Additional logic to create mobile job, save details, etc.
    return {
      status: 'ok',
      appliedFees: {
        mileageFee,
        dispatchFee,
        total: dispatchFee + mileageFee,
      },
    };
  }
}

