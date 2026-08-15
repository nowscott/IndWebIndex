import React, { useEffect, useMemo, useState } from 'react';
import { ActivityCalendar } from 'react-activity-calendar';
import { useTheme } from '../contexts/ThemeContext';

const getLevel = (count, maximum) => {
  if (!count) return 0;
  return Math.max(1, Math.ceil((count / maximum) * 4));
};

const VisitActivity = ({ activity }) => {
  const { isDark } = useTheme();
  const [showRecentOnly, setShowRecentOnly] = useState(false);

  useEffect(() => {
    const query = window.matchMedia('(max-width: 639px)');
    const update = () => setShowRecentOnly(query.matches);
    update();
    query.addEventListener('change', update);
    return () => query.removeEventListener('change', update);
  }, []);

  const activityByDate = useMemo(
    () => new Map((activity || []).map(day => [day.date, day])),
    [activity]
  );
  const calendarData = useMemo(() => {
    const visibleActivity = showRecentOnly ? (activity || []).slice(-98) : (activity || []);
    const maximum = Math.max(...visibleActivity.map(day => day.count), 1);
    return visibleActivity.map(day => ({
      date: day.date,
      count: day.count,
      level: getLevel(day.count, maximum),
    }));
  }, [activity, showRecentOnly]);

  return (
    <section className="visit-activity mt-8 sm:mt-12 pt-6 sm:pt-8 text-left">
      <div className="mb-5">
        <div>
          <h2 className="text-xl font-extrabold tracking-normal text-slate-800 dark:text-zinc-100">访问活动</h2>
          <p className="mt-1 text-xs tracking-normal text-slate-500 dark:text-zinc-400">
            {showRecentOnly ? '近 14 周 · 历史活动为估算' : '近一年 · 历史活动为估算'}
          </p>
        </div>
      </div>

      <div className="visit-activity-calendar w-full min-w-0 max-w-full overflow-hidden pb-1">
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
          showTotalCount={false}
          theme={{
            light: ['#e2e8f0', '#bfdbfe', '#7dd3fc', '#38bdf8', '#0284c7'],
            dark: ['#27272a', '#334155', '#475569', '#3b82f6', '#7dd3fc'],
          }}
          tooltips={{
            activity: {
              text: ({ date, count }) => {
                const day = activityByDate.get(date);
                return `${date}：${count} 次${day?.estimated ? '（历史估算）' : '（真实浏览）'}`;
              },
            },
          }}
        />
      </div>
    </section>
  );
};

export default VisitActivity;
