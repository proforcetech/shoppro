// src/pages/EstimatesPage.tsx

import React from 'react';
import EstimateForm from '../features/estimates/EstimateForm';
import { EstimateList } from '../features/estimates/EstimateList';
import client from '../api/client';
import type { EstimateFormData } from '../types';

const EstimatesPage: React.FC = () => {
  const handleCreateEstimate = async (data: EstimateFormData) => {
    try {
      await client.post('/estimates', data);
      // refresh list or show toast if you like
    } catch (error) {
      console.error('Failed to create estimate', error);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Estimates</h1>
      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-2">Create New Estimate</h2>
        <EstimateForm onSubmit={handleCreateEstimate} submitLabel="Create Estimate" />
      </section>
      <section>
        <h2 className="text-xl font-semibold mb-2">All Estimates</h2>
        <EstimateList />
      </section>
    </div>
  );
};

export default EstimatesPage;
