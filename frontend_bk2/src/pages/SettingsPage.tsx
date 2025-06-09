import { RoleManager } from '../features/settings/RoleManager';
import { PreferencesForm } from '../features/settings/PreferencesForm';

export const SettingsPage = () => (
  <div className="p-6 space-y-6">
    <h1 className="text-2xl font-bold">Admin Settings</h1>
    <RoleManager />
    <PreferencesForm />
  </div>
);

