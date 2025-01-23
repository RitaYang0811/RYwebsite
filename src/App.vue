<template>
  <div class="app" :class="{ 'light-theme': theme === 'light' }">
    <div class="cursor" ref="cursor"></div>
    <div class="cursor-follower" ref="cursorFollower"></div>

    <nav class="nav" :class="{ 'nav--scrolled': isScrolled }">
      <div class="nav__container">
        <router-link to="/" class="nav__logo">RY</router-link>
        <div class="nav__links">
          <router-link to="/" class="nav__link">Home</router-link>
          <router-link to="/about" class="nav__link">About</router-link>
          <router-link to="/projects" class="nav__link">Projects</router-link>
          <router-link to="/blog" class="nav__link">Blog</router-link>
          <router-link to="/contact" class="nav__link">Contact</router-link>
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
      <!-- <router-view v-slot="{ Component }">
        <transition name="page" mode="out-in">
          <component :is="Component" />
        </transition>
      </router-view> -->
    </main>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted, watch } from 'vue';
import { useWindowScroll } from '@vueuse/core';
import gsap from 'gsap';

const { y } = useWindowScroll();
const isScrolled = ref(false);
const theme = ref(localStorage.getItem('theme') || 'dark');
const cursor = ref<HTMLElement | null>(null);
const cursorFollower = ref<HTMLElement | null>(null);

// Watch scroll position for nav styling
watch(y, (newY) => {
  isScrolled.value = newY > 50;
});

// Theme toggle function
const toggleTheme = () => {
  theme.value = theme.value === 'light' ? 'dark' : 'light';
  localStorage.setItem('theme', theme.value);
};

// Custom cursor movement
const onMouseMove = (e: MouseEvent) => {
  if (cursor.value && cursorFollower.value) {
    gsap.to(cursor.value, {
      x: e.clientX,
      y: e.clientY,
      duration: 0,
      ease: 'none',
    });

    gsap.to(cursorFollower.value, {
      x: e.clientX,
      y: e.clientY,
      duration: 0.3,
      ease: 'power2.out',
    });
  }
};

// Cursor hover effect
const onLinkHover = () => {
  if (cursor.value && cursorFollower.value) {
    cursor.value.classList.add('cursor--hover');
    cursorFollower.value.classList.add('cursor-follower--hover');
  }
};

const onLinkLeave = () => {
  if (cursor.value && cursorFollower.value) {
    cursor.value.classList.remove('cursor--hover');
    cursorFollower.value.classList.remove('cursor-follower--hover');
  }
};

// Initialize GSAP animations and cursor events
onMounted(() => {
  gsap.from('.nav', {
    y: -100,
    opacity: 0,
    duration: 1,
    ease: 'power4.out',
  });

  // Add cursor event listeners
  document.addEventListener('mousemove', onMouseMove);

  // Add hover effect to all links and buttons
  const links = document.querySelectorAll('a, button');
  links.forEach((link) => {
    link.addEventListener('mouseenter', onLinkHover);
    link.addEventListener('mouseleave', onLinkLeave);
  });
});

onUnmounted(() => {
  document.removeEventListener('mousemove', onMouseMove);

  // Remove hover effect listeners
  const links = document.querySelectorAll('a, button');
  links.forEach((link) => {
    link.removeEventListener('mouseenter', onLinkHover);
    link.removeEventListener('mouseleave', onLinkLeave);
  });
});
</script>

<style lang="scss">
:root {
  // Dark theme colors (黑底白字)
  --primary-color: #00ffd5;
  --background-color: #0a0a0a;
  --card-color: #282828;
  --text-color: #ffffff;
  --accent-color: #ff7824;
  --nav-bg: rgba(10, 10, 10, 0.8);
  --card-bg: rgba(255, 255, 255, 0.05);
  --hover-bg: rgba(255, 255, 255, 0.1);
  --cursor-color: #00ffd5;
}

.light-theme {
  // Light theme colors (白底黑字)
  --primary-color: #04ccab;
  --background-color: #ffffff;
  --card-color: #f8f8f8;
  --text-color: #0a0a0a;
  --accent-color: #ff7824;
  --nav-bg: rgba(255, 255, 255, 0.8);
  --card-bg: rgba(0, 0, 0, 0.05);
  --hover-bg: rgba(0, 0, 0, 0.1);
  --cursor-color: #00ffd5;
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
  transition: background-color 0.3s ease, color 0.3s ease;
}

body {
  font-family: 'Inter', sans-serif;
}

.app {
  min-height: 100vh;
  background-color: var(--background-color);
  transition: background-color 0.3s ease;
}

// Custom cursor styles
.cursor {
  width: 8px;
  height: 8px;
  background: var(--cursor-color);
  border-radius: 50%;
  position: fixed;
  top: 0;
  left: 0;
  transform: translate(-50%, -50%);
  pointer-events: none;
  z-index: 9999;
  mix-blend-mode: exclusion;

  &--hover {
    transform: translate(-50%, -50%) scale(1.5);
  }
}

.cursor-follower {
  width: 40px;
  height: 40px;
  border: 2px solid var(--cursor-color);
  border-radius: 50%;
  position: fixed;
  top: 0;
  left: 0;
  transform: translate(-50%, -50%);
  pointer-events: none;
  z-index: 9998;
  opacity: 0.6;
  mix-blend-mode: exclusion;

  &--hover {
    transform: translate(-50%, -50%) scale(1.8);
    opacity: 0.8;
  }
}

.nav {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  width: 100%;
  z-index: 100;
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
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);

    .nav__container {
      padding: 1rem 2rem;
    }
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
      content: '';
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
  transition: opacity 0.5s ease, transform 0.5s ease;
}

.page-enter-from {
  opacity: 0;
  transform: translateY(20px);
}

.page-leave-to {
  opacity: 0;
  transform: translateY(-20px);
}

// Media query for mobile devices
@media (max-width: 768px) {
  .nav {
    &__container {
      padding: 1rem;
    }

    &__links {
      gap: 1rem;
    }

    &__link {
      font-size: 0.9rem;
    }
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
