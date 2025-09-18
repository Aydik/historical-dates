import { FC } from 'react';
import styles from './index.module.scss';
import classNames from 'classnames';
import { compareBreakpoints, useBreakpoint } from '@shared/context/Breakpoints';

export const Title: FC = () => {
  const breakpoint = useBreakpoint();

  let titleSize: number;
  let titlePaddingLeft: number;

  switch (breakpoint) {
    case 'xxl':
      titleSize = 56;
      titlePaddingLeft = 80;
      break;
    case 'xl':
    case 'lg':
      titleSize = 48;
      titlePaddingLeft = 60;
      break;
    case 'md':
      titleSize = 40;
      titlePaddingLeft = 40;
      break;
    case 'sm':
      titleSize = 32;
      titlePaddingLeft = 24;
      break;
    case 'xs':
    default:
      titleSize = 20;
      titlePaddingLeft = 20;
      break;
  }

  return (
    <div className={styles.titleWrapper}>
      <h1
        className={classNames(styles.title, {
          [styles.withLine]: compareBreakpoints(breakpoint, 'md'),
        })}
        style={{
          fontSize: titleSize,
          paddingLeft: titlePaddingLeft,
        }}
      >
        Исторические
        <br />
        даты
      </h1>
    </div>
  );
};
