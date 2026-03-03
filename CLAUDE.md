# CLAUDE.md

此文件為 Claude Code 提供專案指引。

## 專案概述

RYwebsite 是 Rita Yang 的個人作品集網站，為單頁式應用程式（SPA），展示專案作品、Markdown 技術部落格、個人簡介及聯絡表單。特色功能包含自訂游標動畫（GSAP）、深色/淺色主題切換、Markdown 文章渲染與程式碼語法高亮，以及 CSS 與 GSAP 混合動畫。

## 技術棧

- **框架：** Vue 3.5 搭配 Composition API（`<script setup>`）
- **路由：** Vue Router 4（hash 模式，支援 GitHub Pages）
- **語言：** TypeScript 5.6（嚴格模式）
- **建置工具：** Vite 6
- **樣式：** SCSS + CSS 自訂屬性實現主題切換
- **動畫：** GSAP 3.12（游標追蹤、首頁 hero timeline、AboutView 時間軸）；簡單進場動畫使用 CSS `@keyframes`
- **Markdown：** markdown-it + highlight.js（atom-one-dark 主題）
- **工具庫：** @vueuse/core
- **部署：** gh-pages → GitHub Pages

## 常用指令

```bash
npm run dev      # 啟動開發伺服器
npm run build    # 建置正式版本
npm run preview  # 預覽正式版本
npm run deploy   # 建置並部署至 GitHub Pages
```

## 專案架構

```
src/
├── assets/
│   ├── images/          # 部落格與專案封面圖
│   └── icons/           # 技術 SVG 圖標
├── components/
│   └── TechIcon.vue     # SVG 技術圖示元件（多種技術 logo）
├── content/
│   └── blog/
│       ├── posts.ts     # 文章元資料共用資料源（BlogView + BlogDetailView 共用）
│       └── *.md         # Markdown 文章內容（每篇對應 slug 命名）
├── views/
│   ├── HomeView.vue     # 首頁（Canvas 互動背景、GSAP hero timeline、技術圖標）
│   ├── AboutView.vue    # 關於頁（技能卡片、GSAP ScrollTrigger 時間軸）
│   ├── ProjectsView.vue # 專案頁（卡片列表 + 彈窗詳情）
│   ├── BlogView.vue     # 部落格列表（標籤篩選、分頁）
│   ├── BlogDetailView.vue # 文章詳細頁（Markdown 渲染、語法高亮）
│   └── ContactView.vue  # 聯絡頁（社群連結、聯絡表單）
├── router/index.ts      # 路由設定（含 /blog/:slug）
├── App.vue              # 根元件（導覽列、漢堡選單、游標、Footer、回到頂部）
└── main.ts              # 程式進入點
```

## 重要模式與慣例

- **路由：** hash 模式（`createWebHashHistory`），base 為 `/RYwebsite/`
- **元件：** `<script setup>` + TypeScript
- **樣式：** scoped SCSS；CSS 變數控制主題；BEM-like 命名（`&__element`、`&--modifier`）
- **路徑別名：** `@/*` → `./src/*`
- **主題：** 深色（預設）與淺色，偏好儲存於 localStorage
- **動畫分工：**
  - GSAP → 游標追蹤、首頁 hero stagger timeline、AboutView 技能 ScrollTrigger、時間軸序列動畫
  - CSS `@keyframes heroFadeUp` → 各頁面 hero 標題/副標題進場（Projects、Blog、Contact、About、Nav）
- **部落格新增文章：** 在 `src/content/blog/` 新增 `<slug>.md`，並在 `posts.ts` 補上對應 metadata

## 主題色彩變數

```scss
// 深色（預設）
--primary-color: #e8584c;
--background-color: #0c0c0c;
--text-color: #ece8e1;
--glass-bg: rgba(255, 255, 255, 0.08);
--glass-border: rgba(255, 255, 255, 0.1);

// 淺色
--primary-color: #c9463d;
--background-color: #f5f2ed;
--text-color: #1a1a1a;
--glass-bg: rgba(255, 255, 255, 0.5);
--glass-border: rgba(0, 0, 0, 0.08);
```

## z-index 層級

| 層級 | 用途                        |
| ---- | --------------------------- |
| 9999 | 自訂游標（dot）             |
| 9998 | 自訂游標（follower）        |
| 200  | 專案詳情 Modal              |
| 100  | 導覽列（`.nav`）            |
| 99   | 手機版選單（`.nav__links`） |
| 90   | 回到頂部按鈕                |

## 注意事項

- 除 HomeView 外，所有頁面皆使用路由懶加載
- 自訂游標在行動裝置（< 768px）隱藏，`cursor: auto` 恢復
- `.nav` 有 `backdrop-filter`，會使 `position: fixed` 子元素相對於 nav 而非 viewport 定位（手機選單已改用 `position: absolute + height: 100vh`）
- Footer 背景為 `--primary-color`（暖紅），游標使用白色外框 `box-shadow` 確保可見度
- Markdown 文章的 prose 樣式寫在 `BlogDetailView.vue` 的 **非 scoped** `<style>` 區塊，以便作用於 `v-html` 渲染內容
