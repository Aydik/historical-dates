import { FC } from 'react';
import styles from './index.module.scss';
import classNames from 'classnames';
import { useBreakpoint, compareBreakpoints } from '@shared/context/Breakpoints';
import { Title } from './ui/Title';

export const HistoricalDates: FC = () => {
  const breakpoint = useBreakpoint();
  const isXXLBreakpoint = compareBreakpoints(breakpoint, 'xxl');

  return (
    <div
      className={classNames(styles.historicalDates, {
        [styles.withBorders]: isXXLBreakpoint,
      })}
    >
      <Title breakpoint={breakpoint} />
    </div>
  );
};
