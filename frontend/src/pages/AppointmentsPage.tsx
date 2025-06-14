import AppointmentForm from '../features/appointments/AppointmentForm';
import { AppointmentList } from '../features/appointments/AppointmentList';

export const AppointmentsPage = () => (
  <div className="p-6 space-y-6">
    <h1 className="text-2xl font-bold">Appointments</h1>
    <AppointmentForm />
    <AppointmentList />
  </div>
);

