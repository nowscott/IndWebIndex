import { describe, expect, it } from 'vitest';
import {
  ACTIVITY_DAYS,
  buildVisitActivity,
  getActivityLevel,
  getActivityLevelMaximum,
  getEstimatedVisitCount,
  getShanghaiDate,
} from './visitActivity';

describe('visit activity', () => {
  it('uses Shanghai day boundaries', () => {
    expect(getShanghaiDate(new Date('2026-08-14T16:30:00.000Z'))).toBe('2026-08-15');
  });

  it('keeps estimated history fixed', () => {
    expect(getEstimatedVisitCount('2026-01-15')).toBe(getEstimatedVisitCount('2026-01-15'));
  });

  it('caps color scaling at the 95th percentile so a spike cannot flatten activity', () => {
    const maximum = getActivityLevelMaximum([...Array.from({ length: 19 }, (_, index) => index + 1), 100]);

    expect(maximum).toBe(19);
    expect(getActivityLevel(0, maximum)).toBe(0);
    expect(getActivityLevel(10, maximum)).toBe(3);
    expect(getActivityLevel(19, maximum)).toBe(4);
    expect(getActivityLevel(100, maximum)).toBe(4);
  });

  it('switches from estimates to real daily counts on the start date', () => {
    const activity = buildVisitActivity({
      endDate: '2026-08-15',
      startedAt: '2026-08-14',
      dailyCounts: [{ date: '2026-08-14', count: 3 }],
    });

    expect(activity).toHaveLength(ACTIVITY_DAYS);
    expect(activity[0].date).toBe('2025-08-16');
    expect(activity.at(-1).date).toBe('2026-08-15');
    expect(activity.at(-3)).toMatchObject({ estimated: true });
    expect(activity.at(-2)).toEqual({ date: '2026-08-14', count: 3, estimated: false });
    expect(activity.at(-1)).toEqual({ date: '2026-08-15', count: 0, estimated: false });
  });
});
