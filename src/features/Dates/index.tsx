import { FC } from 'react';
import styles from './index.module.scss';
import { AnimatedYear } from '@features/Dates/ui/AnimatedYear';
import { useBreakpoint } from '@shared/context/Breakpoints';

export const Dates: FC = () => {
  const breakpoint = useBreakpoint();

  let fontSize: number;
  switch (breakpoint) {
    case 'xxl':
      fontSize = 160;
      break;
    case 'xl':
    case 'lg':
      fontSize = 140;
      break;
    case 'md':
      fontSize = 120;
      break;
    case 'sm':
      fontSize = 80;
      break;
    case 'xs':
    default:
      fontSize = 56;
      break;
  }
  return (
    <p className={styles.date} style={{ fontSize: fontSize }}>
      <AnimatedYear type="prev" />
      {'  '}
      <AnimatedYear type="next" />
    </p>
  );
};
