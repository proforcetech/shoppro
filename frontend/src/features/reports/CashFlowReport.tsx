import { useEffect, useState } from 'react';
import apiClient from '../../api/client';

export const CashFlowReport = () => {
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    apiClient.get('/reports/cash-flow').then(res => setData(res.data));
  }, []);

  if (!data) return <p>Loading Cash Flow Report...</p>;

  return (
    <div className="p-4 bg-white rounded shadow-sm space-y-2">
      <h2 className="text-lg font-bold">Cash Flow</h2>
      <p>Cash Inflows: ${data.inflows.toFixed(2)}</p>
      <p>Cash Outflows: ${data.outflows.toFixed(2)}</p>
      <p className="font-semibold">Net Cash: ${data.net.toFixed(2)}</p>
    </div>
  );
};

