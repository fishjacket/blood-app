# 血壓管理 App

簡單血壓紀錄網頁，使用 HTML/CSS/JavaScript，資料儲存在 `localStorage`。

使用方式：

1. 開啟 `index.html`（例如在瀏覽器中開啟 `C:/Users/Admin/Desktop/lab02/blood-app/index.html`）。
2. 在表單輸入收縮壓、舒張壓、脈搏、用藥狀態與備註，按「儲存」。
3. 下方清單會顯示已儲存的紀錄（含輸入時的日期與時間）。

佈景主題
----------------
本專案支援淺色與深色佈景，頁面右上方的切換開關可切換主題，選擇會儲存在瀏覽器的 `localStorage`，重新載入後會保留使用者的設定。若未設定，預設會匹配作業系統的顏色偏好（`prefers-color-scheme`）。
