import { FiGrid, FiList } from 'react-icons/fi';

interface ViewToggleProps {
  view: 'table' | 'graph';
  setView: (view: 'table' | 'graph') => void;
}

export function ViewToggle({ view, setView }: ViewToggleProps) {
  return (
    <div className="flex items-center bg-[var(--hover-bg)] rounded-lg p-1">
      <button
        className={`flex items-center gap-2 px-3 py-2 rounded-md transition-all ${
          view === 'table'
            ? 'bg-[var(--sidebar-bg)] shadow-sm text-[var(--text-primary)]'
            : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
        }`}
        onClick={() => setView('table')}
      >
        <FiList size={20} />
        <span>Table</span>
      </button>
      <button
        className={`flex items-center gap-2 px-3 py-2 rounded-md transition-all ${
          view === 'graph'
            ? 'bg-[var(--sidebar-bg)] shadow-sm text-[var(--text-primary)]'
            : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
        }`}
        onClick={() => setView('graph')}
      >
        <FiGrid size={20} />
        <span>Graph</span>
      </button>
    </div>
  );
}
