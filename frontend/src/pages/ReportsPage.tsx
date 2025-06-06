import { PnLReport } from '../features/reports/PnLReport';
import { BalanceSheet } from '../features/reports/BalanceSheet';
import { CashFlowReport } from '../features/reports/CashFlowReport';
import { TaxSummary } from '../features/reports/TaxSummary';

export const ReportsPage = () => (
  <div className="p-6 space-y-6">
    <h1 className="text-2xl font-bold">Financial Reports</h1>

    <div className="grid gap-6 grid-cols-1 lg:grid-cols-2">
      <PnLReport />
      <BalanceSheet />
      <CashFlowReport />
      <TaxSummary />
    </div>
  </div>
);

