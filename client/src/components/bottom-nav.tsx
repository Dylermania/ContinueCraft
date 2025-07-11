import React from 'react';
import { useLocation } from 'wouter';
import { Home, Search, Settings, User, Smartphone } from 'lucide-react';

export default function BottomNav() {
  const [location, setLocation] = useLocation();

  const navItems = [
    { icon: Home, label: 'Home', href: '/' },
    { icon: Search, label: 'Scan', href: '/scan-device' },
    { icon: Smartphone, label: 'Apps', href: '/my-apps' },
    { icon: Settings, label: 'Settings', href: '/settings' },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-slate-900/95 backdrop-blur-md border-t border-slate-800 z-50">
      <div className="flex items-center justify-around py-2">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = location === item.href;

          return (
            <button
              key={item.href}
              onClick={() => setLocation(item.href)}
              className={`flex flex-col items-center space-y-1 py-2 px-4 rounded-lg transition-colors ${
                isActive 
                  ? 'text-emerald-400 bg-emerald-500/10' 
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Icon className="w-5 h-5" />
              <span className="text-xs font-medium">{item.label}</span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}