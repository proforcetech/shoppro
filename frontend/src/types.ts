
// VehicleType
export type VehicleType = {
  id: string;
  vin: string;
  year: number;
  make: string;
  model: string;
};
export interface Job {
  description: string;
  laborHours: number;
  rate: number;
  parts: any[]; // tighten this up if you know the parts shape
}
// InvoiceType
export type InvoiceType = {
  id: string;
  status: string;
  total: number;
  payments: any[];
};

// CustomerType
export type CustomerType = {
  id: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  vehicles: VehicleType[];
};


