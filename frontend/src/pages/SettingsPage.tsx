import React from 'react';
import { PreferencesForm } from '../features/settings/PreferencesForm';
import RoleManager from '../features/settings/RoleManager';
import UserForm from '../features/settings/UserForm';
import { useAuth } from '../context/AuthContext';

const SettingsPage = () => {
  const { user } = useAuth();

  return (
    <div className="container mx-auto p-4 space-y-8">
      <h1 className="text-2xl font-bold">System Settings</h1>
      
      <PreferencesForm />

      {/* User management is visible to ADMIN and MANAGER */}
      {(user?.role === 'ADMIN' || user?.role === 'MANAGER') && (
        <div>
          <h2 className="text-xl font-bold mb-4">User Management</h2>
          <RoleManager />
        </div>
      )}
      
      {/* Only ADMIN can create new users */}
      {user?.role === 'ADMIN' && (
        <UserForm />
      )}

    </div>
  );
};

export default SettingsPage;