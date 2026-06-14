import { describe, expect, it } from 'vitest';
import {
  getNextThemePreference,
  resolveThemePreference,
} from './theme';

describe('resolveThemePreference', () => {
  it('follows the system when there is no override', () => {
    expect(resolveThemePreference({ storedTheme: null, systemDark: true })).toEqual({
      theme: 'dark',
      isDark: true,
      shouldClearStoredTheme: false,
    });
  });

  it('keeps an override only while it differs from the system', () => {
    expect(resolveThemePreference({ storedTheme: 'light', systemDark: true })).toEqual({
      theme: 'light',
      isDark: false,
      shouldClearStoredTheme: false,
    });
    expect(resolveThemePreference({ storedTheme: 'dark', systemDark: true })).toEqual({
      theme: 'dark',
      isDark: true,
      shouldClearStoredTheme: true,
    });
  });
});

describe('getNextThemePreference', () => {
  it('does not persist a manual selection matching the system', () => {
    expect(getNextThemePreference({ currentDark: true, systemDark: false })).toEqual({
      isDark: false,
      storedTheme: null,
    });
  });

  it('persists a manual selection that differs from the system', () => {
    expect(getNextThemePreference({ currentDark: false, systemDark: false })).toEqual({
      isDark: true,
      storedTheme: 'dark',
    });
  });
});
