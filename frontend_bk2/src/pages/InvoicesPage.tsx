import { InvoiceList } from '../features/invoices/InvoiceList';

export const InvoicesPage = () => (
  <div className="p-6 space-y-4">
    <h1 className="text-2xl font-bold">Invoices</h1>
    <InvoiceList />
  </div>
);

