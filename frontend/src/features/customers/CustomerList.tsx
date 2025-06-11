import { useEffect, useState } from 'react';
import apiClient from '../../api/client';
import { VehicleList } from './VehicleList';

// 1. Define an interface for the Vehicle data
// This should match the expected structure for the 'vehicles' prop in VehicleList
interface Vehicle {
  id: string;
  vin: string;
  make: string;
  model: string;
  year: number;
  mileage: number;
}

// 2. Define an interface for the Customer data
interface Customer {
  id: string | number; // Or the specific type from your API (e.g., number, string)
  name: string;
  email: string;
  phone: string;
  address: string;
  vehicles: Vehicle[]; // An array of Vehicle objects
}

export const CustomerList = () => {
  // 3. Type your state with the Customer interface
  const [customers, setCustomers] = useState<Customer[]>([]);

  useEffect(() => {
    api.get('/customers').then(res => {
      // Optional: You can add type assertion if your api client isn't strongly typed
      // setCustomers(res.data as Customer[]);
      setCustomers(res.data);
    });
  }, []);

  return (
    <div className="space-y-6">
      {customers.map((c) => (
        <div key={c.id} className="border p-4 rounded-lg shadow-sm">
          <h3 className="text-xl font-bold text-gray-800">{c.name}</h3>
          <p className="text-gray-500">{c.email} • {c.phone}</p>
          <p className="text-sm text-gray-400">{c.address}</p>

          {/* Assuming VehicleList expects a prop named 'vehicles' of type Vehicle[] */}
          <VehicleList vehicles={c.vehicles} />
        </div>
      ))}
      {customers.length === 0 && (
        <p className="text-center text-gray-500">No customers found.</p>
      )}
    </div>
  );
};