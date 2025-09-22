import styles from './App.module.scss';
import { HistoricalEvents } from '@widgets/HistoricalEvents';
import { HistoricalEventsProvider } from '@widgets/HistoricalEvents/stores/historicalEvents.context';

function App() {
  return (
    <div className={styles.layout}>
      <div className={styles.content}>
        <HistoricalEventsProvider>
          <HistoricalEvents />
        </HistoricalEventsProvider>
      </div>
    </div>
  );
}

export default App;
