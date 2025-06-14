import { useEffect, useState } from 'react';
import apiClient from '../../api/client';

export const WarrantyForm = () => {
  const [invoices, setInvoices] = useState([]);
  const [form, setForm] = useState({ invoiceId: '', issue: '' });

  useEffect(() => {
    apiClient.get('/invoices').then(res => {
      const completed = res.data.filter((inv: any) => inv.status === 'PAID');
      setInvoices(completed);
    });
  }, []);

  const submit = async () => {
    await apiClient.post('/warranty', form);
    alert('Warranty claim submitted!');
    setForm({ invoiceId: '', issue: '' });
  };

  return (
    <div className="p-4 bg-white border rounded shadow-sm space-y-4">
      <h2 className="text-xl font-bold">Submit Warranty Claim</h2>

      <select
        value={form.invoiceId}
        onChange={e => setForm({ ...form, invoiceId: e.target.value })}
        className="input w-full"
      >
        <option value="">Select a Completed Invoice</option>
        {invoices.map((inv: any) => (
          <option key={inv.id} value={inv.id}>#{inv.id.slice(0, 8)} — ${inv.total.toFixed(2)}</option>
        ))}
      </select>

      <textarea
        placeholder="Describe the issue..."
        value={form.issue}
        onChange={e => setForm({ ...form, issue: e.target.value })}
        className="input w-full h-28"
      />

      <button onClick={submit} className="btn bg-blue-600 text-white w-full">
        Submit Claim
      </button>
    </div>
  );
};

