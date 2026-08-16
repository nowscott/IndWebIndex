import { afterEach, describe, expect, it, vi } from 'vitest';
import { sendPageView } from './PageViewTracker';

afterEach(() => {
  vi.unstubAllGlobals();
});

describe('sendPageView', () => {
  it('uses sendBeacon without waiting for an API response', () => {
    const sendBeacon = vi.fn(() => true);
    vi.stubGlobal('window', {});
    vi.stubGlobal('navigator', { sendBeacon });
    vi.stubGlobal('fetch', vi.fn());

    sendPageView();

    expect(sendBeacon).toHaveBeenCalledWith('/api/visit-count', '');
    expect(fetch).not.toHaveBeenCalled();
  });

  it('uses a keepalive fetch only when sendBeacon is unavailable', () => {
    const fetch = vi.fn(() => Promise.resolve());
    vi.stubGlobal('window', {});
    vi.stubGlobal('navigator', { sendBeacon: vi.fn(() => false) });
    vi.stubGlobal('fetch', fetch);

    sendPageView();

    expect(fetch).toHaveBeenCalledWith('/api/visit-count', {
      method: 'POST',
      body: '',
      keepalive: true,
    });
  });
});
