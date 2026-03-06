import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import '../index.css';
import LinkedInSearchPage from '../playground/pages/LinkedInSearchPage';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <LinkedInSearchPage />
  </StrictMode>,
);
