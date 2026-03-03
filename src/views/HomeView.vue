<template>
  <div class="home">
    <section class="hero" ref="heroSection">
      <canvas ref="dotCanvas" class="hero__dots"></canvas>
      <div class="hero__content">
        <h1 class="hero__title">
          <span class="hero__title-line"
            >Hi <span class="wave-emoji">👋</span>, I'm</span
          >
          <span class="hero__title-line hero__title-line--highlight"
            >Rita Yang</span
          >
          <span class="hero__title-line">Front-End Developer</span>
        </h1>
        <p class="hero__subtitle">
          Crafting seamless digital experiences through modern architecture and
          clean code.
        </p>
        <div class="hero__cta">
          <router-link to="/projects" class="button button--primary"
            >Explore My Projects</router-link
          >
          <router-link to="/contact" class="button button--secondary"
            >Get in Touch</router-link
          >
        </div>
      </div>
    </section>

    <section class="scroll-section">
      <div class="tech-stack">
        <h2 class="section-title">Tech Stack</h2>
        <div class="tech-items">
          <div
            v-for="(tech, index) in techStack"
            :key="index"
            class="tech-chip"
          >
            <TechIcon :name="tech.icon" :size="24" />
            <span class="tech-chip__name">{{ tech.name }}</span>
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
import TechIcon from "@/components/TechIcon.vue";

gsap.registerPlugin(ScrollTrigger);

const dotCanvas = ref<HTMLCanvasElement | null>(null);
const heroSection = ref<HTMLElement | null>(null);

const techStack = [
  { name: "Nuxt.js", icon: "nuxt" },
  { name: "Vue.js", icon: "vue" },
  { name: "Vite", icon: "vite" },
  { name: "Pinia", icon: "pinia" },
  { name: "TypeScript", icon: "typescript" },
  { name: "HTML5", icon: "html" },
  { name: "JavaScript", icon: "javascript" },
  { name: "CSS", icon: "css" },
  { name: "Sass", icon: "sass" },
  { name: "Git", icon: "git" },
  { name: "WebSocket", icon: "websocket" },
  { name: "WebRTC", icon: "webrtc" },
  { name: "Responsive Design", icon: "responsive" },
];

let animFrameId = 0;
const cleanupFns: (() => void)[] = [];

onMounted(() => {
  // ── Interactive dot canvas ──
  const canvas = dotCanvas.value;
  const hero = heroSection.value;

  if (canvas && hero) {
    const ctx = canvas.getContext("2d");
    if (ctx) {
      // Target = actual mouse position; lerped = smoothly follows target
      let targetX = -1000;
      let targetY = -1000;
      let mouseX = -1000;
      let mouseY = -1000;

      const setSize = () => {
        const dpr = window.devicePixelRatio || 1;
        const rect = canvas.getBoundingClientRect();
        canvas.width = rect.width * dpr;
        canvas.height = rect.height * dpr;
        ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      };

      setSize();
      const onResize = () => setSize();
      window.addEventListener("resize", onResize);
      cleanupFns.push(() => window.removeEventListener("resize", onResize));

      const GAP = 20;
      const BASE_SIZE = 1.2;
      const EFFECT_RADIUS = 130;
      const LERP_SPEED = 0.07;

      const onMove = (e: MouseEvent) => {
        const rect = canvas.getBoundingClientRect();
        targetX = e.clientX - rect.left;
        targetY = e.clientY - rect.top;
      };
      const onLeave = () => {
        targetX = -1000;
        targetY = -1000;
      };

      hero.addEventListener("mousemove", onMove);
      hero.addEventListener("mouseleave", onLeave);
      cleanupFns.push(() => {
        hero.removeEventListener("mousemove", onMove);
        hero.removeEventListener("mouseleave", onLeave);
      });

      const draw = () => {
        // Lerp mouse position toward target for drag/trail feel
        mouseX += (targetX - mouseX) * LERP_SPEED;
        mouseY += (targetY - mouseY) * LERP_SPEED;

        const w = canvas.offsetWidth;
        const h = canvas.offsetHeight;
        ctx.clearRect(0, 0, w, h);

        const cols = Math.ceil(w / GAP) + 1;
        const rows = Math.ceil(h / GAP) + 1;
        const oX = (w - (cols - 1) * GAP) / 2;
        const oY = (h - (rows - 1) * GAP) / 2;

        for (let i = 0; i < cols; i++) {
          for (let j = 0; j < rows; j++) {
            const x = oX + i * GAP;
            const y = oY + j * GAP;
            const dx = mouseX - x;
            const dy = mouseY - y;
            const dist = Math.sqrt(dx * dx + dy * dy);

            if (dist < EFFECT_RADIUS) {
              const t = 1 - dist / EFFECT_RADIUS;
              const eased = t * t * (3 - 2 * t); // smoothstep

              // 3D bulge: size peaks at center, pushes outward at edges
              const size = BASE_SIZE + eased * 5;
              const opacity = 0.1 + eased * 0.82;

              // Warm red/coral tint near mouse
              const r = Math.round(100 + eased * 132);
              const g = Math.round(100 - eased * 12);
              const b = Math.round(100 - eased * 24);

              ctx.beginPath();
              ctx.arc(x, y, size, 0, Math.PI * 2);
              ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${opacity})`;
              ctx.fill();

              // Glow ring for outermost bulge dots
              if (eased > 0.3) {
                ctx.beginPath();
                ctx.arc(x, y, size + 2, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${eased * 0.08})`;
                ctx.fill();
              }
            } else {
              ctx.beginPath();
              ctx.arc(x, y, BASE_SIZE, 0, Math.PI * 2);
              ctx.fillStyle = "rgba(128, 128, 128, 0.1)";
              ctx.fill();
            }
          }
        }

        animFrameId = requestAnimationFrame(draw);
      };

      draw();
      cleanupFns.push(() => cancelAnimationFrame(animFrameId));
    }
  }

  // ── Hero text animations ──
  const tl = gsap.timeline({ defaults: { ease: "power4.out" } });
  tl.from(".hero__title-line", {
    y: 100,
    opacity: 0,
    duration: 1,
    stagger: 0.2,
  })
    .from(".hero__subtitle", { y: 20, opacity: 0, duration: 0.8 }, "-=0.5")
    .from(".hero__cta", { y: 20, opacity: 0, duration: 0.8 }, "-=0.5");

  // ── Tech chip entrance ──
  const chips = document.querySelectorAll(".tech-chip");
  ScrollTrigger.create({
    trigger: ".tech-stack",
    start: "top 85%",
    onEnter: () => {
      chips.forEach((chip, i) => {
        setTimeout(() => chip.classList.add("tech-chip--visible"), i * 60);
      });
    },
  });
});

