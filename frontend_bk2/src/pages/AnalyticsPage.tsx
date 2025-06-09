import { ShopKPIs } from '../features/analytics/ShopKPIs';
import { TechPerformanceChart } from '../features/analytics/TechPerformanceChart';
import { InventoryTurnoverChart } from '../features/analytics/InventoryTurnoverChart';

export const AnalyticsPage = () => (
  <div className="p-6 space-y-6">
    <h1 className="text-2xl font-bold">Analytics & KPIs</h1>

    <ShopKPIs />

    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <TechPerformanceChart />
      <InventoryTurnoverChart />
    </div>
  </div>
);

