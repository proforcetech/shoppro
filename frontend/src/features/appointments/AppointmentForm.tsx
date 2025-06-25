// src/features/appointments/AppointmentForm.tsx
import { useState, useEffect } from 'react';
import apiClient from '../../api/client';
import { useToast } from '../../context/ToastContext';
import type {CustomerType, User } from '../../types';


const AppointmentForm = () => {
  const [customerId, setCustomerId] = useState('');
  const [vehicleId, setVehicleId] = useState('');
//  const [technicianId, setTechnicianId] = useState('');
  const [technicianId, setTechnicianId] = useState('');
  const [technicians, setTechnicians] = useState<User[]>([]);

  const [date, setDate] = useState('');
  const [description, setDescription] = useState('');
  const [customers, setCustomers] = useState<CustomerType[]>([]);
  
  const { showToast } = useToast();

  useEffect(() => {
    // Fetch customers for the dropdown
    apiClient.get('/customers')
      .then(res => setCustomers(res.data))
      .catch(err => console.error("Failed to fetch customers:", err));
    
    apiClient.get('/users?role=TECHNICIAN')
      .then(res => setTechnicians(res.data))
      .catch(err => console.error("Failed to fetch technicians:", err));
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!customerId || !vehicleId) {
      showToast('Please select a customer and vehicle.', 'error');
      return;
    }
    const payload = { customerId, vehicleId, date, description, assignedToId: technicianId || null };
    try {
      await apiClient.post('/scheduling/appointments', payload);
      showToast('Appointment created successfully!', 'success');
    } catch (error) {
      showToast('Failed to create appointment.', 'error');
      console.error(error);
    }
  };
  
  const selectedCustomerVehicles = customers.find(c => c.id === customerId)?.vehicles || [];

  return (
    <form onSubmit={handleSubmit} className="space-y-4 bg-white p-4 rounded-lg shadow-md">
      <h2 className="text-xl font-bold">Create Appointment</h2>
      <div>
        <label className="block text-sm font-medium text-gray-700">Customer</label>
        <select
          value={customerId}
          onChange={(e) => {
            setCustomerId(e.target.value);
            setVehicleId(''); // Reset vehicle selection when customer changes
          }}
          className="mt-1 block w-full p-2 border rounded"
          required
        >
          <option value="">Select a Customer</option>
          {customers.map(customer => (
            <option key={customer.id} value={customer.id}>{customer.firstName} {customer.lastName}</option>
          ))}
        </select>
      </div>

       <div>
        <label className="block text-sm font-medium text-gray-700">Vehicle</label>
        <select
          value={vehicleId}
          onChange={(e) => setVehicleId(e.target.value)}
          className="mt-1 block w-full p-2 border rounded"
          disabled={!customerId} // Disable until a customer is selected
          required
        >
          <option value="">Select a Vehicle</option>
          {selectedCustomerVehicles.map(vehicle => (
            <option key={vehicle.id} value={vehicle.id}>{`${vehicle.year} ${vehicle.make} ${vehicle.model}`}</option>
          ))}
        </select>
      </div>

      {/* Technician */}
      <div>
        <label className="block text-sm font-medium text-gray-700">Technician</label>
        <select value={technicianId}  onChange={e => setTechnicianId(e.target.value)}  className="mt-1 block w-full p-2 border rounded" required  >
          <option value="">Select a Technician</option>
          {technicians.map(t => (
            <option key={t.id} value={t.id}>
              {t.firstName} {t.lastName}
            </option>
          ))}
        </select>
      </div>
      
      {/* Other form fields like date, description, etc. go here */}
      <input type="date" value={date} onChange={e => setDate(e.target.value)} className="w-full p-2 border rounded" required />
      <textarea value={description} onChange={e => setDescription(e.target.value)} placeholder="Description of service needed" className="w-full p-2 border rounded" required />

      <button type="submit" className="btn bg-blue-600 text-white w-full">Book Appointment</button>
    </form>
  );
};

export default AppointmentForm;
