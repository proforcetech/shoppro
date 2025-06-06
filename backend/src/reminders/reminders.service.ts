import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { PrismaService } from '../prisma/prisma.service';
import { EmailService } from '../email/email.service';
import { ConfigService } from '@nestjs/config';
import * as twilio from 'twilio';

@Injectable()
export class RemindersService {
  private readonly logger = new Logger(RemindersService.name);
  private twilioClient;

  constructor(
    private prisma: PrismaService,
    private emailService: EmailService,
    private config: ConfigService,
  ) {
    this.twilioClient = twilio(
      this.config.get('TWILIO_ACCOUNT_SID'),
      this.config.get('TWILIO_AUTH_TOKEN'),
    );
  }

  @Cron(CronExpression.EVERY_DAY_AT_6AM)
  async sendDailyReminders() {
    this.logger.log('Running daily reminder job...');

    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    tomorrow.setHours(0, 0, 0, 0);

    const dayEnd = new Date(tomorrow);
    dayEnd.setHours(23, 59, 59, 999);

    const appointments = await this.prisma.appointment.findMany({
      where: {
        startTime: { gte: tomorrow, lte: dayEnd },
      },
      include: {
        vehicle: { include: { customer: true } },
      },
    });

    for (const appt of appointments) {
      const msg = `Reminder: You have a ${appt.type} appointment at Auto Repair Shop on ${new Date(appt.startTime).toLocaleString()}.`;

      if (appt.vehicle.customer.phone) {
        await this.sendSms(appt.vehicle.customer.phone, msg);
      }

      if (appt.vehicle.customer.email) {
        await this.emailService.sendGenericMessage(
          appt.vehicle.customer.email,
          'Appointment Reminder',
          msg,
        );
      }

      this.logger.log(`Reminder sent to ${appt.vehicle.customer.email || appt.vehicle.customer.phone}`);
    }
  }

  private async sendSms(to: string, body: string) {
    try {
      return this.twilioClient.messages.create({
        body,
        from: this.config.get('TWILIO_FROM'),
        to,
      });
    } catch (err) {
      this.logger.error(`SMS failed to ${to}`, err);
    }
  }
}

