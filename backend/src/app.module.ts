import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { PrismaModule } from './prisma/prisma.module';
import { AnalyticsModule } from './analytics/analytics.module';
import { CustomersModule } from './customers/customers.module';
import { EstimatesModule } from './estimates/estimates.module';
import { InventoryModule } from './inventory/inventory.module';
import { InvoicesModule } from './invoices/invoices.module';
import { SchedulingModule } from './scheduling/scheduling.module';
import { VehiclesModule } from './vehicles/vehicles.module';
import { EmailModule } from './email/email.module';
import { PdfModule } from './pdf/pdf.module';
import { RemindersModule } from './reminders/reminders.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    AuthModule,
    UsersModule,
    PrismaModule,
    AnalyticsModule,
    CustomersModule,
    EstimatesModule,
    InventoryModule,
    InvoicesModule,
    SchedulingModule,
    VehiclesModule,
    EmailModule,
    PdfModule,
    RemindersModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}