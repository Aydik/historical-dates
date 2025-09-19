import { HistoricalEvent } from '@entities/HistoricalEvent/types';

export interface HistoricalSection {
  name: string;
  events: HistoricalEvent[];
}

export type HistoricalEvents = HistoricalSection[];
