import React, { useState, useEffect, useRef } from 'react';
import { Play, RotateCcw, Activity, Thermometer, Zap } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { KuramotoSimulation, ThermalSimulation } from '../services/simulationService';
import { KuramotoHistory, ThermalDataPoint } from '../types';

export const SimulationLab: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'kuramoto' | 'thermal' | 'quantum'>('kuramoto');

  return (
    <div className="space-y-6 animate-in slide-in-from-bottom-4 duration-500">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-cyber-700 pb-4">
        <div>
          <h2 className="text-3xl font-bold text-white flex items-center gap-3">
            <Activity className="text-cyber-accent" />
            Simulation Laboratory
          </h2>
          <p className="text-cyber-dim font-mono mt-2">REAL-TIME HARDWARE EMULATION</p>
        </div>
        
        <div className="flex bg-cyber-800 p-1 rounded-lg border border-cyber-700">
          <button 
            onClick={() => setActiveTab('kuramoto')}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${activeTab === 'kuramoto' ? 'bg-cyber-700 text-white shadow-lg' : 'text-gray-400 hover:text-white'}`}
          >
            Kuramoto Sync
          </button>
          <button 
            onClick={() => setActiveTab('thermal')}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${activeTab === 'thermal' ? 'bg-cyber-700 text-white shadow-lg' : 'text-gray-400 hover:text-white'}`}
          >
            Thermal
          </button>
           <button 
            onClick={() => setActiveTab('quantum')}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${activeTab === 'quantum' ? 'bg-cyber-700 text-white shadow-lg' : 'text-gray-400 hover:text-white'}`}
          >
            Quantum Stub
          </button>
        </div>
      </div>

      <div className="bg-cyber-800/30 border border-cyber-700 rounded-xl p-6 min-h-[500px]">
        {activeTab === 'kuramoto' && <KuramotoLab />}
        {activeTab === 'thermal' && <ThermalLab />}
        {activeTab === 'quantum' && <QuantumStub />}
      </div>
    </div>
  );
};

const KuramotoLab: React.FC = () => {
  const [isRunning, setIsRunning] = useState(false);
  const [phases, setPhases] = useState<number[]>([]);
  const [history, setHistory] = useState<KuramotoHistory[]>([]);
  const simRef = useRef<KuramotoSimulation>(new KuramotoSimulation());
  const reqRef = useRef<number>();

  const reset = () => {
    setIsRunning(false);
    simRef.current = new KuramotoSimulation();
    setPhases(simRef.current.phases);
    setHistory([]);
    if (reqRef.current) cancelAnimationFrame(reqRef.current);
  };

  useEffect(() => {
    setPhases(simRef.current.phases);
    return () => {
      if (reqRef.current) cancelAnimationFrame(reqRef.current);
    };
  }, []);

  const tick = () => {
    const result = simRef.current.step();
    setPhases([...result.phases]);
    setHistory(prev => {
      const newHist = [...prev, { iteration: prev.length, orderParameter: parseFloat(result.orderParameter.toFixed(4)) }];
      return newHist.slice(-50); // Keep last 50 frames
    });
    
    // Continue loop even if sync is high to show stability
    reqRef.current = requestAnimationFrame(tick);
  };

  useEffect(() => {
    if (isRunning) {
      reqRef.current = requestAnimationFrame(tick);
    } else {
      if (reqRef.current) cancelAnimationFrame(reqRef.current);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isRunning]);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 h-full">
      <div className="flex flex-col gap-6">
        <div className="flex justify-between items-center">
           <h3 className="text-xl font-bold text-white">Oscillator Ring</h3>
           <div className="flex gap-2">
             <button 
               onClick={() => setIsRunning(!isRunning)}
               className={`flex items-center gap-2 px-4 py-2 rounded-md font-bold transition-colors ${isRunning ? 'bg-red-500/20 text-red-400 hover:bg-red-500/30' : 'bg-cyber-accent text-cyber-900 hover:bg-white'}`}
             >
               {isRunning ? 'Pause' : 'Start Sync'} <Play size={16} className={isRunning ? "hidden" : ""} />
             </button>
             <button onClick={reset} className="p-2 bg-gray-700/50 hover:bg-gray-700 rounded-md text-white">
               <RotateCcw size={20} />
             </button>
           </div>
        </div>

        {/* Visualizer */}
        <div className="flex-1 bg-black/40 rounded-xl border border-cyber-700 relative flex items-center justify-center min-h-[350px]">
           <div className="relative w-[300px] h-[300px]">
              {/* Connections Layer */}
              <svg className="absolute inset-0 w-full h-full pointer-events-none">
                {phases.map((phase, i) => {
                   const n = phases.length;
                   const r = 100;
                   const cx = 150;
                   const cy = 150;
                   
                   const angle1 = (i / n) * 2 * Math.PI - Math.PI / 2;
                   const x1 = cx + Math.cos(angle1) * r;
                   const y1 = cy + Math.sin(angle1) * r;

                   const nextIndex = (i + 1) % n;
                   const angle2 = (nextIndex / n) * 2 * Math.PI - Math.PI / 2;
                   const x2 = cx + Math.cos(angle2) * r;
                   const y2 = cy + Math.sin(angle2) * r;
                   
                   // Color line based on phase difference (sync strength)
                   const p1 = phases[i];
                   const p2 = phases[nextIndex];
                   // diff goes 0 (synced) to ~1 (anti-synced)
                   const diff = Math.abs(Math.sin((p1 - p2)/2));
                   const opacity = Math.max(0.1, 1 - diff * 1.5);
                   
                   return (
                     <line 
                       key={`line-${i}`}
                       x1={x1} y1={y1} x2={x2} y2={y2}
                       stroke={`rgba(0, 240, 255, ${opacity})`}
                       strokeWidth={1.5}
                     />
                   );
                })}
              </svg>
              
              {/* Nodes Layer */}
              {phases.map((phase, i) => {
                 const n = phases.length;
                 const r = 100;
                 const cx = 150;
                 const cy = 150;
                 const angle = (i / n) * 2 * Math.PI - Math.PI / 2;
                 const x = cx + Math.cos(angle) * r;
                 const y = cy + Math.sin(angle) * r;
                 
                 // Map phase to color hue (0-360)
                 const normalizedPhase = (phase % (2 * Math.PI) + 2 * Math.PI) % (2 * Math.PI);
                 const hue = (normalizedPhase * 180) / Math.PI;
                 
                 return (
                    <div 
                       key={i}
                       className="absolute w-14 h-14 -ml-7 -mt-7 rounded-full border border-white/10 flex items-center justify-center transition-all duration-75 bg-gray-900/80"
                       style={{
                         left: x,
                         top: y,
                         boxShadow: `0 0 15px hsla(${hue}, 80%, 60%, 0.3)`
                       }}
                    >
                       {/* Color Indicator Ring */}
                       <div 
                         className="absolute inset-0 rounded-full opacity-40"
                         style={{ 
                            border: `2px solid hsla(${hue}, 90%, 60%, 1)`
                         }} 
                       />

                       {/* Phase Dial/Hand */}
                       <div 
                         className="w-full h-full absolute top-0 left-0"
                         style={{ transform: `rotate(${phase}rad)` }}
                       >
                          {/* Tick mark */}
                          <div className="absolute top-1 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-white shadow-[0_0_8px_white]" 
                               style={{ backgroundColor: `hsla(${hue}, 100%, 80%, 1)` }}
                          />
                          {/* Center dot */}
                          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-1 h-1 rounded-full bg-gray-500" />
                          {/* Hand line */}
                          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 w-[1px] h-[40%] bg-gradient-to-t from-transparent to-white/50 origin-top -translate-y-full rotate-180" />
                       </div>
                       
                       <div className="absolute -bottom-5 text-[10px] font-mono text-gray-500">
                         #{i}
                       </div>
                    </div>
                 )
              })}

              {/* Center Info */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center z-10">
                 <div className="text-[9px] text-gray-500 font-mono tracking-widest uppercase mb-1">COHERENCE</div>
                 <div className="text-3xl font-bold text-white font-mono tabular-nums tracking-tighter">
                   {history.length > 0 ? history[history.length-1].orderParameter.toFixed(3) : "0.000"}
                 </div>
                 <div className="text-[10px] text-cyber-accent font-mono mt-1 opacity-80">
                   Target: 1.0
                 </div>
              </div>
           </div>
        </div>
      </div>

      <div className="flex flex-col gap-4">
        <h3 className="text-xl font-bold text-white">Coherence Metric (R)</h3>
        {/* Changed flex-1 and min-h to fixed h-[300px] to fix Recharts width(-1)/height(-1) warning */}
        <div className="w-full h-[300px] bg-black/40 rounded-xl border border-cyber-700 p-4">
          <ResponsiveContainer width="100%" height="100%" minWidth={0}>
            <LineChart data={history}>
              <CartesianGrid strokeDasharray="3 3" stroke="#1e2738" />
              <XAxis dataKey="iteration" hide />
              <YAxis domain={[0, 1.1]} stroke="#64748b" fontSize={12} />
              <Tooltip 
                contentStyle={{ backgroundColor: '#0b0e14', borderColor: '#1e2738', color: '#fff' }}
                itemStyle={{ color: '#00f0ff' }}
              />
              <Line 
                type="monotone" 
                dataKey="orderParameter" 
                stroke="#00f0ff" 
                strokeWidth={2} 
                dot={false}
                isAnimationActive={false}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
        <p className="text-sm text-gray-400">
          The plot shows the Kuramoto order parameter R evolving over time. 
          R → 1.0 implies full phase synchronization among oscillators.
        </p>
      </div>
    </div>
  );
}

const ThermalLab: React.FC = () => {
  const [data, setData] = useState<ThermalDataPoint[]>([]);
  const simRef = useRef(new ThermalSimulation());
  const intervalRef = useRef<number>();

  const start = () => {
    if (intervalRef.current) return;
    simRef.current.reset();
    setData([]);
    
    intervalRef.current = window.setInterval(() => {
       const point = simRef.current.step();
       setData(prev => [...prev, point]);
       if (point.time > 20) {
         clearInterval(intervalRef.current);
         intervalRef.current = undefined;
       }
    }, 100);
  };

  const reset = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = undefined;
    }
    simRef.current.reset();
    setData([]);
  };
  
  // Cleanup
  useEffect(() => {
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    }
  }, []);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
         <div>
            <h3 className="text-xl font-bold text-white flex items-center gap-2">
              <Thermometer size={20} className="text-orange-500" />
              Thermal & TEG Toy Model
            </h3>
            <p className="text-sm text-gray-400">Simulates core temp rise vs cooling efficiency.</p>
         </div>
         <div className="flex gap-2">
           <button onClick={start} className="bg-cyber-accent text-cyber-900 px-4 py-2 rounded font-bold hover:bg-white transition-colors">
             Run Simulation
           </button>
           <button onClick={reset} className="bg-gray-700 text-white px-4 py-2 rounded hover:bg-gray-600 transition-colors">
             Reset
           </button>
         </div>
      </div>

      <div className="bg-black/40 rounded-xl border border-cyber-700 p-4 h-[350px]">
        <ResponsiveContainer width="100%" height="100%" minWidth={0}>
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="#1e2738" />
            <XAxis 
              dataKey="time" 
              stroke="#64748b" 
              label={{ value: 'Time (s)', position: 'insideBottomRight', offset: -5 }} 
            />
            <YAxis 
              yAxisId="left" 
              stroke="#f97316" 
              domain={['auto', 'auto']}
              label={{ value: 'Temp (K)', angle: -90, position: 'insideLeft', fill: '#f97316' }}
            />
            <YAxis 
              yAxisId="right" 
              orientation="right" 
              stroke="#00f0ff" 
              label={{ value: 'Power Rec (W)', angle: 90, position: 'insideRight', fill: '#00f0ff' }}
            />
            <Tooltip 
              contentStyle={{ backgroundColor: '#0b0e14', borderColor: '#1e2738' }}
            />
            <Line yAxisId="left" type="monotone" dataKey="temperature" stroke="#f97316" strokeWidth={2} dot={false} />
            <Line yAxisId="right" type="monotone" dataKey="recoveredPower" stroke="#00f0ff" strokeWidth={2} dot={false} />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="bg-cyber-800/50 p-4 rounded-lg border border-cyber-700">
           <div className="text-xs text-gray-500 font-mono">FINAL CORE TEMP</div>
           <div className="text-2xl font-bold text-orange-400 font-mono">
             {data.length > 0 ? data[data.length-1].temperature.toFixed(1) : "300.0"} K
           </div>
        </div>
        <div className="bg-cyber-800/50 p-4 rounded-lg border border-cyber-700">
           <div className="text-xs text-gray-500 font-mono">PEAK RECOVERED POWER</div>
           <div className="text-2xl font-bold text-cyber-accent font-mono">
             {data.length > 0 ? Math.max(...data.map(d => d.recoveredPower)).toFixed(3) : "0.000"} W
           </div>
        </div>
      </div>
    </div>
  );
}

const QuantumStub: React.FC = () => {
  const [stage, setStage] = useState(0); // 0: Idle, 1: Entangling, 2: Result
  
  const run = () => {
    setStage(1);
    setTimeout(() => {
      setStage(2);
    }, 1500);
  };

  return (
    <div className="flex flex-col items-center justify-center h-full min-h-[400px] text-center space-y-8">
      <div>
        <h3 className="text-2xl font-bold text-white flex items-center justify-center gap-2 mb-2">
          <Zap size={24} className="text-cyber-purple" />
          Quantum Cluster Stub
        </h3>
        <p className="text-gray-400 max-w-md mx-auto">
          Simulates a simple GHZ-like state preparation on a 3-qubit topological cluster.
        </p>
      </div>

      <div className="relative w-64 h-64 flex items-center justify-center bg-black/40 rounded-full border border-cyber-700/50">
        {stage === 0 && (
           <button onClick={run} className="bg-cyber-purple text-white px-8 py-3 rounded-full hover:bg-cyber-purple/80 transition-all font-bold shadow-[0_0_20px_rgba(176,38,255,0.3)]">
             Initialize Qubits
           </button>
        )}

        {stage === 1 && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-48 h-48 border-4 border-cyber-purple/30 border-t-cyber-purple rounded-full animate-spin"></div>
            <div className="absolute text-cyber-purple font-mono animate-pulse">ENTANGLING...</div>
          </div>
        )}

        {stage === 2 && (
          <div className="space-y-4 w-full px-8">
            <div className="flex justify-between items-center text-sm font-mono border-b border-gray-700 pb-2">
              <span className="text-gray-400">|000&gt;</span>
              <span className="text-cyber-accent">0.4998</span>
            </div>
            <div className="flex justify-between items-center text-sm font-mono border-b border-gray-700 pb-2">
              <span className="text-gray-400">|111&gt;</span>
              <span className="text-cyber-accent">0.5002</span>
            </div>
             <div className="flex justify-between items-center text-sm font-mono">
              <span className="text-gray-400">Noise</span>
              <span className="text-red-400">~1e-4</span>
            </div>
            <button onClick={() => setStage(0)} className="text-xs text-gray-500 hover:text-white mt-4 underline">
              Reset
            </button>
          </div>
        )}
      </div>

      <div className="text-xs text-gray-500 font-mono">
        Backend: Qiskit Stub / Local Emulation
      </div>
    </div>
  );
}