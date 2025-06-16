import {
  Controller, Get, Post, Body, Param, Delete, Put, Patch, UseGuards, Res, NotFoundException,
} from '@nestjs/common';
import { Response } from 'express';
import { InvoicesService } from './invoices.service';
import { CreateInvoiceDto } from './dto/create-invoice.dto';
import { UpdateInvoiceDto } from './dto/update-invoice.dto';
import { AddPaymentDto } from './dto/add-payment.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/role.decorator';
import { PdfService } from '../pdf/pdf.service';
import { PrismaService } from '../prisma/prisma.service';
import { EmailService } from '../email/email.service';

@Controller('invoices')
@UseGuards(JwtAuthGuard, RolesGuard)
export class InvoicesController {
  constructor(
    private readonly invoicesService: InvoicesService,
    private readonly pdfService: PdfService,
    private readonly prisma: PrismaService,
    private readonly emailService: EmailService,
  ) {}

  @Post()
  @Roles('MANAGER')
  create(@Body() dto: CreateInvoiceDto) {
    return this.invoicesService.create(dto);
  }

  @Get()
  @Roles('FRONT_DESK')
  findAll() {
    return this.invoicesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.invoicesService.findOne(id);
  }

  @Put(':id')
  @Roles('MANAGER')
  update(@Param('id') id: string, @Body() dto: UpdateInvoiceDto) {
    return this.invoicesService.update(id, dto);
  }

  @Patch('payment')
  @Roles('FRONT_DESK')
  addPayment(@Body() dto: AddPaymentDto) {
    return this.invoicesService.addPayment(dto);
  }

  @Delete(':id')
  @Roles('ADMIN')
  remove(@Param('id') id: string) {
    return this.invoicesService.remove(id);
  }

  @Get(':id/pdf')
  @Roles('FRONT_DESK')
  async generatePdf(@Param('id') id: string, @Res() res: Response) {
    const invoice = await this.invoicesService.findOne(id);
    if (!invoice) throw new NotFoundException('Invoice not found');

    const estimate = await this.prisma.estimate.findUnique({
      where: { id: invoice.estimateId },
      include: {
        jobs: {
          include: {
            parts: {
              include: { part: true },
            },
          },
        },
      },
    });
    if (!estimate) throw new NotFoundException('Estimate not found');

    const vehicle = await this.prisma.vehicle.findUnique({
      where: { id: estimate.vehicleId },
    });
    if (!vehicle) throw new NotFoundException('Vehicle not found');

    const customer = await this.prisma.customer.findUnique({
      where: { id: vehicle.customerId },
    });
    if (!customer) throw new NotFoundException('Customer not found');

    const pdfUrl = await this.pdfService.generateInvoice(invoice, estimate, customer, vehicle);
    res.download(`public/${pdfUrl.split('/').pop()}`);
  }

  @Post(':id/email')
  @Roles('FRONT_DESK')
  async sendInvoiceEmail(@Param('id') id: string, @Res() res: Response) {
    const invoice = await this.invoicesService.findOne(id);
    if (!invoice) throw new NotFoundException('Invoice not found');

    const estimate = await this.prisma.estimate.findUnique({
      where: { id: invoice.estimateId },
      include: {
        jobs: {
          include: {
            parts: {
              include: { part: true },
            },
          },
        },
      },
    });
    if (!estimate) throw new NotFoundException('Estimate not found');

    const vehicle = await this.prisma.vehicle.findUnique({
      where: { id: estimate.vehicleId },
    });
    if (!vehicle) throw new NotFoundException('Vehicle not found');

    const customer = await this.prisma.customer.findUnique({
      where: { id: vehicle.customerId },
    });
    if (!customer) throw new NotFoundException('Customer not found');

    const pdfUrl = await this.pdfService.generateInvoice(invoice, estimate, customer, vehicle);
    const absolutePath = `public/${pdfUrl.split('/').pop()}`;

    if (typeof this.emailService.sendInvoicePdf !== 'function') {
      throw new Error('sendInvoicePdf method is not implemented on EmailService');
    }
    await this.emailService.sendInvoicePdf(customer.email, absolutePath, customer.firstName, customer.lastName);

    res.json({ message: `Invoice emailed to ${customer.email}` });
  }
}
