import { LotRecord } from '../types';

// Mock data used across dashboard, history, reports and lot-analysis pages.
// Replace with real API calls once the backend is ready.
export const recentLots: LotRecord[] = [
  { id: 'ON-1024', date: '12 Sep 2026', weightKg: 5.2, healthy: 86, rotten: 8, sprouted: 4, grade: 'A' },
  { id: 'ON-1023', date: '10 Sep 2026', weightKg: 3.8, healthy: 72, rotten: 15, sprouted: 6, grade: 'B' },
  { id: 'ON-1022', date: '08 Sep 2026', weightKg: 4.1, healthy: 90, rotten: 6, sprouted: 4, grade: 'A' },
  { id: 'ON-1021', date: '07 Sep 2026', weightKg: 6.0, healthy: 65, rotten: 20, sprouted: 10, grade: 'C' },
  { id: 'ON-1020', date: '05 Sep 2026', weightKg: 2.5, healthy: 78, rotten: 12, sprouted: 10, grade: 'B' },
  { id: 'ON-1019', date: '03 Sep 2026', weightKg: 4.8, healthy: 82, rotten: 10, sprouted: 8, grade: 'A' },
  { id: 'ON-1018', date: '01 Sep 2026', weightKg: 3.6, healthy: 69, rotten: 18, sprouted: 13, grade: 'B' },
  { id: 'ON-1017', date: '30 Aug 2026', weightKg: 5.0, healthy: 74, rotten: 16, sprouted: 10, grade: 'B' },
  { id: 'ON-1016', date: '28 Aug 2026', weightKg: 2.9, healthy: 88, rotten: 7, sprouted: 5, grade: 'A' },
  { id: 'ON-1015', date: '26 Aug 2026', weightKg: 4.3, healthy: 60, rotten: 25, sprouted: 15, grade: 'C' },
];

export const gradeStyles: Record<string, string> = {
  A: 'bg-secondary-light text-secondary',
  B: 'bg-amber-100 text-amber-700',
  C: 'bg-red-100 text-red-600',
};
