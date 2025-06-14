import { useEffect, useState } from 'react';
import apiClient from '../../api/client';

export const BalanceSheet = () => {
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    apiClient.get('/reports/balance-sheet').then(res => setData(res.data));
  }, []);

  if (!data) return <p>Loading Balance Sheet...</p>;

  return (
    <div className="p-4 bg-white rounded shadow-sm space-y-2">
      <h2 className="text-lg font-bold">Balance Sheet</h2>
      <p>Assets: ${data.assets.toFixed(2)}</p>
      <p>Liabilities: ${data.liabilities.toFixed(2)}</p>
      <p>Equity: ${data.equity.toFixed(2)}</p>
    </div>
  );
};

