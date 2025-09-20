import { FC, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { useHistoricalEventsStore } from '@widgets/HistoricalEvents/stores/historicalEvents.store';

interface Props {
  type: 'prev' | 'next';
  duration?: number;
  ease?: string;
}

export const AnimatedYear: FC<Props> = ({ type, duration = 0.6, ease = 'power2.out' }) => {
  const { dateFrom, dateTo } = useHistoricalEventsStore();
  const year = type === 'prev' ? dateFrom : dateTo;

  const elementRef = useRef<HTMLSpanElement>(null);
  const prevYearRef = useRef<number>(year);

  useEffect(() => {
    if (!elementRef.current || prevYearRef.current === year) return;

    const oldYear = prevYearRef.current;
    const newYear = year;

    const direction = oldYear < newYear ? 1 : -1;
    const yearDifference = Math.abs(newYear - oldYear);

    gsap.to(
      {},
      {
        duration: duration,
        ease: ease,
        onUpdate: function () {
          if (!elementRef.current) return;

          const progress = this.progress();
          const currentYear = Math.floor(oldYear + yearDifference * progress * direction);

          elementRef.current.textContent = String(currentYear);
        },
        onComplete: () => {
          if (elementRef.current) {
            elementRef.current.textContent = String(newYear);
          }
        },
      },
    );

    prevYearRef.current = year;
  }, [year, duration, ease]);

  return <span ref={elementRef}>{year}</span>;
};
