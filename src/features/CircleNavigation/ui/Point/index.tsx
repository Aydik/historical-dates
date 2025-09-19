import { FC } from 'react';
import styles from './index.module.scss';
import { useHistoricalEventsStore } from '@widgets/HistoricalEvents/stores/historicalEvents.store';
import classNames from 'classnames';

interface Props {
  index: number;
  name: string;
  rotation: number;
  radius?: number;
  onRef?: (el: SVGGElement | null) => void;
}

export const Point: FC<Props> = ({ index, name, rotation, radius = 265, onRef }) => {
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
    <>
      <g
        className={classNames(styles.point, {
          [styles.pointSelected]: isSelected,
        })}
        ref={onRef}
        transform={`translate(${position.x}, ${position.y}) rotate(${-rotation})`}
        onClick={() => setCurrentSection(index)}
      >
        <circle className={styles.circle} r="27" />
        <text className={styles.index}>{index + 1}</text>
      </g>
      <text
        className={styles.name}
        transform={`translate(${position.x}, ${position.y}) rotate(${-rotation})`}
        x={47}
        y={5}
        opacity={isSelected ? 1 : 0}
      >
        {name}
      </text>
    </>
  );
};
