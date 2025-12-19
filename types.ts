
export interface RideDetails {
  collegeName: string;
  destination: string;
  studentCount: number;
  totalFare: number;
  provider: 'Uber' | 'Ola' | 'Rapido';
  currentLat?: number;
  currentLng?: number;
}

export interface GroundingSource {
  title?: string;
  uri?: string;
}

export interface AnalysisResponse {
  splitSuggestion: string;
  environmentalBenefits: string;
  economicImpact: string;
  safetyMeasures: string[];
  feasibilityAnalysis: string;
  weeklySavings: string;
  integrationFlow: string;
  optimizationLogic: string;
  groundingSources?: GroundingSource[];
}

export interface FareSplitData {
  name: string;
  value: number;
}
