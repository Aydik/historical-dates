import styles from './App.module.scss';
import { HistoricalEvents } from '@widgets/HistoricalEvents';

function App() {
  return (
    <div className={styles.layout}>
      <div className={styles.content}>
        <HistoricalEvents />
      </div>
    </div>
  );
}

export default App;
