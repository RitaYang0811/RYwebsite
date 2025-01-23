<template>
  <nav
    class="nav"
    :class="{ 'nav--scrolled': isScrolled, 'nav--hidden': isHidden }"
  >
    <div class="nav__container">
      <router-link to="/" class="nav__logo">RY</router-link>

      <!-- 漢堡選單按鈕 -->
      <div class="nav__burger" @click="toggleMenu">
        <span :class="{ active: isMenuOpen }"></span>
        <span :class="{ active: isMenuOpen }"></span>
        <span :class="{ active: isMenuOpen }"></span>
      </div>

      <!-- 導航選單 -->
      <div class="nav__links" :class="{ active: isMenuOpen }">
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
</template>

<script setup lang="ts">
import { ref, watch } from "vue";
import { useWindowScroll } from "@vueuse/core";
const { y } = useWindowScroll();
const isScrolled = ref(false);
const isHidden = ref(false);
const isMenuOpen = ref(false);
const theme = ref(localStorage.getItem("theme") || "dark");

let lastScrollY = 0;
watch(y, (newY) => {
  isScrolled.value = newY > 50;
  // 確定滾動方向並更新導航欄狀態
  if (newY > lastScrollY && newY > 100) {
    // 向下滾動且超過100px時隱藏
    isHidden.value = true;
  } else {
    isHidden.value = false;
  }
  lastScrollY = newY;
});
/// - emit
const emit = defineEmits(["toggleTheme"]);
const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value;
  // 當選單打開時禁止背景滾動
  document.body.style.overflow = isMenuOpen.value ? "hidden" : "";
};

const closeMenu = () => {
  isMenuOpen.value = false;
  document.body.style.overflow = "";
  window.scrollTo(0, 0); // 滾動到頂部
};
// Theme toggle function
const toggleTheme = () => {
  theme.value = theme.value === "light" ? "dark" : "light";
  emit("toggleTheme", theme.value);
};
</script>

<style lang="scss" scoped>
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
    box-shadow: 0 2px 30px var(--shadow-color);

    .nav__container {
      padding: 1.5rem 2rem;
    }
  }
  &--hidden {
    transform: translateY(-120%);
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

    @media (max-width: 768px) {
      position: fixed;
      top: 0;
      right: -100%;
      height: 100vh;
      width: 70%;
      max-width: 300px;
      background: var(--background-color);
      backdrop-filter: blur(10px);
      flex-direction: column;
      justify-content: center;
      align-items: center;
      transition: 0.3s ease-in-out;
      padding: 2rem;
      box-shadow: 0px 0 30px var(--shadow-color);

      &.active {
        right: 0;
      }
    }
  }

  &__link {
    color: var(--text-color);
    text-decoration: none;
    font-size: 1rem;
    transition: color 0.3s ease;
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
    &.router-link-active,
    &.router-link-exact-active {
      color: var(--primary-color);

      &::after {
        width: 100%;
      }
    }

    @media (max-width: 768px) {
      font-size: 1.5rem;
    }
  }

  &__burger {
    display: none;
    flex-direction: column;
    gap: 6px;
    cursor: pointer;
    z-index: 1001;

    @media (max-width: 768px) {
      display: flex;
    }

    span {
      display: block;
      width: 25px;
      height: 3px;
      background: var(--primary-color);
      transition: 0.3s ease-in-out;

      &.active {
        &:nth-child(1) {
          transform: rotate(45deg) translate(6px, 6px);
        }

        &:nth-child(2) {
          opacity: 0;
        }

        &:nth-child(3) {
          transform: rotate(-45deg) translate(6px, -6px);
        }
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
// 添加背景遮罩
.nav__menu.active::before {
  content: "";
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  z-index: -1;
}
</style>
