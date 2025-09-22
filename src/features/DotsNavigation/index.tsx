import { FC } from 'react';
import styles from './index.module.scss';
import { useHistoricalEventsStore } from '@widgets/HistoricalEvents/stores/historicalEvents.store';
import classNames from 'classnames';

export const DotsNavigation: FC = () => {
  const { currentSectionIndex, totalSections, setCurrentSection } = useHistoricalEventsStore();
  return (
    <div className={styles.navigation}>
      {Array.from({ length: totalSections }).map((_, index) => {
        const isSelected = currentSectionIndex === index;
        return (
          <button
            key={index}
            onClick={isSelected ? undefined : () => setCurrentSection(index)}
            className={classNames(styles.button, {
              [styles.buttonSelected]: isSelected,
            })}
          >
            <div className={styles.dot} />
          </button>
        );
      })}
    </div>
  );
};
