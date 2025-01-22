<template>
  <div class="about">
    <section class="about-hero">
      <h1 class="about-hero__title">About Me</h1>
      <div class="about-hero__content">
        <div class="about-hero__text">
          <p class="about-hero__description">
            I'm a passionate web developer with a keen eye for design and a love
            for creating seamless user experiences. My journey in web
            development started with a curiosity for how things work on the
            internet, and it has evolved into a professional pursuit of crafting
            beautiful, functional websites.
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

    <section class="skills" ref="skillsSection">
      <h2 class="section-title">Skills & Expertise</h2>
      <div class="skills-grid">
        <div v-for="(skill, index) in skills" :key="index" class="skill-card">
          <div class="skill-card__header">
            <h3 class="skill-card__title">{{ skill.category }}</h3>
            <div class="skill-card__icon">{{ skill.icon }}</div>
          </div>
          <ul class="skill-card__list">
            <li v-for="(item, i) in skill.items" :key="i">{{ item }}</li>
          </ul>
        </div>
      </div>
    </section>

    <section class="experience">
      <h2 class="section-title">Experience</h2>
      <div class="timeline">
        <div
          v-for="(exp, index) in experience"
          :key="index"
          class="timeline-item"
        >
          <div class="timeline-item__content">
            <div class="timeline-item__date">{{ exp.period }}</div>
            <h3 class="timeline-item__title">{{ exp.role }}</h3>
            <div class="timeline-item__company">{{ exp.company }}</div>
            <p class="timeline-item__description">{{ exp.description }}</p>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const skillsSection = ref(null);

const skills = [
  {
    category: "Frontend Development",
    icon: "💻",
    items: ["Vue.js", "React", "TypeScript", "SCSS/CSS3", "Responsive Design"],
  },
  {
    category: "Backend Development",
    icon: "⚙️",
    items: ["Node.js", "Express", "RESTful APIs", "Database Design"],
  },
  {
    category: "Tools & Methods",
    icon: "🛠️",
    items: ["Git", "Webpack", "Agile/Scrum", "CI/CD"],
  },
  {
    category: "Design",
    icon: "🎨",
    items: ["UI/UX Design", "Figma", "Adobe XD", "Responsive Layouts"],
  },
];

const experience = [
  {
    period: "2022 - Present",
    role: "Senior Frontend Developer",
    company: "Tech Company",
    description:
      "Leading frontend development team, implementing modern web solutions using Vue.js and TypeScript.",
  },
  {
    period: "2020 - 2022",
    role: "Web Developer",
    company: "Digital Agency",
    description:
      "Developed responsive websites and web applications for various clients using modern technologies.",
  },
  {
    period: "2018 - 2020",
    role: "Junior Developer",
    company: "Startup",
    description:
      "Started my journey in web development, working on various frontend projects and learning modern frameworks.",
  },
];

onMounted(() => {
  // Initial animations
  const tl = gsap.timeline({ defaults: { ease: "power4.out" } });

  tl.from(".about-hero__title", {
    y: 100,
    opacity: 0,
    duration: 1,
  })
    .from(".about-hero__text", {
      x: -50,
      opacity: 0,
      duration: 0.8,
    })
    .from(
      ".image-container",
      {
        x: 50,
        opacity: 0,
        duration: 0.8,
      },
      "-=0.8"
    );

  // Skills cards animation
  gsap.from(".skill-card", {
    scrollTrigger: {
      trigger: ".skills",
      start: "top center",
      end: "bottom center",
      toggleActions: "play none none reverse",
    },
    y: 50,
    opacity: 0,
    duration: 0.8,
    stagger: 0.2,
  });

  // Timeline animation
  gsap.from(".timeline-item", {
    scrollTrigger: {
      trigger: ".timeline",
      start: "top center",
      end: "bottom center",
      toggleActions: "play none none reverse",
    },
    x: -50,
    opacity: 0,
    duration: 0.8,
    stagger: 0.3,
  });
});
</script>

<style lang="scss" scoped>
.about {
  padding: 2rem;
  max-width: 1400px;
  margin: 0 auto;
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
  }

  &__content {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 4rem;
    align-items: center;
  }

  &__description {
    font-size: 1.2rem;
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

.skills-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
}

.skill-card {
  background: rgba(255, 255, 255, 0.05);
  border-radius: 15px;
  padding: 2rem;
  transition: transform 0.3s ease;

  &:hover {
    transform: translateY(-5px);
  }

  &__header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 1.5rem;
  }

  &__title {
    font-size: 1.5rem;
    color: var(--primary-color);
  }

  &__icon {
    font-size: 2rem;
  }

  &__list {
    list-style: none;
    padding: 0;

    li {
      margin-bottom: 0.5rem;
      opacity: 0.8;

      &:before {
        content: "→";
        color: var(--primary-color);
        margin-right: 0.5rem;
      }
    }
  }
}

.timeline {
  max-width: 800px;
  margin: 4rem auto;
  position: relative;

  &:before {
    content: "";
    position: absolute;
    left: 0;
    top: 0;
    height: 100%;
    width: 2px;
    background: var(--primary-color);
    opacity: 0.3;
  }
}

.timeline-item {
  margin-bottom: 3rem;
  padding-left: 2rem;
  position: relative;

  &:before {
    content: "";
    position: absolute;
    left: -6px;
    top: 0;
    width: 14px;
    height: 14px;
    border-radius: 50%;
    background: var(--primary-color);
  }

  &__date {
    color: var(--primary-color);
    font-size: 0.9rem;
    margin-bottom: 0.5rem;
  }

  &__title {
    font-size: 1.5rem;
    margin-bottom: 0.5rem;
  }

  &__company {
    color: var(--accent-color);
    margin-bottom: 1rem;
  }

  &__description {
    opacity: 0.8;
    line-height: 1.6;
  }
}

.section-title {
  text-align: center;
  font-size: 3rem;
  margin-bottom: 4rem;
  color: var(--primary-color);
}

@media (max-width: 768px) {
  .about-hero {
    &__content {
      grid-template-columns: 1fr;
      gap: 2rem;
    }
  }

  .skills-grid {
    grid-template-columns: 1fr;
  }
}
</style>
