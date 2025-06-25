import React, { useState, useEffect } from 'react';
import { CustomerList } from '../features/customers/CustomerList';
import { CustomerForm } from '../features/customers/CustomerForm';
import { VehicleList } from '../features/customers/VehicleList';
import client from '../api/client';
import { Customer, CustomerType } from '../types';
import { useDebounce } from '../hooks/useDebounce';

const CustomersPage: React.FC = () => {
  const [customers, setCustomers] = useState<CustomerType[]>([]);
  const [selectedCustomerId, setSelectedCustomerId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  // State for search and pagination
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  
  // Debounce the search term to avoid excessive API calls
  const debouncedSearchTerm = useDebounce(searchTerm, 500);

  /**
   * Fetches customers from the API with search and pagination.
   * @param page - The page number to fetch.
   * @param search - The search term to use.
   */
  const fetchCustomers = async (page: number, search: string) => {
    setIsLoading(true);
    try {
      const response = await client.get('/customers', {
        params: { search, page, limit: 10 },
      });
      const { data, totalPages: newTotalPages, currentPage: newCurrentPage } = response.data;
      
      setCustomers(data);
      setTotalPages(newTotalPages);
      setCurrentPage(newCurrentPage);

      // Logic to select a customer after data is fetched
      if (data.length > 0) {
        const currentSelectionInList = data.some((c: CustomerType) => c.id === selectedCustomerId);
        if (!selectedCustomerId || !currentSelectionInList) {
          setSelectedCustomerId(data[0].id);
        }
      } else {
        setSelectedCustomerId(null);
      }
    } catch (error) {
      console.error('Failed to fetch customers:', error);
    } finally {
      setIsLoading(false);
    }
  };
  
  // Effect to re-fetch data when debounced search term changes
  useEffect(() => {
    fetchCustomers(1, debouncedSearchTerm);
  }, [debouncedSearchTerm]);

  const handleCreateCustomer = async (values: Partial<Customer>) => {
    try {
      await client.post('/customers', values);
      // After creating, fetch the first page without any search term
      setSearchTerm(''); // Clear search to show the new customer
      if (currentPage !== 1 || searchTerm !== '') {
          fetchCustomers(1, '');
      }
    } catch (error) {
      console.error('Failed to create customer:', error);
    }
  };

  const selectedCustomer = customers.find(c => c.id === selectedCustomerId);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Customer Management</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2">
          {/* Search Input */}
          <div className="mb-4">
            <input
              type="text"
              placeholder="Search customers by name or email..."
              className="input input-bordered w-full"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          {isLoading ? (
            <div className="flex justify-center items-center h-48">
              <span className="loading loading-spinner loading-lg"></span>
            </div>
          ) : (
            <CustomerList
              customers={customers}
              selectedCustomerId={selectedCustomerId}
              onCustomerSelect={setSelectedCustomerId}
            />
          )}

          {/* Pagination Controls */}
          <div className="flex justify-between items-center mt-4">
            <button
              className="btn"
              onClick={() => fetchCustomers(currentPage - 1, debouncedSearchTerm)}
              disabled={currentPage <= 1 || isLoading}
            >
              « Previous
            </button>
            <span>
              Page {currentPage} of {totalPages}
            </span>
            <button
              className="btn"
              onClick={() => fetchCustomers(currentPage + 1, debouncedSearchTerm)}
              disabled={currentPage >= totalPages || isLoading}
            >
              Next »
            </button>
          </div>

          <div className="mt-6">
            <h2 className="text-xl font-semibold mb-2">
              Vehicles for {selectedCustomer ? `${selectedCustomer.firstName} ${selectedCustomer.lastName}` : '...'}
            </h2>
            <VehicleList vehicles={selectedCustomer?.vehicles || []} />
          </div>
        </div>
        <div>
          <CustomerForm onSubmit={handleCreateCustomer} />
        </div>
      </div>
    </div>
  );
};

export default CustomersPage;
