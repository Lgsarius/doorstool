interface DashboardCardProps {
  title: string;
  value: string;
  icon: React.ReactNode;
  description?: string;
}

export function DashboardCard({ title, value, icon, description }: DashboardCardProps) {
  return (
    <div className="card">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-medium text-[var(--text-secondary)]">{title}</h3>
        <div className="text-[var(--text-secondary)]">
          {icon}
        </div>
      </div>
      <p className="text-3xl font-bold mb-2">{value}</p>
      {description && (
        <p className="text-sm text-[var(--text-secondary)]">{description}</p>
      )}
    </div>
  );
}
