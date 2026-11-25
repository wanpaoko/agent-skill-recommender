import test from 'node:test';
import assert from 'node:assert/strict';
import { filterRepositories, repositories, sortRepositories } from '../assets/catalog.mjs';

test('catalog includes twelve GitHub repository cards with dated star snapshots', () => {
  assert.equal(repositories.length, 12);
  assert.deepEqual(repositories.map((item) => item.id), [
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
    'elephant-goldfish-model',
    'floorplan',
  ]);

  const expected = [
    ['moli', 'lexmount', 'moli', 24_372, '2026-11-24'],
    ['archify', 'tt-a1i', 'archify', 99_217, '2026-11-24'],
    ['diagram-design', 'cathrynlavery', 'diagram-design', 71_173, '2026-11-24'],
    ['agency-agents', 'msitarzewski', 'agency-agents', 169_970, '2026-11-24'],
    ['chartdb', 'chartdb', 'chartdb', 23_163, '2026-11-24'],
    ['humanizer-zh', 'op7418', 'Humanizer-zh', 23_698, '2026-11-24'],
    ['last30days', 'mvanhorn', 'last30days-skill', 73_896, '2026-11-24'],
    ['modern-web-guidance', 'GoogleChrome', 'modern-web-guidance', 25_773, '2026-11-24'],
    ['scrapling', 'D4Vinci', 'Scrapling', 105_475, '2026-11-24'],
    ['codegraph', 'colbymchenry', 'codegraph', 78_591, '2026-11-24'],
    ['elephant-goldfish-model', 'google', 'elephant-goldfish-model', 22_800, '2026-11-25'],
    ['floorplan', 'haydenschmitty', 'floorplan', 6_808, '2026-11-25'],
  ];

  for (const [id, owner, repository, stars, starsCheckedAt] of expected) {
    const item = repositories.find((entry) => entry.id === id);
    assert.equal(item.kind, 'repository');
    assert.equal(item.owner, owner);
    assert.equal(item.repository, repository);
    assert.equal(item.stars, stars);
    assert.equal(item.starsCheckedAt, starsCheckedAt);
    assert.equal(item.installCommand, undefined);
    assert.equal(item.repositoryUrl, `https://github.com/${owner}/${repository}`);
    assert.equal(typeof item.pickReason, 'string');
    assert.equal(typeof item.description, 'string');
    assert.ok(item.description.trim(), `${id} needs a non-empty description`);
    assert.ok(item.pickReason.trim(), `${id} needs a non-empty pick reason`);
  }
});


test('star and name sorting cover all twelve repository cards', () => {
  const descending = sortRepositories(repositories);
  const ascending = sortRepositories(repositories, 'stars-asc');
  const alphabetical = sortRepositories(repositories, 'name-asc');

  assert.equal(descending.length, 12);
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
    'elephant-goldfish-model',
    'floorplan',
  ]);
  assert.deepEqual(ascending.map((item) => item.id), [
    'floorplan',
    'elephant-goldfish-model',
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
    'elephant-goldfish-model',
    'floorplan',
    'humanizer-zh',
    'last30days',
    'modern-web-guidance',
    'moli',
    'scrapling',
  ]);
});

test('search and category filters find the twelve requested repositories', () => {
  assert.deepEqual(filterRepositories(repositories, { query: 'headless browser' }).map((item) => item.id), ['moli']);
  assert.deepEqual(filterRepositories(repositories, { query: '互動式圖解' }).map((item) => item.id), ['archify']);
  assert.deepEqual(filterRepositories(repositories, { query: '品牌化視覺' }).map((item) => item.id), ['diagram-design']);
  assert.deepEqual(filterRepositories(repositories, { query: '專家型 AI agent' }).map((item) => item.id), ['agency-agents']);
  assert.deepEqual(filterRepositories(repositories, { query: '資料庫 schema' }).map((item) => item.id), ['chartdb']);
  assert.deepEqual(filterRepositories(repositories, { query: '去 AI 味' }).map((item) => item.id), ['humanizer-zh']);
  assert.deepEqual(filterRepositories(repositories, { query: '社群研究' }).map((item) => item.id), ['last30days']);
  assert.deepEqual(filterRepositories(repositories, { query: 'Web 標準' }).map((item) => item.id), ['modern-web-guidance']);
  assert.deepEqual(filterRepositories(repositories, { query: '自適應解析、反爬處理' }).map((item) => item.id), ['scrapling']);
  assert.deepEqual(filterRepositories(repositories, { query: '追查主題近期脈絡' }).map((item) => item.id), ['last30days']);
  assert.deepEqual(filterRepositories(repositories, { query: '繪製關聯圖到結構編輯' }).map((item) => item.id), ['chartdb']);
  assert.deepEqual(filterRepositories(repositories, { query: '草擬規格' }).map((item) => item.id), ['elephant-goldfish-model']);
  assert.deepEqual(filterRepositories(repositories, { query: '白話架構地圖' }).map((item) => item.id), ['floorplan']);
  assert.deepEqual(filterRepositories(repositories, { category: '瀏覽器與網頁' }).map((item) => item.id), ['moli', 'modern-web-guidance', 'scrapling']);
  assert.deepEqual(filterRepositories(repositories, { category: '圖表與視覺化' }).map((item) => item.id), ['archify', 'diagram-design', 'floorplan']);
  assert.deepEqual(filterRepositories(repositories, { category: '資料庫與資料設計' }).map((item) => item.id), ['chartdb']);
  assert.deepEqual(filterRepositories(repositories, { category: 'AI 代理、寫作與研究' }).map((item) => item.id), ['agency-agents', 'humanizer-zh', 'last30days', 'codegraph', 'elephant-goldfish-model']);
});

test('category filter keeps its selection while the project search text is empty', () => {
  const filtered = filterRepositories(repositories, { category: '資料庫與資料設計' });
  assert.deepEqual(filtered.map((item) => item.id), ['chartdb']);
});

test('star sorting returns a new list with repositories in star order', () => {
  const descending = sortRepositories(repositories, 'stars-desc');
  const ascending = sortRepositories(repositories, 'stars-asc');

  assert.notStrictEqual(descending, repositories);
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
    'elephant-goldfish-model',
    'floorplan',
  ]);
  assert.deepEqual(ascending.map((item) => item.id), [
    'floorplan',
    'elephant-goldfish-model',
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

