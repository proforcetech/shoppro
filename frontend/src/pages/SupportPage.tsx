import { useAuth } from '../context/AuthContext';
import { SupportForm } from '../features/support/SupportForm';
import { SupportList } from '../features/support/SupportList';

export const SupportPage = () => {
  const { user } = useAuth();
  const isAdmin = user?.role === 'ADMIN';

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold">Support Center</h1>
      {isAdmin ? <SupportList /> : <SupportForm />}
    </div>
  );
};

