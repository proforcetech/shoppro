import React from 'react';

type StatCardProps = {
  title: string;
  value: string | number;
  icon?: React.ReactNode;
  color?: string;
};

export const StatCard = ({ title, value, icon, color = 'bg-blue-100' }: StatCardProps) => (
  <div className={`p-4 rounded-lg shadow-md ${color}`}>
    <div className="text-sm text-gray-600 font-medium">{title}</div>
    <div className="text-2xl font-bold text-gray-800 flex items-center gap-2">
      {icon && <span>{icon}</span>}
      {value}
    </div>
  </div>
);

