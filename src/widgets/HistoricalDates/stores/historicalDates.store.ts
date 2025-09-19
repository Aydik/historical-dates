import { create } from 'zustand';
import { HISTORICAL_DATES } from '../mocks';
import { HistoricalEvent } from '@entities/HistoricalEvent/types';

interface HistoricalDatesStore {
  totalSections: number;
  currentSectionIndex: number;
  currentName: string;
  dateFrom: number;
  dateTo: number;
  events: HistoricalEvent[];
  getPrevSection: () => void;
  getNextSection: () => void;
  setCurrentSection: (index: number) => void;
}

export const useHistoricalDatesStore = create<HistoricalDatesStore>((set, get) => ({
  totalSections: HISTORICAL_DATES.length,
  currentSectionIndex: 0,
  currentName: 'Спорт',
  dateFrom: 2015,
  dateTo: 2020,
  events: [],

  getPrevSection: () => {
    const { currentSectionIndex, setCurrentSection } = get();
    if (currentSectionIndex !== 0) {
      setCurrentSection(currentSectionIndex - 1);
    }
  },

  getNextSection: () => {
    const { currentSectionIndex, totalSections, setCurrentSection } = get();
    if (currentSectionIndex + 1 !== totalSections) {
      setCurrentSection(currentSectionIndex + 1);
    }
  },

  setCurrentSection: (index: number) => {
    const section = HISTORICAL_DATES[index];

    if (section) {
      const sortedEvents = [...section.events].sort((a, b) => a.date - b.date);
      const dates = sortedEvents.map(event => event.date);
      const dateFrom = Math.min(...dates);
      const dateTo = Math.max(...dates);

      set({
        currentSectionIndex: index,
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
  store.setCurrentSection(1);
};

initializeStore();
