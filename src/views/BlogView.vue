<template>
  <div class="blog">
    <section class="blog-hero">
      <h1 class="blog-hero__title">Technical Blog</h1>
      <p class="blog-hero__subtitle">
        Sharing knowledge and experiences in web development
      </p>
    </section>

    <section class="blog-categories">
      <button
        v-for="category in categories"
        :key="category"
        :class="['category-btn', { active: selectedCategory === category }]"
        @click="filterByCategory(category)"
      >
        {{ category }}
      </button>
    </section>

    <section class="blog-grid">
      <article
        v-for="(post, index) in filteredPosts"
        :key="index"
        class="blog-card"
        @mouseenter="onPostHover(index)"
        @mouseleave="onPostLeave(index)"
      >
        <div class="blog-card__image">
          <img :src="post.image" :alt="post.title" />
          <div class="blog-card__category">{{ post.category }}</div>
        </div>
        <div class="blog-card__content">
          <div class="blog-card__meta">
            <span class="blog-card__date">{{ post.date }}</span>
            <span class="blog-card__read-time"
              >{{ post.readTime }} min read</span
            >
          </div>
          <h2 class="blog-card__title">{{ post.title }}</h2>
          <p class="blog-card__excerpt">{{ post.excerpt }}</p>
          <router-link :to="post.link" class="blog-card__link"
            >Read More →</router-link
          >
        </div>
      </article>
    </section>

    <div class="pagination">
      <button
        class="pagination__btn"
        :disabled="currentPage === 1"
        @click="prevPage"
      >
        ← Previous
      </button>
      <span class="pagination__current">Page {{ currentPage }}</span>
      <button
        class="pagination__btn"
        :disabled="currentPage === totalPages"
        @click="nextPage"
      >
        Next →
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from "vue";
import gsap from "gsap";

// Import images
import blog1 from "@/assets/images/blog-01.jpg";
import blog2 from "@/assets/images/blog-02.jpg";
import blog3 from "@/assets/images/blog-03.jpg";
import blog4 from "@/assets/images/blog-04.jpg";

const categories = [
  "All",
  "Vue.js",
  "TypeScript",
  "Web Performance",
  "UI/UX",
  "DevOps",
];
const selectedCategory = ref("All");
const currentPage = ref(1);
const postsPerPage = 6;

const posts = [
  {
    title: "Building Scalable Vue.js Applications",
    excerpt:
      "Learn how to structure large-scale Vue.js applications with best practices and proven patterns.",
    image: blog1,
    category: "Vue.js",
    date: "March 15, 2024",
    readTime: 8,
    link: "/blog/scalable-vue-apps",
  },
  {
    title: "Advanced TypeScript Patterns",
    excerpt:
      "Explore advanced TypeScript patterns and techniques to write more maintainable code.",
    image: blog2,
    category: "TypeScript",
    date: "March 10, 2024",
    readTime: 12,
    link: "/blog/typescript-patterns",
  },
  {
    title: "Optimizing Web Performance",
    excerpt:
      "Tips and techniques for improving your website's loading speed and performance.",
    image: blog3,
    category: "Web Performance",
    date: "March 5, 2024",
    readTime: 10,
    link: "/blog/web-performance",
  },
  {
    title: "Modern UI/UX Design Principles",
    excerpt:
      "Understanding modern design principles and how to apply them in web development.",
    image: blog4,
    category: "UI/UX",
    date: "March 1, 2024",
    readTime: 7,
    link: "/blog/design-principles",
  },
];

const filteredPosts = computed(() => {
  const filtered =
    selectedCategory.value === "All"
      ? posts
      : posts.filter((post) => post.category === selectedCategory.value);

  const start = (currentPage.value - 1) * postsPerPage;
  const end = start + postsPerPage;
  return filtered.slice(start, end);
});

const totalPages = computed(() => {
  const filtered =
    selectedCategory.value === "All"
      ? posts
      : posts.filter((post) => post.category === selectedCategory.value);
  return Math.ceil(filtered.length / postsPerPage);
});

const filterByCategory = (category: string) => {
  selectedCategory.value = category;
  currentPage.value = 1;
  animateCards();
};

const prevPage = () => {
  if (currentPage.value > 1) {
    currentPage.value--;
    animateCards();
  }
};

