import React, { useMemo } from 'react';
import { ActivityCalendar } from 'react-activity-calendar';
import { getActivityLevel, getActivityLevelMaximum } from '../lib/visitActivity';

const ACTIVITY_LABELS = {
  months: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
  weekdays: ['日', '一', '二', '三', '四', '五', '六'],
  legend: { less: '少', more: '多' },
};

const ACTIVITY_LEVEL_VARIABLES = [
    'var(--visit-activity-level-0)',
    'var(--visit-activity-level-1)',
    'var(--visit-activity-level-2)',
    'var(--visit-activity-level-3)',
    'var(--visit-activity-level-4)',
];

const ACTIVITY_THEME = {
  light: ACTIVITY_LEVEL_VARIABLES,
  dark: ACTIVITY_LEVEL_VARIABLES,
};

// Keep SVG markup stable; html.dark swaps the CSS variables.
const ActivityCalendarView = ({ data, blockSize, className, loading }) => (
  <div className={className}>
    <ActivityCalendar
      data={data}
      loading={loading}
      colorScheme="light"
      blockMargin={4}
      blockRadius={4}
      blockSize={blockSize}
      fontSize={12}
      labels={ACTIVITY_LABELS}
      showWeekdayLabels={false}
      showColorLegend={false}
      showTotalCount={false}
      theme={ACTIVITY_THEME}
    />
  </div>
);

const VisitActivity = ({ activity, snapshotAt }) => {
  const calendarData = useMemo(() => {
    const maximum = getActivityLevelMaximum((activity || []).map(day => day.count));
    return (activity || []).map(day => ({
      date: day.date,
      count: day.count,
      level: getActivityLevel(day.count, maximum),
    }));
  }, [activity]);

  const recentCalendarData = useMemo(() => calendarData.slice(-98), [calendarData]);

  return (
    <section className="visit-activity mt-8 sm:mt-12 pt-6 sm:pt-8 text-left">
      <div className="mb-5">
        <div>
          <h2 className="text-xl font-extrabold tracking-normal text-slate-800 dark:text-zinc-100">访问活动</h2>
          <p className="mt-1 text-xs tracking-normal text-slate-500 dark:text-zinc-400">
            <span className="sm:hidden">近 14 周</span>
            <span className="hidden sm:inline">近一年</span>
            {' · 历史活动为估算'}{snapshotAt ? ` · 快照更新于 ${snapshotAt.slice(0, 10)}` : ''}
          </p>
        </div>
      </div>

      <div className="visit-activity-calendar w-full min-w-0 max-w-full overflow-hidden pb-1">
        <ActivityCalendarView data={calendarData} blockSize={12} className="hidden sm:block" loading={!activity} />
        <ActivityCalendarView data={recentCalendarData} blockSize={15} className="sm:hidden" loading={!activity} />
      </div>
    </section>
  );
};

export default VisitActivity;
