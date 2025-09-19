import { FC } from 'react';
import styles from './index.module.scss';
import { useHistoricalEventsStore } from '@widgets/HistoricalEvents/stores/historicalEvents.store';
import classNames from 'classnames';

export const Dates: FC = () => {
  const { dateFrom, dateTo } = useHistoricalEventsStore();
  return (
    <div className={styles.dates}>
      <p className={classNames(styles.date, styles.dateFrom)}>
        {dateFrom} {dateTo}
      </p>
    </div>
  );
};
