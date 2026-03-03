# RYwebsite — Rita Yang's Portfolio

> 個人作品集網站 | Personal Portfolio Website

---

## 簡介 | Overview

這是 Rita Yang 的個人作品集網站，以單頁式應用程式（SPA）呈現，展示前端開發專案、技術文章、個人經歷與聯絡資訊。網站著重於細節與互動體驗，包含自訂游標動畫、深色/淺色主題切換，以及 GSAP 驅動的流暢過場動畫。

This is Rita Yang's personal portfolio website — a Single Page Application built to showcase front-end projects, technical blog articles, professional background, and contact information. The site emphasizes interaction detail, featuring a custom cursor, dark/light theme switching, and smooth GSAP-powered animations throughout.

---

## 線上預覽 | Live Demo

[https://ritayang0811.github.io/RYwebsite/](https://ritayang0811.github.io/RYwebsite/)

---

## 功能特色 | Features

| 功能       | 說明                                          |
| ---------- | --------------------------------------------- |
| 自訂游標   | GSAP 驅動，含拖曳跟隨效果與 hover 互動        |
| 主題切換   | 深色（預設）/ 淺色，偏好記憶於 localStorage   |
| 漢堡選單   | 手機版全螢幕覆蓋選單，帶滑入動畫              |
| 文章詳細頁 | Markdown 渲染，程式碼語法高亮（highlight.js） |
| 專案彈窗   | 點擊卡片展開詳細資訊，支援外連結              |
| 技術圖標   | 自訂 SVG TechIcon 元件，支援多種技術 logo     |
| 回到頂部   | 滾動超過一頁高度後顯示，平滑捲動              |
| RWD 設計   | 適配桌機、平板、手機（最小 375px）            |
| GSAP 動畫  | 首頁背景與時間軸效果                          |

---

## 技術棧 | Tech Stack

- **Framework:** Vue 3.5 + Composition API (`<script setup>`)
- **Language:** TypeScript 5.6（嚴格模式）
- **Build Tool:** Vite 6
- **Routing:** Vue Router 4（Hash 模式，支援 GitHub Pages）
- **Animation:** GSAP 3.12 + ScrollTrigger
- **Styling:** SCSS + CSS Custom Properties（主題變數）
- **Utilities:** @vueuse/core
- **Markdown:** markdown-it + highlight.js
- **Deployment:** gh-pages → GitHub Pages

---

## 專案結構 | Project Structure

```
src/
├── assets/
│   ├── images/          # 部落格與專案封面圖
│   └── icons/           # 技術 SVG 圖標
├── components/
│   └── TechIcon.vue     # 多技術 SVG 圖標元件
├── content/
│   └── blog/
│       ├── posts.ts     # 文章元資料（共用資料源）
│       └── *.md         # Markdown 文章內容
├── views/
│   ├── HomeView.vue     # 首頁 — Canvas 互動背景、技術展示
│   ├── AboutView.vue    # 關於 — 技能樹、工作經歷時間軸
│   ├── ProjectsView.vue # 專案 — 卡片列表 + 彈窗詳情
│   ├── BlogView.vue     # 部落格 — 文章列表、標籤篩選
│   ├── BlogDetailView.vue # 文章詳細頁
│   └── ContactView.vue  # 聯絡 — 社群連結、聯絡表單
├── router/index.ts
└── App.vue              # 全域：導覽列、主題、游標、Footer
```

---

## 設計理念 | Design Philosophy

以「極簡科技風」為設計基調，使用黑灰米白搭配暖紅強調色，追求視覺乾淨、資訊層次清晰。動畫以輔助敘事為目的，而非純粹裝飾，每一個互動細節都是為了讓訪客更直觀地感受內容。

The design follows a minimalist tech aesthetic — dark charcoal and warm off-white tones accented with a signature red. Animations serve narrative rather than decoration: every interaction is intentional, guiding visitors through content naturally.

---

## 聯絡 | Contact

- **Email:** ritayang0811@gmail.com
- **GitHub:** [github.com/RitaYang0811](https://github.com/RitaYang0811)

---

&copy; 2026 Rita Yang. All rights reserved.
