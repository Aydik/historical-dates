import { createContext, type ReactNode, useContext, useEffect, useState } from 'react';

export type Breakpoint = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'xxl';

const breakpoints: Record<Breakpoint, number> = {
  xs: 0,
  sm: 576,
  md: 768,
  lg: 992,
  xl: 1200,
  xxl: 1440,
};

const getBreakpoint: () => Breakpoint = () => {
  const width = window.innerWidth;
  if (width >= breakpoints.xxl) return 'xxl';
  if (width >= breakpoints.xl) return 'xl';
  if (width >= breakpoints.lg) return 'lg';
  if (width >= breakpoints.md) return 'md';
  if (width >= breakpoints.sm) return 'sm';
  return 'xs';
};

export const compareBreakpoints = (breakpointA: Breakpoint, breakpointB: Breakpoint) => {
  return breakpoints[breakpointA] >= breakpoints[breakpointB];
};

const Breakpoints = createContext<Breakpoint>('xl');

export const BreakpointProvider = ({ children }: { children: ReactNode }) => {
  const [breakpoint, setBreakpoint] = useState(getBreakpoint());

  useEffect(() => {
    const onResize = () => {
      setBreakpoint(getBreakpoint());
    };
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  return <Breakpoints.Provider value={breakpoint}>{children}</Breakpoints.Provider>;
};

export const useBreakpoint = () => useContext(Breakpoints);
