import React, { useState } from 'react';
import apiClient from '../../api/client';
import { useToast } from '../../context/ToastContext';

interface CustomerFormProps {
  onCustomerAdded: () => void; // Callback to refresh the customer list
}

const CustomerForm: React.FC<CustomerFormProps> = ({ onCustomerAdded }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const { showToast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await apiClient.post('/customers', { name, email, phone, address });
      showToast('Customer added successfully!', 'success');
      onCustomerAdded(); // Trigger the callback
      // Clear form
      setName('');
      setEmail('');
      setPhone('');
      setAddress('');
    } catch (error) {
      showToast('Failed to add customer.', 'error');
      console.error(error);
    }
  };

  return (
    <div className="bg-white p-4 rounded shadow-md mb-4">
      <h2 className="text-xl font-bold mb-4">Add New Customer</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full p-2 border rounded"
          required
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-2 border rounded"
          required
        />
        <input
          type="text"
          placeholder="Phone"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          className="w-full p-2 border rounded"
        />
        <input
          type="text"
          placeholder="Address"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          className="w-full p-2 border rounded"
        />
        <button type="submit" className="btn bg-blue-600 text-white">
          Save Customer
        </button>
      </form>
    </div>
  );
};

export default CustomerForm;