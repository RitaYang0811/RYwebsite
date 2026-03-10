<template>
  <div class="app" :class="{ 'light-theme': theme === 'light' }">
    <div class="cursor" ref="cursor"></div>
    <div class="cursor-follower" ref="cursorFollower"></div>

    <nav class="nav" :class="{ 'nav--scrolled': isScrolled }">
      <div class="nav__container">
        <router-link to="/" class="nav__logo">RY</router-link>
        <button
          class="nav__burger"
          :class="{ 'nav__burger--open': menuOpen }"
          @click="toggleMenu"
          aria-label="Toggle menu"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
        <div class="nav__links" :class="{ 'nav__links--open': menuOpen }">
          <router-link to="/" class="nav__link" @click="closeMenu"
            >Home</router-link
          >
          <router-link to="/about" class="nav__link" @click="closeMenu"
            >About</router-link
          >
          <router-link to="/projects" class="nav__link" @click="closeMenu"
            >Projects</router-link
          >
          <router-link to="/blog" class="nav__link" @click="closeMenu"
            >Blog</router-link
          >
          <router-link to="/contact" class="nav__link" @click="closeMenu"
            >Contact</router-link
          >
          <button
            class="theme-toggle"
            @click="toggleTheme"
            aria-label="Toggle theme"
          >
            <span v-if="theme === 'light'">🌞</span>
            <span v-else>🌙</span>
          </button>
        </div>
      </div>
    </nav>

    <main class="main">
      <RouterView />
    </main>

    <!-- Back to top button -->
    <Transition name="back-top">
      <button
        v-show="showBackToTop"
        class="back-to-top"
        @click="scrollToTop"
        aria-label="Back to top"
      >
        <svg
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2.5"
        >
          <path d="M18 15l-6-6-6 6" />
        </svg>
      </button>
    </Transition>

    <footer class="footer">
      <div class="footer__container">
        <div class="footer__left">
          <router-link to="/" class="footer__logo">RY</router-link>
          <p class="footer__tagline">Front-End Developer</p>
        </div>
        <nav class="footer__nav">
          <router-link to="/" class="footer__link">Home</router-link>
          <router-link to="/about" class="footer__link">About</router-link>
          <router-link to="/projects" class="footer__link"
            >Projects</router-link
          >
          <router-link to="/blog" class="footer__link">Blog</router-link>
          <router-link to="/contact" class="footer__link">Contact</router-link>
        </nav>
        <p class="footer__copy">
          &copy; {{ new Date().getFullYear() }} Rita Yang. All rights reserved.
        </p>
      </div>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted, watch } from "vue";
import { useWindowScroll } from "@vueuse/core";
import gsap from "gsap";

const { y } = useWindowScroll();
const isScrolled = ref(false);
const theme = ref(localStorage.getItem("theme") || "dark");
const menuOpen = ref(false);
const cursor = ref<HTMLElement | null>(null);
const cursorFollower = ref<HTMLElement | null>(null);

// Watch scroll position for nav styling
watch(y, (newY) => {
  isScrolled.value = newY > 50;
});

const showBackToTop = computed(() => y.value > window.innerHeight);

const scrollToTop = () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
};

// Theme toggle function
const toggleTheme = () => {
  theme.value = theme.value === "light" ? "dark" : "light";
  localStorage.setItem("theme", theme.value);
  closeMenu();
};

// Mobile menu
const toggleMenu = () => {
  menuOpen.value = !menuOpen.value;
  document.body.style.overflow = menuOpen.value ? "hidden" : "";
};

const closeMenu = () => {
  menuOpen.value = false;
  document.body.style.overflow = "";
};

// 自訂遊標移動 - 使用 gsap.set() 優化效能
const onMouseMove = (e: MouseEvent) => {
  if (cursor.value && cursorFollower.value) {
    // 主遊標使用 set() 立即更新位置，避免建立動畫
    gsap.set(cursor.value, {
      x: e.clientX,
      y: e.clientY,
    });

    // 跟隨遊標保持平滑動畫，加入 overwrite 避免動畫堆積
    gsap.to(cursorFollower.value, {
      x: e.clientX,
      y: e.clientY,
      duration: 0.3,
      ease: "power2.out",
      overwrite: "auto",
    });
  }
};

// Cursor hover effect
const onLinkHover = () => {
  if (cursor.value && cursorFollower.value) {
    cursor.value.classList.add("cursor--hover");
    cursorFollower.value.classList.add("cursor-follower--hover");
  }
};

const onLinkLeave = () => {
  if (cursor.value && cursorFollower.value) {
    cursor.value.classList.remove("cursor--hover");
    cursorFollower.value.classList.remove("cursor-follower--hover");
  }
};

