import React, { useMemo } from 'react';
import { ActivityCalendar } from 'react-activity-calendar';
import { useTheme } from '../contexts/ThemeContext';

const getLevel = (count, maximum) => {
  if (!count) return 0;
  return Math.max(1, Math.ceil((count / maximum) * 4));
};

const VisitActivity = ({ activity }) => {
  const { isDark } = useTheme();
  const activityByDate = useMemo(
    () => new Map((activity || []).map(day => [day.date, day])),
    [activity]
  );
  const calendarData = useMemo(() => {
    const maximum = Math.max(...(activity || []).map(day => day.count), 1);
    return (activity || []).map(day => ({
      date: day.date,
      count: day.count,
      level: getLevel(day.count, maximum),
    }));
  }, [activity]);

  return (
    <section className="mt-8 sm:mt-12 rounded-2xl border border-slate-300 dark:border-zinc-700/90 bg-[linear-gradient(165deg,rgba(255,255,255,0.94),rgba(241,248,255,0.9))] dark:bg-[linear-gradient(165deg,rgba(42,42,46,0.92),rgba(28,28,30,0.95))] px-4 py-5 sm:px-7 sm:py-6 text-left shadow-sm">
      <div className="mb-5">
        <div>
          <h2 className="text-xl font-extrabold tracking-normal text-slate-800 dark:text-zinc-100">访问活动</h2>
          <p className="mt-1 text-xs tracking-normal text-slate-500 dark:text-zinc-400">近一年 · 历史活动为估算</p>
        </div>
      </div>

      <div className="w-full min-w-0 max-w-full overflow-x-auto pb-1 [-webkit-overflow-scrolling:touch]">
        <ActivityCalendar
          data={calendarData}
          loading={!activity}
          colorScheme={isDark ? 'dark' : 'light'}
          blockMargin={4}
          blockRadius={4}
          blockSize={14}
          fontSize={12}
          labels={{
            months: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
            weekdays: ['日', '一', '二', '三', '四', '五', '六'],
            legend: { less: '少', more: '多' },
          }}
          showWeekdayLabels={['mon', 'wed', 'fri']}
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
