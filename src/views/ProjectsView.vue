<template>
  <div class="projects">
    <section class="projects-hero">
      <h1 class="projects-hero__title">My Projects</h1>
      <p class="projects-hero__subtitle">
        A collection of my latest work and experiments
      </p>
    </section>

    <div class="projects-grid">
      <div
        v-for="(project, index) in projects"
        :key="index"
        class="project-card"
        :style="{ '--i': index }"
        @click="openModal(project)"
      >
        <div class="project-card__image">
          <img :src="project.image" :alt="project.title" />
        </div>
        <div class="project-card__content">
          <h3 class="project-card__title">{{ project.title }}</h3>
          <p class="project-card__desc">{{ project.description }}</p>
          <div class="project-card__tags">
            <span
              v-for="tag in project.technologies.slice(0, 3)"
              :key="tag"
              class="project-card__tag"
            >
              {{ tag }}
            </span>
            <span
              v-if="project.technologies.length > 3"
              class="project-card__tag project-card__tag--more"
            >
              +{{ project.technologies.length - 3 }}
            </span>
          </div>
        </div>
      </div>
    </div>

    <!-- Modal -->
    <Transition name="modal">
      <div
        v-if="selectedProject"
        class="modal-backdrop"
        @click.self="closeModal"
      >
        <div class="modal">
          <button class="modal__close" @click="closeModal">&times;</button>
          <div class="modal__image">
            <img :src="selectedProject.image" :alt="selectedProject.title" />
          </div>
          <div class="modal__body">
            <h2 class="modal__title">{{ selectedProject.title }}</h2>
            <p class="modal__desc">{{ selectedProject.description }}</p>
            <div class="modal__tags">
              <span
                v-for="tag in selectedProject.technologies"
                :key="tag"
                class="modal__tag"
              >
                {{ tag }}
              </span>
            </div>
            <div
              v-if="selectedProject.liveUrl || selectedProject.githubUrl"
              class="modal__actions"
            >
              <a
                v-if="selectedProject.liveUrl"
                :href="selectedProject.liveUrl"
                target="_blank"
                class="modal__btn modal__btn--primary"
              >
                View Live
              </a>
              <a
                v-if="selectedProject.githubUrl"
                :href="selectedProject.githubUrl"
                target="_blank"
                class="modal__btn modal__btn--secondary"
              >
                Source Code
              </a>
            </div>
          </div>
        </div>
      </div>
    </Transition>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from "vue";
import gsap from "gsap";

import project1 from "@/assets/images/project-01.png";
import project2 from "@/assets/images/project-02.png";
import project3 from "@/assets/images/project-03.png";
import project4 from "@/assets/images/project-04.jpg";

interface Project {
  title: string;
  description: string;
  image: string;
  technologies: string[];
  liveUrl: string;
  githubUrl: string;
}

const selectedProject = ref<Project | null>(null);

const projects: Project[] = [
  {
    title: "綠羊珠寶 GreenSheep｜品牌電商網站",
    description:
      "規劃與開發自有品牌「綠羊珠寶 GreenSheep」完整電商網站。本專案涵蓋前後台功能，支援商品展示、客製化設計、購物流程與後台管理，整體以優雅且一致的視覺風格呈現品牌精神。網站前後台皆採用 RWD 設計，最小支援 375px 行動裝置螢幕尺寸，提供完整且一致的使用體驗。",
    image: project1,
    technologies: ["Vue.js", "JavaScript", "Vite", "Bootstrap5"],
    liveUrl: "https://ritayang0811.github.io/greensheep/#/",
    githubUrl: "https://github.com/RitaYang0811/greensheep",
  },
  {
    title: "Team+｜企業及通訊平台",
    description:
      "Team+ 為企業內部使用的即時通訊與協作平台，提供即時交談、線上會議、團隊互動與企業通訊錄等功能。本專案為既有系統的前端重寫與功能擴充，著重於可維護性、即時性與後續擴展能力。",
    image: project2,
    technologies: [
      "Vue.js",
      "Pinia",
      "Quasar",
      "TypeScript",
      "WebSocket",
      "WebRTC",
    ],
    liveUrl: "",
    githubUrl: "",
  },
  {
    title: "Life Light｜家飾電商網頁",
    description:
      "前台為一頁式電商網頁，可進行瀏覽及下單流程，後台可顯示商品營收比重圖表。",
    image: project3,
    technologies: ["Vue.js", "C3.js", "JavaScript", "SCSS"],
    liveUrl: "https://ritayang0811.github.io/js_finalProject/",
    githubUrl: "",
  },
  {
    title: "Weather Dashboard",
    description:
      "A weather dashboard application with dynamic data visualization and location-based forecasts.",
    image: project4,
    technologies: ["Vue.js", "D3.js", "Weather API", "Vite"],
    liveUrl: "",
    githubUrl: "",
  },
];

