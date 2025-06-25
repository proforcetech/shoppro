import React from 'react';
import { Link } from 'react-router-dom';
import type { CustomerType } from '../../types'; // Using CustomerType which includes vehicles

/**
 * Props for the CustomerList component.
 * @interface CustomerListProps
 * @property {CustomerType[]} customers - The list of customers to display.
 * @property {string | null} selectedCustomerId - The ID of the currently selected customer.
 * @property {(id: string) => void} onCustomerSelect - Callback to handle customer selection.
 */
interface CustomerListProps {
  customers: CustomerType[];
  selectedCustomerId: string | null;
  onCustomerSelect: (id: string) => void;
}

/**
 * CustomerList Component
 * Displays a list of customers in a table. Allows selecting a customer.
 * This is a presentational component that receives its data and handlers via props.
 */
export const CustomerList: React.FC<CustomerListProps> = ({
  customers,
  selectedCustomerId,
  onCustomerSelect,
}) => {
  return (
    <div className="card bg-base-100 shadow-xl">
      <div className="card-body">
        <h2 className="card-title">Customer List</h2>
        <div className="overflow-x-auto">
          <table className="table w-full table-hover">
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th />
              </tr>
            </thead>
            <tbody>
              {customers.map(customer => (
                <tr
                  key={customer.id}
                  onClick={() => onCustomerSelect(customer.id)}
                  className={selectedCustomerId === customer.id ? 'active' : ''}
                  style={{ cursor: 'pointer' }}
                >
                  <td>
                    <div className="font-bold">{customer.firstName} {customer.lastName}</div>
                  </td>
                  <td>{customer.email}</td>
                  <td>{customer.phone}</td>
                  <th>
                  <Link
                      to={`/customers/${customer.id}`}
                      className="btn btn-ghost btn-xs"
                      onClick={e => e.stopPropagation()} // Prevent row click from firing when editing
                    >
                      Details
                    </Link>
                    <Link
                      to={`/customers/${customer.id}/edit`}
                      className="btn btn-ghost btn-xs"
                      onClick={e => e.stopPropagation()} // Prevent row click from firing when editing
                    >
                      Edit
                    </Link>
                  </th>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
