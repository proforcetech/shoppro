import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { CustomerForm } from '../features/customers/CustomerForm';
import apiClient from '../api/client';
import type { Customer } from '../types';

/**
 * EditCustomerPage Component
 * * This component provides a page for editing an existing customer's information.
 * It fetches the customer data based on the ID from the URL, pre-fills the
 * CustomerForm, and handles the update submission.
 */
export const EditCustomerPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [customer, setCustomer] = useState<Customer | null>(null);

  /**
   * Effect hook to fetch customer data when the component mounts or the id changes.
   */
  useEffect(() => {
    const fetchCustomer = async () => {
      try {
        const response = await apiClient.get(`/customers/${id}`);
        setCustomer(response.data);
      } catch (error) {
        console.error('Failed to fetch customer:', error);
        // Optionally, navigate to a not-found page or show an error message
      }
    };

    if (id) {
      fetchCustomer();
    }
  }, [id]);

  /**
   * Handles the form submission to update the customer.
   * On successful update, it navigates back to the main customers page.
   * @param {Partial<Customer>} values - The updated customer data from the form.
   */
  const handleUpdate = async (values: Partial<Customer>) => {
    try {
      await apiClient.patch(`/customers/${id}`, values);
      navigate('/customers');
    } catch (error) {
      console.error('Failed to update customer:', error);
      // Here you might want to show a toast notification with the error
    }
  };

  // Display a loading message while the customer data is being fetched.
  if (!customer) {
    return <div>Loading...</div>;
  }

  // Render the customer form with pre-filled data.
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Edit Customer</h1>
      <CustomerForm
        onSubmit={handleUpdate}
        initialValues={customer}
      />
    </div>
  );
};