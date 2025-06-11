export type User = {
  id: string;
  email: string;
  role: string;
};

export type DecodedToken = {
  sub: string;
  email: string;
  role: string;
  iat: number;
  exp: number;
};

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
  parts: any[]; // You can define a 'Part' type for better type safety
}

export type InvoiceType = {
  id: string;
  status: string;
  total: number;
  payments: any[]; // You can define a 'Payment' type
};

export type CustomerType = {
  id: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  vehicles: VehicleType[];
};

export interface Estimate {
  id: string;
  status: 'DRAFT' | 'APPROVED' | 'REJECTED';
  vehicle: VehicleType; // An estimate is linked to a single vehicle
  jobs: Job[];
  createdAt: string;
}