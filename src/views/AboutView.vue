<template>
  <div class="about">
    <section class="about-hero">
      <h1 class="about-hero__title">About Me</h1>
      <div class="about-hero__content">
        <div class="about-hero__text">
          <p class="about-hero__description">
            具備 2 年前端開發經驗，專注於打造高穩定、具備流暢體驗的 Web
            應用。曾參與 企業級通訊軟體開發 與
            電商網站建置，熟練處理複雜架構與即時通訊等進階開發情境。<br />

            擅長 Vue 3、TypeScript 與 Quasar
            生態系。重視系統架構規劃與工程效率，採用 SDD（規格驅動開發）結合
            Claude Code 的 AI
            工作流，藉此在「極大化開發速度」與「維持架構擴充性」間取得最佳平衡。<br />
            <br />
            <strong>核心優勢：<br /></strong>
            -
            <strong> 美感與工程的平衡</strong
            >：擁有對畫面的敏銳度與設計底蘊，能在「UI/UX
            體驗」與「前端效能」之間取得最佳平衡，確保高質感的最終產出。<br />
            -
            <strong>主動解決問題與技術分享</strong
            >：面對未知挑戰具備強大的自學力，能快速驗證新技術並推動落地。樂於在團隊中分享技術新知（如
            SDD 實務應用、ＷebRTC即時通訊開發），將個人經驗轉化為團隊資產。<br />
            - <strong>重視長期價值的開發思維</strong>：寫 Code
            時不僅追求「會動」，更堅持產出高品質、易維護且具擴充性的 Clean
            Code。<br />
            <br />
            未來期望持續運用現代化技術與高效開發工具，協助團隊或合作夥伴降低維護成本，並為終端用戶創造長遠的產品價值。
          </p>
        </div>
        <div class="about-hero__image">
          <div class="image-container">
            <!-- Replace with your actual image -->
            <div class="placeholder-image"></div>
          </div>
        </div>
      </div>
    </section>

    <section class="skills">
      <h2 class="section-title">Skills & Expertise</h2>
      <div class="skills-list">
        <div v-for="(skill, index) in skills" :key="index" class="skill-card">
          <div class="skill-card__header">
            <h3 class="skill-card__title">{{ skill.category }}</h3>
            <span class="skill-card__subtitle">{{ skill.subtitle }}</span>
          </div>
          <div class="skill-card__groups">
            <div
              v-for="(group, gi) in skill.groups"
              :key="gi"
              class="skill-group"
            >
              <span class="skill-group__label">{{ group.label }}</span>
              <span class="skill-group__items">{{ group.items }}</span>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section class="experience">
      <h2 class="section-title">Experience</h2>
      <div class="timeline">
        <div class="timeline__line"></div>
        <div
          v-for="(exp, index) in experience"
          :key="index"
          class="timeline-item"
        >
          <div class="timeline-item__dot"></div>
          <div class="timeline-item__content">
            <div class="timeline-item__date">{{ exp.period }}</div>
            <h3 class="timeline-item__title">{{ exp.role }}</h3>
            <div class="timeline-item__company">{{ exp.company }}</div>
            <p v-if="exp.description" class="timeline-item__desc">
              {{ exp.description }}
            </p>
            <div v-if="exp.highlights.length" class="timeline-item__highlights">
              <h4 v-if="exp.highlightsTitle" class="timeline-item__hl-title">
                {{ exp.highlightsTitle }}
              </h4>
              <ul class="timeline-item__list">
                <li v-for="(item, hi) in exp.highlights" :key="hi">
                  <strong v-if="item.title">{{ item.title }}：</strong
                  >{{ item.text }}
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { onMounted, onUnmounted } from "vue";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const skills = [
  {
    category: "Front-End Engineering",
    subtitle: "前端開發",
    groups: [
      {
        label: "Core Technologies",
        items: "JavaScript (ES6+) | TypeScript | HTML5 | CSS3 | RWD",
      },
      {
        label: "Frameworks & State",
        items: "Vue 3 | Nuxt |Quasar | Pinia | Vue Router",
      },
      {
        label: "Real-time & API",
        items: "WebSocket | WebRTC | RESTful API | Axios",
      },
      { label: "Styling & UI", items: "Sass (SCSS) | Bootstrap" },
      { label: "Build & Environment", items: "Vite | Webpack | npm | ESLint" },
      { label: "Version Control", items: "Git" },
    ],
  },
  {
    category: "Software Quality & Testing",
    subtitle: "軟體品質與測試",
    groups: [
      { label: "E2E & Unit Testing", items: "Playwright | Cypress | Vitest" },
    ],
  },
  {
    category: "System Planning & Methodology",
    subtitle: "系統規劃與開發方法論",
    groups: [
      {
        label: "Methodology",
        items:
          "SDD (Specification-Driven Development) | AI-Assisted Development (Claude Code)",
      },
      {
        label: "System & UX Design",
        items:
          "User Story Writing | Flowchart & Process Diagram | Site Map | Wireframe Design",
      },
    ],
  },
];

