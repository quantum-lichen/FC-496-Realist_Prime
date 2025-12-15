export enum NavItem {
  OVERVIEW = 'Overview',
  ARCHITECTURE = 'Architecture',
  SIMULATION = 'Simulations',
  DOCS = 'Documentation'
}

export interface Oscillator {
  id: number;
  phase: number;
}

export interface KuramotoHistory {
  iteration: number;
  orderParameter: number;
}

export interface ThermalDataPoint {
  time: number;
  temperature: number;
  recoveredPower: number;
}
