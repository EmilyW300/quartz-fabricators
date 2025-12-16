# quartz-fabricators

石英加工商的 GitHub Pages 範本，會替 `data/vendors.json` 中的每一家廠商建立獨立介紹頁。

## 如何新增廠商
1. 編輯 `data/vendors.json`，複製其中一筆資料並修改內容：
   - `id`：網址使用的代稱，需唯一，例如 `aurora-quartz`
   - `name`、`location`、`years`、`services`、`highlights`、`description`、`image`
   - `contact.phone`、`contact.email`、`contact.website`
2. 將變更推送到 GitHub，並在專案設定啟用 GitHub Pages（來源選擇 `work` 分支或 `gh-pages`）。
3. 發布後，首頁 (`index.html`) 會列出所有廠商；點擊即可跳轉到對應的 `vendor.html?id=<id>` 專頁。

## 本機預覽
```bash
python -m http.server 8000
```
然後瀏覽 `http://localhost:8000` 驗證頁面。