const experience = [
  {
    period: "2024 - Present",
    role: "Team+ 即時通訊平台｜前端主要負責人",
    company: "互動資通股份有限公司（電腦軟體服務業）",
    description:
      "主導 Web 端平台全面重構，負責技術選型、架構設計與團隊開發流程制定，帶領 2 名前端成員推進專案。",
    highlightsTitle: "核心戰績與技術亮點",
    highlights: [
      {
        title: "現代化架構重構與技術選型",
        text: "主導從零建立 Vue 3、TypeScript、Quasar 與 Pinia 的新一代架構。主動將建置工具由 Webpack 遷移至 Vite，大幅提升開發期編譯與熱更新 (HMR) 效率，優化團隊開發體驗 (DX)。",
      },
      {
        title: "即時通訊與高互動功能實作",
        text: "整合 WebSocket 與 WebRTC 核心技術，獨立完成高併發情境下的即時訊息、群組聊天室、語音與視訊通話等複雜功能。",
      },
      {
        title: "解決高耦合痛點",
        text: "規劃並導入「事件驅動架構 (Event Service)」作為模組間的溝通機制；並將冗長的條件判斷重構為「動態元件」與「Composable 模式」，顯著提升程式碼的重用性與系統擴展性。",
      },
      {
        title: "前端效能與狀態快取優化",
        text: "針對聊天室的頻繁切換，設計基於 Pinia 的訊息狀態快取策略。有效減少 API 重複請求與畫面重繪 (Re-render) 成本，帶來更流暢的讀取與操作體驗。",
      },
      {
        title: "制定規範與技術培訓",
        text: "建立團隊前端開發規範，並將 SDD (規格驅動開發) 等技術決策文件化。定期主持技術分享，統一實作標準，大幅降低 2 名團隊成員的協作與溝通成本。",
      },
    ],
  },
  {
    period: "2023 - 2024",
    role: "前端工程師",
    company: "艾普拉斯數位顧問股份有限公司（電腦軟體服務業）",
    description: "",
    highlightsTitle: "技術實踐亮點",
    highlights: [
      {
        title: "指標性銀行官網建置與無障礙標準落實",
        text: "參與知名銀行官網重構，嚴格遵循 WCAG 2.1 AA 級無障礙標準開發，確保資訊平權。",
      },
      {
        title: "行員後台系統開發",
        text: "負責行員操作系統之前端架構開發，透過元件化（Component-based）策略擴充 UI Library，提升開發效率並降低維護成本。",
      },
      {
        title: "跨裝置回應式設計（RWD）優化",
        text: "實作高品質 RWD 策略，針對不同設備（Mobile/Tablet/Desktop）進行斷點優化與流暢度測試，達成跨裝置一致性的品牌視覺與操作體驗。",
      },
    ],
  },
  {
    period: "2018 - 2020",
    role: "董事長特助",
    company: "巨石集團（不動產經營業）",
    description: "",
    highlightsTitle: "跨域實戰亮點",
    highlights: [
      {
        title: "海外不動產策略開發與通路運營",
        text: "主導海外市場調研與競爭者分析，成功建立潛在客戶並拓展多元合作渠道。",
      },
      {
        title: "高端客戶資產配置諮詢服務",
        text: "全權策劃並執行高端客戶海外實地考察行程，提供深度顧問式銷售，提升客戶投資信心與轉化率。",
      },
      {
        title: "專業資產講座首席講師",
        text: "擔任公司核心講師，針對國家政經政策、金融環境及建案投資價值進行深度解說，累積超過 25 場演講經驗。",
      },
      {
        title: "物業管理前期策略規劃",
        text: "負責物業公司籌備階段之市場定位分析與訂價策略制定，確保專案具備長期獲利能力與市場競爭力。",
      },
      {
        title: "跨國行銷專案策劃與執行",
        text: "統籌海外行銷活動之品牌推廣與媒體公關，提升品牌在目標市場的知名度與信任感。",
      },
    ],
  },
];

