import { useRef, useState, useCallback, FC, useEffect } from 'react';
import styles from './index.module.scss';
import { gsap } from 'gsap';
import { Point } from './ui/Point';
import { useHistoricalEventsStore } from '@widgets/HistoricalEvents/stores/historicalEvents.store';

export const CircleNavigation: FC = () => {
  const { currentName, currentSectionIndex, sections, totalSections } = useHistoricalEventsStore();

  const anglePerPoint = 360 / totalSections;
  const indexRef = useRef<number>(0);
  const circleRef = useRef<SVGSVGElement>(null);
  const pointsRef = useRef<Array<SVGGElement | null>>([]);
  const nameRef = useRef<SVGTextElement>(null);

  const [rotation, setRotation] = useState<number>(90 - anglePerPoint);

  const nameX = Math.cos(((-rotation - anglePerPoint) * Math.PI) / 180) * 265;
  const nameY = Math.sin(((-rotation - anglePerPoint) * Math.PI) / 180) * 265;

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

  useEffect(() => {
    gsap
      .timeline()
      .to(nameRef.current, {
        opacity: 0,
        display: 'none',
        duration: 0,
      })
      .to(nameRef.current, {
        display: 'unset',
        opacity: 1,
        duration: 0.15,
        delay: 0.3,
      });
  }, [currentSectionIndex]);

  return (
    <div className={styles.circleWrapper}>
      <svg ref={circleRef} viewBox="-365 -365 730 730">
        <circle className={styles.circle} cx="0" cy="0" r="265" fill="none" strokeWidth="1" />
        {sections.map((_, index) => (
          <Point key={index} index={index} radius={265} onRef={handlePointRef(index)} />
        ))}
        <text
          ref={nameRef}
          className={styles.name}
          transform={`translate(${nameX}, ${nameY}) rotate(${-rotation})`}
          x={47}
          y={5}
        >
          {currentName}
        </text>
      </svg>
    </div>
  );
};
