import React, { useState, useEffect, useMemo } from 'react';
import apiClient from '../../api/client';
import { CustomerType } from '../../types';
import { useToast } from '../../context/ToastContext';

// Define initial states for clarity
const initialJobState = {
  laborDescription: '',
  laborRate: 0,
  laborTime: 1,
  parts: [{ name: '', sku: '', quantity: 1, pricePerUnit: 0 }],
};
const initialFeesState = {
    shopFee: 0,
    hazardousDisposalFee: 0,
    isMobile: false,
    serviceLocation: '',
    calloutFee: 0,
    mileage: 0,
    mileageRate: 0
};
const initialTaxState = {
    isTaxable: true,
    taxRate: 7.5 // Default tax rate, can be fetched from settings
};

const EstimateForm = () => {
    const [customers, setCustomers] = useState<CustomerType[]>([]);
    const [selectedCustomerId, setSelectedCustomerId] = useState<string>('');
    const [selectedVehicleId, setSelectedVehicleId] = useState<string>('');
    const [jobs, setJobs] = useState([initialJobState]);
    const [fees, setFees] = useState(initialFeesState);
    const [tax, setTax] = useState(initialTaxState);

    const { showToast } = useToast();

    // Fetch customers on component mount
    useEffect(() => {
        apiClient.get('/customers').then(res => setCustomers(res.data));
    }, []);

    // --- State Update Handlers ---
    const handleJobChange = (jobIndex: number, field: string, value: any) => {
        const newJobs = [...jobs];
        (newJobs[jobIndex] as any)[field] = value;
        setJobs(newJobs);
    };

    const handlePartChange = (jobIndex: number, partIndex: number, field: string, value: any) => {
        const newJobs = [...jobs];
        (newJobs[jobIndex].parts[partIndex] as any)[field] = value;
        setJobs(newJobs);
    };

    const addJob = () => setJobs([...jobs, { ...initialJobState, parts: [{ name: '', sku: '', quantity: 1, pricePerUnit: 0 }] }]);
    const addPart = (jobIndex: number) => {
        const newJobs = [...jobs];
        newJobs[jobIndex].parts.push({ name: '', sku: '', quantity: 1, pricePerUnit: 0 });
        setJobs(newJobs);
    };
    
    // --- Real-time Calculations ---
    const { subTotal, feeTotal, taxTotal, total } = useMemo(() => {
        const laborSubTotal = jobs.reduce((acc, job) => acc + (job.laborRate || 0) * (job.laborTime || 0), 0);
        const partsSubTotal = jobs.reduce((acc, job) => 
            acc + job.parts.reduce((partAcc, part) => partAcc + (part.quantity || 0) * (part.pricePerUnit || 0), 0)
        , 0);
        const subTotal = laborSubTotal + partsSubTotal;

        const mileageFee = fees.isMobile ? (fees.mileage || 0) * (fees.mileageRate || 0) : 0;
        const feeTotal = (fees.shopFee || 0) + (fees.hazardousDisposalFee || 0) + (fees.isMobile ? (fees.calloutFee || 0) : 0) + mileageFee;

        const taxableAmount = tax.isTaxable ? subTotal : 0;
        const taxTotal = taxableAmount * ((tax.taxRate || 0) / 100);

        const total = subTotal + feeTotal + taxTotal;

        return { subTotal, feeTotal, taxTotal, total };
    }, [jobs, fees, tax]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const payload = {
            customerId: selectedCustomerId,
            vehicleId: selectedVehicleId,
            jobs,
            ...fees,
            ...tax
        };
        try {
            await apiClient.post('/estimates', payload);
            showToast('Estimate created successfully!', 'success');
        } catch (err) {
            showToast('Failed to create estimate.', 'error');
            console.error(err);
        }
    };

    const selectedCustomer = customers.find(c => c.id === selectedCustomerId);

    return (
        <form onSubmit={handleSubmit} className="space-y-6 bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold">Create New Estimate</h2>
            
            {/* Customer and Vehicle Selection */}
            <div className="grid grid-cols-2 gap-4">
                <select value={selectedCustomerId} onChange={e => setSelectedCustomerId(e.target.value)} className="w-full p-2 border rounded" required>
                    <option value="">-- Select Customer --</option>
                    {customers.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                </select>
                <select value={selectedVehicleId} onChange={e => setSelectedVehicleId(e.target.value)} className="w-full p-2 border rounded" disabled={!selectedCustomerId} required>
                    <option value="">-- Select Vehicle --</option>
                    {selectedCustomer?.vehicles.map(v => <option key={v.id} value={v.id}>{`${v.year} ${v.make} ${v.model}`}</option>)}
                </select>
            </div>

            {/* Jobs Section */}
            <div className="space-y-4">
                {jobs.map((job, jobIndex) => (
                    <div key={jobIndex} className="p-4 border rounded-md space-y-3 bg-gray-50">
                        <h3 className="font-bold text-lg">Job #{jobIndex + 1}</h3>
                        {/* Labor */}
                        <div className="grid grid-cols-4 gap-2 items-end">
                            <input type="text" placeholder="Labor Description" value={job.laborDescription} onChange={e => handleJobChange(jobIndex, 'laborDescription', e.target.value)} className="col-span-2 p-2 border rounded" required/>
                            <input type="number" placeholder="Rate ($/hr)" value={job.laborRate} onChange={e => handleJobChange(jobIndex, 'laborRate', parseFloat(e.target.value))} className="p-2 border rounded" />
                            <input type="number" placeholder="Time (hr)" value={job.laborTime} onChange={e => handleJobChange(jobIndex, 'laborTime', parseFloat(e.target.value))} className="p-2 border rounded" />
                        </div>
                        {/* Parts */}
                        <div className="space-y-2">
                            <h4 className="font-semibold text-md">Parts</h4>
                            {job.parts.map((part, partIndex) => (
                                <div key={partIndex} className="grid grid-cols-5 gap-2">
                                    <input type="text" placeholder="Part Name" value={part.name} onChange={e => handlePartChange(jobIndex, partIndex, 'name', e.target.value)} className="col-span-2 p-2 border rounded" />
                                    <input type="text" placeholder="SKU" value={part.sku || ''} onChange={e => handlePartChange(jobIndex, partIndex, 'sku', e.target.value)} className="p-2 border rounded" />
                                    <input type="number" placeholder="Qty" value={part.quantity} onChange={e => handlePartChange(jobIndex, partIndex, 'quantity', parseFloat(e.target.value))} className="p-2 border rounded" />
                                    <input type="number" placeholder="Unit Price ($)" value={part.pricePerUnit} onChange={e => handlePartChange(jobIndex, partIndex, 'pricePerUnit', parseFloat(e.target.value))} className="p-2 border rounded" />
                                </div>
                            ))}
                            <button type="button" onClick={() => addPart(jobIndex)} className="btn btn-sm bg-gray-200">Add Part</button>
                        </div>
                    </div>
                ))}
                <button type="button" onClick={addJob} className="btn bg-green-500 text-white">Add Job</button>
            </div>

            {/* Fees, Mobile, and Tax Sections */}
            <div className="grid grid-cols-2 gap-8">
                {/* Fees */}
                <div className="space-y-3">
                    <h3 className="font-bold text-lg">Fees & Charges</h3>
                    <input type="number" placeholder="Shop Fee" value={fees.shopFee} onChange={e => setFees({...fees, shopFee: parseFloat(e.target.value)})} className="w-full p-2 border rounded" />
                    <input type="number" placeholder="Hazardous Disposal Fee" value={fees.hazardousDisposalFee} onChange={e => setFees({...fees, hazardousDisposalFee: parseFloat(e.target.value)})} className="w-full p-2 border rounded" />
                    <label className="flex items-center gap-2"><input type="checkbox" checked={fees.isMobile} onChange={e => setFees({...fees, isMobile: e.target.checked})} /> Mobile Service</label>
                    {fees.isMobile && (
                        <div className="p-3 border rounded bg-gray-50 space-y-2">
                            <input type="text" placeholder="Service Location" value={fees.serviceLocation} onChange={e => setFees({...fees, serviceLocation: e.target.value})} className="w-full p-2 border rounded" />
                            <input type="number" placeholder="Call-out Fee" value={fees.calloutFee} onChange={e => setFees({...fees, calloutFee: parseFloat(e.target.value)})} className="w-full p-2 border rounded" />
                            <div className="grid grid-cols-2 gap-2">
                                <input type="number" placeholder="Mileage" value={fees.mileage} onChange={e => setFees({...fees, mileage: parseFloat(e.target.value)})} className="p-2 border rounded" />
                                <input type="number" placeholder="Mileage Rate ($)" value={fees.mileageRate} onChange={e => setFees({...fees, mileageRate: parseFloat(e.target.value)})} className="p-2 border rounded" />
                            </div>
                        </div>
                    )}
                </div>
                {/* Totals */}
                <div className="space-y-3 bg-gray-100 p-4 rounded-md">
                    <h3 className="font-bold text-lg">Summary</h3>
                    <div className="flex justify-between"><span>Sub-Total:</span> <span>${subTotal.toFixed(2)}</span></div>
                    <div className="flex justify-between"><span>Total Fees:</span> <span>${feeTotal.toFixed(2)}</span></div>
                    <div className="flex justify-between items-center">
                        <label className="flex items-center gap-2">
                            <input type="checkbox" checked={tax.isTaxable} onChange={e => setTax({...tax, isTaxable: e.target.checked})} /> Taxable
                        </label>
                        {tax.isTaxable && <input type="number" value={tax.taxRate} onChange={e => setTax({...tax, taxRate: parseFloat(e.target.value)})} className="w-20 p-1 border rounded" />}
                    </div>
                    <div className="flex justify-between"><span>Tax:</span> <span>${taxTotal.toFixed(2)}</span></div>
                    <hr/>
                    <div className="flex justify-between font-bold text-xl"><span>Total:</span> <span>${total.toFixed(2)}</span></div>
                </div>
            </div>

            <button type="submit" className="btn bg-blue-600 text-white w-full text-lg p-3">Create Final Estimate</button>
        </form>
    );
};

export default EstimateForm;

