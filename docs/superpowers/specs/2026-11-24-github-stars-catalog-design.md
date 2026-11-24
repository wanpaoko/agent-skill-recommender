# GitHub Stars 排序與 Moli 專案卡設計

## 目的

Skill Atlas 以 GitHub repository stars 作為清單人氣依據，加入 Moli 專案卡，移除頁面所有 skills.sh 連結。維持一個可安裝 skill 一張卡的現有結構；Moli 特別以整個 repo 一張卡呈現。

## 範圍

- 所有既有 skill 卡顯示其來源 GitHub repo 的 stars；共用 repo 的 skills 顯示相同數量。
- 預設清單排名與排序依 stars 高至低；保留低至高及名稱排序。
- 所有 stars 是手動快照，顯示共用查詢日期 2026-11-24；不新增 GitHub API 工作流程。
- 新增 `lexmount/moli` 一張 repo 卡，說明它是給 AI agent 使用的 headless browser，連到 GitHub repo，不拆出該 repo 的個別 skills。
- 移除導覽、頁尾、skill 卡和資料來源中的 skills.sh 連結。GitHub repo 是所有項目的主要連結；安裝指令沿用 GitHub source。
- 項目總數仍是卡片數，不是 stars 總和。
- 保留現有搜尋、分類、手機版排版與其他互動。

## 方法與取捨

1. 在既有靜態 catalog 中為每個項目加入手動快照 `stars`；排序直接讀這份資料，不依賴執行時 API 或外部服務。最簡單、可離線運作，但快照必須人工更新。
2. 用 GitHub Actions 定時查詢 API 並產生星數快照。較即時，但新增 API 更新與失敗處理維護面，與本次選定的手動方式不符。

採用方案 1。stars 對應 repository，不代表單一 skill 的使用量、品質或安全性。同 repo 項目並列時保留原始 catalog 順序作為穩定次序。

## 尚未交由實作者的選擇

依據 GitHub repository 頁面查得的 stars 編輯 catalog；每筆卡片都帶 repo、stars 與相同的查詢日期。`lexmount/moli` 使用描述性 repo 卡資料，不要求它一定是可安裝 skill。使用 GitHub repository 連結做卡片連結，安裝命令以目前 Skills CLI 的 GitHub 安裝格式保留。