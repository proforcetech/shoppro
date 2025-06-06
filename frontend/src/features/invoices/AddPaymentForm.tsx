import { useState } from 'react';
import { api } from '../../api/client';

export const AddPaymentForm = ({ invoiceId }: { invoiceId: string }) => {
  const [amount, setAmount] = useState('');
  const [method, setMethod] = useState('CASH');

  const submit = async () => {
    await api.patch('/invoices/payment', {
      invoiceId,
      amount: parseFloat(amount),
      method,
    });
    alert('Payment added.');
  };

  return (
    <div className="space-y-2">
      <h4 className="font-semibold">Add Payment</h4>
      <input
        type="number"
        placeholder="Amount"
        value={amount}
        onChange={e => setAmount(e.target.value)}
        className="input w-full"
      />
      <select value={method} onChange={e => setMethod(e.target.value)} className="input w-full">
        <option value="CASH">Cash</option>
        <option value="CREDIT_CARD">Credit Card</option>
        <option value="STRIPE">Stripe</option>
        <option value="PAYPAL">PayPal</option>
        <option value="CHECK">Check</option>
      </select>
      <button onClick={submit} className="btn bg-purple-600 text-white w-full">Submit Payment</button>
    </div>
  );
};

