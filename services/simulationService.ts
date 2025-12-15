import { Oscillator, ThermalDataPoint } from '../types';

// Kuramoto Constants
const N_OSC = 5;
const COUPLING_STRENGTH = 0.5;
const NOISE_LEVEL = 0.1;
const DT = 0.1;

export class KuramotoSimulation {
  public phases: number[];

  constructor() {
    // Initialize random phases between 0 and 2PI
    this.phases = Array.from({ length: N_OSC }, () => Math.random() * 2 * Math.PI);
  }

  private simulateNoise(phases: number[]): number[] {
    return phases.map(p => p + (Math.random() - 0.5) * 2 * NOISE_LEVEL);
  }

  public step(): { phases: number[]; orderParameter: number } {
    // Apply Noise
    let currentPhases = this.simulateNoise(this.phases);
    
    // Apply Kuramoto Feedback
    const newPhases = [...currentPhases];
    const n = currentPhases.length;
    
    for (let i = 0; i < n; i++) {
      let correction = 0.0;
      const neighbors = [(i - 1 + n) % n, (i + 1) % n]; // Ring topology
      
      for (const j of neighbors) {
        correction += COUPLING_STRENGTH * Math.sin(currentPhases[j] - currentPhases[i]);
      }
      
      newPhases[i] += correction * DT;
    }
    
    this.phases = newPhases;

    // Calculate Order Parameter R
    // R = | (1/N) * sum(e^(i*theta)) |
    let sumReal = 0;
    let sumImag = 0;
    
    for (const p of this.phases) {
      sumReal += Math.cos(p);
      sumImag += Math.sin(p);
    }
    
    const r = Math.sqrt((sumReal / n) ** 2 + (sumImag / n) ** 2);
    
    return {
      phases: this.phases,
      orderParameter: r
    };
  }
}

// Thermal Constants
const P_CORE = 100.0; // W
const T_SINK = 300.0; // K
const C_TH = 1000.0; // J/K
const R_TH = 0.1; // K/W
const TEG_EFF = 0.05; // 5%

export class ThermalSimulation {
  private temperature: number;
  private time: number;

  constructor() {
    this.temperature = T_SINK;
    this.time = 0;
  }

  public reset() {
    this.temperature = T_SINK;
    this.time = 0;
  }

  public step(): ThermalDataPoint {
    // Heat flow to sink
    const qDot = (this.temperature - T_SINK) / R_TH;
    
    // TEG recovery
    const pRec = qDot > 0 ? TEG_EFF * qDot : 0.0;
    
    // Net heat leaving core (simplified, usually P_rec is subtracted from work, but here we just track it)
    const qDotNet = qDot; 
    
    // Temp evolution: dT/dt = (P_in - P_out) / C
    const dTdt = (P_CORE - qDotNet) / C_TH;
    
    this.temperature += dTdt * DT;
    this.time += DT;

    return {
      time: parseFloat(this.time.toFixed(1)),
      temperature: parseFloat(this.temperature.toFixed(2)),
      recoveredPower: parseFloat(pRec.toFixed(3))
    };
  }
}