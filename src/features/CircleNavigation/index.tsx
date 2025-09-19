import { useRef, useState, useCallback, FC, useEffect } from 'react';
import styles from './index.module.scss';
import { gsap } from 'gsap';
import { Point } from './ui/Point';
import { useHistoricalEventsStore } from '@widgets/HistoricalEvents/stores/historicalEvents.store';

interface Props {
  radius?: number;
}

export const CircleNavigation: FC<Props> = ({ radius = 265 }) => {
  const { currentSectionIndex, sections, totalSections } = useHistoricalEventsStore();

  const anglePerPoint = 360 / totalSections;
  const indexRef = useRef<number>(0);
  const circleRef = useRef<SVGSVGElement>(null);
  const pointsRef = useRef<Array<SVGGElement | null>>([]);
  const [rotation, setRotation] = useState<number>(90 - anglePerPoint);

  const handlePointRef = useCallback(
    (index: number) => (el: SVGGElement | null) => {
      pointsRef.current[index] = el;
    },
    [],
  );

  const rotateCircle = useCallback(
    (targetIndex: number): void => {
      const direct_steps = indexRef.current - targetIndex;
      const reverse_steps =
        direct_steps > 0 ? direct_steps - totalSections : direct_steps + totalSections;

      const diff = Math.abs(direct_steps) <= Math.abs(reverse_steps) ? direct_steps : reverse_steps;

      const newRotation = rotation + diff * anglePerPoint;

      setRotation(newRotation);
      indexRef.current = targetIndex;

      if (circleRef.current) {
        gsap.to(circleRef.current, {
          rotation: newRotation,
          duration: 0.3,
          ease: 'power2.inOut',
          transformOrigin: 'center center',
        });

        pointsRef.current.forEach(point => {
          if (point) {
            gsap.to(point, {
              rotation: -newRotation,
              duration: 0.3,
              ease: 'power2.inOut',
              transformOrigin: 'center center',
            });
          }
        });
      }
    },
    [anglePerPoint, rotation, totalSections],
  );

  useEffect(() => {
    rotateCircle(currentSectionIndex);
  }, [currentSectionIndex, rotateCircle]);

  return (
    <div className={styles.circleWrapper}>
      <svg
        ref={circleRef}
        viewBox={`-${radius + 100} -${radius + 100} ${radius * 2 + 200} ${radius * 2 + 200}`}
      >
        <circle className={styles.circle} cx="0" cy="0" r={radius} fill="none" strokeWidth="1" />
        {sections.map((section, index) => (
          <Point
            key={index}
            name={section.name}
            index={index}
            radius={radius}
            rotation={rotation}
            onRef={handlePointRef(index)}
          />
        ))}
      </svg>
    </div>
  );
};
