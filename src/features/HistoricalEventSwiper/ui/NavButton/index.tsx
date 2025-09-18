import { FC } from 'react';
import styles from './index.module.scss';

interface Props {
  onClick: () => void;
  type: 'prev' | 'next';
}

export const NavButton: FC<Props> = ({ onClick, type }) => {
  return (
    <button
      className={styles.navButton}
      aria-label={type === 'prev' ? 'Предыдущее событие' : 'Следующее событие'}
      onClick={onClick}
      style={type === 'prev' ? { transform: 'scale(-1, 1)' } : {}}
    >
      <svg height="10" viewBox="0 0 8 12" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M1 1L6 6L1 11" stroke="currentColor" strokeWidth="2" />
      </svg>
    </button>
  );
};