// Initialize GSAP animations and cursor events
onMounted(() => {
  // Add cursor event listeners
  document.addEventListener("mousemove", onMouseMove);

  // Add hover effect to all links and buttons
  const links = document.querySelectorAll("a, button");
  links.forEach((link) => {
    link.addEventListener("mouseenter", onLinkHover);
    link.addEventListener("mouseleave", onLinkLeave);
  });
});

onUnmounted(() => {
  document.removeEventListener("mousemove", onMouseMove);

  // Remove hover effect listeners
  const links = document.querySelectorAll("a, button");
  links.forEach((link) => {
    link.removeEventListener("mouseenter", onLinkHover);
    link.removeEventListener("mouseleave", onLinkLeave);
  });
});
</script>

<style lang="scss">
:root {
  // Dark theme — minimalist tech (黑灰米白 + 少許暖紅)
  --primary-color: #e8584c;
  --background-color: #0c0c0c;
  --card-color: #1a1a1a;
  --text-color: #ece8e1;
  --accent-color: #e8584c;
  --nav-bg: rgba(12, 12, 12, 0.6);
  --card-bg: rgba(255, 255, 255, 0.03);
  --hover-bg: rgba(255, 255, 255, 0.06);
  --cursor-color: #e8584c;
  --glass-bg: rgba(255, 255, 255, 0.08);
  --glass-border: rgba(255, 255, 255, 0.1);
}

.light-theme {
  // Light theme — 米白底 + 暖紅點綴
  --primary-color: #c9463d;
  --background-color: #f5f2ed;
  --card-color: #ffffff;
  --text-color: #1a1a1a;
  --accent-color: #c9463d;
  --nav-bg: rgba(245, 242, 237, 0.6);
  --card-bg: rgba(255, 255, 255, 0.5);
  --hover-bg: rgba(0, 0, 0, 0.04);
  --cursor-color: #c9463d;
  --glass-bg: rgba(255, 255, 255, 0.5);
  --glass-border: rgba(0, 0, 0, 0.08);
}

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  cursor: none; // Hide default cursor
}

html,
body {
  background-color: var(--background-color);
  color: var(--text-color);
  transition:
    background-color 0.3s ease,
    color 0.3s ease;
}

body {
  font-family: "Inter", sans-serif;
}

.app {
  min-height: 100vh;
  background-color: var(--background-color);
  transition: background-color 0.3s ease;
}

// Custom cursor styles
.cursor {
  width: 6px;
  height: 6px;
  background: var(--cursor-color);
  border-radius: 50%;
  position: fixed;
  top: 0;
  left: 0;
  transform: translate(-50%, -50%);
  pointer-events: none;
  z-index: 9999;
  box-shadow:
    0 0 0 1.5px rgba(255, 255, 255, 0.5),
    0 0 10px rgba(232, 88, 76, 0.35);
  transition:
    width 0.25s ease,
    height 0.25s ease,
    box-shadow 0.25s ease;

  &--hover {
    width: 10px;
    height: 10px;
    box-shadow:
      0 0 0 1.5px rgba(255, 255, 255, 0.5),
      0 0 18px rgba(232, 88, 76, 0.5);
  }
}

.cursor-follower {
  width: 34px;
  height: 34px;
  border: 1px solid var(--cursor-color);
  border-radius: 50%;
  position: fixed;
  top: 0;
  left: 0;
  transform: translate(-50%, -50%);
  pointer-events: none;
  z-index: 9998;
  opacity: 0.4;
  backdrop-filter: blur(1px);
  transition:
    width 0.3s ease,
    height 0.3s ease,
    opacity 0.3s ease;

  &--hover {
    width: 50px;
    height: 50px;
    opacity: 0.25;
  }
}

.nav {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  width: 100%;
  z-index: 100;
  animation: navIn 0.8s cubic-bezier(0.16, 1, 0.3, 1) both;
  background: transparent;
  transition: all 0.3s ease;
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);

  &__container {
    max-width: 1400px;
    margin: 0 auto;
    padding: 1.5rem 2rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  &--scrolled {
    background: var(--nav-bg);
    border-bottom: 1px solid var(--glass-border);
    box-shadow: 0 1px 24px rgba(0, 0, 0, 0.12);
  }

  &__logo {
    font-size: 2rem;
    font-weight: 700;
    color: var(--primary-color);
    text-decoration: none;
    transition: transform 0.3s ease;

    &:hover {
      transform: scale(1.1);
    }
  }

  &__burger {
    display: none;
    flex-direction: column;
    justify-content: center;
    gap: 5px;
    width: 28px;
    height: 28px;
    background: none;
    border: none;
    cursor: pointer;
    padding: 0;
    span {
      display: block;
      width: 100%;
      height: 2px;
      background: var(--text-color);
      border-radius: 2px;
      transition:
        transform 0.3s ease,
        opacity 0.3s ease;
    }

    &--open {
      span:nth-child(1) {
        transform: translateY(7px) rotate(45deg);
      }
      span:nth-child(2) {
        opacity: 0;
      }
      span:nth-child(3) {
        transform: translateY(-7px) rotate(-45deg);
      }
    }
  }

  &__links {
    display: flex;
    gap: 2rem;
    align-items: center;
  }

  &__link {
    color: var(--text-color);
    text-decoration: none;
    font-weight: 500;
    font-size: 1rem;
    padding: 0.5rem;
    transition: all 0.3s ease;
    position: relative;

    &::after {
      content: "";
      position: absolute;
      bottom: 0;
      left: 0;
      width: 0;
      height: 2px;
      background-color: var(--primary-color);
      transition: width 0.3s ease;
    }

    &:hover,
    &.router-link-active {
      color: var(--primary-color);

      &::after {
        width: 100%;
      }
    }
  }
}

