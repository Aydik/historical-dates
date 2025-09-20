import { FC } from 'react';
import styles from './index.module.scss';
import { useHistoricalEventsStore } from '@widgets/HistoricalEvents/stores/historicalEvents.store';
import classNames from 'classnames';

interface Props {
  index: number;
  radius?: number;
  onRef?: (el: SVGGElement | null) => void;
}

export const Point: FC<Props> = ({ index, radius = 265, onRef }) => {
  const { currentSectionIndex, totalSections, setCurrentSection } = useHistoricalEventsStore();
  const isSelected = currentSectionIndex === index;
  const getPointPosition = (): { x: number; y: number } => {
    const angle = (index * 360) / totalSections - 90;
    const x = Math.cos((angle * Math.PI) / 180) * radius;
    const y = Math.sin((angle * Math.PI) / 180) * radius;
    return { x, y };
  };

  const position = getPointPosition();

  return (
    <g
      className={classNames(styles.point, {
        [styles.pointSelected]: isSelected,
      })}
      ref={onRef}
      transform={`translate(${position.x}, ${position.y})`}
      onClick={isSelected ? undefined : () => setCurrentSection(index)}
    >
      <circle className={styles.circle} r="27" />
      <text className={styles.index}>{index + 1}</text>
    </g>
  );
};
