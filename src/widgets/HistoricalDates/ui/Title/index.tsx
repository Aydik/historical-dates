import { FC } from 'react';
import styles from './index.module.scss';
import classNames from 'classnames';
import { compareBreakpoints, useBreakpoint } from '@shared/context/Breakpoints';

export const Title: FC = () => {
  const breakpoint = useBreakpoint();

  let titleMarginTop: number;
  let titleSize: number;
  let titlePaddingLeft: number;

  switch (breakpoint) {
    case 'xxl':
      titleMarginTop = 170;
      titleSize = 56;
      titlePaddingLeft = 80;
      break;
    case 'xl':
    case 'lg':
      titleMarginTop = 140;
      titleSize = 48;
      titlePaddingLeft = 60;
      break;
    case 'md':
      titleMarginTop = 120;
      titleSize = 40;
      titlePaddingLeft = 40;
      break;
    case 'sm':
      titleMarginTop = 80;
      titleSize = 32;
      titlePaddingLeft = 24;
      break;
    case 'xs':
    default:
      titleMarginTop = 60;
      titleSize = 20;
      titlePaddingLeft = 20;
      break;
  }

  return (
    <div
      className={styles.titleWrapper}
      style={{
        marginTop: titleMarginTop,
      }}
    >
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
