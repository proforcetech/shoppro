import { useEffect, useState } from 'react';
import apiClient from '../../api/client';

export const PreferencesForm = () => {
  const [prefs, setPrefs] = useState({ backupEnabled: false, terms: '' });
 
  const save = async () => {
    await apiClient.patch('/settings', prefs);
    alert('Preferences updated!');
  };

  return (
    <div className="bg-white p-4 rounded shadow-sm space-y-4">
      <h2 className="text-xl font-semibold">System Preferences</h2>

      <label className="flex items-center gap-2">
        <input
          type="checkbox"
          checked={prefs.backupEnabled}
          onChange={e => setPrefs({ ...prefs, backupEnabled: e.target.checked })}
        />
        Enable Auto Backup
      </label>

      <textarea
        value={prefs.terms}
        onChange={e => setPrefs({ ...prefs, terms: e.target.value })}
        placeholder="Shop Terms & Conditions"
        className="w-full border p-2 rounded h-32"
      />

      <button onClick={save} className="btn bg-blue-600 text-white">Save Preferences</button>
    </div>
  );
};

