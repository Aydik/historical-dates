import { FC } from 'react';
import styles from './index.module.scss';
import classNames from 'classnames';
import { useBreakpoint, compareBreakpoints } from '@shared/context/Breakpoints';
import { Title } from './ui/Title';

export const HistoricalDates: FC = () => {
  const breakpoint = useBreakpoint();
  const isXLBreakpoint = compareBreakpoints(breakpoint, 'xl');
  let paddingTop: number;

  switch (breakpoint) {
    case 'xxl':
      paddingTop = 170;
      break;
    case 'xl':
    case 'lg':
      paddingTop = 120;
      break;
    case 'md':
      paddingTop = 100;
      break;
    case 'sm':
      paddingTop = 80;
      break;
    case 'xs':
    default:
      paddingTop = 60;
      break;
  }

  return (
    <div
      className={classNames(styles.historicalDates, {
        [styles.withBorders]: isXLBreakpoint,
      })}
      style={{ paddingTop: paddingTop }}
    >
      <Title />
    </div>
  );
};
