import { useEffect, useState } from 'react';
import apiClient from '../../api/client';
import { type AxiosResponse } from 'axios';

export const TaxSummary = () => {
  const [data, setData] = useState<any>(null);

useEffect(() => {
  api.get('/reports/tax-summary').then((res: AxiosResponse<any>) => setData(res.data));
}, []);

  if (!data) return <p>Loading Tax Summary...</p>;

  return (
    <div className="p-4 bg-white rounded shadow-sm space-y-2">
      <h2 className="text-lg font-bold">Sales Tax Summary</h2>
      <p>Sales Tax Collected: ${data.collected.toFixed(2)}</p>
      <p>Sales Tax Paid: ${data.paid.toFixed(2)}</p>
      <p>Net Tax Liability: ${data.liability.toFixed(2)}</p>
    </div>
  );
};
