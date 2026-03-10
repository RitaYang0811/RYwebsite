const n=`接手過遺留專案的人，大概都體會過打開一個 \`.vue\` 檔案，發現裡面塞了兩三千行程式碼的恐懼。邏輯高度耦合、模板錯綜複雜，只要改動一個小小的按鈕，就可能引發意想不到的連鎖反應。

Vue.js 最強大的核心特性之一就是**元件（Component）**。透過將模板、樣式與邏輯封裝起來，元件不僅能獨立維護，還能像樂高積木一樣重複使用。它擁有自己的狀態、方法與生命週期，是前端架構中控制複雜度最有效的手段。今天，我們就從資深開發者的視角，重新梳理 Vue 3 元件的拆分原則與註冊策略。

---

## 何時該拆分元件？

很多新手會陷入「為了拆而拆」的過度工程陷阱，導致狀態傳遞（Props Drilling）變得異常痛苦。在實務上，建議遵循以下三個「元件轉換原則」：

1. **先求有，再求精**：初期開發時，先不要急著拆分元件。確保業務邏輯與功能都能正常運作後，再來進行重構。
2. **根據行數與職責分離**：如果單一檔案的程式碼過長（通常超過 200～300 行），或是模板結構變得難以閱讀，這就是拆分的信號。
3. **確認重複使用性**：當同一個 UI 區塊或功能（例如：自定義的 Modal、特定的資料卡片）在專案中出現兩次以上，就毫不猶豫地將它抽離成獨立元件。

---

## 實作細節與註冊策略

如同變數有全域與區域之分，元件的註冊也分為**全域（Global）**與**區域（Local）**。

### 1. 全域註冊 Global Registration

全域註冊代表該元件掛載於 Vue 的根實體上，任何子元件都可以直接使用，無須再次引入。

**適用情境：** 高度共用的基礎 UI 元件，例如 \`<BaseButton>\`、\`<BaseIcon>\` 或全局彈窗。

\`\`\`ts
// main.ts
import { createApp } from 'vue'
import App from './App.vue'
import BaseButton from './components/BaseButton.vue'

const app = createApp(App)

// 透過 app.component() 註冊全域元件
// 第一個參數是元件名稱，第二個是元件本身
app.component('BaseButton', BaseButton)

app.mount('#app')
\`\`\`

### 2. 區域註冊 Local Registration — \`<script setup>\` 最佳實踐

在現代 Vue 3 開發中，強烈推薦使用 SFC (Single-File Components) 搭配 \`<script setup>\`。區域註冊的好處是依賴關係清晰，且有利於打包工具進行 Tree-Shaking。

在 \`<script setup>\` 中，你只需要 \`import\` 元件，就可以直接在模板中使用，**不需要額外寫 \`components: {}\` 來註冊**。

\`\`\`vue
<template>
  <div class="dashboard">
    <h2>使用者儀表板</h2>
    <UserProfileCard :user-id="currentUser" />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
// 只要 import 進來，Vue 自動會將其視為區域元件
import UserProfileCard from './components/UserProfileCard.vue'

const currentUser = ref('u_12345')
<\/script>
\`\`\`

### 3. 邊緣案例：非同步元件 Async Components

當你的元件非常龐大（例如帶有複雜圖表的資料看板），且不一定會在初次渲染時用到時，可以使用 \`defineAsyncComponent\` 進行懶加載，避免拖慢初始載入速度。

\`\`\`vue
<template>
  <button @click="showChart = true">顯示圖表</button>
  <HeavyChart v-if="showChart" />
</template>

<script setup lang="ts">
import { defineAsyncComponent, ref } from 'vue'

// 只有在 showChart 為 true 時，才會去動態載入這個元件的 chunk
const HeavyChart = defineAsyncComponent(() =>
  import('./components/HeavyChart.vue')
)

const showChart = ref(false)
<\/script>
\`\`\`

---

## 避坑指南

### 元件命名與 HTML 限制的衝突

- **SFC 環境（推薦）**：在 \`.vue\` 檔案的 \`<template>\` 中，建議統一使用 PascalCase（大駝峰）命名標籤，例如 \`<UserProfileCard />\`。這能清楚區分原生 HTML 標籤與 Vue 元件。
- **DOM 環境（地雷）**：HTML 本身是不區分大小寫的。如果你將模板寫在直接掛載於 DOM 的一般 HTML 檔案中，\`<UserProfileCard>\` 會被瀏覽器轉成 \`<userprofilecard>\` 導致渲染失敗。在這種情況下，必須使用 kebab-case：\`<user-profile-card></user-profile-card>\`。

### 濫用全域註冊導致的效能問題

不要為了方便把所有元件都註冊在 \`main.ts\`！

全域註冊的元件無法被 Webpack 或 Vite 進行 Tree-Shaking。即使某個頁面沒用到它，它依然會被打包進最終的 JavaScript Bundle 中，導致初始載入變慢。

### 過時的模板封裝方式（x-template）

過去在沒有建置工具的時代，我們可能會使用 \`<script type="text/x-template">\` 來封裝模板。但在現代 Vue 3（Vite / Vue CLI）環境下，請全面擁抱 \`.vue\` 單一檔案元件（SFC）——不僅支援 TypeScript 提示，還有 CSS 作用域（scoped）管理，維護性遠高於 x-template。

## 總結

讀完這篇文章，你應該掌握了以下關鍵知識：

- **元件化思維**：先實現功能，再依據「程式碼長度」與「複用性」進行拆分。
- **現代註冊方式**：理解全域註冊（\`app.component\`）的適用場景，以及在 \`<script setup>\` 中極簡的區域註冊方式。
- **效能優化與規範**：利用 \`defineAsyncComponent\` 處理大型元件，並掌握 SFC 下正確的 PascalCase 命名規範。

良好的元件架構是高可維護性專案的基礎，下次在寫出超過 300 行的 \`.vue\` 檔案前，不妨停下來思考一下：「我是不是該把這段邏輯抽成元件了？」
`;export{n as default};
