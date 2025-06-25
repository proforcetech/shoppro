import React, { useEffect, useMemo, useState } from 'react';
import apiClient from '../../api/client';
import { useToast } from '../../context/ToastContext';
import type { CustomerType, EstimateFormData, VehicleType } from '../../types';
import { SearchableSelect } from '../../components/SearchableSelect';

type EstimateFormProps = {
  initialData?: Partial<EstimateFormData>;
  onSubmit: (data: EstimateFormData) => Promise<void>;
  submitLabel?: string;
};

const EstimateForm: React.FC<EstimateFormProps> = ({
  initialData = {},
  onSubmit,
  submitLabel = 'Save Estimate',
}) => {
  const { showToast } = useToast();

  // State for the selected customer and vehicle objects
  const [selectedCustomer, setSelectedCustomer] = useState<CustomerType | null>(null);
  const [selectedVehicleId, setSelectedVehicleId] = useState<string>(initialData.vehicleId || '');

  // State for the rest of the form data, preserving existing logic
  const [jobs, setJobs] = useState<EstimateFormData['jobs']>(
    initialData.jobs || [
      {
        laborDescription: '',
        laborRate: 0,
        laborTime: 1,
        parts: [{ name: '', sku: '', quantity: 1, pricePerUnit: 0 }],
      },
    ]
  );
  const [fees, setFees] = useState({
    shopFee: initialData.shopFee ?? 0,
    hazardousDisposalFee: initialData.hazardousDisposalFee ?? 0,
    isMobile: initialData.isMobile ?? false,
    serviceLocation: initialData.serviceLocation ?? '',
    calloutFee: initialData.calloutFee ?? 0,
    mileage: initialData.mileage ?? 0,
    mileageRate: initialData.mileageRate ?? 0,
  });
  const [tax, setTax] = useState({
    isTaxable: initialData.isTaxable ?? true,
    taxRate: initialData.taxRate ?? 7.5,
  });

  // Effect to fetch the full customer object if initialData is provided for editing
  useEffect(() => {
    if (initialData.customerId) {
      apiClient.get(`/customers/${initialData.customerId}`)
        .then(res => {
          setSelectedCustomer(res.data);
          // Pre-select the vehicle if vehicleId is also present
          if(initialData.vehicleId) {
            setSelectedVehicleId(initialData.vehicleId);
          }
        })
        .catch(() => showToast('Could not load initial customer data.', 'error'));
    }
  }, [initialData.customerId, initialData.vehicleId, showToast]);


  // All existing calculation and form handling logic is preserved
  const { subTotal, feeTotal, taxTotal, total } = useMemo(() => {
    const laborSub = jobs.reduce((sum, j) => sum + j.laborRate * j.laborTime, 0);
    const partsSub = jobs.reduce(
      (sum, j) =>
        sum +
        j.parts.reduce((ps, p) => ps + p.quantity * p.pricePerUnit, 0),
      0
    );
    const feesSum =
      fees.shopFee +
      fees.hazardousDisposalFee +
      (fees.isMobile ? fees.calloutFee + fees.mileage * fees.mileageRate : 0);
    const taxableBase = tax.isTaxable ? laborSub + partsSub : 0;
    const calcTax = (taxableBase * tax.taxRate) / 100;

    return {
      subTotal: laborSub + partsSub,
      feeTotal: feesSum,
      taxTotal: calcTax,
      total: laborSub + partsSub + feesSum + calcTax,
    };
  }, [jobs, fees, tax]);

  const handleJobChange = (
    jobIndex: number,
    field: keyof EstimateFormData['jobs'][0],
    value: any
  ) => {
    const newJobs = [...jobs];
    (newJobs[jobIndex] as any)[field] = value;
    setJobs(newJobs);
  };

  const handlePartChange = (
    jobIndex: number,
    partIndex: number,
    field: keyof EstimateFormData['jobs'][0]['parts'][0],
    value: any
  ) => {
    const newJobs = [...jobs];
    (newJobs[jobIndex].parts[partIndex] as any)[field] = value;
    setJobs(newJobs);
  };

  const addJob = () =>
    setJobs([
      ...jobs,
      {
        laborDescription: '',
        laborRate: 0,
        laborTime: 1,
        parts: [{ name: '', sku: '', quantity: 1, pricePerUnit: 0 }],
      },
    ]);

  const addPart = (jobIndex: number) => {
    const newJobs = [...jobs];
    newJobs[jobIndex].parts.push({
      name: '',
      sku: '',
      quantity: 1,
      pricePerUnit: 0,
    });
    setJobs(newJobs);
  };

  /**
   * Function to handle the customer search API call.
   * This is passed to the SearchableSelect component.
   */
  const handleCustomerSearch = async (query: string): Promise<CustomerType[]> => {
    const response = await apiClient.get(`/customers/search?name=${query}`);
    return response.data;
  };

  /**
   * Callback for when a customer is selected from the search results.
   */
  const handleSelectCustomer = (customer: CustomerType | null) => {
      setSelectedCustomer(customer);
      // Reset vehicle selection when the customer changes
      setSelectedVehicleId('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedCustomer || !selectedVehicleId) {
        showToast('A customer and vehicle must be selected.', 'error');
        return;
    }
    const payload: EstimateFormData = {
      customerId: selectedCustomer.id,
      vehicleId: selectedVehicleId,
      jobs,
      ...fees,
      ...tax,
    };

    try {
      await onSubmit(payload);
      showToast('Estimate submitted successfully!', 'success');
    } catch {
      showToast('Failed to submit estimate.', 'error');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 bg-white p-6 rounded-lg shadow-md">
      {/* Customer and Vehicle Selectors */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block font-medium">Customer</label>
          {/* Replaced the static dropdown with the dynamic search component */}
          <SearchableSelect<CustomerType>
            key={selectedCustomer?.id} // Force re-render if customer changes externally
            placeholder="Search by customer name..."
            onSearch={handleCustomerSearch}
            onSelect={handleSelectCustomer}
            renderOption={(customer) => (
              <div>
                <p className="font-bold">{`${customer.firstName} ${customer.lastName}`}</p>
                <p className="text-sm text-gray-500">{customer.email}</p>
              </div>
            )}
            getOptionLabel={(customer) => `${customer.firstName} ${customer.lastName}`}
            initialValue={selectedCustomer}
          />
        </div>

        <div>
          <label className="block font-medium">Vehicle</label>
          <select
            value={selectedVehicleId}
            onChange={e => setSelectedVehicleId(e.target.value)}
            className="mt-1 block w-full border rounded p-2"
            disabled={!selectedCustomer}
          >
            <option value="">
              {selectedCustomer ? '-- Select Vehicle --' : 'Select a customer first'}
            </option>
            {selectedCustomer?.vehicles.map((v: VehicleType) => (
              <option key={v.id} value={v.id}>
                {v.year} {v.make} {v.model} ({v.vin})
              </option>
            ))}
          </select>
        </div>
      </div>
      
      {/* Rest of the form (Jobs, Parts, Fees, Tax, Summary) remains the same */}
      
      {/* Jobs & Parts */}
       <div>
         <h3 className="font-semibold">Jobs</h3>
         {jobs.map((job, ji) => (
           <div key={ji} className="border p-4 mb-4 rounded">
             <div className="grid grid-cols-3 gap-4">
               <input
                 type="text"
                 placeholder="Description"
                 value={job.laborDescription}
                 onChange={e => handleJobChange(ji, 'laborDescription', e.target.value)}
                 className="border rounded p-2 col-span-3"
               />
               <input
                 type="number"
                 placeholder="Labor Rate"
                 value={job.laborRate}
                 onChange={e => handleJobChange(ji, 'laborRate', +e.target.value)}
                 className="border rounded p-2"
               />
               <input
                 type="number"
                 placeholder="Labor Time (Hours)"
                 value={job.laborTime}
                 onChange={e => handleJobChange(ji, 'laborTime', +e.target.value)}
                 className="border rounded p-2"
               />
             </div>

             <h4 className="mt-4 font-medium">Parts</h4>
             {job.parts.map((part, pi) => (
               <div key={pi} className="grid grid-cols-4 gap-2 mb-2">
                 <input
                   type="text"
                   placeholder="Part Name"
                   value={part.name}
                   onChange={e => handlePartChange(ji, pi, 'name', e.target.value)}
                   className="border rounded p-1"
                 />
                 <input
                   type="text"
                   placeholder="SKU"
                   value={part.sku}
                   onChange={e => handlePartChange(ji, pi, 'sku', e.target.value)}
                   className="border rounded p-1"
                 />
                 <input
                   type="number"
                   placeholder="Qty"
                   value={part.quantity}
                   onChange={e => handlePartChange(ji, pi, 'quantity', +e.target.value)}
                   className="border rounded p-1"
                 />
                 <input
                   type="number"
                   placeholder="Unit Price"
                   value={part.pricePerUnit}
                   onChange={e => handlePartChange(ji, pi, 'pricePerUnit', +e.target.value)}
                   className="border rounded p-1"
                 />
               </div>
             ))}

             <button
               type="button"
               onClick={() => addPart(ji)}
               className="text-sm text-blue-600 hover:underline"
             >
               + Add Part
             </button>
           </div>
         ))}

         <button type="button" onClick={addJob} className="text-blue-600 font-semibold hover:underline">
           + Add Job
         </button>
       </div>

      {/* Fees */}
       <div>
         <h3 className="font-semibold">Fees & Extras</h3>
         <div className="grid grid-cols-2 gap-4 mt-2">
           <input
             type="number"
             placeholder="Shop Fee"
             value={fees.shopFee}
             onChange={e =>
               setFees(f => ({ ...f, shopFee: +e.target.value }))
             }
             className="border rounded p-2"
           />
           <input
             type="number"
             placeholder="Hazardous Disposal"
             value={fees.hazardousDisposalFee}
             onChange={e =>
               setFees(f => ({ ...f, hazardousDisposalFee: +e.target.value }))
             }
             className="border rounded p-2"
           />
           <label className="flex items-center col-span-2">
             <input
               type="checkbox"
               checked={fees.isMobile}
               onChange={e =>
                 setFees(f => ({ ...f, isMobile: e.target.checked }))
               }
               className="mr-2 h-4 w-4"
             />
             Mobile Service
           </label>
           {fees.isMobile && (
             <>
               <input
                 type="number"
                 placeholder="Callout Fee"
                 value={fees.calloutFee}
                 onChange={e =>
                   setFees(f => ({ ...f, calloutFee: +e.target.value }))
                 }
                 className="border rounded p-2"
               />
               <input
                 type="number"
                 placeholder="Mileage"
                 value={fees.mileage}
                 onChange={e =>
                   setFees(f => ({ ...f, mileage: +e.target.value }))
                 }
                 className="border rounded p-2"
               />
               <input
                 type="number"
                 placeholder="Mileage Rate"
                 value={fees.mileageRate}
                 onChange={e =>
                   setFees(f => ({ ...f, mileageRate: +e.target.value }))
                 }
                 className="border rounded p-2"
               />
             </>
           )}
         </div>
       </div>

      {/* Tax */}
       <div>
         <h3 className="font-semibold">Tax</h3>
         <div className="mt-2">
         <label className="flex items-center">
           <input
             type="checkbox"
             checked={tax.isTaxable}
             onChange={e =>
               setTax(t => ({ ...t, isTaxable: e.target.checked }))
             }
             className="mr-2 h-4 w-4"
           />
           Taxable
         </label>
         {tax.isTaxable && (
           <input
             type="number"
             step="0.01"
             placeholder="Tax Rate %"
             value={tax.taxRate}
             onChange={e =>
               setTax(t => ({ ...t, taxRate: +e.target.value }))
             }
             className="border rounded p-2 mt-2 w-full md:w-1/4"
           />
         )}
         </div>
       </div>

      {/* Summary */}
       <div className="border-t pt-4 space-y-2 text-right">
         <p>Subtotal: <span className="font-mono">${subTotal.toFixed(2)}</span></p>
         <p>Fees: <span className="font-mono">${feeTotal.toFixed(2)}</span></p>
         <p>Tax: <span className="font-mono">${taxTotal.toFixed(2)}</span></p>
         <p className="font-bold text-lg">Total: <span className="font-mono">${total.toFixed(2)}</span></p>
       </div>

      <button
        type="submit"
        className="btn btn-primary w-full text-lg p-3 mt-4"
      >
        {submitLabel}
      </button>
    </form>
  );
};

export default EstimateForm;
