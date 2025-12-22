
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

// Matching flow types
export interface MatchRequest {
  collegeName: string;
  destination: string;
  provider: 'Uber' | 'Ola' | 'Rapido';
  femaleOnly?: boolean;
  currentLat?: number;
  currentLng?: number;
  partySize?: number;
  ownerId?: string;
  ownerName?: string;
  ownerGender?: 'male' | 'female';
}

export interface PoolMember {
  id: string;
  name: string;
  gender?: 'male' | 'female';
}

export interface PoolStop {
  name: string;
  lat: number;
  lng: number;
}

export interface Pool {
  id: string;
  provider: 'Uber' | 'Ola' | 'Rapido';
  members: PoolMember[];
  pickupPoints: PoolStop[];
  meetupPoint?: PoolStop;
  deepLink?: string;
  ownerId?: string;
}

export interface MatchResponse {
  pool: Pool;
}

export type UserRole = 'passenger' | 'driver';

export interface AppUser {
  id: string;
  email?: string;
  name?: string;
  role: UserRole;
  gender?: 'male' | 'female';
}
