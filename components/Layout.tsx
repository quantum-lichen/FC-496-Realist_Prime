import React from 'react';
import { NavItem } from '../types';
import { Cpu, Activity, BookOpen, Layers, Github, Terminal } from 'lucide-react';

interface LayoutProps {
  children: React.ReactNode;
  currentView: NavItem;
  onNavigate: (view: NavItem) => void;
}

export const Layout: React.FC<LayoutProps> = ({ children, currentView, onNavigate }) => {
  const navItems = [
    { id: NavItem.OVERVIEW, icon: Cpu, label: 'Overview' },
    { id: NavItem.ARCHITECTURE, icon: Layers, label: 'Architecture' },
    { id: NavItem.SIMULATION, icon: Activity, label: 'Simulation Lab' },
    { id: NavItem.DOCS, icon: BookOpen, label: 'Docs & Specs' },
  ];

  return (
    <div className="min-h-screen flex flex-col md:flex-row font-sans text-gray-300">
      {/* Sidebar Navigation */}
      <aside className="w-full md:w-64 bg-cyber-800 border-r border-cyber-700 flex flex-col shrink-0 sticky top-0 z-50 h-auto md:h-screen">
        <div className="p-6 border-b border-cyber-700 flex items-center gap-3">
          <div className="w-10 h-10 bg-cyber-accent/10 rounded-lg border border-cyber-accent/30 flex items-center justify-center text-cyber-accent">
            <Cpu size={24} />
          </div>
          <div>
            <h1 className="font-bold text-white tracking-wider text-sm">FC-496</h1>
            <p className="text-xs text-cyber-dim font-mono">REALIST PRIME</p>
          </div>
        </div>

        <nav className="flex-1 overflow-y-auto py-4 px-3 space-y-1">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id)}
              className={`w-full flex items-center gap-3 px-3 py-3 rounded-md text-sm transition-all duration-200 group ${
                currentView === item.id
                  ? 'bg-cyber-accent/10 text-cyber-accent border border-cyber-accent/20'
                  : 'hover:bg-cyber-700/50 hover:text-white border border-transparent'
              }`}
            >
              <item.icon
                size={18}
                className={currentView === item.id ? 'text-cyber-accent' : 'text-gray-500 group-hover:text-gray-300'}
              />
              <span className="font-medium">{item.label}</span>
            </button>
          ))}
        </nav>

        <div className="p-4 border-t border-cyber-700">
          <div className="bg-black/40 rounded-lg p-3 border border-cyber-700">
            <div className="flex items-center gap-2 text-xs text-gray-400 mb-2">
              <Terminal size={12} />
              <span className="font-mono">SYSTEM STATUS</span>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between items-center text-xs">
                <span>FPU Cluster</span>
                <span className="text-green-400">ONLINE</span>
              </div>
              <div className="flex justify-between items-center text-xs">
                <span>Sync Layer</span>
                <span className="text-cyber-accent animate-pulse">ACTIVE</span>
              </div>
              <div className="flex justify-between items-center text-xs">
                <span>Q-Core</span>
                <span className="text-cyber-purple">STANDBY</span>
              </div>
            </div>
          </div>
          <div className="mt-4 flex gap-4 justify-center">
             <a href="#" className="text-gray-500 hover:text-white transition-colors">
                <Github size={20} />
             </a>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto bg-cyber-900 h-[calc(100vh-theme(spacing.16))] md:h-screen">
        <div className="max-w-6xl mx-auto p-4 md:p-8">
          {children}
        </div>
      </main>
    </div>
  );
};