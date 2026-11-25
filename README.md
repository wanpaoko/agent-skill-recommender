# AI Agent Project Browser — 個人 Repo 精選

以繁體中文介紹我手動挑選的 GitHub 開源 repo，附上用途、挑選理由與分類。可搜尋專案資訊、依類別篩選，並依 GitHub Stars 或名稱排序。

Stars 是手動記錄的 GitHub repository 人氣快照，日期標示於頁面與 `assets/catalog.mjs`；不是精選依據或品質保證。

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

## 維護精選 Repo 清單

編輯 `assets/catalog.mjs` 中的 `repositories` 與 `repositoryStars`：

- `repositories` 每筆資料代表一張 repo 卡，包含 owner、repository、分類、用途描述、精選理由及標籤。
- 每筆資料的 `pickReason` 應以已確認的專案功能為依據；勿杜撰使用經驗或背書。
- `repositoryStars` 以 `owner/repository` 對應星數；更新時同步更新 `starsCheckedAt` 快照日期。
- 目前分類：「瀏覽器與網頁」、「圖表與視覺化」、「AI 代理、寫作與研究」及「資料庫與資料設計」。新增或修改時同步更新 `index.html` 的分類按鈕。
- 新增或修改類別時，確認 `index.html` 的分類按鈕 `data-category` 與資料中的 `category` 完全一致。「全部」使用 `all`。

## 部署

`.github/workflows/pages.yml` 會在推送到 `main` 或手動觸發時，將靜態檔案部署到 GitHub Pages。Workflow 目前明確複製 `index.html` 及 `assets/` 中的指定檔案到 `_site`；新增要上線的檔案時，需同步確認部署清單包含該檔案。
