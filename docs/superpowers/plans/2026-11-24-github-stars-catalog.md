# GitHub Stars 排序與 Moli Repo 卡實作計畫

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to execute this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 將 Skill Atlas 的人氣依據統一改為手動快照的 GitHub repo stars、加入單張 Moli repo 卡，並移除所有 skills.sh 網址。

**Architecture:** 仍以 `assets/catalog.mjs` 作為唯一靜態資料來源。每筆 catalog 項目具有 repository stars 和快照日期，skill 項目的排序、顯示與 GitHub 連結都使用其 GitHub repo；Moli 為一筆標記為 repo card 的 catalog 項目。頁面保留原有篩選及排序控制，預設按 repo stars 排序。

**Tech Stack:** 原生 ES modules、靜態 HTML/CSS、Node.js `node:test`、瀏覽器檢查；不新增依賴或 API workflow。

**Spec:** `docs/superpowers/specs/2026-11-24-github-stars-catalog-design.md`

## Global Constraints

- 所有卡片連結指向 GitHub；網站和資料不得殘留 `skills.sh` 網址。
- `stars` 是 GitHub repository 的手動快照，日期為 `2026-11-24`。
- `moli` 是一張 repo 卡；不得拆成多個 skills 卡。
- 同 repo skills 共用 stars；stars 並列時保留 catalog 原始次序。
- 保留搜尋、分類、空結果狀態及響應式頁面。
- GitHub stars 是人氣指標，不得文案暗示為 skill 個別安裝量、品質保證或單一 skill 使用量。

## Review Focus

1. 同 repo 多個 skills 必須顯示相同 repo stars，並維持穩定並列順序。
2. 預設排序、低到高排序和 A–Z 排序均需回傳完整項目，並正確涵蓋 Moli repo 卡。
3. Moli repo 卡必須只出現一次、連至 GitHub repo、不需要 skills.sh 頁面或安裝 CLI。
4. 所有原先由 skills.sh 產生的詳情連結都要換成對應 GitHub repository，且移除所有 skills.sh 字串。
5. 手動快照日期及所有數字標記為 repo stars，不得混用舊安裝量。

### Task 1: Repository stars catalog 和排序

**Files:**
- Modify: `assets/catalog.mjs`
- Test: `tests/catalog.test.mjs`

**Interfaces:**
- `skills` 每項加入 `stars` 與 `starsCheckedAt`；`detailUrl` 改由 GitHub repo 建構。
- Moli 以既有 catalog 欄位加入一項，`id: 'moli'`、`kind: 'repository'`、`owner: 'lexmount'`、`repository: 'moli'`、`stars: 24_372`、`starsCheckedAt: '2026-11-24'`。
- 保留安裝指令只對可安裝 skill 產生；repo 卡不得產生安裝指令。
- `sortSkills(catalog, order = 'stars-desc')` 支援 `stars-desc`、`stars-asc`、`name-asc`；未指定/未知排序按預設 stars 降冪並以原始順序穩定並列。

- [ ] **Step 1: 寫失敗測試**：調整 catalog 數量為 23，驗證每筆 `stars`、`starsCheckedAt` 皆有值，所有 `detailUrl` 是 GitHub URL，Moli 只有一筆 repo card、stars 日期及無安裝指令；新增同 repo 相同 stars 與穩定並列次序、三種排序涵蓋 23 筆的測試。
- [ ] **Step 2: 執行測試確認失敗**：`node --test tests/catalog.test.mjs`；預期因 stars/kind/URL/排序尚未轉換而失敗。
- [ ] **Step 3: 實作 catalog**：查詢且記錄下列 repo stars 快照；每個同 repo skill 項目使用同一 stars/date。

| Repo | Snapshot stars |
|---|---:|
| `lexmount/moli` | 24,372 |
| `vercel-labs/skills` | 40,650 |
| `vercel-labs/agent-browser` | 53,641 |
| `mattpocock/skills` | 331,490 |
| `vercel-labs/agent-skills` | 34,817 |
| `anthropics/skills` | 199,530 |
| `obra/superpowers` | 325,178 |
| `cathrynlavery/diagram-design` | 71,068 |
| `morluto/rea` | 475,758 |

- [ ] **Step 4: 執行 catalog tests 確認通過**：`node --test tests/catalog.test.mjs`。

### Task 2: GitHub stars 介面、Moli 卡片與清除 skills.sh 連結

**Files:**
- Modify: `assets/app.mjs`
- Modify: `index.html`
- Modify: `assets/catalog.mjs` (補齊 Task 1 未包含的 repo card render metadata，如需要)

**Interfaces:**
- app 使用 Task 1 提供的 `stars`、`starsCheckedAt`、`kind`、`repositoryUrl`、`installCommand`。
- catalog result count 和所有項目總數為 23；分類選項需包含 Moli repo 卡使用的「瀏覽器與網頁」。

- [ ] **Step 1: 實作卡片顯示**：移除 skills.sh title link，改連到 `repositoryUrl`；顯示 GitHub stars 和 snapshot date。對 `kind === 'repository'` 將卡片標為「Repo」，不顯示安裝命令。確保 Moli 卡顯示 headless browser 用途。
- [ ] **Step 2: 更新排序 UI**：預設選項改為 GitHub Stars 高到低，低到高沿用 stars 排序；移除安裝量字樣。搜尋、篩選、排序一律由 catalog stars 執行。
- [ ] **Step 3: 移除 skills.sh 外連**：從 `index.html` 移除 directory 導覽、來源連結；將 hero CLI 連結改向相關 GitHub repo；說明與頁尾使用 GitHub 作為資料來源並說明 stars 日期。確認整個靜態網站及 `assets/`、`tests/` 中沒有 skills.sh URL 或連結。
- [ ] **Step 4: 更新測試及跑完整測試**：`node --test`；預期所有測試通過且新排序首位為 `morluto/rea`、末位為 `lexmount/moli`。

### Task 3: 瀏覽器驗證頁面與互動

**Files:**
- Verify: 本機靜態頁面，無額外永久檔案。

- [ ] **Step 1: 開啟桌機頁面**：檢查預設顯示 23 項、依 repo stars 降冪排序、stars 日期顯示、Moli 一張 repo 卡。
- [ ] **Step 2: 驗證三種排序和篩選**：測試 stars 升冪、名稱排序、搜尋、分類、清除篩選；確認 Moli repo 卡數量為 1。
- [ ] **Step 3: 驗證外連**：抽查 skill 卡與 Moli 卡皆指向 GitHub repo，確認頁面不含 skills.sh。
- [ ] **Step 4: 驗證窄螢幕**：390px viewport 無水平溢位，所有卡片仍能檢視。

---

## Self-review

- Spec coverage: repo stars 手動快照、全部排序、Moli 單卡、GitHub-only 連結、安裝量文字移除、總數、既有搜尋/分類與響應式 UI 均已分配到 Task 1–3。
- Step scan: 每個步驟對應單一測試、實作或瀏覽器確認，所有資料欄位和 GitHub 快照值明確。
- Interface consistency: Task 1 定義 `kind`, `stars`, `starsCheckedAt`, GitHub `detailUrl`/`repositoryUrl` 與 stars sort; Task 2 使用這些欄位。
- Review Focus: Task 1 驗證 stars group、排序與 Moli metadata；Task 2 驗證 URL/顯示；Task 3 驗證實際 UI 和行動版。
- Scope: 不新增定時 action、不改目錄框架、不增加依賴；Moli 維持一張 repo 卡。
