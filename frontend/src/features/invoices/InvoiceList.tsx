import { useEffect, useState } from 'react';
import apiClient from '../../api/client';
import { InvoiceDetails } from './InvoiceDetails';

type InvoiceType = {
  id: string;
  total: number;
  status: 'PAID' | 'PARTIALLY_PAID' | 'OVERDUE' | string;
};

export const InvoiceList = () => {
  const [invoices, setInvoices] = useState<InvoiceType[]>([]);
  const [selected, setSelected] = useState<InvoiceType | null>(null);

  useEffect(() => {
    apiClient.get('/invoices').then(res => setInvoices(res.data));
  }, []);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
      <div className="space-y-3">
        {invoices.map(inv => (
          <div
            key={inv.id}
            className="border p-3 rounded hover:bg-gray-50 cursor-pointer"
            onClick={() => setSelected(inv)}
          >
            <h3 className="font-bold">Invoice #{inv.id.slice(0, 8)}</h3>
            <p className="text-sm text-gray-500">Total: ${inv.total.toFixed(2)}</p>
            <span className={`text-xs px-2 py-1 rounded ${statusColor(inv.status)}`}>{inv.status}</span>
          </div>
        ))}
      </div>

      <div>
        {selected && <InvoiceDetails invoice={selected} />}
      </div>
    </div>
  );
};

const statusColor = (status: string) => {
  switch (status) {
    case 'PAID': return 'bg-green-100 text-green-800';
    case 'PARTIALLY_PAID': return 'bg-yellow-100 text-yellow-800';
    case 'OVERDUE': return 'bg-red-100 text-red-700';
    default: return 'bg-gray-100 text-gray-600';
  }
};