onMounted(() => {
  // Skills 卡片動畫 - 使用 CSS transition 替代 GSAP 以避免對齊問題
  const skillCards = document.querySelectorAll(".skill-card");

  ScrollTrigger.create({
    trigger: ".skills",
    start: "top 80%",
    onEnter: () => {
      skillCards.forEach((card, index) => {
        setTimeout(() => {
          card.classList.add("skill-card--visible");
        }, index * 150);
      });
    },
  });

  // Timeline 動畫 — 線從第一個點往下長，到達下個點才顯示內容
  const lineEl = document.querySelector(".timeline__line") as HTMLElement;
  const timelineItems = document.querySelectorAll(".timeline-item");

  if (lineEl && timelineItems.length) {
    // 計算每個 dot 相對 timeline 容器的 Y 位置
    const dotOffsets: number[] = [];
    timelineItems.forEach((item) => {
      const dot = item.querySelector(".timeline-item__dot") as HTMLElement;
      if (dot) {
        dotOffsets.push(
          (item as HTMLElement).offsetTop +
            dot.offsetTop +
            dot.offsetHeight / 2,
        );
      }
    });

    // 線從第一個 dot 開始
    gsap.set(lineEl, { top: dotOffsets[0], height: 0 });

    const tlTimeline = gsap.timeline({
      scrollTrigger: { trigger: ".timeline", start: "top 75%" },
    });

    // 第一個 dot 彈出 + 內容浮現
    const firstDot = timelineItems[0].querySelector(".timeline-item__dot");
    const firstContent = timelineItems[0].querySelector(
      ".timeline-item__content",
    );

    if (firstDot) {
      tlTimeline.fromTo(
        firstDot,
        { scale: 0 },
        { scale: 1, duration: 0.3, ease: "back.out(2)" },
      );
    }
    if (firstContent) {
      tlTimeline.fromTo(
        firstContent,
        { opacity: 0, x: -15 },
        { opacity: 1, x: 0, duration: 0.5, ease: "power2.out" },
        "-=0.1",
      );
    }

    // 後續項目：線長到 dot → dot 彈出 → 內容浮現
    for (let i = 1; i < timelineItems.length; i++) {
      const segmentHeight = dotOffsets[i] - dotOffsets[0];
      const dot = timelineItems[i].querySelector(".timeline-item__dot");
      const content = timelineItems[i].querySelector(".timeline-item__content");

      // 線延伸到這個 dot 的位置
      tlTimeline.to(lineEl, {
        height: segmentHeight,
        duration: 0.55,
        ease: "power2.inOut",
      });

      // 線到達後 dot 彈出
      if (dot) {
        tlTimeline.fromTo(
          dot,
          { scale: 0 },
          { scale: 1, duration: 0.3, ease: "back.out(2)" },
          "-=0.05",
        );
      }

      // 內容浮現
      if (content) {
        tlTimeline.fromTo(
          content,
          { opacity: 0, x: -15 },
          { opacity: 1, x: 0, duration: 0.5, ease: "power2.out" },
          "-=0.15",
        );
      }
    }

    // 最後一個點之後，線繼續往下延伸至內容底部
    const lastItem = timelineItems[timelineItems.length - 1] as HTMLElement;
    const lastItemBottom =
      lastItem.offsetTop + lastItem.offsetHeight - dotOffsets[0];
    tlTimeline.to(lineEl, {
      height: lastItemBottom,
      duration: 0.4,
      ease: "power2.out",
    });
  }
});

onUnmounted(() => {
  // 清理 ScrollTrigger
  ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
});
</script>

<style lang="scss" scoped>
.about {
  padding: 2rem;
  max-width: 1400px;
  margin: 0 auto;
}

@keyframes heroFadeUp {
  from { opacity: 0; transform: translateY(40px); }
  to   { opacity: 1; transform: translateY(0); }
}

@keyframes heroFadeLeft {
  from { opacity: 0; transform: translateX(-30px); }
  to   { opacity: 1; transform: translateX(0); }
}

@keyframes heroFadeRight {
  from { opacity: 0; transform: translateX(30px); }
  to   { opacity: 1; transform: translateX(0); }
}

.about-hero {
  min-height: 80vh;
  display: flex;
  flex-direction: column;
  justify-content: center;

  &__title {
    font-size: 4rem;
    color: var(--primary-color);
    margin-bottom: 3rem;
    text-align: center;
    animation: heroFadeUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) both;
  }

  &__content {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 4rem;
    align-items: center;
  }

  &__text {
    animation: heroFadeLeft 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.15s both;
  }

  &__image {
    animation: heroFadeRight 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.15s both;
  }

  &__description {
    font-size: 1rem;
    line-height: 1.8;
    opacity: 0.9;
  }
}

