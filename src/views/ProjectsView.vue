<template>
  <div class="projects">
    <section class="projects-hero">
      <h1 class="projects-hero__title">My Projects</h1>
      <p class="projects-hero__subtitle">
        A collection of my latest work and experiments
      </p>
    </section>

    <section class="projects-grid">
      <div
        v-for="(project, index) in projects"
        :key="index"
        class="project-card"
        @mouseenter="onProjectHover(index)"
        @mouseleave="onProjectLeave(index)"
      >
        <div class="project-card__image">
          <img :src="project.image" :alt="project.title" />
          <div class="project-card__overlay">
            <a
              :href="project.liveUrl"
              target="_blank"
              class="project-card__link"
              >View Live</a
            >
            <a
              :href="project.githubUrl"
              target="_blank"
              class="project-card__link"
              >GitHub</a
            >
          </div>
        </div>
        <div class="project-card__content">
          <h3 class="project-card__title">{{ project.title }}</h3>
          <p class="project-card__description">{{ project.description }}</p>
          <div class="project-card__tags">
            <span
              v-for="(tag, tagIndex) in project.technologies"
              :key="tagIndex"
              class="project-card__tag"
            >
              {{ tag }}
            </span>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import gsap from "gsap";

// Import images
import blog1 from "@/assets/images/project-01.png";
import blog2 from "@/assets/images/project-02.png";
import blog3 from "@/assets/images/project-03.png";
import blog4 from "@/assets/images/project-04.jpg";

const projects = [
  {
    title: "E-commerce Platform",
    description:
      "A modern e-commerce platform built with Vue.js and Node.js, featuring real-time inventory management and secure payment processing.",
    image: blog1,
    technologies: ["Vue.js", "JavaScript", "Vite", "Bootstrap5"],
    liveUrl: "https://ritayang0811.github.io/greensheep/#/",
    githubUrl: "https://github.com/RitaYang0811/greensheep",
  },
  {
    title: "Team+ Communication Website",
    description:
      "A high-tech, modern, and dynamic communication platform designed for seamless team collaboration and interaction.",
    image: blog2,
    technologies: [
      "Vue.js",
      "Pinia",
      "Quasar",
      "TypeScript",
      "WebSocket",
      "WebRTC",
    ],
    liveUrl: "#",
    githubUrl: "#",
  },
  {
    title: "Portfolio Website",
    description:
      "A personal portfolio website showcasing my work and skills, built with Vue.js and GSAP animations.",
    image: blog3,
    technologies: ["Vue.js", "GSAP", "TypeScript", "SCSS"],
    liveUrl: "#",
    githubUrl: "#",
  },
  {
    title: "Weather Dashboard",
    description:
      "A weather dashboard application with dynamic data visualization and location-based forecasts.",
    image: blog4,
    technologies: ["Vue.js", "D3.js", "Weather API", "Vite"],
    liveUrl: "#",
    githubUrl: "#",
  },
];

const onProjectHover = (index: number) => {
  gsap.to(`#project-${index} .project-card__overlay`, {
    opacity: 1,
    duration: 0.3,
    ease: "power2.out",
  });
};

const onProjectLeave = (index: number) => {
  gsap.to(`#project-${index} .project-card__overlay`, {
    opacity: 0,
    duration: 0.3,
    ease: "power2.out",
  });
};

onMounted(() => {
  gsap.from(".projects-hero__title", {
    y: 100,
    opacity: 0,
    duration: 1,
    ease: "power4.out",
  });

  gsap.from(".projects-hero__subtitle", {
    y: 50,
    opacity: 0,
    duration: 1,
    delay: 0.2,
    ease: "power4.out",
  });

  //   gsap.from(".project-card", {
  //     y: 100,
  //     opacity: 0,
  //     duration: 0.8,
  //     stagger: 0.2,
  //     ease: "power4.out",
  //     scrollTrigger: {
  //       trigger: ".projects-grid",
  //       start: "top center+=100",
  //       toggleActions: "play none none reverse",
  //     },
  //   });
});
</script>

<style lang="scss" scoped>
.projects {
  padding: 2rem;
  max-width: 1400px;
  margin: 0 auto;
}

.projects-hero {
  min-height: 40vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  margin-bottom: 4rem;

  &__title {
    font-size: 4rem;
    color: var(--primary-color);
    margin-bottom: 1rem;
  }

  &__subtitle {
    font-size: 1.5rem;
    opacity: 0.8;
  }
}

.projects-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  padding: 2rem 0;
}

.project-card {
  background: var(--card-color);
  border-radius: 15px;
  overflow: hidden;
  transition: transform 0.3s ease;
  border: 1px solid #00ffd5;

  &:hover {
    transform: translateY(-10px);

    .project-card__image img {
      transform: scale(1.1);
    }
  }

  &__image {
    position: relative;
    width: 100%;
    height: 200px;
    overflow: hidden;

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      transition: transform 0.3s ease;
    }
  }

  &__overlay {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.8);
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 1rem;
    opacity: 0;
    transition: opacity 0.3s ease;
    &:hover {
      opacity: 1;
    }
  }

  &__link {
    padding: 0.8rem 1.5rem;
    background: var(--primary-color);
    color: var(--background-color);
    text-decoration: none;
    border-radius: 25px;
    font-weight: 600;
    transition: transform 0.3s ease;

    &:hover {
      transform: scale(1.1);
    }
  }

  &__content {
    padding: 1.5rem;
  }

  &__title {
    font-size: 1.5rem;
    color: var(--primary-color);
    margin-bottom: 1rem;
  }

  &__description {
    font-size: 1rem;
    line-height: 1.6;
    opacity: 0.8;
    margin-bottom: 1.5rem;
  }

  &__tags {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
  }

  &__tag {
    padding: 0.3rem 0.8rem;
    background: rgba(255, 255, 255, 0.1);
    border-radius: 15px;
    font-size: 0.9rem;
    color: var(--primary-color);
  }
}

@media (max-width: 768px) {
  .projects-hero {
    &__title {
      font-size: 3rem;
    }

    &__subtitle {
      font-size: 1.2rem;
    }
  }

  .projects-grid {
    grid-template-columns: 1fr;
  }
}
</style>
