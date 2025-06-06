import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateEntryDto } from './dto/create-entry.dto';
import { AccountType, EntryType } from '@prisma/client';

@Injectable()
export class AccountingService {
  constructor(private prisma: PrismaService) {}

  async createEntry(data: CreateEntryDto) {
    const { accountId, amount, type, description } = data;

    const entry = await this.prisma.journalEntry.create({
      data: { accountId, amount, type, description },
    });

    // Update account balance
    const account = await this.prisma.account.findUnique({ where: { id: accountId } });

// Validate account
if (!account) {
  throw new Error('Account not found');
}

// Correct debit/credit logic
const isDebit = account.type === 'ASSET' || account.type === 'EXPENSE';

// Assume amount is passed in
const delta = isDebit ? amount : -amount;

// Update account balance (Prisma example)
await this.prisma.account.update({
  where: { id: accountId },
  data: { balance: { increment: delta } },
});

    return entry;
  }

  getAccounts() {
    return this.prisma.account.findMany();
  }

  getJournal() {
    return this.prisma.journalEntry.findMany({ include: { account: true } });
  }

  async getProfitAndLoss() {
    const revenues = await this.prisma.account.findMany({
      where: { type: 'REVENUE' },
    });
    const expenses = await this.prisma.account.findMany({
      where: { type: 'EXPENSE' },
    });

    const totalRevenue = revenues.reduce((sum, a) => sum + a.balance, 0);
    const totalExpense = expenses.reduce((sum, a) => sum + a.balance, 0);

    return {
      revenue: totalRevenue,
      expense: totalExpense,
      netProfit: totalRevenue - totalExpense,
    };
  }

  async getBalanceSheet() {
    const assets = await this.prisma.account.findMany({ where: { type: 'ASSET' } });
    const liabilities = await this.prisma.account.findMany({ where: { type: 'LIABILITY' } });
    const equity = await this.prisma.account.findMany({ where: { type: 'EQUITY' } });

    return {
      assets: assets.map(a => ({ name: a.name, balance: a.balance })),
      liabilities: liabilities.map(l => ({ name: l.name, balance: l.balance })),
      equity: equity.map(e => ({ name: e.name, balance: e.balance })),
    };
  }
}

