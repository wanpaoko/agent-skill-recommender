import test from 'node:test';
import assert from 'node:assert/strict';
import { filterSkills, sortSkills, skills } from '../assets/catalog.mjs';

test('catalog includes ten GitHub repository cards with dated star snapshots', () => {
  assert.equal(skills.length, 10);
  assert.deepEqual(skills.map((item) => item.id), [
    'moli',
    'archify',
    'diagram-design',
    'agency-agents',
    'chartdb',
    'humanizer-zh',
    'last30days',
    'modern-web-guidance',
    'scrapling',
    'codegraph',
  ]);

  const expected = [
    ['moli', 'lexmount', 'moli', 24_372],
    ['archify', 'tt-a1i', 'archify', 99_217],
    ['diagram-design', 'cathrynlavery', 'diagram-design', 71_173],
    ['agency-agents', 'msitarzewski', 'agency-agents', 169_970],
    ['chartdb', 'chartdb', 'chartdb', 23_163],
    ['humanizer-zh', 'op7418', 'Humanizer-zh', 23_698],
    ['last30days', 'mvanhorn', 'last30days-skill', 73_896],
    ['modern-web-guidance', 'GoogleChrome', 'modern-web-guidance', 25_773],
    ['scrapling', 'D4Vinci', 'Scrapling', 105_475],
    ['codegraph', 'colbymchenry', 'codegraph', 78_591],
  ];

  for (const [id, owner, repository, stars] of expected) {
    const item = skills.find((entry) => entry.id === id);
    assert.equal(item.kind, 'repository');
    assert.equal(item.owner, owner);
    assert.equal(item.repository, repository);
    assert.equal(item.stars, stars);
    assert.equal(item.starsCheckedAt, '2026-11-24');
    assert.equal(item.installCommand, undefined);
    assert.equal(item.repositoryUrl, `https://github.com/${owner}/${repository}`);
  }
});

test('star and name sorting cover all ten repository cards', () => {
  const descending = sortSkills(skills);
  const ascending = sortSkills(skills, 'stars-asc');
  const alphabetical = sortSkills(skills, 'name-asc');

  assert.equal(descending.length, 10);
  assert.deepEqual(descending.map((item) => item.id), [
    'agency-agents',
    'scrapling',
    'archify',
    'codegraph',
    'last30days',
    'diagram-design',
    'modern-web-guidance',
    'moli',
    'humanizer-zh',
    'chartdb',
  ]);
  assert.deepEqual(ascending.map((item) => item.id), [
    'chartdb',
    'humanizer-zh',
    'moli',
    'modern-web-guidance',
    'diagram-design',
    'last30days',
    'codegraph',
    'archify',
    'scrapling',
    'agency-agents',
  ]);
  assert.deepEqual(alphabetical.map((item) => item.id), [
    'agency-agents',
    'archify',
    'chartdb',
    'codegraph',
    'diagram-design',
    'humanizer-zh',
    'last30days',
    'modern-web-guidance',
    'moli',
    'scrapling',
  ]);
});

test('search and category filters find the ten requested repositories', () => {
  assert.deepEqual(filterSkills(skills, { query: 'headless browser' }).map((item) => item.id), ['moli']);
  assert.deepEqual(filterSkills(skills, { query: '互動式圖解' }).map((item) => item.id), ['archify']);
  assert.deepEqual(filterSkills(skills, { query: '品牌化視覺' }).map((item) => item.id), ['diagram-design']);
  assert.deepEqual(filterSkills(skills, { query: '專家型 AI agent' }).map((item) => item.id), ['agency-agents']);
  assert.deepEqual(filterSkills(skills, { query: '資料庫 schema' }).map((item) => item.id), ['chartdb']);
  assert.deepEqual(filterSkills(skills, { query: '去 AI 味' }).map((item) => item.id), ['humanizer-zh']);
  assert.deepEqual(filterSkills(skills, { query: '社群研究' }).map((item) => item.id), ['last30days']);
  assert.deepEqual(filterSkills(skills, { query: 'Web 標準' }).map((item) => item.id), ['modern-web-guidance']);
  assert.deepEqual(filterSkills(skills, { query: '反爬機制' }).map((item) => item.id), ['scrapling']);
  assert.deepEqual(filterSkills(skills, { query: '程式碼圖譜' }).map((item) => item.id), ['codegraph']);
  assert.deepEqual(filterSkills(skills, { category: '瀏覽器與網頁' }).map((item) => item.id), ['moli', 'modern-web-guidance', 'scrapling']);
  assert.deepEqual(filterSkills(skills, { category: '圖表與視覺化' }).map((item) => item.id), ['archify', 'diagram-design', 'chartdb']);
  assert.deepEqual(filterSkills(skills, { category: 'AI 代理與協作' }).map((item) => item.id), ['agency-agents', 'humanizer-zh', 'last30days', 'codegraph']);
});

test('category filter keeps its selection while the project search text is empty', () => {
  const filtered = filterSkills(skills, { category: '圖表與視覺化' });
  assert.deepEqual(filtered.map((item) => item.id), ['archify', 'diagram-design', 'chartdb']);
});

test('star sorting returns a new list with repositories in star order', () => {
  const descending = sortSkills(skills, 'stars-desc');
  const ascending = sortSkills(skills, 'stars-asc');

  assert.notStrictEqual(descending, skills);
  assert.deepEqual(descending.map((item) => item.id), [
    'agency-agents',
    'scrapling',
    'archify',
    'codegraph',
    'last30days',
    'diagram-design',
    'modern-web-guidance',
    'moli',
    'humanizer-zh',
    'chartdb',
  ]);
  assert.deepEqual(ascending.map((item) => item.id), [
    'chartdb',
    'humanizer-zh',
    'moli',
    'modern-web-guidance',
    'diagram-design',
    'last30days',
    'codegraph',
    'archify',
    'scrapling',
    'agency-agents',
  ]);
});

