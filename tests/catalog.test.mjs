import test from 'node:test';
import assert from 'node:assert/strict';
import { filterSkills, sortSkills, skills } from '../assets/catalog.mjs';

test('catalog includes five GitHub repository cards with dated star snapshots', () => {
  assert.equal(skills.length, 5);
  assert.deepEqual(skills.map((item) => item.id), ['moli', 'archify', 'diagram-design', 'agency-agents', 'chartdb']);

  const expected = [
    ['moli', 'lexmount', 'moli', 24_372],
    ['archify', 'tt-a1i', 'archify', 99_217],
    ['diagram-design', 'cathrynlavery', 'diagram-design', 71_173],
    ['agency-agents', 'msitarzewski', 'agency-agents', 169_970],
    ['chartdb', 'chartdb', 'chartdb', 23_163],
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

test('star and name sorting cover all five repository cards', () => {
  const descending = sortSkills(skills);
  const ascending = sortSkills(skills, 'stars-asc');
  const alphabetical = sortSkills(skills, 'name-asc');

  assert.equal(descending.length, 5);
  assert.deepEqual(descending.map((item) => item.id), ['agency-agents', 'archify', 'diagram-design', 'moli', 'chartdb']);
  assert.deepEqual(ascending.map((item) => item.id), ['chartdb', 'moli', 'diagram-design', 'archify', 'agency-agents']);
  assert.deepEqual(alphabetical.map((item) => item.id), ['agency-agents', 'archify', 'chartdb', 'diagram-design', 'moli']);
});

test('search and category filters find the five requested repositories', () => {
  assert.deepEqual(filterSkills(skills, { query: 'headless browser' }).map((item) => item.id), ['moli']);
  assert.deepEqual(filterSkills(skills, { query: '互動式圖解' }).map((item) => item.id), ['archify']);
  assert.deepEqual(filterSkills(skills, { query: '品牌化視覺' }).map((item) => item.id), ['diagram-design']);
  assert.deepEqual(filterSkills(skills, { query: '專家型 AI agent' }).map((item) => item.id), ['agency-agents']);
  assert.deepEqual(filterSkills(skills, { query: '資料庫 schema' }).map((item) => item.id), ['chartdb']);
  assert.deepEqual(filterSkills(skills, { category: '瀏覽器與網頁' }).map((item) => item.id), ['moli']);
  assert.deepEqual(filterSkills(skills, { category: '圖表與視覺化' }).map((item) => item.id), ['archify', 'diagram-design', 'chartdb']);
  assert.deepEqual(filterSkills(skills, { category: 'AI 代理與協作' }).map((item) => item.id), ['agency-agents']);
});

test('category filter keeps its selection while the project search text is empty', () => {
  const filtered = filterSkills(skills, { category: '圖表與視覺化' });
  assert.deepEqual(filtered.map((item) => item.id), ['archify', 'diagram-design', 'chartdb']);
});

test('star sorting returns a new list with repositories in star order', () => {
  const descending = sortSkills(skills, 'stars-desc');
  const ascending = sortSkills(skills, 'stars-asc');

  assert.notStrictEqual(descending, skills);
  assert.deepEqual(descending.map((item) => item.id), ['agency-agents', 'archify', 'diagram-design', 'moli', 'chartdb']);
  assert.deepEqual(ascending.map((item) => item.id), ['chartdb', 'moli', 'diagram-design', 'archify', 'agency-agents']);
});

