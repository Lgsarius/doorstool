'use client';

import { useState } from 'react';
import { ViewToggle } from '../components/ViewToggle';
import { FiPlus, FiSearch } from 'react-icons/fi';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

// Sample data - replace with your actual data
const accessRightsData = [
  { id: 1, module: 'Module A', accessLevel: 'Full', users: 15, group: 'Admin' },
  { id: 2, module: 'Module B', accessLevel: 'Read', users: 25, group: 'Users' },
  { id: 3, module: 'Module C', accessLevel: 'Write', users: 10, group: 'Editors' },
];

const chartData = {
  labels: accessRightsData.map(item => item.module),
  datasets: [
    {
      label: 'Number of Users',
      data: accessRightsData.map(item => item.users),
      backgroundColor: 'rgba(59, 130, 246, 0.5)',
      borderColor: 'rgb(59, 130, 246)',
      borderWidth: 1,
    },
  ],
};

const chartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      position: 'top' as const,
    },
    title: {
      display: true,
      text: 'Access Rights Distribution',
    },
  },
};

export default function AccessRights() {
  const [view, setView] = useState<'table' | 'graph'>('table');
  const [searchTerm, setSearchTerm] = useState('');

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Access Rights</h1>
        <ViewToggle view={view} setView={setView} />
      </div>

      <div className="flex justify-between items-center gap-4">
        <div className="relative flex-1 max-w-md">
          <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--text-secondary)]" />
          <input
            type="text"
            placeholder="Search access rights..."
            className="w-full pl-10 pr-4 py-2 rounded-lg bg-[var(--sidebar-bg)] border border-[var(--border)]
                     text-[var(--text-primary)] placeholder-[var(--text-secondary)]
                     focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <button className="btn-primary flex items-center gap-2">
          <FiPlus size={20} />
          Add Access Right
        </button>
      </div>

      <div className="bg-[var(--sidebar-bg)] rounded-lg shadow-md">
        {view === 'table' ? (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="border-b border-[var(--border)]">
                <tr>
                  <th className="px-6 py-4 text-left">Module</th>
                  <th className="px-6 py-4 text-left">Access Level</th>
                  <th className="px-6 py-4 text-left">Users</th>
                  <th className="px-6 py-4 text-left">Group</th>
                </tr>
              </thead>
              <tbody>
                {accessRightsData.map((item) => (
                  <tr 
                    key={item.id}
                    className="border-b border-[var(--border)] hover:bg-[var(--hover-bg)]"
                  >
                    <td className="px-6 py-4">{item.module}</td>
                    <td className="px-6 py-4">{item.accessLevel}</td>
                    <td className="px-6 py-4">{item.users}</td>
                    <td className="px-6 py-4">{item.group}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="h-[400px] p-4">
            <Bar options={chartOptions} data={chartData} />
          </div>
        )}
      </div>
    </div>
  );
}
