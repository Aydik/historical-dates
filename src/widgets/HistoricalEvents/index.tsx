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
import { DotsNavigation } from '@features/DotsNavigation';

export const HistoricalEvents: FC = () => {
  const { currentName } = useHistoricalEventsStore();

  const breakpoint = useBreakpoint();
  const isXLBreakpoint = compareBreakpoints(breakpoint, 'xl');
  const isDesktop = compareBreakpoints(breakpoint, 'md');

  let paddingBottom: number;
  let paddingTop: number;
  let paddingHorizontal: number;
  let circleNav: number;

  switch (breakpoint) {
    case 'xxl':
      paddingBottom = 104;
      paddingTop = 170;
      paddingHorizontal = 80;
      circleNav = 550;
      break;
    case 'xl':
    case 'lg':
      paddingBottom = 80;
      paddingTop = 120;
      paddingHorizontal = 70;
      circleNav = 500;
      break;
    case 'md':
      paddingBottom = 48;
      paddingTop = 100;
      paddingHorizontal = 60;
      circleNav = 450;
      break;
    case 'sm':
      paddingBottom = 32;
      paddingTop = 80;
      paddingHorizontal = 24;
      circleNav = 200;
      break;
    case 'xs':
    default:
      paddingBottom = 14;
      paddingTop = 60;
      paddingHorizontal = 20;
      circleNav = 200;
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
      {!isDesktop && <Dates />}
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
            <div
              className={styles.navigationMobile}
              style={{ paddingLeft: paddingHorizontal, paddingRight: paddingHorizontal }}
            >
              <SectionPagination />
              <div className={styles.dotsNavigationWrapper}>
                <DotsNavigation />
              </div>
            </div>
          )}
        </div>
      </div>
      {isDesktop && (
        <>
          <div
            className={classNames(styles.line, styles.lineHorizontal)}
            style={{
              top: circleNav / 2 + paddingTop - 50,
            }}
          />
          <div className={classNames(styles.line, styles.lineVertical)} />
          <div
            className={styles.datesWrapperDesktop}
            style={{
              left: 0,
              right: 0,
              top: circleNav / 2 + paddingTop - 50 - 100,
              height: 200,
            }}
          >
            <Dates />
          </div>
          <div
            className={styles.circleWrapper}
            style={{
              height: circleNav,
              width: circleNav,
              top: paddingTop - 50,
              left: `calc((100% - ${circleNav}px) / 2)`,
            }}
          >
            <CircleNavigation />
          </div>
        </>
      )}
    </div>
  );
};
