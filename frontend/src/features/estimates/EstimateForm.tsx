import { useState, useEffect } from 'react';
import { api } from '../../api/client';
import { type Job } from '../../types';

type Vehicle = {
  id: string;
  year: number;
  make: string;
  model: string;
};


export const EstimateForm = () => {
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [selectedVehicle, setSelectedVehicle] = useState<string>('');
  const [jobs, setJobs] = useState<Job[]>([
    { description: '', laborHours: 1, rate: 100, parts: [] }
  ]);

  useEffect(() => {
    api.get('/vehicles').then(res => setVehicles(res.data));
  }, []);

  const handleAddJob = () => {
    setJobs([...jobs, { description: '', laborHours: 1, rate: 100, parts: [] }]);
  };

  const handleSubmit = async () => {
    const payload = {
      vehicleId: selectedVehicle,
      status: 'DRAFT',
      jobs
    };
    await api.post('/estimates', payload);
    alert('Estimate created!');
  };

  return (
    <div className="p-4 border rounded-md shadow-sm bg-white space-y-4">
      <h2 className="text-xl font-semibold">Create Estimate</h2>

      <select
        value={selectedVehicle}
        onChange={e => setSelectedVehicle(e.target.value)}
        className="border p-2 rounded w-full"
      >
        <option value="">Select Vehicle</option>
        {vehicles.map(v => (
          <option key={v.id} value={v.id}>
            {v.year} {v.make} {v.model}
          </option>
        ))}
      </select>

      {jobs.map((job, index) => (
        <div key={index} className="space-y-2 p-2 border rounded bg-gray-50">
          <input
            placeholder="Job Description"
            className="input w-full"
            value={job.description}
            onChange={e => {
              const copy = [...jobs];
              copy[index].description = e.target.value;
              setJobs(copy);
            }}
          />
          <div className="flex gap-2">
            <input
              type="number"
              placeholder="Labor Hours"
              className="input w-1/2"
              value={job.laborHours}
              onChange={e => {
                const copy = [...jobs];
                copy[index].laborHours = parseFloat(e.target.value);
                setJobs(copy);
              }}
            />
            <input
              type="number"
              placeholder="Rate ($/hr)"
              className="input w-1/2"
              value={job.rate}
              onChange={e => {
                const copy = [...jobs];
                copy[index].rate = parseFloat(e.target.value);
                setJobs(copy);
              }}
            />
          </div>
        </div>
      ))}

      <button onClick={handleAddJob} className="btn bg-blue-500 text-white">+ Add Job</button>
      <button onClick={handleSubmit} className="btn bg-green-600 text-white">Save Estimate</button>
    </div>
  );
};