.theme-toggle {
  background: none;
  border: none;
  font-size: 1.5rem;
  padding: 0.5rem;
  color: var(--text-color);
  transition: all 0.3s ease;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: var(--card-bg);

  &:hover {
    transform: rotate(360deg);
    background: var(--hover-bg);
  }

  span {
    line-height: 1;
  }
}

.main {
  padding-top: 80px;
  color: var(--text-color);
}

.page-enter-active,
.page-leave-active {
  transition:
    opacity 0.5s ease,
    transform 0.5s ease;
}

.page-enter-from {
  opacity: 0;
  transform: translateY(20px);
}

.page-leave-to {
  opacity: 0;
  transform: translateY(-20px);
}

@keyframes navIn {
  from {
    transform: translateY(-100%);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
}

// ── Back to top ──
.back-to-top {
  position: fixed;
  bottom: 2rem;
  right: 2rem;
  z-index: 90;
  width: 42px;
  height: 42px;
  border-radius: 50%;
  border: 1px solid var(--glass-border);
  background: var(--glass-bg);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  color: var(--primary-color);
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition:
    background 0.25s ease,
    border-color 0.25s ease,
    transform 0.25s ease;

  &:hover {
    background: var(--primary-color);
    border-color: var(--primary-color);
    color: #fff;
    transform: translateY(-3px);
  }
}

.back-top-enter-active,
.back-top-leave-active {
  transition:
    opacity 0.3s ease,
    transform 0.3s ease;
}

.back-top-enter-from,
.back-top-leave-to {
  opacity: 0;
  transform: translateY(12px);
}

// ── Footer ──
.footer {
  border-top: none;
  padding: 3rem 2rem 2rem;
  margin-top: 4rem;
  background: var(--primary-color);

  &__container {
    max-width: 1200px;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1.25rem;
  }

  &__left {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.25rem;
  }

  &__logo {
    font-size: 1.4rem;
    font-weight: 700;
    color: #fff;
    text-decoration: none;
    transition: opacity 0.3s ease;

    &:hover {
      opacity: 0.75;
    }
  }

  &__tagline {
    font-size: 0.72rem;
    color: rgba(255, 255, 255, 0.65);
    letter-spacing: 0.08em;
  }

  &__nav {
    display: flex;
    gap: 1.5rem;
  }

  &__link {
    font-size: 0.78rem;
    color: rgba(255, 255, 255, 0.6);
    text-decoration: none;
    transition:
      opacity 0.3s ease,
      color 0.3s ease;

    &:hover {
      color: #fff;
    }
  }

  &__copy {
    font-size: 0.68rem;
    color: rgba(255, 255, 255, 0.35);
    letter-spacing: 0.04em;
  }
}

// Media query for mobile devices
@media (max-width: 768px) {
  .nav {
    &__container {
      padding: 1rem;
      position: relative;
      z-index: 2;
    }

    &__burger {
      display: flex;
    }

    &__links {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      height: 100vh;
      z-index: 1;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      gap: 2rem;
      background-color: var(--background-color);
      transform: translateY(-100%);
      transition: transform 0.4s cubic-bezier(0.4, 0, 0.2, 1);

      &--open {
        transform: translateY(0);
      }
    }

    &__link {
      font-size: 1.25rem;
      font-weight: 400;
      opacity: 0.8;

      &::after {
        display: none;
      }

      &:hover,
      &.router-link-active {
        opacity: 1;
      }
    }
  }

  .theme-toggle {
    margin-top: 1rem;
  }

  .footer__nav {
    flex-wrap: wrap;
    justify-content: center;
    gap: 1rem;
  }

  .cursor,
  .cursor-follower {
    display: none;
  }

  * {
    cursor: auto !important;
  }
}

#app {
  background-color: var(--background-color);
  min-height: 100vh;
  transition: background-color 0.3s ease;
}
</style>
