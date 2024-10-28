'use client';

import { useState } from 'react';
import { ViewToggle } from '../components/ViewToggle';
import { FiPlus, FiSearch } from 'react-icons/fi';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend
} from 'chart.js';
import { Pie } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);

// Sample data - replace with your actual data
const userData = [
  { id: 1, name: 'John Doe', role: 'Admin', lastActive: '2024-01-15', status: 'Active' },
  { id: 2, name: 'Jane Smith', role: 'Editor', lastActive: '2024-01-14', status: 'Active' },
  { id: 3, name: 'Bob Johnson', role: 'Viewer', lastActive: '2024-01-13', status: 'Inactive' },
];

const chartData = {
  labels: ['Admin', 'Editor', 'Viewer'],
  datasets: [
    {
      data: [4, 8, 15],
      backgroundColor: [
        'rgba(59, 130, 246, 0.5)',
        'rgba(16, 185, 129, 0.5)',
        'rgba(99, 102, 241, 0.5)',
      ],
      borderColor: [
        'rgb(59, 130, 246)',
        'rgb(16, 185, 129)',
        'rgb(99, 102, 241)',
      ],
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
      text: 'User Role Distribution',
    },
  },
};

export default function UserInfo() {
  const [view, setView] = useState<'table' | 'graph'>('table');
  const [searchTerm, setSearchTerm] = useState('');

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">User Information</h1>
        <ViewToggle view={view} setView={setView} />
      </div>

      <div className="flex justify-between items-center gap-4">
        <div className="relative flex-1 max-w-md">
          <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--text-secondary)]" />
          <input
            type="text"
            placeholder="Search users..."
            className="w-full pl-10 pr-4 py-2 rounded-lg bg-[var(--sidebar-bg)] border border-[var(--border)]
                     text-[var(--text-primary)] placeholder-[var(--text-secondary)]
                     focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <button className="btn-primary flex items-center gap-2">
          <FiPlus size={20} />
          Add User
        </button>
      </div>

      <div className="bg-[var(--sidebar-bg)] rounded-lg shadow-md">
        {view === 'table' ? (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="border-b border-[var(--border)]">
                <tr>
                  <th className="px-6 py-4 text-left">Name</th>
                  <th className="px-6 py-4 text-left">Role</th>
                  <th className="px-6 py-4 text-left">Last Active</th>
                  <th className="px-6 py-4 text-left">Status</th>
                </tr>
              </thead>
              <tbody>
                {userData.map((user) => (
                  <tr 
                    key={user.id}
                    className="border-b border-[var(--border)] hover:bg-[var(--hover-bg)]"
                  >
                    <td className="px-6 py-4">{user.name}</td>
                    <td className="px-6 py-4">{user.role}</td>
                    <td className="px-6 py-4">{user.lastActive}</td>
                    <td className="px-6 py-4">{user.status}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="h-[400px] p-4">
            <Pie options={chartOptions} data={chartData} />
          </div>
        )}
      </div>
    </div>
  );
}
