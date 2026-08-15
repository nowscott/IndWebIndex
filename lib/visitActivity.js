export const ACTIVITY_DAYS = 365;
export const ACTIVITY_TIME_ZONE = 'Asia/Shanghai';

const dateFormatter = new Intl.DateTimeFormat('en-CA', {
  timeZone: ACTIVITY_TIME_ZONE,
  year: 'numeric',
  month: '2-digit',
  day: '2-digit',
});

const asDate = date => new Date(`${date}T00:00:00.000Z`);

export const getShanghaiDate = (value = new Date()) => {
  const parts = dateFormatter.formatToParts(value);
  const values = Object.fromEntries(parts.map(({ type, value: part }) => [type, part]));
  return `${values.year}-${values.month}-${values.day}`;
};

export const shiftDate = (date, days) => {
  const value = asDate(date);
  value.setUTCDate(value.getUTCDate() + days);
  return value.toISOString().slice(0, 10);
};

export const getActivityDates = (endDate = getShanghaiDate()) =>
  Array.from({ length: ACTIVITY_DAYS }, (_, index) => shiftDate(endDate, index - ACTIVITY_DAYS + 1));

const hashDate = date => {
  let hash = 2166136261;
  for (const char of date) {
    hash ^= char.charCodeAt(0);
    hash = Math.imul(hash, 16777619);
  }
  return hash >>> 0;
};

// Fixed demo history: low, steady traffic with occasional visible peaks.
export const getEstimatedVisitCount = date => {
  const hash = hashDate(date);
  if (hash % 19 === 0) return 12 + (hash % 10);
  if (hash % 7 === 0) return 7 + (hash % 4);
  return 2 + (hash % 5);
};

export const buildVisitActivity = ({ endDate = getShanghaiDate(), startedAt = null, dailyCounts = [] } = {}) => {
  const countByDate = new Map(dailyCounts.map(({ date, count }) => [date, Number(count)]));

  return getActivityDates(endDate).map(date => {
    const isReal = Boolean(startedAt && date >= startedAt);
    return {
      date,
      count: isReal ? (countByDate.get(date) || 0) : getEstimatedVisitCount(date),
      estimated: !isReal,
    };
  });
};
