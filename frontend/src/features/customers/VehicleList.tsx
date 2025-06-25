// import React from 'react';
import type { VehicleType } from '../../types'; // Import the centralized VehicleType

/**
 * Props for the VehicleList component.
 * @interface Props
 * @property {VehicleType[]} vehicles - The list of vehicles to display.
 */
type Props = {
  vehicles: VehicleType[];
};

/**
 * VehicleList Component
 * A presentational component that displays a list of vehicles.
 */
export const VehicleList = ({ vehicles = [] }: Props) => {
  if (!vehicles || vehicles.length === 0) {
    return <p className="text-sm mt-2 text-gray-500">No vehicles linked for this customer.</p>;
  }

  return (
    <div className="mt-2 grid gap-2">
      {vehicles.map((v) => (
        <div key={v.id} className="p-2 bg-gray-50 rounded border text-sm text-gray-700">
          {/* The render logic can now safely access all properties of VehicleType */}
          {v.year} {v.make} {v.model} {v.trim} {v.engine} {v.drive} — VIN: {v.vin} • {v.mileage} mi
        </div>
      ))}
    </div>
  );
};
