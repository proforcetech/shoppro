type Props = {
  vehicles: {
    id: string
    vin: string
    make: string
    model: string
    engine: string
    trim: string
    drive: string
    year: number
    mileage: number
  }[]
}

export const VehicleList = ({ vehicles = [] }: Props) => {
  if (!vehicles.length) return <p className="text-sm mt-2 text-gray-500">No vehicles linked.</p>;

  return (
    <div className="mt-2 grid gap-2">
      {vehicles.map((v) => (
        <div key={v.id} className="p-2 bg-gray-50 rounded border text-sm text-gray-700">
          {v.year} {v.make} {v.model}{v.trim}{v.engine}{v.drive} — VIN: {v.vin} • {v.mileage} mi
        </div>
      ))}
    </div>
  );
};

