import EstimateForm from '../features/estimates/EstimateForm';
import { EstimateList } from '../features/estimates/EstimateList';

export const EstimatesPage = () => {
  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-semibold">Estimates</h1>
      <EstimateForm />
      <EstimateList />
    </div>
  );
};

