const repositoryStars = {
  'lexmount/moli': 24_372,
  'tt-a1i/archify': 99_217,
  'cathrynlavery/diagram-design': 71_173,
  'msitarzewski/agency-agents': 169_970,
  'chartdb/chartdb': 23_163,
};

export const skills = [
  {
    id: 'moli',
    name: 'Moli',
    owner: 'lexmount',
    repository: 'moli',
    category: '瀏覽器與網頁',
    description: '給 AI agent 使用的輕量 headless browser，可擷取網頁、搜尋及自動化瀏覽器任務。',
    tags: ['瀏覽器', '網頁擷取', '自動化'],
    kind: 'repository',
  },
  {
    id: 'archify',
    name: 'Archify',
    owner: 'tt-a1i',
    repository: 'archify',
    category: '圖表與視覺化',
    description: '把想法、計畫或程式碼轉成互動式圖解，並用圖表呈現系統架構與程式分析。',
    tags: ['互動圖表', '架構圖', '程式分析'],
    kind: 'repository',
  },
  {
    id: 'diagram-design',
    name: 'Diagram Design',
    owner: 'cathrynlavery',
    repository: 'diagram-design',
    category: '圖表與視覺化',
    description: '以品牌化視覺製作 52 種架構圖、流程圖等圖表，輸出自包含 HTML 和 SVG。',
    tags: ['圖表', '品牌化', 'SVG'],
    kind: 'repository',
  },
  {
    id: 'agency-agents',
    name: 'Agency Agents',
    owner: 'msitarzewski',
    repository: 'agency-agents',
    category: 'AI 代理與協作',
    description: '由多個領域專家型 AI agent 組成的集合，涵蓋工程、設計、行銷、產品等專業分工。',
    tags: ['AI agents', '專業角色', '多領域'],
    kind: 'repository',
  },
  {
    id: 'chartdb',
    name: 'ChartDB',
    owner: 'chartdb',
    repository: 'chartdb',
    category: '圖表與視覺化',
    description: '以單一查詢匯入資料庫 schema，互動式繪製資料庫圖表並編輯結構。',
    tags: ['資料庫', 'ER 圖', 'Schema'],
    kind: 'repository',
  },
].map((skill) => {
  const repositoryUrl = `https://github.com/${skill.owner}/${skill.repository}`;
  return {
    ...skill,
    stars: repositoryStars[`${skill.owner}/${skill.repository}`],
    starsCheckedAt: '2026-11-24',
    repositoryUrl,
    detailUrl: repositoryUrl,
  };
});

export function filterSkills(catalog, { query = '', category = 'all' } = {}) {
  const normalizedQuery = query.trim().toLocaleLowerCase();

  return catalog.filter((skill) => {
    const matchesCategory = category === 'all' || skill.category === category;
    const searchableText = [skill.name, skill.id, skill.owner, skill.description, ...skill.tags]
      .join(' ')
      .toLocaleLowerCase();

    return matchesCategory && (!normalizedQuery || searchableText.includes(normalizedQuery));
  });
}

export function sortSkills(catalog, order = 'stars-desc') {
  const comparison = {
    'stars-desc': (a, b) => b.stars - a.stars,
    'stars-asc': (a, b) => a.stars - b.stars,
    'name-asc': (a, b) => a.name.localeCompare(b.name),
  }[order] ?? ((a, b) => b.stars - a.stars);

  return [...catalog].sort(comparison);
}
