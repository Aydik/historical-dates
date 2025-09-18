import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import './styles/index.scss';
import { BreakpointProvider } from '@shared/context/Breakpoints';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BreakpointProvider>
      <App />
    </BreakpointProvider>
  </StrictMode>,
);
