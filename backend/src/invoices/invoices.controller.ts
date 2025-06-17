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
import * as path from 'path'; // Import path module

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

    const { estimate, customer } = invoice;
    const vehicle = estimate?.vehicle;

    if (!estimate || !customer || !vehicle) {
      throw new NotFoundException('Estimate, customer, or vehicle not found for this invoice.');
    }

    const pdfUrl = await this.pdfService.generateInvoice(invoice, estimate, customer, vehicle);
    res.download(path.resolve(`public/${pdfUrl.split('/').pop()}`));
  }

 @Post(':id/email')
  @Roles('ADMIN', 'MANAGER')
  async sendEmail(@Param('id') id: string) {
    const invoice = await this.invoicesService.findOne(id);
    // Use optional chaining and check for customer
    if (!invoice?.customer) {
        throw new NotFoundException('Invoice or customer not found');
    }

    // Destructure customer and estimate from the invoice object
    const { customer, estimate } = invoice;
    const vehicle = estimate?.vehicle;

    if (!estimate || !vehicle) {
        throw new NotFoundException('Estimate or vehicle not found for this invoice.');
    }
    
    // Combine names for the email
    const customerName = `${customer.firstName} ${customer.lastName}`.trim();

    // Correctly call generateInvoice with all 4 required arguments
    const pdfPath = await this.pdfService.generateInvoice(invoice, estimate, customer, vehicle);
    const absolutePath = path.resolve(pdfPath);

    await this.emailService.sendInvoicePdf(customer.email, absolutePath, customerName);

    return { message: 'Invoice emailed successfully' };
  }
}