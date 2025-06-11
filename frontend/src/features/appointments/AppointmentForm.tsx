import { useEffect, useState } from 'react';
import apiClient from '../../api/client';

// 1. Define Interfaces for your data
interface Vehicle {
  id: string | number; // Use string or number based on your actual data type
  year: number;
  make: string;
  model: string;
}

interface Technician {
  id: string | number; // Use string or number
  email: string;
  // Add other technician properties if needed
}

interface AppointmentFormState {
  vehicleId: string;
  techId: string;
  startTime: string;
  endTime: string;
  type: string;
  isMobile: boolean;
}

export const AppointmentForm = () => {
  // 2. Type your state
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [techs, setTechs] = useState<Technician[]>([]);
  const [form, setForm] = useState<AppointmentFormState>({
    vehicleId: '',
    techId: '',
    startTime: '',
    endTime: '',
    type: '',
    isMobile: false,
  });

  useEffect(() => {
    api.get('/vehicles').then(res => setVehicles(res.data as Vehicle[])); // You might need to assert the type here if API client is not typed
    api.get('/users?role=TECHNICIAN').then(res => setTechs(res.data as Technician[])); // Same here
  }, []);

  const submit = async () => {
    await api.post('/appointments', form);
    alert('Appointment booked!');
    // Optionally, reset the form or navigate away
  };

  return (
    <div className="p-4 bg-white border rounded shadow-sm space-y-3">
      <h2 className="text-xl font-bold">Schedule Appointment</h2>

      <select
        value={form.vehicleId} // Control the component
        onChange={e => setForm({ ...form, vehicleId: e.target.value })}
        className="input w-full"
      >
        <option value="">Select Vehicle</option>
        {vehicles.map(v => (
          <option key={v.id} value={v.id}>
            {v.year} {v.make} {v.model}
          </option>
        ))}
      </select>

      <select
        value={form.techId} // Control the component
        onChange={e => setForm({ ...form, techId: e.target.value })}
        className="input w-full"
      >
        <option value="">Assign Technician</option>
        {techs.map(t => (
          <option key={t.id} value={t.id}>
            {t.email}
          </option>
        ))}
      </select>

      <input
        type="datetime-local"
        value={form.startTime} // Control the component
        onChange={e => setForm({ ...form, startTime: e.target.value })}
        className="input w-full"
      />
      <input
        type="datetime-local"
        value={form.endTime} // Control the component
        onChange={e => setForm({ ...form, endTime: e.target.value })}
        className="input w-full"
      />
      <input
        placeholder="Type (e.g. Repair, Inspection)"
        value={form.type} // Control the component
        onChange={e => setForm({ ...form, type: e.target.value })}
        className="input w-full"
      />

      <label className="flex items-center gap-2">
        <input
          type="checkbox"
          checked={form.isMobile}
          onChange={e => setForm({ ...form, isMobile: e.target.checked })}
        />
        Mobile Service
      </label>

      <button onClick={submit} className="btn bg-blue-600 text-white w-full">
        Book Appointment
      </button>
    </div>
  );
};
