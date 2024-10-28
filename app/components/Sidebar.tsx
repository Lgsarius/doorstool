'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  FiHome,
  FiUsers,
  FiKey,
  FiSettings,
  FiSun,
  FiMoon,
  FiMenu,
  FiX,
  FiDatabase
} from 'react-icons/fi';
import { PiDoorBold } from "react-icons/pi";

const Sidebar = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [theme, setTheme] = useState('light');
  const pathname = usePathname();

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') || 
      (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
    setTheme(savedTheme);
    document.documentElement.setAttribute('data-theme', savedTheme);
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
    document.documentElement.setAttribute('data-theme', newTheme);
  };

  const menuItems = [
    { name: 'Dashboard', icon: FiHome, path: '/' },
    { name: 'DOORS Tools', icon: PiDoorBold, path: '/tools' },
    { name: 'Access Rights', icon: FiKey, path: '/access-rights' },
    { name: 'User Info', icon: FiUsers, path: '/user-info' },
    { name: 'Database', icon: FiDatabase, path: '/database' },
    { name: 'Settings', icon: FiSettings, path: '/settings' },
  ];

  return (
    <div className={`sidebar ${isCollapsed ? 'collapsed' : ''}`}>
      <div className="flex items-center justify-between mb-6">
        {!isCollapsed && (
          <div className="flex items-center gap-2">
            <PiDoorBold className="text-2xl" />
            <div className="flex flex-col">
              <h1 className="text-xl font-bold">DOORS Tools</h1>
              <span className="text-xs text-[var(--text-secondary)]">IBM DOORS Utility</span>
            </div>
          </div>
        )}
        <button 
          className="toggle-btn"
          onClick={() => setIsCollapsed(!isCollapsed)}
        >
          {isCollapsed ? <FiMenu size={24} /> : <FiX size={24} />}
        </button>
      </div>

      <nav className="nav-links">
        {menuItems.map((item) => (
          <Link 
            key={item.name} 
            href={item.path}
            className={`nav-item ${pathname === item.path ? 'active' : ''}`}
          >
            <item.icon size={24} />
            {!isCollapsed && <span>{item.name}</span>}
          </Link>
        ))}
      </nav>

      <button 
        className="theme-toggle"
        onClick={toggleTheme}
      >
        {theme === 'dark' ? (
          <FiSun size={24} />
        ) : (
          <FiMoon size={24} />
        )}
        {!isCollapsed && <span>Toggle Theme</span>}
      </button>
    </div>
  );
};

export default Sidebar;
