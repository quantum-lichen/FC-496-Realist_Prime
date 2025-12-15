import React from 'react';
import { NavItem } from '../types';
import { ArrowRight, Cpu, Zap, Activity, Box } from 'lucide-react';

interface HeroProps {
  onNavigate: (view: NavItem) => void;
}

export const Hero: React.FC<HeroProps> = ({ onNavigate }) => {
  return (
    <div className="space-y-12 animate-in fade-in duration-700">
      {/* Header Section */}
      <div className="relative overflow-hidden rounded-2xl bg-cyber-800 border border-cyber-700 p-8 md:p-12 shadow-2xl">
        <div className="absolute top-0 right-0 p-4 opacity-10">
           <Cpu size={300} />
        </div>
        <div className="relative z-10 max-w-3xl">
          <div className="flex gap-2 mb-6">
            <span className="px-3 py-1 rounded-full bg-blue-500/10 text-blue-400 text-xs font-mono border border-blue-500/20">
              STATUS: RESEARCH / PROTOTYPE
            </span>
            <span className="px-3 py-1 rounded-full bg-orange-500/10 text-orange-400 text-xs font-mono border border-orange-500/20">
              TRL-2 EXPLORATORY
            </span>
          </div>
          
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight">
            FC-496 <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyber-accent to-cyber-purple">Realist Prime</span>
          </h1>
          
          <p className="text-lg md:text-xl text-gray-400 mb-8 leading-relaxed max-w-2xl">
            A next-generation processing unit combining a 3D chiplet floating-point engine, 
            neuromorphic Kuramoto synchronization, and a topological quantum accelerator 
            within a fractal-microfluidic thermal shell.
          </p>
          
          <div className="flex flex-wrap gap-4">
            <button 
              onClick={() => onNavigate(NavItem.SIMULATION)}
              className="bg-cyber-accent text-cyber-900 font-bold px-6 py-3 rounded-lg hover:bg-white transition-all flex items-center gap-2"
            >
              Launch Simulations <ArrowRight size={18} />
            </button>
            <button 
              onClick={() => onNavigate(NavItem.ARCHITECTURE)}
              className="bg-cyber-700/50 text-white font-medium px-6 py-3 rounded-lg hover:bg-cyber-700 border border-cyber-600 transition-all"
            >
              View Architecture
            </button>
          </div>
        </div>
      </div>

      {/* Features Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="p-6 rounded-xl bg-cyber-800/50 border border-cyber-700 hover:border-cyber-accent/30 transition-colors group">
          <div className="w-12 h-12 bg-blue-500/10 rounded-lg flex items-center justify-center text-blue-400 mb-4 group-hover:bg-blue-500/20 transition-colors">
            <Box size={24} />
          </div>
          <h3 className="text-xl font-bold text-white mb-2">3D Chiplet Design</h3>
          <p className="text-gray-400 text-sm leading-relaxed">
            Advanced 3D system-in-package integrating CMOS logic, oscillators, and quantum layers.
            Based on GAAFET/nanosheet nodes targeted for the 2030-2035 window.
          </p>
        </div>

        <div className="p-6 rounded-xl bg-cyber-800/50 border border-cyber-700 hover:border-cyber-accent/30 transition-colors group">
          <div className="w-12 h-12 bg-cyber-accent/10 rounded-lg flex items-center justify-center text-cyber-accent mb-4 group-hover:bg-cyber-accent/20 transition-colors">
            <Activity size={24} />
          </div>
          <h3 className="text-xl font-bold text-white mb-2">Kuramoto Sync Layer</h3>
          <p className="text-gray-400 text-sm leading-relaxed">
            Neuromorphic layer providing adaptive clocking and analog computing via 
            coupled oscillator dynamics. Self-organizing phase synchronization.
          </p>
        </div>

        <div className="p-6 rounded-xl bg-cyber-800/50 border border-cyber-700 hover:border-cyber-accent/30 transition-colors group">
          <div className="w-12 h-12 bg-cyber-purple/10 rounded-lg flex items-center justify-center text-cyber-purple mb-4 group-hover:bg-cyber-purple/20 transition-colors">
            <Zap size={24} />
          </div>
          <h3 className="text-xl font-bold text-white mb-2">Topological Quantum</h3>
          <p className="text-gray-400 text-sm leading-relaxed">
            Majorana-style qubits for robust quantum tasks. Hardware-level topological protection
            embedded as a specialized accelerator co-processor.
          </p>
        </div>

        <div className="p-6 rounded-xl bg-cyber-800/50 border border-cyber-700 hover:border-cyber-accent/30 transition-colors group">
          <div className="w-12 h-12 bg-red-500/10 rounded-lg flex items-center justify-center text-red-400 mb-4 group-hover:bg-red-500/20 transition-colors">
            <Activity size={24} />
          </div>
          <h3 className="text-xl font-bold text-white mb-2">Fractal Microfluidics</h3>
          <p className="text-gray-400 text-sm leading-relaxed">
            Pyramidal fractal shell maximizing surface-to-volume ratio for heat extraction.
            Includes integrated TEGs for partial energy recovery.
          </p>
        </div>
      </div>
    </div>
  );
};