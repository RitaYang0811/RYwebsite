<template>
  <button
    @click="scrollToTop"
    class="scroll-top"
    :class="{ 'scroll-top--visible': isVisible }"
    aria-label="回到頂部"
  >
    <div class="scroll-top__rocket">
      <div class="scroll-top__rocket-body">
        <div class="scroll-top__window"></div>
      </div>
      <div class="scroll-top__flames">
        <div class="scroll-top__flame"></div>
        <div class="scroll-top__flame"></div>
        <div class="scroll-top__flame"></div>
      </div>
    </div>
  </button>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from "vue";

const isVisible = ref(false);
let scrollTimeout: NodeJS.Timeout;

const checkScroll = () => {
  clearTimeout(scrollTimeout);

  // 顯示按鈕的條件：滾動超過視窗高度的 50%
  isVisible.value = window.scrollY > window.innerHeight * 0.3;

  // 添加節流，避免過度觸發
  scrollTimeout = setTimeout(() => {
    isVisible.value = window.scrollY > window.innerHeight * 0.3;
  }, 100);
};

const scrollToTop = () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
};

onMounted(() => {
  window.addEventListener("scroll", checkScroll);
});

onUnmounted(() => {
  window.removeEventListener("scroll", checkScroll);
});
</script>

<style lang="scss" scoped>
.scroll-top {
  position: fixed;
  bottom: 2rem;
  right: 2rem;
  background: transparent;
  border: none;
  cursor: pointer;
  opacity: 0;
  transform: translateY(20px);
  transition: all 0.3s ease;
  z-index: 1000;
  padding: 0;
  width: 60px;
  height: 60px;

  &--visible {
    opacity: 1;
    transform: translateY(0);
  }

  &:hover {
    .scroll-top__rocket {
      transform: translateY(-5px);
    }

    .scroll-top__flames {
      height: 25px;
    }
  }

  &__rocket {
    position: relative;
    transition: transform 0.3s ease;
  }

  &__rocket-body {
    width: 30px;
    height: 45px;
    background: #ff6b6b;
    margin: 0 auto;
    border-radius: 50% 50% 20% 20%;
    position: relative;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  }

  &__window {
    width: 12px;
    height: 12px;
    background: #fff;
    border-radius: 50%;
    position: absolute;
    top: 10px;
    left: 50%;
    transform: translateX(-50%);
  }

  &__flames {
    display: flex;
    justify-content: center;
    gap: 2px;
    height: 20px;
    transition: height 0.3s ease;
  }

  &__flame {
    width: 8px;
    height: 100%;
    background: #ffd93d;
    border-radius: 0 0 8px 8px;
    animation: flicker 0.3s infinite alternate;

    &:nth-child(2) {
      height: 90%;
      animation-delay: 0.1s;
    }

    &:nth-child(3) {
      height: 80%;
      animation-delay: 0.2s;
    }
  }
}

@keyframes flicker {
  0% {
    transform: scaleY(1);
  }
  100% {
    transform: scaleY(0.8);
  }
}
</style>
