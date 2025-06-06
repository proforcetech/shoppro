import {
  Controller, Post, Body, Get, UseGuards,
} from '@nestjs/common';
import { AccountingService } from './accounting.service';
import { CreateEntryDto } from './dto/create-entry.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/role.decorator';

@Controller('accounting')
@UseGuards(JwtAuthGuard, RolesGuard)
export class AccountingController {
  constructor(private readonly accountingService: AccountingService) {}

  @Post('entry')
  @Roles('ACCOUNTANT')
  createEntry(@Body() dto: CreateEntryDto) {
    return this.accountingService.createEntry(dto);
  }

  @Get('accounts')
  @Roles('ACCOUNTANT')
  getAccounts() {
    return this.accountingService.getAccounts();
  }

  @Get('journal')
  @Roles('ACCOUNTANT')
  getJournal() {
    return this.accountingService.getJournal();
  }

  @Get('profit-loss')
  @Roles('ACCOUNTANT')
  getProfitAndLoss() {
    return this.accountingService.getProfitAndLoss();
  }

  @Get('balance-sheet')
  @Roles('ACCOUNTANT')
  getBalanceSheet() {
    return this.accountingService.getBalanceSheet();
  }
}

