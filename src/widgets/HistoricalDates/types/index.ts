import { HistoricalEvent } from '@entities/HistoricalEvent/types';

export const indexes = [1, 2, 3, 4, 5, 6] as const;
export type Index = (typeof indexes)[number];

export interface HistoricalSection {
  index: Index;
  name: string;
  events: HistoricalEvent[];
}

export type HistoricalDates = HistoricalSection[];
