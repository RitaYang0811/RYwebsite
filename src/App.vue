<template>
  <div class="app" :class="{ 'light-theme': theme === 'light' }">
    <div class="cursor" ref="cursor"></div>
    <div class="cursor-follower" ref="cursorFollower"></div>

    <Nav @toggleTheme="toggleTheme" />
    <main class="main">
      <router-view v-slot="{ Component }">
        <transition name="page" mode="out-in">
          <component :is="Component" />
        </transition>
      </router-view>
    </main>
    <ScrollToTop />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted, watch } from "vue";
import gsap from "gsap";
import Nav from "./components/Nav.vue";
import ScrollToTop from "./components/ScrollToTop.vue";
const theme = ref(localStorage.getItem("theme") || "dark");
const cursor = ref<HTMLElement | null>(null);
const cursorFollower = ref<HTMLElement | null>(null);

// Theme toggle function
const toggleTheme = () => {
  theme.value = theme.value === "light" ? "dark" : "light";
  localStorage.setItem("theme", theme.value);
};

// Custom cursor movement
const onMouseMove = (e: MouseEvent) => {
  if (cursor.value && cursorFollower.value) {
    gsap.to(cursor.value, {
      x: e.clientX,
      y: e.clientY,
      duration: 0,
      ease: "none",
    });

    gsap.to(cursorFollower.value, {
      x: e.clientX,
      y: e.clientY,
      duration: 0.3,
      ease: "power2.out",
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
  gsap.from(".nav", {
    y: -100,
    opacity: 0,
    duration: 1,
    ease: "power4.out",
  });

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
  // Dark theme colors (黑底白字)
  --primary-color: #00ffd5;
  --background-color: #0a0a0a;
  --card-color: #282828;
  --text-color: #ffffff;
  --shadow-color: #303030;
  --accent-color: #ff7824;
  --tag-color: #434343;
  --nav-bg: rgba(10, 10, 10, 0.8);
  --hover-bg: rgba(255, 255, 255, 0.1);
  --cursor-color: #00ffd5;
}

.light-theme {
  // Light theme colors (白底黑字)
  --primary-color: #04ccab;
  --background-color: #ffffff;
  --card-color: #f8f8f8;
  --text-color: #0a0a0a;
  --shadow-color: #d4d4d4;
  --accent-color: #ff7824;
  --tag-color: #ededed;
  --nav-bg: rgba(255, 255, 255, 0.8);
  --hover-bg: rgba(0, 0, 0, 0.1);
  --cursor-color: #ff006f;
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
  font-family: "Inter", sans-serif;
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
