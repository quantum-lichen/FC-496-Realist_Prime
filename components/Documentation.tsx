import React from 'react';
import { FileText, Shield, AlertTriangle, Scale, Thermometer, Cpu, Activity } from 'lucide-react';

export const Documentation: React.FC = () => {
  return (
    <div className="space-y-8 animate-in fade-in duration-500 pb-12">
      <div className="border-b border-cyber-700 pb-4 mb-8">
        <h2 className="text-3xl font-bold text-white flex items-center gap-3">
          <FileText className="text-cyber-accent" />
          Documentation
        </h2>
      </div>

      {/* Detailed Assumptions & Limitations */}
      <section className="bg-cyber-800/30 border border-cyber-700 rounded-xl p-6 md:p-8">
        <div className="flex items-start gap-4 mb-8">
          <div className="p-3 bg-cyber-warning/10 rounded-lg border border-cyber-warning/20 shrink-0">
             <AlertTriangle size={24} className="text-cyber-warning" />
          </div>
          <div>
            <h3 className="text-2xl font-bold text-white mb-2">
              Assumptions & Limitations
            </h3>
            <p className="text-gray-400 leading-relaxed">
              This work proposes the FC‑496 architecture as a physically grounded yet forward‑looking design. 
              To keep the proposal scientifically robust, all core assumptions and limitations are made explicit below.
            </p>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          
          {/* Geometric */}
          <div className="space-y-3">
            <h4 className="font-bold text-gray-200 flex items-center gap-2">
              <Scale size={16} className="text-cyber-dim" /> 
              Geometric and Combinatorial Model
            </h4>
            <div className="text-sm text-gray-400 space-y-3 leading-relaxed bg-black/20 p-4 rounded-lg border border-white/5">
              <p>
                The FC‑496 pyramidal unit is modeled with 496 branches and three hierarchical levels, giving:
                <br />
                <span className="font-mono text-cyber-accent block py-2">
                  496 + 496<sup>2</sup> + 496<sup>3</sup> = 122,270,448
                </span>
                branch segments and about <span className="font-mono text-gray-300">6.05 × 10<sup>10</sup></span> pins/sites at the deepest level.
              </p>
              <p>
                The effective geometric dimension is approximated by <span className="font-mono">D = log N / log S</span> with N=496 and S≈22.27, yielding <span className="font-mono text-white">D ≈ 2.0</span>, i.e., a quasi‑surface object rather than 2.077 as initially claimed.
              </p>
              <p>
                The surface/volume ratio is based on indicative values <span className="font-mono">A ≈ 7.69 × 10<sup>5</sup> m<sup>2</sup></span> and <span className="font-mono">V ≈ 4.19 m<sup>3</sup></span>, giving <span className="font-mono">A/V ≈ 1.84 × 10<sup>5</sup></span>. These numbers are order‑of‑magnitude estimates, not derived from a fully detailed CAD model.
              </p>
            </div>
          </div>

          {/* Error & Performance */}
          <div className="space-y-3">
            <h4 className="font-bold text-gray-200 flex items-center gap-2">
              <Activity size={16} className="text-cyber-dim" /> 
              Error and Performance Models
            </h4>
            <div className="text-sm text-gray-400 space-y-3 leading-relaxed bg-black/20 p-4 rounded-lg border border-white/5">
              <p>
                The "linear vs. fractal" error rates are exploratory comparative models, not experimental measurements:
              </p>
              <ul className="list-disc list-inside font-mono text-xs space-y-1 ml-2 text-gray-300">
                <li>ε<sub>lin</sub> = 0.0502</li>
                <li>ε<sub>frac</sub> = ε<sub>lin</sub> / 21.4 ≈ 0.00235</li>
              </ul>
              <p>
                The factor 21.4× reduction is used to illustrate potential benefits of constrained, fractal‑like connectivity and should be interpreted as a hypothesis to be tested by detailed simulation and hardware experiments.
              </p>
            </div>
          </div>

          {/* Synchronization */}
          <div className="space-y-3">
            <h4 className="font-bold text-gray-200 flex items-center gap-2">
              <Activity size={16} className="text-cyber-dim" /> 
              Synchronization and Kuramoto Dynamics
            </h4>
            <div className="text-sm text-gray-400 space-y-3 leading-relaxed bg-black/20 p-4 rounded-lg border border-white/5">
              <p>
                Local synchronization is modeled by a Kuramoto‑type phase dynamics on small clusters (e.g., 5 oscillators), with noise and nearest‑neighbor coupling on a ring.
              </p>
              <p>
                Numerical simulations show an increase of the order parameter <span className="italic">R</span> from a low initial value (~0.07) to near‑perfect coherence (~0.97) under reasonable parameters.
              </p>
              <p className="italic text-gray-500">
                Extension of this mechanism to full FC‑496 graphs (hundreds of branches and multiple hierarchical levels) and to 3D assemblies of PFUs remains a theoretical proposal; large‑scale Kuramoto simulations on realistic graphs and hardware oscillators are required.
              </p>
            </div>
          </div>

          {/* Thermodynamics */}
          <div className="space-y-3">
             <h4 className="font-bold text-gray-200 flex items-center gap-2">
              <Thermometer size={16} className="text-cyber-dim" /> 
              Thermodynamics and Energy Recovery
            </h4>
            <div className="text-sm text-gray-400 space-y-3 leading-relaxed bg-black/20 p-4 rounded-lg border border-white/5">
              <p>
                Claims about improved thermal behavior rely on the high surface/volume ratio and on microfluidic/thermoelectric concepts already explored in current research (3D cooling, embedded microchannels, TEGs).
              </p>
              <p>
                Energy recovery percentages (e.g., 3–5% realistic, higher values as upper‑bound scenarios) are targets, not guaranteed performance; actual efficiency will depend on material figures of merit (ZT), temperature gradients, interface quality, and system‑level design.
              </p>
            </div>
          </div>

          {/* Quantum */}
          <div className="space-y-3">
             <h4 className="font-bold text-gray-200 flex items-center gap-2">
              <Cpu size={16} className="text-cyber-dim" /> 
              Quantum and Topological Hardware
            </h4>
            <div className="text-sm text-gray-400 space-y-3 leading-relaxed bg-black/20 p-4 rounded-lg border border-white/5">
              <p>
                The quantum/topological layer of the FC‑496 architecture is inspired by recent progress on Majorana‑based qubits and topological processors (e.g., Microsoft’s Majorana 1 prototypes), which have demonstrated key building blocks but not yet large‑scale, production‑grade systems.
              </p>
              <p>
                Any reference to integrated topological QPUs (tens of logical qubits) within FC‑496 must be understood as a medium‑term goal aligned with current roadmaps, not as technology available today.
              </p>
            </div>
          </div>

          {/* Scope */}
          <div className="space-y-3">
             <h4 className="font-bold text-gray-200 flex items-center gap-2">
              <FileText size={16} className="text-cyber-dim" /> 
              Scope and Status
            </h4>
            <div className="text-sm text-gray-400 space-y-3 leading-relaxed bg-black/20 p-4 rounded-lg border border-white/5">
              <p>
                All numerical examples, small‑scale simulations (Kuramoto clusters, error scaling), and geometric estimates are intended as anchoring points to reason about plausibility and design space, not as final performance guarantees.
              </p>
              <p>
                The FC‑496 architecture should therefore be viewed as a <strong>research‑level proposal</strong> that integrates established physics and engineering with speculative yet structured ideas.
              </p>
              <p className="border-t border-white/10 pt-2 mt-2">
                Future work must include detailed multiphysics simulations, quantum‑level modeling, and step‑by‑step prototyping before any industrial‑scale claims can be made.
              </p>
            </div>
          </div>

        </div>
      </section>

      {/* License */}
      <section className="bg-cyber-800/30 border border-cyber-700 rounded-xl p-6">
         <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
          <Shield size={20} className="text-green-400" />
          License (MIT)
        </h3>
        <div className="font-mono text-xs text-gray-400 bg-black/40 p-4 rounded-lg border border-cyber-700 overflow-x-auto whitespace-pre-wrap">
{`MIT License

Copyright (c) 2025

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.`}
        </div>
      </section>
      
      <section className="text-center pt-8">
        <p className="text-sm text-gray-500">
          References: CMOS scaling, GAAFET, Chiplets, Kuramoto networks, Time-crystals, Microfluidic cooling.
        </p>
      </section>
    </div>
  );
};