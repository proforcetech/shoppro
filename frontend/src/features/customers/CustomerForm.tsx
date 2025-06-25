import React, { useState, useEffect } from 'react';
import type { Customer } from '../../types';

/**
 * Props for the CustomerForm component.
 * @interface CustomerFormProps
 * @property {(values: Partial<Customer>) => void} onSubmit - Callback to handle form data submission.
 * @property {Customer | null} [initialValues] - Optional values to pre-populate the form for editing.
 */
interface CustomerFormProps {
  onSubmit: (values: Partial<Customer>) => void;
  initialValues?: Customer | null;
}

/**
 * CustomerForm Component
 * A reusable form for creating or editing customer information.
 * It's a "presentational" component that relies on its parent to handle the submission logic.
 */
export const CustomerForm: React.FC<CustomerFormProps> = ({ onSubmit, initialValues }) => {
  const [firstName, setfirstName] = useState('');
  const [lastName, setlastName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [zip, setZip] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const isEditMode = Boolean(initialValues);

  /**
   * Effect to populate the form fields if initialValues are provided.
   */
  useEffect(() => {
    if (initialValues) {
      setfirstName(initialValues.firstName || '');
      setlastName(initialValues.lastName || '');
      setEmail(initialValues.email || '');
      setPhone(initialValues.phone || '');
      setAddress(initialValues.address || '');
      setCity(initialValues.city || '');
      setState(initialValues.state || '');
      setZip(initialValues.zip || '');
    }
  }, [initialValues]);

  /**
   * Handles the form submission.
   * It prevents the default form action, gathers the data, and calls the onSubmit prop.
   * @param {React.FormEvent} e - The form event.
   */
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    const customerData = { firstName, lastName, email, phone, address, city, state, zip };
    
    // The parent component is responsible for the actual API call.
    await onSubmit(customerData);

    setIsSubmitting(false);

    // Reset form only when creating a new customer
    if (!isEditMode) {
      setfirstName('');
      setlastName('');
      setEmail('');
      setPhone('');
      setAddress('');
      setCity('');
      setState('');
      setZip('');
    }
  };

  return (
    <div className="card bg-base-100 shadow-xl">
      <div className="card-body">
        <h2 className="card-title">{isEditMode ? 'Edit Customer' : 'Add New Customer'}</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-control">
            <label className="label">
              <span className="label-text">First Name</span>
            </label>
            <input
              type="text"
              placeholder="First Name"
              className="input input-bordered w-full"
              value={firstName}
              onChange={(e) => setfirstName(e.target.value)}
              required
              disabled={isSubmitting}
            />
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Last Name</span>
            </label>
            <input
              type="text"
              placeholder="Last Name"
              className="input input-bordered w-full"
              value={lastName}
              onChange={(e) => setlastName(e.target.value)}
              required
              disabled={isSubmitting}
            />
          </div>

          <div className="form-control">
            <label className="label">
              <span className="label-text">Email</span>
            </label>
            <input
              type="email"
              placeholder="Email"
              className="input input-bordered w-full"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              disabled={isSubmitting}
            />
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Phone</span>
            </label>
            <input
              type="tel"
              placeholder="Phone"
              className="input input-bordered w-full"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              disabled={isSubmitting}
            />
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Address</span>
            </label>
            <input
              type="text"
              placeholder="Address"
              className="input input-bordered w-full"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              disabled={isSubmitting}
            />
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">City</span>
            </label>
            <input
              type="text"
              placeholder="City"
              className="input input-bordered w-full"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              disabled={isSubmitting}
            />
          </div>

          <div className="form-control">
            <label className="label">
              <span className="label-text">State</span>
            </label>
            <input
              type="text"
              placeholder="Address"
              className="input input-bordered w-full"
              value={state}
              onChange={(e) => setState(e.target.value)}
              disabled={isSubmitting}
            />
          </div>

          <div className="form-control">
            <label className="label">
              <span className="label-text">Zip Code</span>
            </label>
            <input
              type="text"
              placeholder="Zip Code"
              className="input input-bordered w-full"
              value={zip}
              onChange={(e) => setZip(e.target.value)}
              disabled={isSubmitting}
            />
          </div>
          <div className="form-control mt-6">
            <button type="submit" className="btn btn-primary" disabled={isSubmitting}>
              {isSubmitting ? 'Submitting...' : (isEditMode ? 'Update Customer' : 'Add Customer')}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};