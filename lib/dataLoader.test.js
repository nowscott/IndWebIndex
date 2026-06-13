import { describe, expect, it } from 'vitest';
import { filterPostsBySearch, getPinyinInitials } from './dataLoader';

const posts = [
  {
    id: 'visible',
    name: '哔哩哔哩',
    brief: '视频网站',
    tags: ['📺视频'],
    state: '正常',
  },
  {
    id: 'hidden',
    name: '隐藏站点',
    brief: '',
    tags: [],
    state: '隐藏',
  },
];

describe('getPinyinInitials', () => {
  it('creates initials for Chinese text', () => {
    expect(getPinyinInitials('哔哩哔哩')).toBe('blbl');
  });
});

describe('filterPostsBySearch', () => {
  it('matches full pinyin and pinyin initials', () => {
    expect(filterPostsBySearch(posts, 'bilibili').map(post => post.id)).toEqual(['visible']);
    expect(filterPostsBySearch(posts, 'blbl').map(post => post.id)).toEqual(['visible']);
  });

  it('keeps hidden posts out of normal searches', () => {
    expect(filterPostsBySearch(posts, '').map(post => post.id)).toEqual(['visible']);
    expect(filterPostsBySearch(posts, '隐藏站点')).toEqual([]);
  });

  it('supports the explicit hidden-post command', () => {
    expect(filterPostsBySearch(posts, 'yincang').map(post => post.id)).toEqual(['hidden']);
  });
});
