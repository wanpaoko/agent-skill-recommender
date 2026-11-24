# AI Agent Project Browser

以繁體中文瀏覽 AI agent、圖表與資料庫相關的開放原始碼 GitHub 專案。可搜尋專案名稱與描述、依類別篩選，並依 GitHub Stars 或名稱排序。

Stars 是手動記錄的 GitHub repository 快照，日期標示於頁面與 `assets/catalog.mjs`；星數反映 repo 人氣，不代表專案品質。

## 本機預覽

需要 Python 3 提供靜態 HTTP 伺服器。於專案根目錄執行：

```sh
python3 -m http.server 8000
```

開啟 <http://localhost:8000/>。停止伺服器可在終端機按 `Ctrl+C`。

## 測試

需要 Node.js。使用內建測試執行器：

```sh
node --test tests/catalog.test.mjs
```

測試涵蓋 catalog 資料、搜尋、分類與排序邏輯；不包含瀏覽器 UI 或部署流程。

## 維護專案清單

編輯 `assets/catalog.mjs` 中的 `skills` 與 `repositoryStars`：

- `skills` 每筆資料代表一張專案卡，包含名稱、owner、repository、類別、描述與標籤。
- `repositoryStars` 以 `owner/repository` 對應星數；更新時同步更新 `starsCheckedAt` 快照日期。
- 新增或修改類別時，確認 `index.html` 的分類按鈕 `data-category` 與資料中的 `category` 完全一致。「全部」使用 `all`。

## 部署

`.github/workflows/pages.yml` 會在推送到 `main` 或手動觸發時，將靜態檔案部署到 GitHub Pages。Workflow 目前明確複製 `index.html` 及 `assets/` 中的指定檔案到 `_site`；新增要上線的檔案時，需同步確認部署清單包含該檔案。
