import { useEffect, useState } from 'react';
import { api } from '../../api/client';

export const PnLReport = () => {
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    api.get('/reports/pnl').then(res => setData(res.data));
  }, []);

  if (!data) return <p>Loading Profit & Loss...</p>;

  return (
    <div className="p-4 bg-white rounded shadow-sm space-y-2">
      <h2 className="text-lg font-bold">Profit & Loss</h2>
      <p>Revenue: ${data.revenue.toFixed(2)}</p>
      <p>COGS: ${data.cogs.toFixed(2)}</p>
      <p>Expenses: ${data.expenses.toFixed(2)}</p>
      <p className="font-semibold">Net Profit: ${data.netProfit.toFixed(2)}</p>
    </div>
  );
};

