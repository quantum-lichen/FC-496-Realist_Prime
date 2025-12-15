import React from 'react';
import { Layers, Network, Snowflake, Cpu } from 'lucide-react';

export const Architecture: React.FC = () => {
  return (
    <div className="space-y-8 animate-in slide-in-from-bottom-4 duration-500">
      <div className="border-b border-cyber-700 pb-4 mb-8">
        <h2 className="text-3xl font-bold text-white flex items-center gap-3">
          <Layers className="text-cyber-accent" />
          System Architecture
        </h2>
        <p className="text-cyber-dim font-mono mt-2">TECHNICAL SPECIFICATION // REV 1.0</p>
      </div>

      {/* PFU Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <section className="bg-cyber-800/30 border border-cyber-700 rounded-xl p-6">
            <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
              <Cpu size={20} className="text-gray-400" />
              1. Pyramidal Fractal Unit (PFU)
            </h3>
            <ul className="space-y-2 text-gray-300 list-disc list-inside ml-2">
              <li><strong className="text-white">496</strong> logical "branches".</li>
              <li>Three levels of hierarchy: <span className="font-mono text-cyber-accent">496 + 496² + 496³ = 122,270,448</span> branch segments.</li>
              <li>Deepest level hosts ≈ 6.05 × 10¹⁰ logical sites/pins.</li>
              <li className="mt-4 text-sm text-gray-400 italic">
                The PFU is instantiated as a 3D system-in-package of three dies embedded into a fractal-microfluidic shell.
              </li>
            </ul>
          </section>

          <section className="bg-cyber-800/30 border border-cyber-700 rounded-xl p-6">
            <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
              <Layers size={20} className="text-gray-400" />
              2. Layered Stack Definition
            </h3>
            
            <div className="space-y-6">
              <div className="pl-4 border-l-2 border-blue-500/50">
                <h4 className="font-bold text-blue-400">2.1 Die A – CMOS Logic Layer</h4>
                <p className="text-sm text-gray-400 mt-1">Advanced GAAFET/nanosheet node (Å-scale target).</p>
                <ul className="mt-2 text-sm text-gray-300 list-disc list-inside">
                  <li>~496 light cores / vector lanes.</li>
                  <li>IEEE-754 FPU pipelines (FP32/FP64).</li>
                  <li>Standard ISA extension (RISC-V/x86 vector).</li>
                </ul>
              </div>

              <div className="pl-4 border-l-2 border-cyber-accent/50">
                <h4 className="font-bold text-cyber-accent">2.2 Die B – Neuromorphic Oscillator Layer</h4>
                <p className="text-sm text-gray-400 mt-1">Built from oscillatory devices (VO₂, Josephson, etc.).</p>
                <ul className="mt-2 text-sm text-gray-300 list-disc list-inside">
                  <li>Fractal + small world network graph.</li>
                  <li>Kuramoto-style phase coupling.</li>
                  <li>Analog computing primitives.</li>
                </ul>
              </div>

              <div className="pl-4 border-l-2 border-cyber-purple/50">
                <h4 className="font-bold text-cyber-purple">2.3 Die C – Topological Quantum Layer</h4>
                <p className="text-sm text-gray-400 mt-1">Semiconductor–superconductor heterostructures.</p>
                <ul className="mt-2 text-sm text-gray-300 list-disc list-inside">
                  <li>Majorana-style qubits (64-128 logical).</li>
                  <li>Strong hardware-level protection.</li>
                  <li>Specialized optimization & crypto tasks.</li>
                </ul>
              </div>
            </div>
          </section>
        </div>

        <div className="space-y-6">
           <section className="bg-cyber-800/30 border border-cyber-700 rounded-xl p-6">
            <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
              <Snowflake size={20} className="text-gray-400" />
              Thermal Backbone
            </h3>
            <p className="text-gray-300 text-sm mb-4">
              Geometry inspired by Koch/Peano-like fractals, truncated at 2–3 levels. 
              Coolant flows through DRIE microchannels.
            </p>
            <div className="bg-black/40 p-4 rounded-lg border border-cyber-700 font-mono text-xs space-y-2">
               <div className="flex justify-between">
                 <span className="text-gray-500">EFF. DIMENSION</span>
                 <span className="text-cyber-accent">~2.0</span>
               </div>
               <div className="flex justify-between">
                 <span className="text-gray-500">SURFACE/VOL</span>
                 <span className="text-cyber-accent">ULTRA-HIGH</span>
               </div>
               <div className="flex justify-between">
                 <span className="text-gray-500">TEG RECOVERY</span>
                 <span className="text-cyber-accent">3-5% GOAL</span>
               </div>
            </div>
          </section>

          <section className="bg-cyber-800/30 border border-cyber-700 rounded-xl p-6">
             <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
              <Network size={20} className="text-gray-400" />
              Math: Synchronization
            </h3>
            <div className="font-mono text-xs bg-black/40 p-4 rounded-lg border border-cyber-700 overflow-x-auto text-gray-300">
              <p className="mb-2 text-gray-500">// Local Update</p>
              <p>θ<sub className="text-gray-500">i</sub><sup className="text-gray-500">t+1</sup> = θ<sub className="text-gray-500">i</sub><sup className="text-gray-500">t</sup> + K Σ sin(θ<sub className="text-gray-500">j</sub> - θ<sub className="text-gray-500">i</sub>) dt</p>
              
              <p className="mt-4 mb-2 text-gray-500">// Global Coherence R</p>
              <p>R(t) = |(1/N) Σ e<sup className="text-gray-500">iθ(t)</sup>|</p>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};