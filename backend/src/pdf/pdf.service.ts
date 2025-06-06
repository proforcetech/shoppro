import { Injectable } from '@nestjs/common';
import * as pdfMake from 'pdfmake/build/pdfmake';
import * as pdfFonts from 'pdfmake/build/vfs_fonts';
import * as fs from 'fs';
import * as path from 'path';
import type { TDocumentDefinitions } from 'pdfmake';

(pdfMake as any).vfs = (pdfFonts as any).vfs;

@Injectable()
export class PdfService {
  async generateInvoice(invoice: any, estimate: any, customer: any, vehicle: any): Promise<string> {
    const filename = `invoice-${invoice.id}.pdf`;
    const filepath = path.join(__dirname, '../../public', filename);

    const docDefinition: TDocumentDefinitions = {
      content: [
        { text: 'Invoice', style: 'header' },
        { text: `Invoice ID: ${invoice.id}`, style: 'subheader' },
        { text: `Date: ${new Date(invoice.createdAt).toLocaleDateString()}`, margin: [0, 0, 0, 10] },
        
        { text: 'Customer Info', style: 'sectionHeader' },
        { text: `Name: ${customer.name}` },
        { text: `Email: ${customer.email}` },

        { text: 'Vehicle Info', style: 'sectionHeader', margin: [0, 10] },
        { text: `${vehicle.year} ${vehicle.make} ${vehicle.model}` },
        { text: `VIN: ${vehicle.vin}` },

        { text: 'Estimate Info', style: 'sectionHeader', margin: [0, 10] },
        { text: `Total Jobs: ${estimate.jobs.length}` },

        {
          table: {
            headerRows: 1,
            widths: ['*', 'auto'],
            body: [
              ['Job Description', 'Cost'],
              ...estimate.jobs.map((job) => [job.description, `$${job.total.toFixed(2)}`])
            ]
          },
          margin: [0, 10, 0, 0]
        },

        {
          text: `Total: $${invoice.total.toFixed(2)}`,
          style: 'total',
          margin: [0, 10]
        },

        { text: 'Thank you for your business.', margin: [0, 20, 0, 0] }
      ],
      styles: {
        header: {
          fontSize: 22,
          bold: true,
          alignment: 'center',
          margin: [0, 0, 0, 10]
        },
        subheader: {
          fontSize: 14,
          bold: true
        },
        sectionHeader: {
          fontSize: 12,
          bold: true,
          decoration: 'underline'
        },
        total: {
          fontSize: 14,
          bold: true,
          alignment: 'right'
        }
      }
    };

    return new Promise((resolve, reject) => {
      const pdfDoc = pdfMake.createPdf(docDefinition);
      pdfDoc.getBuffer((buffer: Buffer) => {
        fs.writeFileSync(filepath, buffer);
        resolve(`/public/${filename}`);
      });
    });
  }
}
