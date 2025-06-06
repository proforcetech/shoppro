import { Module } from '@nestjs/common';
import { InvoicesService } from './invoices.service';
import { InvoicesController } from './invoices.controller';
import { PdfModule } from '../pdf/pdf.module';
import { EmailModule } from '../email/email.module';
import { PrismaService } from '../prisma/prisma.service';

@Module({
  imports: [PdfModule, EmailModule],
  controllers: [InvoicesController],
  providers: [InvoicesService, PrismaService],
})
export class InvoicesModule {}

