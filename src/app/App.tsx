import styles from './App.module.scss';
import { HistoricalDates } from '@widgets/HistoricalDates';

function App() {
  return (
    <div className={styles.layout}>
      <div className={styles.content}>
        <HistoricalDates />
      </div>
    </div>
  );
}

export default App;
