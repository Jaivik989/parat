export type UserRole = 'farmer' | 'procurement';

export type Grade = 'A' | 'B' | 'C';

export interface ScanResult {
  healthy: number;
  rotten: number;
  sprouted: number;
  damaged: number;
  grade: Grade;
}

export interface LotRecord {
  id: string;
  date: string;
  weightKg: number;
  healthy: number;
  rotten: number;
  sprouted: number;
  grade: Grade;
}
