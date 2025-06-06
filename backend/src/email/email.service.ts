import { Injectable, Logger } from '@nestjs/common';
import * as nodemailer from 'nodemailer';

@Injectable()
export class EmailService {
  private readonly logger = new Logger(EmailService.name);
  private transporter: nodemailer.Transporter;

  constructor() {
    this.transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT) || 587,
      secure: false, // upgrade later with STARTTLS
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });
  }

  async sendInvoicePdf(to: string, filePath: string, customerName: string): Promise<void> {
    try {
      const mailOptions = {
        from: `"Auto Repair Shop" <${process.env.SMTP_USER}>`,
        to,
        subject: `Invoice for ${customerName}`,
        text: `Dear ${customerName},\n\nAttached is your invoice.\n\nThank you.`,
        attachments: [
          {
            filename: 'invoice.pdf',
            path: filePath,
          },
        ],
      };

      await this.transporter.sendMail(mailOptions);
      this.logger.log(`Invoice email sent to ${to}`);
    } catch (error) {
      this.logger.error(`Failed to send invoice email to ${to}:`, error);
      throw error;
    }
  }

  async sendGenericMessage(to: string, subject: string, body: string): Promise<void> {
    try {
      const mailOptions = {
        from: `"Auto Repair Shop" <${process.env.SMTP_USER}>`,
        to,
        subject,
        text: body,
      };

      await this.transporter.sendMail(mailOptions);
      this.logger.log(`Generic email sent to ${to} (subject: "${subject}")`);
    } catch (error) {
      this.logger.error(`Failed to send email to ${to}:`, error);
      throw error;
    }
  }
}

