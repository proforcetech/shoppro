import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  UseGuards,
  Res,
  NotFoundException,
} from '@nestjs/common';
import { Response } from 'express';
import * as path from 'path'; // Import the 'path' module

import { InvoicesService } from './invoices.service';
import { CreateInvoiceDto } from './create-invoice.dto';
import { AddPaymentDto } from './add-payment.dto';

import { JwtAuthGuard } from '../../auth/jwt-auth.guard';
import { RolesGuard } from '../../auth/roles.guard';

import { PdfService } from '../../pdf/pdf.service';
import { EmailService } from '../../email/email.service';
import { PrismaService } from '../../prisma/prisma.service';

@Controller('invoices')
@UseGuards(JwtAuthGuard, RolesGuard)
export class InvoicesController {
  constructor(
    private readonly invoicesService: InvoicesService,
    private readonly pdfService: PdfService,
    private readonly emailService: EmailService,
    private readonly prisma: PrismaService,
  ) {}

  @Post()
  create(@Body() dto: CreateInvoiceDto) {
    return this.invoicesService.create(dto);
  }

  @Get()
  findAll() {
    return this.invoicesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.invoicesService.findOne(id);
  }

  @Post(':id/payment')
  addPayment(@Body() dto: AddPaymentDto) {
    // Note: The InvoicesService is missing the addPayment method.
    // This will need to be implemented.
  }

  @Post(':id/pdf')
  async generatePdf(@Param('id') id: string, @Res() res: Response) {
    const invoice = await this.invoicesService.findOne(id);
    if (!invoice) throw new NotFoundException('Invoice not found');

    const estimate = await this.prisma.estimate.findUnique({ where: { id: invoice.estimateId } });
    if (!estimate) throw new NotFoundException('Estimate not found');

    const vehicle = await this.prisma.vehicle.findUnique({ where: { id: estimate.vehicleId } });
    if (!vehicle) throw new NotFoundException('Vehicle not found');

    const customer = await this.prisma.customer.findUnique({ where: { id: vehicle.customerId } });
    if (!customer) throw new NotFoundException('Customer not found');

    const pdfPath = await this.pdfService.generateInvoice(invoice, estimate, customer, vehicle);
    res.download(path.resolve(pdfPath));
  }

  @Post(':id/email')
  async sendEmail(@Param('id') id: string) {
    const invoice = await this.invoicesService.findOne(id);
    if (!invoice) throw new NotFoundException('Invoice not found');

    // Explicitly fetch related data to ensure it's available
    const estimate = await this.prisma.estimate.findUnique({ where: { id: invoice.estimateId } });
    if (!estimate) throw new NotFoundException('Estimate not found');

    const vehicle = await this.prisma.vehicle.findUnique({ where: { id: estimate.vehicleId } });
    if (!vehicle) throw new NotFoundException('Vehicle not found');

    const customer = await this.prisma.customer.findUnique({ where: { id: vehicle.customerId } });
    if (!customer) throw new NotFoundException('Customer not found');

    // Correctly call generateInvoice with all 4 required arguments
    const pdfPath = await this.pdfService.generateInvoice(invoice, estimate, customer, vehicle);
    const absolutePath = path.resolve(pdfPath);
    
    const customerName = `${customer.firstName} ${customer.lastName}`.trim();

    await this.emailService.sendInvoicePdf(customer.email, absolutePath, customerName);

    return { message: 'Invoice emailed successfully' };
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    // Note: The InvoicesService is missing the remove method.
    // This will need to be implemented.
  }
}