import React, { useState, useCallback } from 'react';
import { CustomerList } from '../features/customers/CustomerList';
import CustomerForm from '../features/customers/CustomerForm';

const CustomersPage: React.FC = () => {
  const [showForm, setShowForm] = useState(false);
  const [refreshKey, setRefreshKey] = useState(0);

  const handleCustomerAdded = useCallback(() => {
    setShowForm(false); // Hide form after adding
    setRefreshKey(prevKey => prevKey + 1); // Trigger a refresh of the list
  }, []);

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Customer Management</h1>
        <button
          onClick={() => setShowForm(!showForm)}
          className="btn bg-blue-600 text-white"
        >
          {showForm ? 'Cancel' : 'Add New Customer'}
        </button>
      </div>
      
      {showForm && <CustomerForm onCustomerAdded={handleCustomerAdded} />}

      <CustomerList key={refreshKey} />
    </div>
  );
};

export default CustomersPage;