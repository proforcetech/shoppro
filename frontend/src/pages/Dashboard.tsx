import { useEffect, useState } from 'react';
import apiClient from '../api/client';
import { useAuth } from '../context/AuthContext';
import { StatCard } from '../components/cards/StatCard';
import { FaMoneyBillWave, FaTools, FaUser, FaBoxes } from 'react-icons/fa';

type ShopStats = {
  totalRevenue: number;
  partsRevenue: number;
  laborRevenue: number;
  aro: number;
  grossMargin: number;
};

export const Dashboard = () => {
  const { user } = useAuth();
  const [shopStats, setShopStats] = useState<ShopStats | null>(null);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await api.get('/analytics/shop');
        setShopStats(res.data);
      } catch (e) {
        console.error(e);
      }
    };

    fetchStats();
  }, []);

  if (!shopStats) return <div className="p-6">Loading dashboard...</div>;

  return (
    <div className="p-6">
      <h1 className="text-3xl font-semibold mb-6">Welcome, {user?.role}</h1>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Total Revenue"
          value={`$${shopStats.totalRevenue.toFixed(2)}`}
          icon={<FaMoneyBillWave className="text-green-500" />}
          color="bg-green-100"
        />
        <StatCard
          title="Parts Revenue"
          value={`$${shopStats.partsRevenue.toFixed(2)}`}
          icon={<FaBoxes className="text-yellow-500" />}
          color="bg-yellow-100"
        />
        <StatCard
          title="Labor Revenue"
          value={`$${shopStats.laborRevenue.toFixed(2)}`}
          icon={<FaTools className="text-blue-500" />}
          color="bg-blue-100"
        />
        <StatCard
          title="Avg Repair Order (ARO)"
          value={`$${shopStats.aro.toFixed(2)}`}
          icon={<FaUser className="text-purple-500" />}
          color="bg-purple-100"
        />
      </div>

      <div className="mt-6 text-gray-600">
        <p><strong>Gross Profit Margin:</strong> {shopStats.grossMargin.toFixed(1)}%</p>
      </div>
    </div>
  );
};
