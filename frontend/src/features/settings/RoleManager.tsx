import { useState, useEffect } from 'react';
import apiClient from '../../api/client';
import { useAuth } from '../../context/AuthContext';
import type { User } from '../../types';

const RoleManager = () => {
  const [users, setUsers] = useState<User[]>([]);
  const { user: currentUser } = useAuth();

  useEffect(() => {
    apiClient.get('/users').then(res => setUsers(res.data));
  }, []);

  const canManage = (targetUser: User): boolean => {
    if (currentUser?.role !== 'MANAGER') return true; // Admins can manage anyone
    // Managers cannot manage ADMINs or ACCOUNTANTs
    return targetUser.role !== 'ADMIN' && targetUser.role !== 'ACCOUNTANT';
  };

  return (
    <div className="bg-white p-4 rounded shadow-md">
      <h3 className="font-bold mb-2">Manage User Roles</h3>
      <ul className="space-y-2">
        {users.map(user => (
          <li key={user.id} className="flex justify-between items-center">
            <span>{user.email} - <span className="font-semibold">{user.role}</span></span>
            <div>
              <button 
                className="btn btn-sm bg-gray-200 mr-2 disabled:opacity-50"
                disabled={!canManage(user)}
              >
                Edit
              </button>
              <button 
                className="btn btn-sm bg-red-500 text-white disabled:opacity-50"
                disabled={!canManage(user)}
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RoleManager;
