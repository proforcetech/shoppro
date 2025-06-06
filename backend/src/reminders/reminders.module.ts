import { Module } from '@nestjs/common';
import { RemindersService } from './reminders.service';
import { ScheduleModule } from '@nestjs/schedule';
import { EmailModule } from '../email/email.module';
import { PrismaService } from '../prisma/prisma.service';

@Module({
  imports: [ScheduleModule.forRoot(), EmailModule],
  providers: [RemindersService, PrismaService],
})
export class RemindersModule {}

