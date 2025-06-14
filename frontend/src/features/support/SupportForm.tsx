import { useState } from 'react';
import apiClient from '../../api/client';


export const SupportForm = () => {
  const [form, setForm] = useState({ subject: '', message: '' });

  const submit = async () => {
    await apiClient.post('/support', form);
    alert('Support request sent!');
    setForm({ subject: '', message: '' });
  };

  return (
    <div className="p-4 bg-white border rounded shadow-sm space-y-4">
      <h2 className="text-xl font-bold">Submit Support Ticket</h2>

      <input
        value={form.subject}
        onChange={e => setForm({ ...form, subject: e.target.value })}
        placeholder="Subject"
        className="input w-full"
      />
      <textarea
        value={form.message}
        onChange={e => setForm({ ...form, message: e.target.value })}
        placeholder="Describe the issue..."
        className="input w-full h-28"
      />

      <button onClick={submit} className="btn bg-blue-600 text-white w-full">Submit Ticket</button>
    </div>
  );
};

