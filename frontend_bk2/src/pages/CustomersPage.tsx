import { CustomerList } from '../features/customers/CustomerList';

export const CustomersPage = () => {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-4">Customer Management</h1>
      <CustomerList />
    </div>
  );
};

