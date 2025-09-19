import { FC } from 'react';
import { useHistoricalEventsStore } from '@widgets/HistoricalEvents/stores/historicalEvents.store';

interface Props {
  index: number;
  rotation: number;
  rotateCircle: () => void;
  radius?: number;
  onRef?: (el: SVGGElement | null) => void;
}

export const Point: FC<Props> = ({ index, rotation, rotateCircle, radius = 120, onRef }) => {
  const { currentSectionIndex, totalSections } = useHistoricalEventsStore();
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
      ref={onRef}
      transform={`translate(${position.x}, ${position.y}) rotate(${-rotation})`}
      cursor="pointer"
      onClick={rotateCircle}
    >
      <circle r="15" fill={isSelected ? 'red' : 'blue'} strokeWidth="2" />
      <text
        cursor="pointer"
        textAnchor="middle"
        dominantBaseline="middle"
        fill="white"
        fontSize="12"
        fontWeight="bold"
      >
        {index}
      </text>
    </g>
  );
};
