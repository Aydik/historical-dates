import { FC } from 'react';
import styles from './index.module.scss';
import classNames from 'classnames';
import { useHistoricalDatesStore } from '@widgets/HistoricalDates/stores/historicalDates.store';
import { useBreakpoint } from '@shared/context/Breakpoints';

export const SectionPagination: FC = () => {
  const { currentSectionIndex, totalSections, getPrevSection, getNextSection } =
    useHistoricalDatesStore();

  const breakpoint = useBreakpoint();

  let wrapperGap: number;
  let buttonsGap: number;
  let buttonSize: number;

  switch (breakpoint) {
    case 'xxl':
      wrapperGap = 20;
      buttonsGap = 20;
      buttonSize = 50;
      break;
    case 'xl':
    case 'lg':
      wrapperGap = 16;
      buttonsGap = 12;
      buttonSize = 40;
      break;
    case 'md':
    case 'sm':
      wrapperGap = 12;
      buttonsGap = 10;
      buttonSize = 30;
      break;
    case 'xs':
    default:
      wrapperGap = 10;
      buttonsGap = 8;
      buttonSize = 25;
      break;
  }

  return (
    <div className={styles.wrapper} style={{ gap: wrapperGap }}>
      <p
        className={styles.label}
      >{`${(currentSectionIndex + 1).toString().padStart(2, '0')}/${totalSections.toString().padStart(2, '0')}`}</p>
      <div className={styles.buttons} style={{ gap: buttonsGap }}>
        <button
          aria-label="Предыдущая секция"
          className={classNames(styles.button, styles.buttonPrev, {
            [styles.buttonDisabled]: currentSectionIndex === 0,
          })}
          onClick={getPrevSection}
          style={{ width: buttonSize, height: buttonSize, borderRadius: buttonSize }}
        >
          <svg
            width={0.2 * buttonSize}
            height={0.4 * buttonSize}
            viewBox="0 0 8 12"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M1 1L6 6L1 11" stroke="currentColor" strokeWidth="2" />
          </svg>
        </button>
        <button
          aria-label="Следующая секция"
          className={classNames(styles.button, styles.buttonNext, {
            [styles.buttonDisabled]: currentSectionIndex + 1 === totalSections,
          })}
          onClick={getNextSection}
          style={{ width: buttonSize, height: buttonSize, borderRadius: buttonSize }}
        >
          <svg
            width={0.2 * buttonSize}
            height={0.4 * buttonSize}
            viewBox="0 0 8 12"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M1 1L6 6L1 11" stroke="currentColor" strokeWidth="2" />
          </svg>
        </button>
      </div>
    </div>
  );
};
