import { AddPaymentForm } from './AddPaymentForm';
import apiClient from '../../api/client';

export const InvoiceDetails = ({ invoice }: any) => {
  const sendEmail = async () => {
    await apiClient.patch(`/invoices/${invoice.id}/email`);
    alert('Invoice emailed!');
  };

  const downloadPdf = () => {
    window.open(`/invoices/${invoice.id}/pdf`, '_blank');
  };

  return (
    <div className="p-4 border rounded space-y-4 bg-white shadow-sm">
      <h2 className="text-xl font-bold">Invoice #{invoice.id.slice(0, 8)}</h2>
      <p>Total: ${invoice.total.toFixed(2)}</p>
      <p>Status: {invoice.status}</p>

      <AddPaymentForm invoiceId={invoice.id} />

      <div className="flex gap-4 mt-4">
        <button onClick={downloadPdf} className="btn bg-blue-600 text-white">Download PDF</button>
        <button onClick={sendEmail} className="btn bg-green-600 text-white">Email to Customer</button>
      </div>
    </div>
  );
};

