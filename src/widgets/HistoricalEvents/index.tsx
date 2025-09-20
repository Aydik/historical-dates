import { FC } from 'react';
import styles from './index.module.scss';
import classNames from 'classnames';
import { useBreakpoint, compareBreakpoints } from '@shared/context/Breakpoints';
import { Title } from './ui/Title';
import { SectionPagination } from '@features/SectionPagination';
import { HistoricalEventSwiper } from '@features/HistoricalEventSwiper';
import { Dates } from '@features/Dates';
import { useHistoricalEventsStore } from '@widgets/HistoricalEvents/stores/historicalEvents.store';
import { CircleNavigation } from '@features/CircleNavigation';

export const HistoricalEvents: FC = () => {
  const { currentName } = useHistoricalEventsStore();

  const breakpoint = useBreakpoint();
  const isXLBreakpoint = compareBreakpoints(breakpoint, 'xl');
  const isDesktop = compareBreakpoints(breakpoint, 'md');

  let paddingBottom: number;
  let paddingTop: number;
  let paddingHorizontal: number;

  switch (breakpoint) {
    case 'xxl':
      paddingBottom = 104;
      paddingTop = 170;
      paddingHorizontal = 80;
      break;
    case 'xl':
    case 'lg':
      paddingBottom = 80;
      paddingTop = 120;
      paddingHorizontal = 70;
      break;
    case 'md':
      paddingBottom = 48;
      paddingTop = 100;
      paddingHorizontal = 60;
      break;
    case 'sm':
      paddingBottom = 32;
      paddingTop = 80;
      paddingHorizontal = 24;
      break;
    case 'xs':
    default:
      paddingBottom = 14;
      paddingTop = 60;
      paddingHorizontal = 20;
      break;
  }

  return (
    <div
      className={classNames(styles.historicalEvents, {
        [styles.withBorders]: isXLBreakpoint,
      })}
      style={{ paddingTop: paddingTop, paddingBottom: paddingBottom }}
    >
      <Title paddingHorizontal={paddingHorizontal} />
      {/*<Dates />*/}
      <div className={styles.eventsWrapper} style={{ height: isDesktop ? '35vh' : '45vh' }}>
        {!isDesktop && (
          <>
            <p className={styles.sectionName} style={{ paddingLeft: paddingHorizontal }}>
              {currentName}
            </p>
            <div style={{ padding: `0 ${paddingHorizontal}px` }}>
              <div className={styles.divider} />
            </div>
          </>
        )}
        <div className={styles.events}>
          {isDesktop && (
            <div style={{ paddingLeft: paddingHorizontal }}>
              <SectionPagination />
            </div>
          )}
          <HistoricalEventSwiper paddingHorizontal={paddingHorizontal} />
          {!isDesktop && (
            <>
              <div style={{ paddingLeft: paddingHorizontal }}>
                <SectionPagination />
              </div>
              <div className={styles.navigationWrapper}>......</div>
            </>
          )}
        </div>
      </div>
      {isDesktop && (
        <>
          <div className={classNames(styles.line, styles.lineHorizontal)} />
          <div className={classNames(styles.line, styles.lineVertical)} />
          <div className={styles.circleWrapper}>
            <CircleNavigation />
          </div>
        </>
      )}
    </div>
  );
};
