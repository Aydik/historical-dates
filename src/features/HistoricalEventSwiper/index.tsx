import { FC, useRef, useState } from 'react';
import { HistoricalEvent } from '@entities/HistoricalEvent';
import { useHistoricalDatesStore } from '@widgets/HistoricalDates/stores/historicalDates.store';
import { Swiper, SwiperSlide } from 'swiper/react';
import type { Swiper as SwiperType } from 'swiper';
import 'swiper/css';
import './index.scss';
import { compareBreakpoints, useBreakpoint } from '@shared/context/Breakpoints';
import { NavButton } from '@features/HistoricalEventSwiper/ui/NavButton';

interface Props {
  paddingHorizontal: number;
}

export const HistoricalEventSwiper: FC<Props> = ({ paddingHorizontal }) => {
  const { events } = useHistoricalDatesStore();

  const swiperRef = useRef<SwiperType | null>(null);
  const [isBeginning, setIsBeginning] = useState<boolean>(true);
  const [isEnd, setIsEnd] = useState<boolean>(false);

  const goNext = () => {
    if (swiperRef.current && !isEnd) {
      swiperRef.current.slideNext();
    }
  };

  const goPrev = () => {
    if (swiperRef.current && !isBeginning) {
      swiperRef.current.slidePrev();
    }
  };

  const updateNavigationState = (swiper: SwiperType) => {
    setIsBeginning(swiper.isBeginning);
    setIsEnd(swiper.isEnd);
  };

  const breakpoint = useBreakpoint();
  const hasNav = compareBreakpoints(breakpoint, 'md');
  let spaceBetween: number;

  switch (breakpoint) {
    case 'xxl':
      spaceBetween = 80;
      break;
    case 'xl':
    case 'lg':
      spaceBetween = 65;
      break;
    case 'md':
      spaceBetween = 55;
      break;
    case 'sm':
      spaceBetween = 35;
      break;
    case 'xs':
    default:
      spaceBetween = 25;
      break;
  }

  return (
    <div
      className="event-swiper"
      style={{
        gridTemplateColumns: hasNav ? `${paddingHorizontal}px auto ${paddingHorizontal}px` : 'auto',
      }}
    >
      {hasNav && !isBeginning && (
        <div className="nav-button-wrapper">
          <NavButton onClick={goPrev} type="prev" />
        </div>
      )}
      <div className="swiper-container">
        <Swiper
          slidesPerView="auto"
          speed={800}
          spaceBetween={spaceBetween}
          onSwiper={swiper => {
            swiperRef.current = swiper;
            updateNavigationState(swiper);
          }}
          onSlideChange={swiper => {
            updateNavigationState(swiper);
          }}
          onReachBeginning={() => {
            setIsBeginning(true);
            setIsEnd(false);
          }}
          onReachEnd={() => {
            setIsBeginning(false);
            setIsEnd(true);
          }}
          style={{
            margin: hasNav ? 'unset' : `0 ${paddingHorizontal}px`,
          }}
        >
          {events.map((event, index) => (
            <SwiperSlide key={index}>
              <HistoricalEvent event={event} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
      {hasNav && !isEnd && (
        <div className="nav-button-wrapper">
          <NavButton onClick={goNext} type="next" />
        </div>
      )}
    </div>
  );
};
