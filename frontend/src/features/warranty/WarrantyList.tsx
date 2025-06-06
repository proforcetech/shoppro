import { useEffect, useState } from 'react';
import { api } from '../../api/client';

export const WarrantyList = () => {
  const [claims, setClaims] = useState([]);

  useEffect(() => {
    api.get('/warranty').then(res => setClaims(res.data));
  }, []);

  return (
    <div className="mt-6">
      <h2 className="text-xl font-semibold mb-3">Submitted Claims</h2>
      <div className="space-y-3">
        {claims.length === 0 && <p className="text-gray-500 text-sm">No claims submitted.</p>}
        {claims.map((claim: any) => (
          <div key={claim.id} className="p-3 border rounded bg-white shadow-sm">
            <p className="text-sm font-semibold">Invoice #{claim.invoiceId.slice(0, 8)}</p>
            <p className="text-sm text-gray-500">Issue: {claim.issue}</p>
            <p className="text-xs text-gray-400">Status: {claim.status}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

