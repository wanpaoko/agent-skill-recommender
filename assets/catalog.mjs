const repositoryStars = {
  'lexmount/moli': 24_372,
  'tt-a1i/archify': 99_217,
  'cathrynlavery/diagram-design': 71_173,
  'msitarzewski/agency-agents': 169_970,
  'chartdb/chartdb': 23_163,
  'op7418/Humanizer-zh': 23_698,
  'mvanhorn/last30days-skill': 73_896,
  'GoogleChrome/modern-web-guidance': 25_773,
  'D4Vinci/Scrapling': 105_475,
  'colbymchenry/codegraph': 78_591,
  'google/elephant-goldfish-model': 22_800,
};

const repositoryStarsCheckedAt = {
  'google/elephant-goldfish-model': '2026-11-25',
};

export const repositories = [
  {
    id: 'moli',
    name: 'Moli',
    owner: 'lexmount',
    repository: 'moli',
    category: '瀏覽器與網頁',
    description: '給 AI agent 使用的輕量 headless browser，可擷取網頁、搜尋及自動化瀏覽器任務。',
    pickReason: '瀏覽、搜尋、擷取網頁與自動化操作都由這個輕量 headless browser 處理。',
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
    pickReason: '從想法、計畫到程式分析都能轉成互動圖解，適合用來展示複雜內容。',
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
    pickReason: '涵蓋 52 種架構與流程圖，並能輸出自包含 HTML 和 SVG。',
    tags: ['圖表', '品牌化', 'SVG'],
    kind: 'repository',
  },
  {
    id: 'agency-agents',
    name: 'Agency Agents',
    owner: 'msitarzewski',
    repository: 'agency-agents',
    category: 'AI 代理、寫作與研究',
    description: '由多個領域專家型 AI agent 組成的集合，涵蓋工程、設計、行銷、產品等專業分工。',
    pickReason: '工程、設計、行銷與產品角色都收進同一組多 agent 團隊，方便比較各領域的分工。',
    tags: ['AI agents', '專業角色', '多領域'],
    kind: 'repository',
  },
  {
    id: 'chartdb',
    name: 'ChartDB',
    owner: 'chartdb',
    repository: 'chartdb',
    category: '資料庫與資料設計',
    description: '以單一查詢匯入資料庫 schema，互動式繪製資料庫圖表並編輯結構。',
    pickReason: '從 schema 匯入、繪製關聯圖到結構編輯，都能在同一個互動介面完成。',
    tags: ['資料庫', 'ER 圖', 'Schema'],
    kind: 'repository',
  },
  {
    id: 'humanizer-zh',
    name: 'Humanizer-zh',
    owner: 'op7418',
    repository: 'Humanizer-zh',
    category: 'AI 代理、寫作與研究',
    description: '專為中文語境設計的 AI 寫作去味與潤色 Skill，消除模板化套話與翻譯腔，使生成內容更自然。',
    pickReason: '專門處理中文 AI 文字常見的模板套話與翻譯腔，聚焦中文語感。',
    tags: ['AI 寫作', '去 AI 味', '文字潤色'],
    kind: 'repository',
  },
  {
    id: 'last30days',
    name: 'last30days',
    owner: 'mvanhorn',
    repository: 'last30days-skill',
    category: 'AI 代理、寫作與研究',
    description: '跨 Reddit、X、YouTube、HN、Polymarket 搜尋過去 30 天社群討論並統整總結的 AI Agent 研究外掛。',
    pickReason: '集中搜尋並彙整最近 30 天各社群平台的討論，用來追查主題近期脈絡。',
    tags: ['即時搜尋', '社群研究', 'Plugin'],
    kind: 'repository',
  },
  {
    id: 'modern-web-guidance',
    name: 'Modern Web Guidance',
    owner: 'GoogleChrome',
    repository: 'modern-web-guidance',
    category: '瀏覽器與網頁',
    description: '為 AI coding agent 提供現代 Web 標準與最新最佳實踐指引，優先採用原生 Web API。',
    pickReason: '把現代 Web 標準與最佳實踐整理給 coding agent，並優先採用原生 Web API。',
    tags: ['Web 標準', '前端指引', 'Agent Skill'],
    kind: 'repository',
  },
  {
    id: 'scrapling',
    name: 'Scrapling',
    owner: 'D4Vinci',
    repository: 'Scrapling',
    category: '瀏覽器與網頁',
    description: '具備自適應解析與繞過反爬機制的次世代 Web 爬蟲框架，支援 AI agent 與 MCP 整合。',
    pickReason: '自適應解析、反爬處理及 AI agent／MCP 整合收在同一套爬蟲框架。',
    tags: ['網頁爬蟲', '自適應解析', '反爬機制'],
    kind: 'repository',
  },
  {
    id: 'codegraph',
    name: 'CodeGraph',
    owner: 'colbymchenry',
    repository: 'codegraph',
    category: 'AI 代理、寫作與研究',
    description: '以 Tree-sitter 預先索引的本機程式碼知識圖譜，為 AI coding agent 提供語意符號與呼叫鏈結構。',
    pickReason: 'Tree-sitter 預先索引本機程式碼中的語意符號與呼叫鏈，提供 coding agent 可用的程式關聯。',
    tags: ['程式碼圖譜', 'Tree-sitter', 'Agent Skill'],
    kind: 'repository',
  },
  {
    id: 'elephant-goldfish-model',
    name: 'Elephant-Goldfish Model',
    owner: 'google',
    repository: 'elephant-goldfish-model',
    category: 'AI 代理、寫作與研究',
    description: '開源 AI 助理 plugin，以 Elephant 整理專案脈絡並草擬規格，再由 Goldfish reviewer 以新脈絡審查文件，協助發現未明說的假設與盲點。',
    pickReason: '把規格草擬與獨立審查拆成兩個角色，適合參考它如何讓 agent 工作流程保留人工決策。',
    tags: ['AI agent', '規格設計', '文件審查'],
    kind: 'repository',
  },
].map((repository) => {
  const repositoryUrl = `https://github.com/${repository.owner}/${repository.repository}`;
  return {
    ...repository,
    stars: repositoryStars[`${repository.owner}/${repository.repository}`],
    starsCheckedAt: repositoryStarsCheckedAt[`${repository.owner}/${repository.repository}`] ?? '2026-11-24',
    repositoryUrl,
    detailUrl: repositoryUrl,
  };
});

export function filterRepositories(catalog, { query = '', category = 'all' } = {}) {
  const normalizedQuery = query.trim().toLocaleLowerCase();

  return catalog.filter((repository) => {
    const matchesCategory = category === 'all' || repository.category === category;
    const searchableText = [repository.name, repository.id, repository.owner, repository.description, repository.pickReason, ...repository.tags]
      .join(' ')
      .toLocaleLowerCase();

    return matchesCategory && (!normalizedQuery || searchableText.includes(normalizedQuery));
  });
}

export function sortRepositories(catalog, order = 'stars-desc') {
  const comparison = {
    'stars-desc': (a, b) => b.stars - a.stars,
    'stars-asc': (a, b) => a.stars - b.stars,
    'name-asc': (a, b) => a.name.localeCompare(b.name),
  }[order] ?? ((a, b) => b.stars - a.stars);

  return [...catalog].sort(comparison);
}