const nextPage = () => {
  if (currentPage.value < totalPages.value) {
    currentPage.value++;
    animateCards();
  }
};

const animateCards = () => {
  gsap.from(".blog-card", {
    y: 200,
    duration: 1,
    stagger: 0.2,
    delay: 0.2,
    ease: "power4.out",
    scrollTrigger: {
      // markers: true,
      trigger: ".blog-grid",
      start: "top 80%",
      end: "bottom top",
      toggleActions: "play none none reset",
    },
    immediateRender: false,
  });
};

const onPostHover = (index: number) => {
  gsap.to(`#post-${index}`, {
    y: -10,
    duration: 0.3,
    ease: "power2.out",
  });
};

const onPostLeave = (index: number) => {
  gsap.to(`#post-${index}`, {
    y: 0,
    duration: 0.3,
    ease: "power2.out",
  });
};

onMounted(() => {
  gsap.from(".blog-hero__title", {
    y: 100,
    opacity: 0,
    duration: 1,
    ease: "power4.out",
  });

  gsap.from(".blog-hero__subtitle", {
    y: 50,
    opacity: 0,
    duration: 1,
    delay: 0.2,
    ease: "power4.out",
  });

  gsap.from(".category-btn", {
    y: 30,
    opacity: 0,
    duration: 0.6,
    // stagger: 0.1,
    ease: "power3.out",
  });

  animateCards();
});
</script>

<style lang="scss" scoped>
.blog {
  padding: 2rem;
  max-width: 1400px;
  margin: 0 auto;
}

.blog-hero {
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

.blog-categories {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 1rem;
  margin-bottom: 4rem;
}

.category-btn {
  padding: 0.8rem 1.5rem;
  border: 2px solid var(--primary-color);
  background: var(--card-color);
  color: var(--text-color);
  border-radius: 25px;
  cursor: pointer;
  transition: all 0.3s ease;
  font-weight: 600;

  &:hover,
  &.active {
    background: var(--primary-color);
    color: var(--background-color);
    transform: translateY(-2px);
    box-shadow: 0 5px 15px rgba(0, 255, 213, 0.2);
  }
}

.blog-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  margin-bottom: 4rem;
}

.blog-card {
  background: var(--card-color);
  border-radius: 15px;
  overflow: hidden;
  transition: transform 0.3s ease;

  &:hover {
    transform: translateY(-10px);
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

  &__category {
    position: absolute;
    top: 1rem;
    right: 1rem;
    padding: 0.5rem 1rem;
    background: var(--primary-color);
    color: var(--background-color);
    border-radius: 20px;
    font-size: 0.9rem;
    font-weight: 600;
  }

  &__content {
    padding: 1.5rem;
  }

  &__meta {
    display: flex;
    gap: 1rem;
    margin-bottom: 1rem;
    font-size: 0.9rem;
    opacity: 0.8;
  }

  &__title {
    font-size: 1.5rem;
    color: var(--primary-color);
    margin-bottom: 1rem;
    line-height: 1.3;
  }

  &__excerpt {
    font-size: 1rem;
    line-height: 1.6;
    opacity: 0.8;
    margin-bottom: 1.5rem;
  }

  &__link {
    color: var(--primary-color);
    text-decoration: none;
    font-weight: 600;
    transition: opacity 0.3s ease;

    &:hover {
      opacity: 0.8;
    }
  }
}

.pagination {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 2rem;

  &__btn {
    padding: 0.8rem 1.5rem;
    background: var(--primary-color);
    color: var(--background-color);
    border: none;
    border-radius: 25px;
    cursor: pointer;
    transition: all 0.3s ease;
    font-weight: 600;

    &:disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }

    &:not(:disabled):hover {
      transform: translateY(-3px);
      box-shadow: 0 5px 15px rgba(0, 255, 213, 0.2);
    }
  }

  &__current {
    font-size: 1.1rem;
    color: var(--primary-color);
  }
}

@media (max-width: 768px) {
  .blog-hero {
    &__title {
      font-size: 3rem;
    }

    &__subtitle {
      font-size: 1.2rem;
    }
  }

  .blog-grid {
    grid-template-columns: 1fr;
  }

  .blog-categories {
    gap: 0.5rem;
  }

  .category-btn {
    padding: 0.6rem 1rem;
    font-size: 0.9rem;
  }
}
</style>