const openModal = (project: Project) => {
  selectedProject.value = project;
};

const closeModal = () => {
  selectedProject.value = null;
};

const onKeydown = (e: KeyboardEvent) => {
  if (e.key === "Escape") closeModal();
};

onMounted(() => {
  document.addEventListener("keydown", onKeydown);

  gsap.from(".projects-hero__title", {
    y: 60,
    opacity: 0,
    duration: 0.8,
    ease: "power4.out",
  });
  gsap.from(".projects-hero__subtitle", {
    y: 30,
    opacity: 0,
    duration: 0.8,
    delay: 0.15,
    ease: "power4.out",
  });
});

onUnmounted(() => {
  document.removeEventListener("keydown", onKeydown);
});
</script>

<style lang="scss" scoped>
.projects {
  padding: 2rem;
  max-width: 1200px;
  margin: 0 auto;
}

// ── Hero ──
.projects-hero {
  min-height: 30vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  margin-bottom: 3rem;

  &__title {
    font-size: 3rem;
    font-weight: 300;
    color: var(--text-color);
    margin-bottom: 0.5rem;
    letter-spacing: -0.02em;
  }

  &__subtitle {
    font-size: 1rem;
    opacity: 0.45;
  }
}

// ── Grid ──
.projects-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1.25rem;
}

// ── Card ──
.project-card {
  background: var(--glass-bg, rgba(255, 255, 255, 0.03));
  border: 1px solid var(--glass-border, rgba(255, 255, 255, 0.08));
  border-radius: 10px;
  overflow: hidden;
  cursor: pointer;
  transition:
    transform 0.3s ease,
    border-color 0.3s ease;
  animation: cardIn 0.45s ease both;
  animation-delay: calc(var(--i, 0) * 0.1s);

  &:hover {
    transform: translateY(-4px);
    border-color: var(--primary-color);

    .project-card__image img {
      transform: scale(1.04);
    }
  }

  &__image {
    width: 100%;
    height: 180px;
    overflow: hidden;

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      transition: transform 0.4s ease;
    }
  }

  &__content {
    padding: 1rem 1.1rem;
  }

  &__title {
    font-size: 1rem;
    font-weight: 600;
    color: var(--text-color);
    margin-bottom: 0.35rem;
    line-height: 1.4;
  }

  &__desc {
    font-size: 0.8rem;
    line-height: 1.6;
    opacity: 0.5;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
    margin-bottom: 0.75rem;
  }

  &__tags {
    display: flex;
    flex-wrap: wrap;
    gap: 0.35rem;
  }

  &__tag {
    padding: 0.2rem 0.5rem;
    background: var(--glass-bg, rgba(255, 255, 255, 0.03));
    border: 1px solid var(--glass-border, rgba(255, 255, 255, 0.08));
    border-radius: 4px;
    font-size: 0.68rem;
    opacity: 0.5;
    letter-spacing: 0.02em;

    &--more {
      opacity: 0.35;
      font-style: italic;
    }
  }
}

