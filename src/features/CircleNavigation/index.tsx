import { useRef, useState, useCallback, FC } from 'react';
import { gsap } from 'gsap';
import { Point } from './ui/Point';
import { useHistoricalEventsStore } from '@widgets/HistoricalEvents/stores/historicalEvents.store';

export const CircleNavigation: FC = () => {
  const { currentSectionIndex, sections, totalSections, setCurrentSection } =
    useHistoricalEventsStore();

  const circleRef = useRef<SVGSVGElement>(null);
  const pointsRef = useRef<Array<SVGGElement | null>>([]);
  const [rotation, setRotation] = useState<number>(0);

  const rotateCircle = useCallback(
    (targetIndex: number): void => {
      const anglePerPoint = 360 / totalSections;

      const direct_steps = currentSectionIndex - targetIndex;
      const reverse_steps =
        direct_steps > 0 ? direct_steps - totalSections : direct_steps + totalSections;

      const diff = Math.abs(direct_steps) <= Math.abs(reverse_steps) ? direct_steps : reverse_steps;

      const newRotation = rotation + diff * anglePerPoint;

      setRotation(newRotation);
      setCurrentSection(targetIndex);

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
    [currentSectionIndex, rotation, setCurrentSection, totalSections],
  );

  const handlePointRef = useCallback(
    (index: number) => (el: SVGGElement | null) => {
      pointsRef.current[index] = el;
    },
    [],
  );

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
        <div style={{ position: 'relative', width: '300px', height: '300px' }}>
          <svg
            ref={circleRef}
            width="300"
            height="300"
            viewBox="-150 -150 300 300"
            style={{ position: 'absolute' }}
          >
            <circle cx="0" cy="0" r="120" fill="none" stroke="#333" strokeWidth="2" />

            {sections.map((section, index) => (
              <Point
                key={index}
                index={index}
                rotation={rotation}
                rotateCircle={() => rotateCircle(index)}
                onRef={handlePointRef(index)}
              />
            ))}
          </svg>
        </div>
      </div>
    </div>
  );
};
