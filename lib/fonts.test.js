import { describe, expect, it } from 'vitest';
import {
  DEFAULT_FONT_CLASS,
  FONT_CLASS_NAMES,
  FONT_OPTIONS,
  getFontOption,
  getValidFontClass,
} from './fonts';

describe('font configuration', () => {
  it('uses unique classes and stylesheet ids', () => {
    expect(new Set(FONT_CLASS_NAMES).size).toBe(FONT_OPTIONS.length);
    expect(new Set(FONT_OPTIONS.map(font => font.stylesheet)).size).toBe(FONT_OPTIONS.length);
  });

  it('keeps every remote family aligned with its CSS class', () => {
    expect(getFontOption('font-mincho')).toMatchObject({
      family: 'Huiwen-mincho',
      displayName: '汇文明朝体',
    });
  });

  it('rejects unknown cookie values', () => {
    expect(getValidFontClass('font-wenkai')).toBe('font-wenkai');
    expect(getValidFontClass('font-injected')).toBe(DEFAULT_FONT_CLASS);
    expect(getValidFontClass(null)).toBe(DEFAULT_FONT_CLASS);
  });
});