@keyframes cardIn {
  from {
    opacity: 0;
    transform: translateY(16px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

// ── Modal ──
.modal-backdrop {
  position: fixed;
  inset: 0;
  z-index: 200;
  background: rgba(0, 0, 0, 0.6);
  backdrop-filter: blur(8px);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem;
}

.modal {
  position: relative;
  max-width: 700px;
  width: 100%;
  max-height: 90vh;
  overflow-y: auto;
  background: var(--card-color, #1a1a1a);
  border: 1px solid var(--glass-border, rgba(255, 255, 255, 0.08));
  border-radius: 12px;

  // hide scrollbar
  &::-webkit-scrollbar {
    width: 0;
  }

  &__close {
    position: absolute;
    top: 0.75rem;
    right: 0.75rem;
    z-index: 2;
    width: 32px;
    height: 32px;
    display: flex;
    align-items: center;
    justify-content: center;
    border: none;
    border-radius: 50%;
    background: rgba(0, 0, 0, 0.5);
    backdrop-filter: blur(4px);
    color: #fff;
    font-size: 1.25rem;
    cursor: pointer;
    transition:
      background 0.25s ease,
      transform 0.25s ease;

    &:hover {
      background: rgba(0, 0, 0, 0.7);
      transform: scale(1.1);
    }
  }

  &__image {
    width: 100%;
    height: 320px;
    overflow: hidden;

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      object-position: top;
    }
  }

  &__body {
    padding: 1.5rem 1.75rem 2rem;
  }

  &__title {
    font-size: 1.4rem;
    font-weight: 600;
    color: var(--text-color);
    margin-bottom: 0.75rem;
    line-height: 1.3;
  }

  &__desc {
    font-size: 0.88rem;
    line-height: 1.7;
    opacity: 0.65;
    margin-bottom: 1.25rem;
  }

  &__tags {
    display: flex;
    flex-wrap: wrap;
    gap: 0.4rem;
    margin-bottom: 1.5rem;
  }

  &__tag {
    padding: 0.25rem 0.6rem;
    background: var(--glass-bg, rgba(255, 255, 255, 0.03));
    border: 1px solid var(--glass-border, rgba(255, 255, 255, 0.08));
    border-radius: 4px;
    font-size: 0.72rem;
    opacity: 0.6;
    letter-spacing: 0.02em;
  }

  &__actions {
    display: flex;
    gap: 0.75rem;
  }

  &__btn {
    display: inline-block;
    padding: 0.55rem 1.2rem;
    border-radius: 8px;
    text-decoration: none;
    font-size: 0.82rem;
    font-weight: 500;
    transition:
      transform 0.3s ease,
      box-shadow 0.3s ease;

    &:hover {
      transform: translateY(-2px);
    }

    &--primary {
      background: var(--primary-color);
      color: #fff;

      &:hover {
        box-shadow: 0 8px 24px rgba(232, 88, 76, 0.25);
      }
    }

    &--secondary {
      border: 1px solid var(--glass-border);
      color: var(--text-color);
      background: var(--glass-bg);

      &:hover {
        border-color: var(--primary-color);
        color: var(--primary-color);
      }
    }
  }
}

// ── Modal transition ──
.modal-enter-active,
.modal-leave-active {
  transition:
    opacity 0.25s ease,
    transform 0.25s ease;
}

.modal-enter-active .modal,
.modal-leave-active .modal {
  transition: transform 0.25s ease;
}

.modal-enter-from,
.modal-leave-to {
  opacity: 0;

  .modal {
    transform: scale(0.95);
  }
}

// ── Responsive ──
@media (max-width: 768px) {
  .projects-hero__title {
    font-size: 2.2rem;
  }

  .projects-grid {
    grid-template-columns: 1fr;
  }

  .modal-backdrop {
    padding: 1rem;
  }

  .modal {
    max-height: 85vh;

    &__image {
      height: 200px;
    }
  }
}
</style>
