<template>
  <div class="home">
    <section class="hero">
      <div class="hero__content">
        <h1 class="hero__title">
          <span class="hero__title-line">Hi, I'm</span>
          <span class="hero__title-line hero__title-line--highlight"
            >Rita Yang</span
          >
          <span class="hero__title-line">Web Developer</span>
        </h1>
        <p class="hero__subtitle">
          Crafting digital experiences with modern technology
        </p>
        <div class="hero__cta">
          <router-link to="/projects" class="button button--primary"
            >View My Work</router-link
          >
          <router-link to="/contact" class="button button--secondary"
            >Get in Touch</router-link
          >
        </div>
      </div>
      <div class="hero__background">
        <div class="hero__grid">
          <div v-for="n in 50" :key="n" class="hero__grid-item"></div>
        </div>
      </div>
    </section>

    <section class="scroll-section" ref="scrollSection">
      <div class="tech-stack">
        <h2 class="section-title">Tech Stack</h2>
        <div class="tech-items">
          <div
            v-for="(tech, index) in techStack"
            :key="index"
            class="tech-item"
          >
            <div class="tech-item__icon">{{ tech.icon }}</div>
            <div class="tech-item__name">{{ tech.name }}</div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from "vue";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const scrollSection = ref(null);

const techStack = [
  { name: "Vue.js", icon: "👑" },
  { name: "Vite", icon: "⚡" },
  { name: "TypeScript", icon: "📘" },
  { name: "GSAP", icon: "🎭" },
  { name: "CSS/SCSS", icon: "🎨" },
  { name: "Node.js", icon: "🚀" },
  { name: "Git", icon: "📦" },
  { name: "WebSocket", icon: "💭" },
  { name: "RESTful APIs", icon: "🔗" },
  { name: "Responsive Design", icon: "📱" },
];

onMounted(() => {
  // 添加小延遲確保 DOM 完全準備好
  setTimeout(() => {
    // Hero animations
    const tl = gsap.timeline({ defaults: { ease: "power4.out" } });

    tl.from(".hero__title-line", {
      y: 100,
      opacity: 0,
      duration: 1,
      stagger: 0.2,
    })
      .from(
        ".hero__subtitle",
        {
          y: 20,
          opacity: 0,
          duration: 0.8,
        },
        "-=0.5"
      )
      .from(
        ".hero__cta",
        {
          y: 20,
          opacity: 0,
          duration: 0.8,
        },
        "-=0.5"
      )
      .from(
        ".hero__grid-item",
        {
          scale: 0,
          opacity: 0,
          duration: 0.5,
          stagger: {
            amount: 1,
            grid: "auto",
            from: "center",
          },
        },
        "-=1"
      );

    // Scroll animations for tech stack
    gsap.from(".tech-item", {
      scrollTrigger: {
        trigger: ".tech-stack",
        start: "top center",
        end: "bottom top",
        toggleActions: "play none none reset",
        once: false, // 允許重複觸發
        // markers: true,
      },
      y: 100,
      opacity: 0,
      duration: 0.3,
      stagger: 0.2,
      immediateRender: false, // 防止初始渲染時的閃爍
    });
  }, 100);
});
</script>

<style lang="scss" scoped>
.home {
  min-height: 100vh;
}

.hero {
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  overflow: hidden;

  &__content {
    position: relative;
    z-index: 2;
    text-align: center;
  }

  &__title {
    font-size: 4rem;
    line-height: 1.2;
    margin-bottom: 2rem;
    mix-blend-mode: exclusion;

    &-line {
      display: block;

      &--highlight {
        color: var(--primary-color);
        font-size: 5rem;
      }
    }
  }

  &__subtitle {
    font-size: 1.5rem;
    margin-bottom: 3rem;
    opacity: 0.8;
  }
  &__cta {
    display: flex;
    justify-content: center;
    // gap: 1rem;
    margin-top: 2rem;
    @media (max-width: 576px) {
      flex-direction: column;
      align-items: center;
      gap: 1rem;
    }
  }
  &__background {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 1;
  }

  &__grid {
    display: grid;
    grid-template-columns: repeat(10, 1fr);
    height: 100%;
    gap: 1px;

    &-item {
      background: rgba(255, 255, 255, 0.03);
      transition: background 0.3s ease;

      &:hover {
        background: var(--primary-color);
        opacity: 0.1;
      }
    }
  }
}

.button {
  display: inline-block;
  margin: 0 1rem;
  padding: 1rem 2rem;
  border-radius: 30px;
  text-decoration: none;
  font-weight: 600;
  transition: all 0.3s ease;

  &--primary {
    background: var(--primary-color);
    color: var(--background-color);

    &:hover {
      transform: translateY(-3px);
      box-shadow: 0 10px 20px rgba(0, 255, 213, 0.2);
    }
  }

  &--secondary {
    border: 2px solid var(--primary-color);
    color: var(--primary-color);

    &:hover {
      background: var(--primary-color);
      color: var(--background-color);
    }
  }
}

.scroll-section {
  min-height: 100vh;
  padding: 5rem 2rem;
}

.section-title {
  text-align: center;
  font-size: 3rem;
  margin-bottom: 4rem;
  color: var(--primary-color);
}

.tech-stack {
  max-width: 1200px;
  margin: 0 auto;
}

.tech-items {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 2rem;
}

.tech-item {
  background: var(--card-color);
  padding: 2rem;
  border-radius: 15px;
  text-align: center;
  transition: all 0.3s ease;
  // opacity: 1;

  &:hover {
    transform: translateY(-10px);
    background: rgba(255, 255, 255, 0.1);
    .tech-item__icon {
      transition: all 0.3s ease;
      transform: rotate(360deg);
    }
  }

  &__icon {
    font-size: 3rem;
    margin-bottom: 1rem;
  }

  &__name {
    font-size: 1.2rem;
    color: var(--primary-color);
  }
}
</style>
