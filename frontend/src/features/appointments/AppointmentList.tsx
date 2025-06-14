import { useEffect, useState } from 'react';
import apiClient from '../../api/client';

// Adjusted Vehicle interface (added optional vin)
interface Vehicle {
  id: number;
  year: number;
  make: string;
  model: string;
  vin?: string; // Property 'vin' is accessed
}

// Adjusted Technician interface (added optional user with email)
interface UserProfile { // Renamed to avoid conflict if 'User' is a common name
  email: string;
}

interface Technician {
  id: string | number;
  user?: UserProfile; // Property 'user.email' is accessed via technician
  // If technician can also have a direct email, you can add: email?: string;
}

// Interface for the main Appointment object
interface Appointment {
  id: string | number; // Or be more specific, e.g., number
  type: string;
  startTime: string; // Assuming it's a string representation of a date
  endTime: string;   // Assuming it's a string representation of a date
  isMobile: boolean;
  technician?: Technician; // Optional based on usage appt.technician?.user?.email
  vehicle?: Vehicle;     // Optional based on usage appt.vehicle?.year
}

// AppointmentFormState is not used in this component, so it can be removed
// from this file to resolve the TS6196 error for it.
// interface AppointmentFormState {
//   vehicleId: string;
//   techId: string;
//   startTime: string;
//   endTime: string;
//   type: string;
//   isMobile: boolean;
// }

export const AppointmentList = () => {
  // Type the list state with the Appointment interface
  const [list, setList] = useState<Appointment[]>([]);
  const [date, setDate] = useState(() => new Date().toISOString().split('T')[0]);

  useEffect(() => {
    apiClient.get(`/appointments/day?date=${date}`).then(res => {
      // It's good practice to ensure the data conforms to the type
      // You might need type assertion if 'apiClient.get' is not strongly typed:
      // setList(res.data as Appointment[]);
      setList(res.data);
    });
  }, [date]);

  return (
    <div className="mt-4">
      <div className="mb-2 flex items-center gap-4">
        <h2 className="text-xl font-bold">Appointments for {date}</h2>
        <input type="date" value={date} onChange={e => setDate(e.target.value)} className="input" />
      </div>

      <div className="space-y-2">
        {list.length === 0 && <p className="text-sm text-gray-500">No appointments found.</p>}
        {list.map(appt => (
          <div key={appt.id} className="border p-3 rounded bg-white shadow-sm">
            <p className="font-semibold">{appt.type}</p>
            <p className="text-sm text-gray-500">
              {new Date(appt.startTime).toLocaleTimeString()} - {new Date(appt.endTime).toLocaleTimeString()}
              {' • '}Tech: {appt.technician?.user?.email ?? 'N/A'} {/* Added nullish coalescing for safer display */}
            </p>
            <p className="text-xs text-gray-400">
              {appt.vehicle?.year} {appt.vehicle?.make} {appt.vehicle?.model} • VIN: {appt.vehicle?.vin ?? 'N/A'} {/* Added nullish coalescing */}
            </p>
            {appt.isMobile && <span className="text-xs text-blue-600">📍 Mobile</span>}
          </div>
        ))}
      </div>
    </div>
  );
};
