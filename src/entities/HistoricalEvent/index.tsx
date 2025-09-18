import { FC } from 'react';
import styles from './index.module.scss';
import { HistoricalEvent as HistoricalEventType } from './types';
import { useBreakpoint } from '@shared/context/Breakpoints';

interface Props {
  event: HistoricalEventType;
}

export const HistoricalEvent: FC<Props> = ({ event }) => {
  const breakpoint = useBreakpoint();

  let maxWidth: number;
  let dateSize: number;
  let descriptionSize: number;

  switch (breakpoint) {
    case 'xxl':
      maxWidth = 400;
      dateSize = 24;
      descriptionSize = 20;
      break;
    case 'xl':
    case 'lg':
      maxWidth = 350;
      dateSize = 20;
      descriptionSize = 18;
      break;
    case 'md':
    case 'sm':
      maxWidth = 300;
      dateSize = 18;
      descriptionSize = 16;
      break;
    case 'xs':
    default:
      maxWidth = 255;
      dateSize = 16;
      descriptionSize = 14;
      break;
  }

  return (
    <div className={styles.eventWrapper} style={{ maxWidth: maxWidth }}>
      <p className={styles.date} style={{ fontSize: dateSize }}>
        {event.date}
      </p>
      <p className={styles.description} style={{ fontSize: descriptionSize }}>
        {event.description}
      </p>
    </div>
  );
};
