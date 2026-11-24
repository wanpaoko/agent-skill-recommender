# Repository Guidelines

## Project Overview

這是以繁體中文呈現的靜態網站，瀏覽並搜尋 AI agent、圖表與資料庫相關的 GitHub 專案。資料與 GitHub Stars 數量寫在程式碼中；星數是標示日期的手動快照，不是執行時向 GitHub 查詢。

## Architecture & Data Flow

- `index.html` 定義頁面結構、搜尋／排序控制項、分類按鈕、結果區與空結果狀態。
- `assets/catalog.mjs` 匯出專案資料及純函式 `filterSkills()`、`sortSkills()`。
- `assets/app.mjs` 匯入 catalog；初次載入及搜尋、分類、排序變更時，`render()` 篩選並排序資料，以 DOM API 建立卡片，再更新結果數與空狀態。
- `assets/site.css` 負責樣式、響應式版面、鍵盤焦點與減少動態效果的偏好設定。

新增或修改分類時，讓 `index.html` 按鈕的 `data-category` 與 catalog 的 `category` 字串一致；「全部」使用 `all`。

## Key Directories

- `assets/`：瀏覽器端 ES modules、CSS 與 favicon。
- `tests/`：Node.js 內建測試執行器測試。
- `docs/superpowers/specs/`、`docs/superpowers/plans/`：依日期與主題命名的設計及實作文件。
- `.github/workflows/`：GitHub Pages 部署設定；不是應用程式的建置系統。

## Development Commands

- 測試：`node --test tests/catalog.test.mjs`（或 `node --test`）。
- 本機預覽：`python3 -m http.server 8000`，再開啟 `http://localhost:8000/`。使用 HTTP 靜態伺服器載入 ES modules；專案沒有內建開發伺服器。
- 沒有設定 build、lint 或格式化命令；不需安裝 npm 套件。

## Code Conventions & Common Patterns

- 使用原生 JavaScript ES modules，不引入框架或依賴來處理簡單的頁面互動。
- Catalog 操作維持為可測試的純函式；排序回傳新陣列，不直接修改匯入的資料。
- DOM 卡片以 DOM API 建立，將文字放入 `textContent`，避免以字串拼接 HTML 呈現資料。
- 沿用現有命名：JavaScript 函式與變數用 `camelCase`；專案記錄欄位使用明確的英文名稱。
- UI 事件更新局部狀態並呼叫 `render()`；避免另建不必要的狀態管理層。
- CSS 沿用自訂屬性與既有媒體查詢，確保鍵盤焦點與 reduced-motion 樣式仍可用。

## Important Files

- `index.html`：頁面入口與 UI 控制項。
- `assets/app.mjs`：卡片渲染、事件處理與搜尋快捷鍵。
- `assets/catalog.mjs`：專案資料、Stars 快照、篩選與排序。
- `tests/catalog.test.mjs`：catalog 資料、搜尋、分類及排序測試。
- `.github/workflows/pages.yml`：GitHub Pages 部署；明確複製 `index.html` 與指定資產至 `_site`。新增要部署的檔案時，確認部署清單有包含它。

## Runtime/Tooling Preferences

網站在瀏覽器執行，使用原生 HTML、CSS 與 JavaScript modules。Node.js 僅供執行測試；目前沒有 `package.json`、鎖檔、套件管理器或建置工具。避免新增依賴，除非需求確實需要。

## Testing & QA

使用 Node.js 內建 `node:test` 與 `node:assert/strict`；測試命名為 `*.test.mjs`。目前測試涵蓋 catalog 資料、搜尋、分類及排序，不涵蓋瀏覽器 UI、無障礙行為或 Pages 部署。修改頁面互動後，除跑測試外，也應以本機 HTTP 伺服器在瀏覽器確認實際畫面與操作。
