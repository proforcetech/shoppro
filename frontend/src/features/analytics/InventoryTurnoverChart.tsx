import type { AxiosResponse } from 'axios';
import { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import apiClient from '../../api/client';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip
} from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip);

type PartItem = {
  sku: string;
  turnoverRate: number;
};

export const InventoryTurnoverChart = () => {
  const [parts, setParts] = useState<PartItem[]>([]);

  useEffect(() => {
    apiClient.get('/analytics/inventory').then((res: AxiosResponse<{ turnover: PartItem[] }>) => {
      setParts(res.data.turnover);
    });
  }, []);

  const data = {
    labels: parts.map(p => p.sku),
    datasets: [{
      label: 'Turnover Rate',
      data: parts.map(p => parseFloat(p.turnoverRate.toString())),
      backgroundColor: '#10b981',
    }]
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-4">
      <h2 className="text-lg font-semibold mb-2">Inventory Turnover</h2>
      <Bar data={data} />
    </div>
  );
};
