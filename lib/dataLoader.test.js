import { describe, expect, it } from 'vitest';
import { filterPostsBySearch, getPinyinInitials, preparePostsForSearch, updateResults } from './dataLoader';

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
const prepared = preparePostsForSearch(posts);

describe('getPinyinInitials', () => {
  it('creates initials for Chinese text', () => {
    expect(getPinyinInitials('哔哩哔哩')).toBe('blbl');
  });
});

describe('filterPostsBySearch', () => {
  it('precomputes searchable text once per post', () => {
    expect(prepared[0].searchIndex).toContain('bilibili');
    expect(filterPostsBySearch(prepared, 'blbl').map(post => post.id)).toEqual(['visible']);
  });

  it('matches full pinyin and pinyin initials', () => {
    expect(filterPostsBySearch(prepared, '哔哩').map(post => post.id)).toEqual(['visible']);
    expect(filterPostsBySearch(prepared, 'bilibili').map(post => post.id)).toEqual(['visible']);
    expect(filterPostsBySearch(prepared, 'blbl').map(post => post.id)).toEqual(['visible']);
  });

  it('keeps hidden posts out of normal searches', () => {
    expect(filterPostsBySearch(prepared, '').map(post => post.id)).toEqual(['visible']);
    expect(filterPostsBySearch(prepared, '隐藏站点')).toEqual([]);
  });

  it('supports the explicit hidden-post command', () => {
    expect(filterPostsBySearch(prepared, 'yincang').map(post => post.id)).toEqual(['hidden']);
  });

  it('handles tag filters and empty lists', () => {
    expect(filterPostsBySearch(updateResults(prepared, ['📺视频']), '视频').map(post => post.id)).toEqual(['visible']);
    expect(filterPostsBySearch(preparePostsForSearch([]), '视频')).toEqual([]);
  });
});
