import styles from './App.module.scss';
// import { HistoricalEvents } from '@widgets/HistoricalEvents';
import { CircleNavigation } from '@features/CircleNavigation';

function App() {
  return (
    <div className={styles.layout}>
      <div className={styles.content}>
        {/*<HistoricalEvents />*/}
        <CircleNavigation />
      </div>
    </div>
  );
}

export default App;
