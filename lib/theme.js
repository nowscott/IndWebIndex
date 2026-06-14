export const THEME_STORAGE_KEY = 'theme';

export const getSystemTheme = systemDark => systemDark ? 'dark' : 'light';

export const getValidTheme = theme => {
  return theme === 'dark' || theme === 'light' ? theme : null;
};

export const resolveThemePreference = ({ storedTheme, systemDark }) => {
  const systemTheme = getSystemTheme(systemDark);
  const validStoredTheme = getValidTheme(storedTheme);
  const shouldClearStoredTheme = validStoredTheme === systemTheme;
  const theme = validStoredTheme && !shouldClearStoredTheme
    ? validStoredTheme
    : systemTheme;

  return {
    theme,
    isDark: theme === 'dark',
    shouldClearStoredTheme,
  };
};

export const getNextThemePreference = ({ currentDark, systemDark }) => {
  const nextDark = !currentDark;
  const nextTheme = getSystemTheme(nextDark);
  const systemTheme = getSystemTheme(systemDark);

  return {
    isDark: nextDark,
    storedTheme: nextTheme === systemTheme ? null : nextTheme,
  };
};
