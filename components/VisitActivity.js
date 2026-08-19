import React, { useEffect, useMemo, useState } from 'react';
import { ActivityCalendar } from 'react-activity-calendar';
import { useTheme } from '../contexts/ThemeContext';
import { getActivityLevel, getActivityLevelMaximum } from '../lib/visitActivity';

const VisitActivity = ({ activity, snapshotAt }) => {
  const { isDark, mounted } = useTheme();
  const [showRecentOnly, setShowRecentOnly] = useState(false);

  useEffect(() => {
    const query = window.matchMedia('(max-width: 639px)');
    const update = () => setShowRecentOnly(query.matches);
    update();
    query.addEventListener('change', update);
    return () => query.removeEventListener('change', update);
  }, []);

  const calendarData = useMemo(() => {
    const visibleActivity = showRecentOnly ? (activity || []).slice(-98) : (activity || []);
    const maximum = getActivityLevelMaximum(visibleActivity.map(day => day.count));
    return visibleActivity.map(day => ({
      date: day.date,
      count: day.count,
      level: getActivityLevel(day.count, maximum),
    }));
  }, [activity, showRecentOnly]);

  return (
    <section className="visit-activity mt-8 sm:mt-12 pt-6 sm:pt-8 text-left">
      <div className="mb-5">
        <div>
          <h2 className="text-xl font-extrabold tracking-normal text-slate-800 dark:text-zinc-100">访问活动</h2>
          <p className="mt-1 text-xs tracking-normal text-slate-500 dark:text-zinc-400">
            {showRecentOnly ? '近 14 周' : '近一年'} · 历史活动为估算{snapshotAt ? ` · 快照更新于 ${snapshotAt.slice(0, 10)}` : ''}
          </p>
        </div>
      </div>

      <div
        className="visit-activity-calendar w-full min-w-0 max-w-full overflow-hidden pb-1"
        style={{ visibility: mounted ? 'visible' : 'hidden' }}
      >
        <ActivityCalendar
          data={calendarData}
          loading={!activity}
          colorScheme={isDark ? 'dark' : 'light'}
          blockMargin={4}
          blockRadius={4}
          blockSize={showRecentOnly ? 15 : 12}
          fontSize={12}
          labels={{
            months: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
            weekdays: ['日', '一', '二', '三', '四', '五', '六'],
            legend: { less: '少', more: '多' },
          }}
          showWeekdayLabels={false}
          showColorLegend={false}
          showTotalCount={false}
          theme={{
            light: ['#e7f0f4', '#bfe0ec', '#ffd9b8', '#f5ad82', '#df7467'],
            dark: ['#1a293b', '#254563', '#2f7399', '#38a9cb', '#a8e7ff'],
          }}
        />
      </div>
    </section>
  );
};

export default VisitActivity;
