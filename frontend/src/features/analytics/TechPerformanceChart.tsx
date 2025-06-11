import { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import apiClient from '../../api/client';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip);

export const TechPerformanceChart = () => {
  const [data, setData] = useState<any[]>([]);

  useEffect(() => {
    api.get('/analytics/tech').then(res => setData(res.data));
  }, []);

  const chartData = {
    labels: data.map(t => t.name),
    datasets: [{
      label: 'Hours Billed',
      data: data.map(t => parseFloat(t.hoursBilled)),
      backgroundColor: '#4f46e5',
    }]
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-4">
      <h2 className="text-lg font-semibold mb-2">Technician Hours</h2>
      <Bar data={chartData} />
    </div>
  );
};

