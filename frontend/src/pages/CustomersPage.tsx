import React, { useState, useEffect } from 'react';
import { CustomerList } from '../features/customers/CustomerList';
import { CustomerForm } from '../features/customers/CustomerForm';
import { VehicleList } from '../features/customers/VehicleList';
import type { CustomerType } from '../types';
import apiClient from '../api/client';


/**
 * CustomersPage Component
 * This page serves as a central hub for customer management. It displays
 * a list of existing customers, allows selecting a customer to view their
 * vehicles, and provides a form to add new customers.
 */
const CustomersPage: React.FC = () => {
  const [customers, setCustomers] = useState<CustomerType[]>([]);
  const [selectedCustomerId, setSelectedCustomerId] = useState<string | null>(null);

  /**
   * Fetches the list of customers. This can be triggered to refresh the data.
   */
  const fetchCustomers = async () => {
    try {
      const response = await apiClient.get('/customers');
      setCustomers(response.data);
      // Select the first customer by default if none is selected
      if (!selectedCustomerId && response.data.length > 0) {
        setSelectedCustomerId(response.data[0].id);
      }
    } catch (error) {
      console.error('Failed to fetch customers:', error);
    }
  };

  useEffect(() => {
    fetchCustomers();
  }, []);

  // Find the full object for the selected customer from the customers array.
  const selectedCustomer = customers.find(c => c.id === selectedCustomerId);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Customer Management</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2">
          {/*
            Pass the required props to the CustomerList component.
            This resolves the first TypeScript error.
          */}
          <CustomerList
            customers={customers}
            selectedCustomerId={selectedCustomerId}
            onCustomerSelect={setSelectedCustomerId}
          />
          <div className="mt-6">
            <h2 className="text-xl font-semibold mb-2">
              Vehicles for {selectedCustomer ? selectedCustomer.firstName : '...'}
            </h2>
            {/*
              Pass the selected customer's vehicles to the VehicleList.
              This resolves the second TypeScript error by providing the required 'vehicles' prop.
            */}
            <VehicleList vehicles={selectedCustomer?.vehicles || []} />
          </div>
        </div>
        <div>
          {/* Pass the fetchCustomers function so the list refreshes after adding a new customer */}
          <CustomerForm onSubmit={fetchCustomers} />
        </div>
      </div>
    </div>
  );
};

export default CustomersPage;
