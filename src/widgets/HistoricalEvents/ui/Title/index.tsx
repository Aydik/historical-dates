import { FC } from 'react';
import styles from './index.module.scss';
import classNames from 'classnames';
import { compareBreakpoints, useBreakpoint } from '@shared/context/Breakpoints';

interface Props {
  paddingHorizontal: number;
}

export const Title: FC<Props> = ({ paddingHorizontal }) => {
  const breakpoint = useBreakpoint();

  let titleSize: number;

  switch (breakpoint) {
    case 'xxl':
      titleSize = 56;
      break;
    case 'xl':
    case 'lg':
      titleSize = 48;
      break;
    case 'md':
      titleSize = 40;
      break;
    case 'sm':
      titleSize = 32;
      break;
    case 'xs':
    default:
      titleSize = 20;
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
          paddingLeft: paddingHorizontal,
        }}
      >
        Исторические
        <br />
        даты
      </h1>
    </div>
  );
};