.image-container {
  width: 100%;
  aspect-ratio: 1;
  border-radius: 20px;
  overflow: hidden;
  position: relative;

  .placeholder-image {
    width: 100%;
    height: 100%;
    background: linear-gradient(
      45deg,
      var(--primary-color),
      var(--accent-color)
    );
    opacity: 0.3;
  }
}

.skills {
  padding: 5rem 0;
}

.skills-list {
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
}

.skill-card {
  background: var(--glass-bg, rgba(255, 255, 255, 0.03));
  border: 1px solid var(--glass-border, rgba(255, 255, 255, 0.08));
  border-radius: 12px;
  padding: 1.5rem 2rem;
  backdrop-filter: blur(12px);
  transition:
    opacity 0.5s ease,
    transform 0.5s ease;
  opacity: 0;
  transform: translateY(20px);

  &--visible {
    opacity: 1;
    transform: translateY(0);
  }

  &__header {
    display: flex;
    align-items: baseline;
    gap: 0.75rem;
    margin-bottom: 1rem;
    padding-bottom: 0.75rem;
    border-bottom: 1px solid var(--glass-border, rgba(255, 255, 255, 0.08));
  }

  &__title {
    font-size: 1.1rem;
    font-weight: 600;
    color: var(--text-color);
  }

  &__subtitle {
    font-size: 0.8rem;
    opacity: 0.4;
    font-weight: 400;
  }
}

.skill-group {
  display: flex;
  align-items: baseline;
  gap: 1rem;
  padding: 0.4rem 0;

  &__label {
    min-width: 160px;
    flex-shrink: 0;
    font-size: 0.75rem;
    font-weight: 500;
    text-transform: uppercase;
    letter-spacing: 0.06em;
    color: var(--primary-color);
    opacity: 0.7;
  }

  &__items {
    font-size: 0.88rem;
    opacity: 0.75;
    line-height: 1.6;
  }
}

.timeline {
  max-width: 800px;
  margin: 3rem auto;
  position: relative;

  &__line {
    position: absolute;
    left: 5px;
    width: 2px;
    height: 0;
    background: var(--primary-color);
    opacity: 0.2;
  }
}

.timeline-item {
  position: relative;
  padding-left: 28px;
  margin-bottom: 2.5rem;

  &:last-child {
    margin-bottom: 0;
  }

  &__dot {
    position: absolute;
    left: 0;
    top: 6px;
    width: 12px;
    height: 12px;
    border-radius: 50%;
    background: var(--primary-color);
    transform: scale(0);
  }

  &__content {
    opacity: 0;
  }

  &__date {
    color: var(--primary-color);
    font-size: 0.78rem;
    font-weight: 500;
    letter-spacing: 0.04em;
    margin-bottom: 0.3rem;
  }

  &__title {
    font-size: 1.1rem;
    font-weight: 600;
    margin-bottom: 0.2rem;
  }

  &__company {
    font-size: 0.82rem;
    opacity: 0.45;
    margin-bottom: 0.75rem;
  }

  &__desc {
    font-size: 0.88rem;
    opacity: 0.7;
    line-height: 1.7;
    margin-bottom: 0.75rem;
  }

  &__hl-title {
    font-size: 0.75rem;
    font-weight: 500;
    text-transform: uppercase;
    letter-spacing: 0.06em;
    color: var(--primary-color);
    opacity: 0.6;
    margin-bottom: 0.5rem;
  }

  &__list {
    list-style: none;
    padding: 0;

    li {
      position: relative;
      padding-left: 0.9rem;
      margin-bottom: 0.45rem;
      font-size: 0.85rem;
      line-height: 1.7;
      opacity: 0.7;

      &::before {
        content: "·";
        position: absolute;
        left: 0;
        color: var(--primary-color);
        font-weight: 700;
      }

      strong {
        color: var(--text-color);
        opacity: 1;
        font-weight: 600;
      }
    }
  }
}

.section-title {
  text-align: center;
  font-size: 0.85rem;
  font-weight: 500;
  margin-bottom: 2.5rem;
  color: var(--text-color);
  opacity: 0.4;
  letter-spacing: 0.15em;
  text-transform: uppercase;
}

@media (max-width: 768px) {
  .about-hero {
    &__content {
      grid-template-columns: 1fr;
      gap: 2rem;
    }
  }

  .skill-group {
    flex-direction: column;
    gap: 0.25rem;

    &__label {
      min-width: unset;
    }
  }
}
</style>
