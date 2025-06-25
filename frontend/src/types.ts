export type EstimateFormData = {
  customerId: string;
  vehicleId: string;
  jobs: {
    laborDescription: string;
    laborRate: number;
    laborTime: number;
    parts: {
      name: string;
      sku?: string;
      quantity: number;
      pricePerUnit: number;
    }[];
  }[];
  shopFee: number;
  hazardousDisposalFee: number;
  isMobile: boolean;
  serviceLocation: string;
  calloutFee: number;
  mileage: number;
  mileageRate: number;
  isTaxable: boolean;
  taxRate: number;
};


export type User = {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: string;
};

export type DecodedToken = {
  sub: string;
  email: string;
  role: string;
  firstName: string;
  lastName: string;
  iat: number;
  exp: number;
};


export interface Customer {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  zip: string;
}

/**
 * VehicleType now includes all properties that are used in the VehicleList component,
 * such as mileage, engine, trim, and drive.
 */
export type VehicleType = {
  id: string;
  vin: string;
  year: number;
  make: string;
  model: string;
  engine: string;
  trim: string;
  drive: string;
  mileage: number;
};

export type CustomerType = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  zip: string;
  vehicles: VehicleType[];
};

export interface Vehicle {
  id: string;
  make: string;
  model: string;
  year: number;
  vin: string;
  licensePlate: string;
  customerId: string;
  mileage: number;
}

export interface Part {
  id: string;
  name: string;
  price: number;
  quantity: number;
}

export interface Job {
  id?: string;
  description: string;
  laborHours: number;
  rate: number;
  parts: Part[];
}

export interface Estimate {
  id?: string;
  customerId: string;
  vehicleId: string;
  status: 'DRAFT' | 'SENT' | 'APPROVED' | 'DECLINED';
  jobs: Job[];
  total?: number;
}
