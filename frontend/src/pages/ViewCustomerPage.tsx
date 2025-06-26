import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import apiClient from '../api/client';
import { useToast } from '../context/ToastContext';
import { CustomerType, VehicleType } from '../types';

/**
 * ViewCustomerPage Component
 * Displays detailed information for a single customer, including their
 * personal details and a list of their associated vehicles.
 */
const ViewCustomerPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [customer, setCustomer] = useState<CustomerType | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { showToast } = useToast();

  useEffect(() => {
    if (id) {
      setIsLoading(true);
      apiClient.get(`/customers/${id}`)
        .then(res => {
          setCustomer(res.data);
        })
        .catch(err => {
          console.error('Failed to fetch customer details:', err);
          showToast('Could not load customer data.', 'error');
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
  }, [id, showToast]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  if (!customer) {
    return (
      <div className="text-center p-10">
        <h2 className="text-2xl font-semibold">Customer not found.</h2>
        <Link to="/customers" className="btn btn-primary mt-4">
          Back to Customer List
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4 sm:p-6 lg:p-8">
      <div className="card bg-base-100 shadow-xl">
        <div className="card-body">
          <div className="flex justify-between items-start">
            <h1 className="card-title text-3xl mb-4">
              {customer.firstName} {customer.lastName}
            </h1>
            <Link to={`/customers/${customer.id}/edit`} className="btn btn-primary">
              Edit Customer
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div><strong>Email:</strong> {customer.email}</div>
            <div><strong>Phone:</strong> {customer.phone}</div>
            <div className="md:col-span-2"><strong>Address:</strong> {customer.address}</div>
          </div>
          
          <div className="divider mt-6 mb-4"></div>

          <h2 className="text-2xl font-semibold mb-4">Vehicles</h2>
          {customer.vehicles && customer.vehicles.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="table w-full">
                <thead>
                  <tr>
                    <th>Year</th>
                    <th>Make</th>
                    <th>Model</th>
                    <th>VIN</th>
                    <th>Mileage</th>
                  </tr>
                </thead>
                <tbody>
                  {customer.vehicles.map((vehicle: VehicleType) => (
                    <tr key={vehicle.id}>
                      <td>{vehicle.year}</td>
                      <td>{vehicle.make}</td>
                      <td>{vehicle.model}</td>
                      <td>{vehicle.vin}</td>
                      <td>{vehicle.mileage.toLocaleString()}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <p>This customer has no vehicles on record.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ViewCustomerPage;
