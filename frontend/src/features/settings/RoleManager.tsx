import { useEffect, useState } from 'react';
import { api } from '../../api/client';

type UserType = {
  id: string;
  email: string;
  role: 'ADMIN' | 'MANAGER' | 'TECHNICIAN' | 'ACCOUNTANT' | 'FRONT_DESK';
};

export const RoleManager = () => {
  const [users, setUsers] = useState<UserType[]>([]);

  useEffect(() => {
    api.get('/users').then(res => setUsers(res.data));
  }, []);

  const updateRole = async (id: string, role: UserType['role']) => {
    await api.patch(`/users/${id}/role`, { role });
    const updated = users.map(u => u.id === id ? { ...u, role } : u);
    setUsers(updated);
  };

  return (
    <div className="bg-white p-4 rounded shadow-sm space-y-4">
      <h2 className="text-xl font-semibold">User Role Manager</h2>
      {users.map(u => (
        <div key={u.id} className="flex items-center justify-between border-b py-2">
          <div>
            <p className="font-medium">{u.email}</p>
            <p className="text-xs text-gray-500">Current: {u.role}</p>
          </div>
          <select
            value={u.role}
            onChange={e =>
              updateRole(u.id, e.target.value as UserType['role'])
            }
            className="border px-2 py-1 rounded"
          >
            <option value="ADMIN">Admin</option>
            <option value="MANAGER">Manager</option>
            <option value="TECHNICIAN">Technician</option>
            <option value="ACCOUNTANT">Accountant</option>
            <option value="FRONT_DESK">Front Desk</option>
          </select>
        </div>
      ))}
    </div>
  );
};
