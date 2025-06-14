import { useEffect, useState } from 'react';
import apiClient from '../../api/client';

type Estimate = {
  id: string;
  status: 'DRAFT' | 'APPROVED' | 'REJECTED' | string;
  createdAt: string;
  jobs: any[];
  vehicle?: {
    year: number;
    make: string;
    model: string;
  };
};

export const EstimateList = () => {
  const [estimates, setEstimates] = useState<Estimate[]>([]);

  useEffect(() => {
    apiClient.get('/estimates').then(res => setEstimates(res.data));
  }, []);

  return (
    <div className="space-y-4">
      {estimates.map(est => (
        <div key={est.id} className="p-4 border rounded-md shadow-sm bg-white">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-bold">Estimate #{est.id.slice(0, 8)}</h3>
            <span className={`text-xs px-2 py-1 rounded-full ${getStatusColor(est.status)}`}>
              {est.status}
            </span>
          </div>
          <p className="text-sm text-gray-600">
            Vehicle: {est.vehicle?.year} {est.vehicle?.make} {est.vehicle?.model}
          </p>
          <p className="text-sm text-gray-500">
            Jobs: {est.jobs.length} • Created: {new Date(est.createdAt).toLocaleDateString()}
          </p>
        </div>
      ))}
    </div>
  );
};

const getStatusColor = (status: string) => {
  switch (status) {
    case 'APPROVED': return 'bg-green-100 text-green-700';
    case 'REJECTED': return 'bg-red-100 text-red-700';
    case 'DRAFT':
    default: return 'bg-yellow-100 text-yellow-800';
  }
};
