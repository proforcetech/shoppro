import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateAppointmentDto } from './dto/create-appointment.dto';
import { UpdateAppointmentDto } from './dto/update-appointment.dto';

@Injectable()
export class SchedulingService {
  constructor(private prisma: PrismaService) {}

  async create(dto: CreateAppointmentDto) {
    const technician = await this.prisma.technician.findUnique({
      where: { id: dto.techId },
    });

    if (!technician) {
      throw new NotFoundException(`Technician with ID "${dto.techId}" not found`);
    }

    return this.prisma.appointment.create({
      data: {
        ...dto,
        userId: technician.userId, // Add the userId from the technician
        status: 'SCHEDULED',
      },
    });
  }

  findAll() {
    return this.prisma.appointment.findMany({
      include: {
        technician: { include: { user: true } },
        vehicle: { include: { customer: true } },
      },
    });
  }

  async findOne(id: string) {
    const appointment = await this.prisma.appointment.findUnique({
      where: { id },
      include: {
        technician: { include: { user: true } },
        vehicle: { include: { customer: true } },
      },
    });
    if (!appointment) throw new NotFoundException('Appointment not found');
    return appointment;
  }

  update(id: string, dto: UpdateAppointmentDto) {
    return this.prisma.appointment.update({
      where: { id },
      data: dto,
    });
  }

  remove(id: string) {
    return this.prisma.appointment.delete({ where: { id } });
  }

  async getTechSchedule(techId: string) {
    return this.prisma.appointment.findMany({
      where: { techId },
      orderBy: { startTime: 'asc' },
    });
  }

  async getDailySchedule(date: string) {
    const dayStart = new Date(date + 'T00:00:00');
    const dayEnd = new Date(date + 'T23:59:59');

    return this.prisma.appointment.findMany({
      where: {
        startTime: { gte: dayStart },
        endTime: { lte: dayEnd },
      },
      include: {
        technician: true,
        vehicle: true,
      },
    });
  }
}

