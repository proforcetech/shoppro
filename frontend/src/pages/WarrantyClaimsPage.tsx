import { WarrantyForm } from '../features/warranty/WarrantyForm';
import { WarrantyList } from '../features/warranty/WarrantyList';

export const WarrantyClaimsPage = () => {
  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold">Warranty Claims</h1>
      <WarrantyForm />
      <WarrantyList />
    </div>
  );
};

