<template>
  <div class="blog">
    <section class="blog-hero">
      <h1 class="blog-hero__title">Technical Blog</h1>
      <p class="blog-hero__subtitle">
        Sharing knowledge and experiences in web development
      </p>
    </section>

    <div class="blog-layout">
      <!-- Sidebar tag filter -->
      <aside class="blog-sidebar">
        <h3 class="blog-sidebar__title">Tags</h3>
        <div class="blog-sidebar__tags">
          <button
            v-for="category in categories"
            :key="category"
            :class="[
              'tag-btn',
              { 'tag-btn--active': selectedCategory === category },
            ]"
            @click="filterByCategory(category)"
          >
            {{ category }}
          </button>
        </div>
      </aside>

      <!-- Main content -->
      <div class="blog-main">
        <div class="blog-grid">
          <RouterLink
            v-for="(post, index) in filteredPosts"
            :key="post.slug + currentPage"
            :to="{ name: 'blog-detail', params: { slug: post.slug } }"
            class="blog-card"
            :style="{ '--i': index }"
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
            </div>
          </RouterLink>
        </div>

        <div v-if="totalPages > 1" class="pagination">
          <button
            class="pagination__btn"
            :disabled="currentPage === 1"
            @click="changePage(currentPage - 1)"
          >
            ← Prev
          </button>
          <span class="pagination__info"
            >{{ currentPage }} / {{ totalPages }}</span
          >
          <button
            class="pagination__btn"
            :disabled="currentPage === totalPages"
            @click="changePage(currentPage + 1)"
          >
            Next →
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";
import { posts, categories } from "@/content/blog/posts";

const selectedCategory = ref("All");
const currentPage = ref(1);
const postsPerPage = 10;

const filteredPosts = computed(() => {
  const filtered =
    selectedCategory.value === "All"
      ? posts
      : posts.filter((post) => post.category === selectedCategory.value);
  const start = (currentPage.value - 1) * postsPerPage;
  return filtered.slice(start, start + postsPerPage);
});

const totalPages = computed(() => {
  const filtered =
    selectedCategory.value === "All"
      ? posts
      : posts.filter((post) => post.category === selectedCategory.value);
  return Math.ceil(filtered.length / postsPerPage) || 1;
});

const filterByCategory = (category: string) => {
  selectedCategory.value = category;
  currentPage.value = 1;
};

const changePage = (page: number) => {
  currentPage.value = page;
};

</script>

<style lang="scss" scoped>
.blog {
  padding: 2rem;
  max-width: 1200px;
  margin: 0 auto;
}

@keyframes heroFadeUp {
  from { opacity: 0; transform: translateY(30px); }
  to   { opacity: 1; transform: translateY(0); }
}

// ── Hero ──
.blog-hero {
  min-height: 30vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  margin-bottom: 3rem;

  &__title {
    font-size: 3rem;
    font-weight: 300;
    color: var(--text-color);
    margin-bottom: 0.5rem;
    letter-spacing: -0.02em;
    animation: heroFadeUp 0.7s cubic-bezier(0.16, 1, 0.3, 1) both;
  }

  &__subtitle {
    font-size: 1rem;
    opacity: 0.45;
    animation: heroFadeUp 0.7s cubic-bezier(0.16, 1, 0.3, 1) 0.12s both;
  }
}

// ── Layout: sidebar + main ──
.blog-layout {
  display: grid;
  grid-template-columns: 180px 1fr;
  gap: 2.5rem;
  align-items: start;
}

// ── Sidebar ──
.blog-sidebar {
  position: sticky;
  top: 100px;

  &__title {
    font-size: 0.7rem;
    font-weight: 500;
    text-transform: uppercase;
    letter-spacing: 0.12em;
    opacity: 0.4;
    margin-bottom: 0.75rem;
  }

  &__tags {
    display: flex;
    flex-direction: column;
    gap: 0.35rem;
  }
}

.tag-btn {
  display: block;
  width: 100%;
  text-align: left;
  padding: 0.4rem 0.75rem;
  border: none;
  border-left: 2px solid transparent;
  border-radius: 6px;
  background: transparent;
  color: var(--text-color);
  font-size: 0.82rem;
  font-weight: 400;
  opacity: 0.55;
  cursor: pointer;
  transition: all 0.25s ease;

  &:hover {
    opacity: 0.85;
    background: var(--hover-bg);
  }

  &--active {
    opacity: 1;
    color: var(--primary-color);
    background: var(--glass-bg);
    border-left: 2px solid var(--primary-color);
    font-weight: 500;
  }
}

// ── Card grid ──
.blog-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1.25rem;
}

.blog-card {
  display: block;
  text-decoration: none;
  color: inherit;
  background: var(--glass-bg, rgba(255, 255, 255, 0.03));
  border: 1px solid var(--glass-border, rgba(255, 255, 255, 0.08));
  border-radius: 10px;
  overflow: hidden;
  transition:
    transform 0.3s ease,
    border-color 0.3s ease;
  // CSS staggered entrance
  animation: cardIn 0.45s ease both;
  animation-delay: calc(var(--i, 0) * 0.06s);

  &:hover {
    transform: translateY(-4px);
    border-color: var(--primary-color);

    .blog-card__image img {
      transform: scale(1.04);
    }
  }

  &__image {
    position: relative;
    width: 100%;
    height: 150px;
    overflow: hidden;

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      transition: transform 0.4s ease;
    }
  }

  &__category {
    position: absolute;
    top: 0.6rem;
    right: 0.6rem;
    padding: 0.25rem 0.6rem;
    background: rgba(0, 0, 0, 0.55);
    backdrop-filter: blur(6px);
    color: #fff;
    border-radius: 4px;
    font-size: 0.68rem;
    font-weight: 500;
    letter-spacing: 0.03em;
  }

  &__content {
    padding: 1rem 1.1rem;
  }

  &__meta {
    display: flex;
    gap: 0.75rem;
    margin-bottom: 0.5rem;
    font-size: 0.72rem;
    opacity: 0.4;
  }

  &__title {
    font-size: 0.95rem;
    font-weight: 600;
    color: var(--text-color);
    margin-bottom: 0.35rem;
    line-height: 1.4;
  }

  &__excerpt {
    font-size: 0.8rem;
    line-height: 1.6;
    opacity: 0.55;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }
}

@keyframes cardIn {
  from {
    opacity: 0;
    transform: translateY(16px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

// ── Pagination ──
.pagination {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1.5rem;
  margin-top: 2.5rem;

  &__btn {
    padding: 0.45rem 1rem;
    border: 1px solid var(--glass-border);
    background: var(--glass-bg);
    color: var(--text-color);
    border-radius: 6px;
    font-size: 0.8rem;
    cursor: pointer;
    transition: all 0.25s ease;

    &:not(:disabled):hover {
      border-color: var(--primary-color);
      color: var(--primary-color);
    }

    &:disabled {
      opacity: 0.25;
      cursor: not-allowed;
    }
  }

  &__info {
    font-size: 0.78rem;
    opacity: 0.4;
  }
}

// ── Responsive ──
@media (max-width: 768px) {
  .blog-layout {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }

  .blog-sidebar {
    position: static;

    &__tags {
      flex-direction: row;
      flex-wrap: wrap;
      gap: 0.4rem;
    }
  }

  .tag-btn {
    width: auto;
    border-bottom: 2px solid transparent;
    &--active {
      border-left: none;
      border-bottom: 2px solid var(--primary-color);
    }
  }

  .blog-grid {
    grid-template-columns: 1fr;
  }

  .blog-hero__title {
    font-size: 2.2rem;
  }
}
</style>
