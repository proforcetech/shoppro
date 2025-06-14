import React, { useState } from 'react';
import apiClient from '../../api/client';
import { useToast } from '../../context/ToastContext';

const UserForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [role, setRole] = useState('TECHNICIAN');
  const { showToast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await apiClient.post('/users', { email, password, firstName, lastName, role });
      showToast('User created successfully!', 'success');
      // Clear form
      setEmail('');
      setPassword('');
      setFirstName('');
      setLastName('');
      setRole('TECHNICIAN');
    } catch (error) {
      showToast('Failed to create user.', 'error');
    }
  };

  return (
    <div className="bg-white p-4 rounded shadow-md mb-4">
      <h2 className="text-xl font-bold mb-4">Create New User</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Form fields for email, password, firstName, lastName */}
        <input type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} className="w-full p-2 border rounded" required />
        <input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} className="w-full p-2 border rounded" required />
        <input type="text" placeholder="First Name" value={firstName} onChange={e => setFirstName(e.target.value)} className="w-full p-2 border rounded" />
        <input type="text" placeholder="Last Name" value={lastName} onChange={e => setLastName(e.target.value)} className="w-full p-2 border rounded" />
        <div>
          <label className="block text-sm font-medium text-gray-700">Role</label>
          <select value={role} onChange={e => setRole(e.target.value)} className="mt-1 block w-full p-2 border rounded">
            <option value="TECHNICIAN">Technician</option>
            <option value="FRONT_DESK">Front Desk</option>
            <option value="MANAGER">Manager</option>
            <option value="ACCOUNTANT">Accountant</option>
            <option value="ADMIN">Admin</option>
          </select>
        </div>
        <button type="submit" className="btn bg-blue-600 text-white">Create User</button>
      </form>
    </div>
  );
};

export default UserForm;