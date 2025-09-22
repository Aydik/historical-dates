import { createContext, FC, ReactNode, useContext, useRef } from 'react';
import { createHistoricalEventsStore } from '@widgets/HistoricalEvents/stores/historicalEvents.store';

const HistoricalEventsStoreContext = createContext<ReturnType<
  typeof createHistoricalEventsStore
> | null>(null);

export const HistoricalEventsProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const storeRef = useRef<ReturnType<typeof createHistoricalEventsStore>>(null);
  if (!storeRef.current) {
    storeRef.current = createHistoricalEventsStore();
    storeRef.current.getState().setCurrentSection(0);
  }

  return (
    <HistoricalEventsStoreContext.Provider value={storeRef.current}>
      {children}
    </HistoricalEventsStoreContext.Provider>
  );
};

export const useHistoricalEventsStore = () => {
  const store = useContext(HistoricalEventsStoreContext);
  if (!store) {
    throw new Error('useHistoricalEventsStore должен содержать HistoricalEventsProvider');
  }
  return store();
};
