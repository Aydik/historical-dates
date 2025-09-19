import { useRef, useState, useCallback, FC, useEffect } from 'react';
import { gsap } from 'gsap';
import { Point } from './ui/Point';
import { useHistoricalEventsStore } from '@widgets/HistoricalEvents/stores/historicalEvents.store';

export const CircleNavigation: FC = () => {
  const { currentSectionIndex, sections, totalSections } = useHistoricalEventsStore();

  const indexRef = useRef<number>(0);
  const circleRef = useRef<SVGSVGElement>(null);
  const pointsRef = useRef<Array<SVGGElement | null>>([]);
  const [rotation, setRotation] = useState<number>(0);

  const handlePointRef = useCallback(
    (index: number) => (el: SVGGElement | null) => {
      pointsRef.current[index] = el;
    },
    [],
  );

  const rotateCircle = useCallback(
    (targetIndex: number): void => {
      const anglePerPoint = 360 / totalSections;

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
    [rotation, totalSections],
  );

  useEffect(() => {
    rotateCircle(currentSectionIndex);
  }, [currentSectionIndex, rotateCircle]);

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh',
        backgroundColor: '#f0f0f0',
        padding: '20px',
        gap: '40px',
      }}
    >
      <div>
        <div style={{ position: 'relative', width: '600px', height: '600px' }}>
          <svg
            ref={circleRef}
            width="600"
            height="600"
            viewBox="-300 -300 600 600"
            style={{ position: 'absolute' }}
          >
            <circle cx="0" cy="0" r="265" fill="none" stroke="#333" strokeWidth="2" />

            {sections.map((section, index) => (
              <Point key={index} index={index} rotation={rotation} onRef={handlePointRef(index)} />
            ))}
          </svg>
        </div>
      </div>
    </div>
  );
};
