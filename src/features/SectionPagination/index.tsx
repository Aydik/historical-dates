import { FC } from 'react';
import styles from './index.module.scss';
import classNames from 'classnames';

export const SectionPagination: FC = () => {
  return (
    <div className={styles.wrapper}>
      <p className={styles.label}>06/06</p>
      <div className={styles.buttons}>
        <button
          aria-label="Предыдущая секция"
          className={classNames(styles.button, styles.buttonPrev, {
            [styles.buttonDisabled]: false,
          })}
        >
          <svg
            width="10"
            height="20"
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
            [styles.buttonDisabled]: true,
          })}
        >
          <svg
            width="10"
            height="20"
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
