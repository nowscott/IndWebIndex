export const DEFAULT_FONT_CLASS = 'font-smiley';

export const FONT_OPTIONS = [
  {
    className: 'font-smiley',
    family: 'Smiley Sans Oblique',
    displayName: '得意黑',
    stylesheet: 'https://f.0211120.xyz/font/得意黑/result.css',
  },
  {
    className: 'font-wenkai',
    family: 'LXGW WenKai',
    displayName: '霞鹜文楷',
    stylesheet: 'https://f.0211120.xyz/font/霞鹜文楷/result.css',
  },
  {
    className: 'font-oldsong',
    family: 'KingHwa_OldSong',
    displayName: '京華老宋体',
    stylesheet: 'https://f.0211120.xyz/font/京華老宋体/result.css',
  },
  {
    className: 'font-pixel',
    family: 'MuzaiPixel',
    displayName: '目哉像素体',
    stylesheet: 'https://f.0211120.xyz/font/目哉像素/result.css',
  },
  {
    className: 'font-marker',
    family: 'LXGW Marker Gothic',
    displayName: '霞鹜漫黑',
    stylesheet: 'https://f.0211120.xyz/font/霞鹜漫黑/result.css',
  },
  {
    className: 'font-mincho',
    family: 'Huiwen-mincho',
    displayName: '汇文明朝体',
    stylesheet: 'https://f.0211120.xyz/font/汇文明朝体/result.css',
  },
];

export const FONT_CLASS_NAMES = FONT_OPTIONS.map(font => font.className);

export const getFontOption = fontClass => {
  return FONT_OPTIONS.find(font => font.className === fontClass) || null;
};

export const getValidFontClass = fontClass => {
  return getFontOption(fontClass)?.className || DEFAULT_FONT_CLASS;
};
