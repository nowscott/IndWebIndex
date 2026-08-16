import { useEffect } from 'react';

export const sendPageView = () => {
  if (typeof window === 'undefined') return;

  if (navigator.sendBeacon?.('/api/visit-count', '')) return;

  void fetch('/api/visit-count', { method: 'POST', body: '', keepalive: true }).catch(() => {});
};

const PageViewTracker = () => {
  useEffect(() => {
    sendPageView();
  }, []);

  return null;
};

export default PageViewTracker;
