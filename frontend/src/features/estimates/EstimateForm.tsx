import React, { useState, useEffect } from 'react';
import apiClient from '../../api/client';
import { CustomerType, VehicleType, Job } from '../../types';

const EstimateForm = () => {
  const [customers, setCustomers] = useState<CustomerType[]>([]);
  const [selectedCustomerId, setSelectedCustomerId] = useState<string>('');
  const [selectedVehicleId, setSelectedVehicleId] = useState<string>('');
  const [jobs, setJobs] = useState<Partial<Job>[]>([{ description: '', laborHours: 0 }]);
  
  useEffect(() => {
    // Fetch all customers for the dropdown
    apiClient.get('/customers').then(res => setCustomers(res.data));
  }, []);

  const handleAddJob = () => {
    setJobs([...jobs, { description: '', laborHours: 0 }]);
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedCustomerId || !selectedVehicleId) {
        alert('Please select a customer and a vehicle.');
        return;
    }
    const payload = {
        customerId: selectedCustomerId,
        vehicleId: selectedVehicleId,
        jobs: jobs.filter(j => j.description),
    };
    try {
        await apiClient.post('/estimates', payload);
        alert('Estimate created!');
    } catch (err) {
        console.error(err);
        alert('Failed to create estimate.');
    }
  };

  const selectedCustomer = customers.find(c => c.id === selectedCustomerId);

  return (
    <form onSubmit={handleSubmit} className="space-y-4 bg-white p-4 rounded-lg shadow-md">
        <h2 className="text-xl font-bold">Create New Estimate</h2>
        <div>
            <label className="block text-sm font-medium">Customer</label>
            <select
                value={selectedCustomerId}
                onChange={e => {
                    setSelectedCustomerId(e.target.value);
                    setSelectedVehicleId(''); // Reset vehicle on customer change
                }}
                className="w-full p-2 border rounded mt-1"
                required
            >
                <option value="">-- Select Customer --</option>
                {customers.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
            </select>
        </div>

        <div>
            <label className="block text-sm font-medium">Vehicle</label>
            <select
                value={selectedVehicleId}
                onChange={e => setSelectedVehicleId(e.target.value)}
                className="w-full p-2 border rounded mt-1"
                disabled={!selectedCustomer}
                required
            >
                <option value="">-- Select Vehicle --</option>
                {selectedCustomer?.vehicles.map(v => <option key={v.id} value={v.id}>{`${v.year} ${v.make} ${v.model}`}</option>)}
            </select>
        </div>
        
        {/* Job entry fields */}
        <h3 className="font-bold">Jobs</h3>
        {jobs.map((job, index) => (
            <div key={index} className="flex gap-2">
                <input 
                    type="text" 
                    placeholder="Job description" 
                    value={job.description} 
                    onChange={e => {
                        const newJobs = [...jobs];
                        newJobs[index].description = e.target.value;
                        setJobs(newJobs);
                    }}
                    className="flex-grow p-2 border rounded"
                />
                <input 
                    type="number" 
                    placeholder="Labor Hours" 
                    value={job.laborHours} 
                    onChange={e => {
                        const newJobs = [...jobs];
                        newJobs[index].laborHours = parseFloat(e.target.value) || 0;
                        setJobs(newJobs);
                    }}
                    className="w-32 p-2 border rounded"
                />
            </div>
        ))}
        <button type="button" onClick={handleAddJob} className="btn btn-sm bg-gray-200">Add Job</button>
        
        <hr/>
        <button type="submit" className="btn bg-blue-600 text-white w-full">Create Estimate</button>
    </form>
  );
};

export default EstimateForm;