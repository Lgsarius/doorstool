
import { FiUsers, FiDatabase } from 'react-icons/fi';
import { PiDoorBold } from "react-icons/pi";
import { DashboardCard } from './components/DashboardCard';

export default function Dashboard() {
  return (
    <div className="space-y-6">
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-2">
          <PiDoorBold className="text-3xl" />
          <h1 className="text-3xl font-bold">DOORS Tools Dashboard</h1>
        </div>
        <p className="text-[var(--text-secondary)] mt-2">
          Utility tools and management for IBM DOORS
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <DashboardCard 
          title="DOORS Tools" 
          value="12" 
          icon={<PiDoorBold size={24} />}
          description="Available utilities"
        />
        <DashboardCard 
          title="Database Status" 
          value="Connected" 
          icon={<FiDatabase size={24} />}
          description="DOORS database connection"
        />
        <DashboardCard 
          title="Active Users" 
          value="24" 
          icon={<FiUsers size={24} />}
          description="Currently logged in users"
        />
      </div>

      <div className="mt-8 bg-[var(--sidebar-bg)] p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <button className="btn-primary flex items-center justify-center gap-2">
            <PiDoorBold size={20} />
            Launch DOORS Tool
          </button>
          <button className="btn-secondary flex items-center justify-center gap-2">
            <FiDatabase size={20} />
            Check Database Status
          </button>
        </div>
      </div>
    </div>
  );
}
