import { FC } from 'react';
import styles from './index.module.scss';
import classNames from 'classnames';
import { useBreakpoint, compareBreakpoints } from '@shared/context/Breakpoints';
import { Title } from './ui/Title';
import { HistoricalEventSwiper } from '@features/HistoricalEventSwiper';

export const HistoricalDates: FC = () => {
  const breakpoint = useBreakpoint();
  const isXLBreakpoint = compareBreakpoints(breakpoint, 'xl');

  let paddingTop: number;
  let paddingHorizontal: number;

  switch (breakpoint) {
    case 'xxl':
      paddingTop = 170;
      paddingHorizontal = 80;
      break;
    case 'xl':
    case 'lg':
      paddingTop = 120;
      paddingHorizontal = 70;
      break;
    case 'md':
      paddingTop = 100;
      paddingHorizontal = 60;
      break;
    case 'sm':
      paddingTop = 80;
      paddingHorizontal = 24;
      break;
    case 'xs':
    default:
      paddingTop = 60;
      paddingHorizontal = 20;
      break;
  }

  return (
    <div
      className={classNames(styles.historicalDates, {
        [styles.withBorders]: isXLBreakpoint,
      })}
      style={{ paddingTop: paddingTop }}
    >
      <Title paddingHorizontal={paddingHorizontal} />
      <HistoricalEventSwiper paddingHorizontal={paddingHorizontal} />
    </div>
  );
};