onUnmounted(() => {
  cleanupFns.forEach((fn) => fn());
  ScrollTrigger.getAll().forEach((t) => t.kill());
});
</script>

<style lang="scss" scoped>
.home {
  min-height: 100vh;
}

// ── Hero ──
.hero {
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  overflow: hidden;

  &__dots {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    z-index: 1;
  }

  &__content {
    position: relative;
    z-index: 2;
    text-align: center;
    padding: 0 2rem;
  }

  &__title {
    font-size: 3.5rem;
    line-height: 1.2;
    margin-bottom: 1.5rem;
    font-weight: 300;
    letter-spacing: -0.02em;

    &-line {
      display: block;

      &--highlight {
        color: var(--primary-color);
        font-size: 4.5rem;
        font-weight: 700;
        letter-spacing: -0.03em;
      }
    }
  }

  &__subtitle {
    font-size: 1.1rem;
    margin-bottom: 2.5rem;
    opacity: 0.5;
    max-width: 480px;
    margin-left: auto;
    margin-right: auto;
    font-weight: 300;
  }
}

// ── Buttons ──
.button {
  display: inline-block;
  padding: 0.75rem 1.6rem;
  border-radius: 8px;
  text-decoration: none;
  font-weight: 500;
  font-size: 0.9rem;
  transition: all 0.3s ease;
  margin: 0 0.5rem;

  &--primary {
    background: var(--primary-color);
    color: #fff;

    &:hover {
      transform: translateY(-2px);
      box-shadow: 0 8px 24px rgba(232, 88, 76, 0.25);
    }
  }

  &--secondary {
    border: 1px solid var(--glass-border);
    color: var(--text-color);
    background: var(--glass-bg);
    backdrop-filter: blur(12px);

    &:hover {
      border-color: var(--primary-color);
      color: var(--primary-color);
    }
  }
}

// ── Tech Stack ──
.scroll-section {
  padding: 5rem 2rem 6rem;
}

.section-title {
  text-align: center;
  font-size: 0.85rem;
  font-weight: 500;
  margin-bottom: 2rem;
  color: var(--text-color);
  opacity: 0.4;
  letter-spacing: 0.15em;
  text-transform: uppercase;
}

.tech-stack {
  max-width: 720px;
  margin: 0 auto;
}

.tech-items {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 0.6rem;
}

.tech-chip {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.45rem 0.9rem;
  background: var(--glass-bg);
  border: 1px solid var(--glass-border);
  border-radius: 8px;
  backdrop-filter: blur(12px);
  font-size: 0.82rem;
  color: var(--text-color);
  opacity: 0;
  transform: translateY(12px);
  transition:
    opacity 0.4s ease,
    transform 0.4s ease,
    border-color 0.3s ease,
    background 0.3s ease;

  &--visible {
    opacity: 1;
    transform: translateY(0);
  }

  &:hover {
    border-color: var(--primary-color);
    background: var(--hover-bg);
    transform: translateY(-2px);
  }

  &__name {
    font-weight: 500;
    white-space: nowrap;
  }
}

// ── Wave emoji ──
.wave-emoji {
  display: inline-block;
  transform-origin: 70% 70%;
  animation: wave 2.2s ease-in-out 1.2s 2;

  &:hover {
    animation: wave 1s ease-in-out infinite;
  }
}

@keyframes wave {
  0%,
  100% {
    transform: rotate(0deg);
  }
  10% {
    transform: rotate(14deg);
  }
  20% {
    transform: rotate(-8deg);
  }
  30% {
    transform: rotate(14deg);
  }
  40% {
    transform: rotate(-4deg);
  }
  50% {
    transform: rotate(10deg);
  }
  60%,
  100% {
    transform: rotate(0deg);
  }
}

// ── Responsive ──
@media (max-width: 768px) {
  .hero {
    &__title {
      font-size: 2.5rem;

      &-line--highlight {
        font-size: 3rem;
      }
    }

    &__subtitle {
      font-size: 1rem;
    }
  }

  .button {
    padding: 0.65rem 1.2rem;
    font-size: 0.85rem;
    margin: 0 0.25rem;
  }
}
</style>
