import { useEffect, useState } from 'react';
import apiClient from '../../api/client';
import { StatCard } from '../../components/cards/StatCard'; // ? FIXED PATH
import { FaChartLine, FaCogs, FaTools, FaUsers } from 'react-icons/fa';

type ShopAnalytics = {
  totalRevenue: number;
  partsRevenue: number;
  laborRevenue: number;
  aro: number;
};

export const ShopKPIs = () => {
  const [data, setData] = useState<ShopAnalytics | null>(null);

  useEffect(() => {
    api.get<ShopAnalytics>('/analytics/shop').then(res => setData(res.data));
  }, []);

  if (!data) return <p>Loading shop KPIs...</p>;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      <StatCard title="Total Revenue" value={`$${data.totalRevenue.toFixed(2)}`} icon={<FaChartLine />} />
      <StatCard title="Parts Revenue" value={`$${data.partsRevenue.toFixed(2)}`} icon={<FaCogs />} />
      <StatCard title="Labor Revenue" value={`$${data.laborRevenue.toFixed(2)}`} icon={<FaTools />} />
      <StatCard title="Avg Repair Order" value={`$${data.aro.toFixed(2)}`} icon={<FaUsers />} />
    </div>
  );
};
