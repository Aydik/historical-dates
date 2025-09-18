import { create } from 'zustand';
import { Index } from '../types';
import { HISTORICAL_DATES } from '../mocks';
import { HistoricalEvent } from '@entities/HistoricalEvent/types';

interface HistoricalDatesStore {
  currentIndex: Index;
  currentName: string;
  dateFrom: number;
  dateTo: number;
  events: HistoricalEvent[];
  setCurrentIndex: (index: number) => void;
}

export const useHistoricalDatesStore = create<HistoricalDatesStore>(set => ({
  currentIndex: 1,
  currentName: 'Спорт',
  dateFrom: 2015,
  dateTo: 2020,
  events: [],

  setCurrentIndex: (index: number) => {
    const section = HISTORICAL_DATES.find(item => item.index === index);

    if (section) {
      const sortedEvents = [...section.events].sort((a, b) => a.date - b.date);
      const dates = sortedEvents.map(event => event.date);
      const dateFrom = Math.min(...dates);
      const dateTo = Math.max(...dates);

      set({
        currentIndex: section.index,
        currentName: section.name,
        events: sortedEvents,
        dateFrom,
        dateTo,
      });
    }
  },
}));

const initializeStore = () => {
  const store = useHistoricalDatesStore.getState();
  store.setCurrentIndex(1);
};

initializeStore();
