import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { CustomerForm } from '../features/customers/CustomerForm';
import apiClient from '../api/client';
import { Customer } from '../types';
import { useToast } from '../context/ToastContext';
import ConfirmationModal from '../components/modals/ConfirmationModal';

/**
 * EditCustomerPage Component
 * Provides a page for editing an existing customer's information and deleting them.
 */
export const EditCustomerPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [customer, setCustomer] = useState<Customer | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { showToast } = useToast();

  useEffect(() => {
    if (id) {
      apiClient.get(`/customers/${id}`)
        .then(res => setCustomer(res.data))
        .catch(() => navigate('/404')); // Redirect if customer not found
    }
  }, [id, navigate]);

  const handleUpdate = async (values: Partial<Customer>) => {
    try {
      await apiClient.patch(`/customers/${id}`, values);
      showToast('Customer updated successfully!', 'success');
      navigate(`/customers/${id}`); // Navigate to the customer view page
    } catch (error) {
      console.error('Failed to update customer:', error);
      showToast('Failed to update customer.', 'error');
    }
  };

  const handleDelete = async () => {
    setIsModalOpen(false); // Close the modal
    try {
      await apiClient.delete(`/customers/${id}`);
      showToast('Customer deleted successfully!', 'success');
      navigate('/customers'); // Navigate back to the main list
    } catch (error) {
      console.error('Failed to delete customer:', error);
      showToast('Failed to delete customer.', 'error');
    }
  };

  if (!customer) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <div className="container mx-auto p-4">
        <div className="flex justify-between items-center mb-4">
            <h1 className="text-2xl font-bold">Edit Customer</h1>
            <button
              onClick={() => setIsModalOpen(true)}
              className="btn btn-error"
            >
              Delete Customer
            </button>
        </div>
        <CustomerForm
          onSubmit={handleUpdate}
          initialValues={customer}
        />
      </div>

      <ConfirmationModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={handleDelete}
        title="Delete Customer"
        message={`Are you sure you want to delete ${customer.firstName} ${customer.lastName}? This action cannot be undone.`}
      />
    </>
  );
};


