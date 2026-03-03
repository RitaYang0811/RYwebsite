<template>
  <div class="article-page">
    <!-- Back button -->
    <RouterLink to="/blog" class="back-btn">
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <path d="M19 12H5M5 12l7 7M5 12l7-7" />
      </svg>
      Back to Blog
    </RouterLink>

    <!-- Not found -->
    <div v-if="!post && !loading" class="not-found">
      <h2>Article not found</h2>
      <p>The article you're looking for doesn't exist.</p>
    </div>

    <template v-else-if="post">
      <!-- Hero image -->
      <div class="article-hero">
        <img :src="post.image" :alt="post.title" class="article-hero__img" />
      </div>

      <!-- Meta -->
      <div class="article-meta">
        <span class="article-meta__tag">{{ post.category }}</span>
        <span class="article-meta__dot">·</span>
        <span class="article-meta__date">{{ post.date }}</span>
        <span class="article-meta__dot">·</span>
        <span class="article-meta__read">{{ post.readTime }} min read</span>
      </div>

      <!-- Title -->
      <h1 class="article-title">{{ post.title }}</h1>

      <!-- Body -->
      <div class="article-body" v-html="renderedContent" />
    </template>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import MarkdownIt from 'markdown-it'
import hljs from 'highlight.js'
import 'highlight.js/styles/atom-one-dark.css'
import { posts } from '@/content/blog/posts'

const route = useRoute()
const slug = route.params.slug as string

const post = posts.find(p => p.slug === slug) ?? null
const loading = ref(true)
const renderedContent = ref('')

// Set up markdown-it with highlight.js
const md = new MarkdownIt({
  html: false,
  linkify: true,
  typographer: true,
  highlight(str, lang) {
    if (lang && hljs.getLanguage(lang)) {
      try {
        return (
          '<pre class="hljs"><code>' +
          hljs.highlight(str, { language: lang, ignoreIllegals: true }).value +
          '</code></pre>'
        )
      } catch {}
    }
    return '<pre class="hljs"><code>' + md.utils.escapeHtml(str) + '</code></pre>'
  },
})

// Load markdown files via Vite glob import
const modules = import.meta.glob('@/content/blog/*.md', {
  query: '?raw',
  import: 'default',
}) as Record<string, () => Promise<string>>

onMounted(async () => {
  if (!post) {
    loading.value = false
    return
  }
  const key = `/src/content/blog/${slug}.md`
  const loader = modules[key]
  if (loader) {
    const raw = await loader()
    renderedContent.value = md.render(raw)
  }
  loading.value = false
})
</script>

<style lang="scss" scoped>
.article-page {
  max-width: 780px;
  margin: 0 auto;
  padding: 2rem 2rem 6rem;
}

// ── Back button ──
.back-btn {
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  font-size: 0.82rem;
  color: var(--text-color);
  opacity: 0.5;
  text-decoration: none;
  margin-bottom: 2.5rem;
  transition: opacity 0.2s ease, gap 0.2s ease;

  &:hover {
    opacity: 1;
    gap: 0.6rem;
  }
}

// ── Hero image ──
.article-hero {
  width: 100%;
  height: 420px;
  border-radius: 12px;
  overflow: hidden;
  margin-bottom: 2rem;

  &__img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: top;
  }
}

// ── Meta row ──
.article-meta {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.78rem;
  margin-bottom: 1rem;

  &__tag {
    padding: 0.2rem 0.55rem;
    background: var(--glass-bg);
    border: 1px solid var(--glass-border);
    border-radius: 4px;
    color: var(--primary-color);
    font-weight: 500;
    letter-spacing: 0.02em;
  }

  &__dot,
  &__date,
  &__read {
    opacity: 0.45;
  }
}

// ── Article title ──
.article-title {
  font-size: 2.2rem;
  font-weight: 600;
  line-height: 1.25;
  letter-spacing: -0.02em;
  color: var(--text-color);
  margin-bottom: 2.5rem;
}

// ── Not found ──
.not-found {
  text-align: center;
  padding: 6rem 0;
  opacity: 0.5;

  h2 {
    font-size: 1.5rem;
    font-weight: 600;
    margin-bottom: 0.5rem;
  }

  p {
    font-size: 0.9rem;
  }
}
</style>

<!-- Article body prose styles (not scoped — targets v-html content) -->
<style lang="scss">
.article-body {
  color: var(--text-color);
  font-size: 1rem;
  line-height: 1.8;

  h1, h2, h3, h4 {
    font-weight: 600;
    line-height: 1.3;
    margin: 2.5rem 0 0.75rem;
    color: var(--text-color);
  }

  h1 { font-size: 1.8rem; }
  h2 {
    font-size: 1.3rem;
    padding-bottom: 0.4rem;
    border-bottom: 1px solid var(--glass-border);
  }
  h3 { font-size: 1.1rem; }

  p {
    margin-bottom: 1.25rem;
    opacity: 0.8;
  }

  a {
    color: var(--primary-color);
    text-decoration: none;
    border-bottom: 1px solid transparent;
    transition: border-color 0.2s ease;

    &:hover {
      border-bottom-color: var(--primary-color);
    }
  }

  ul, ol {
    margin: 0 0 1.25rem 1.5rem;
    opacity: 0.8;

    li {
      margin-bottom: 0.35rem;
      line-height: 1.7;
    }
  }

  blockquote {
    margin: 1.5rem 0;
    padding: 0.75rem 1.25rem;
    border-left: 3px solid var(--primary-color);
    background: var(--glass-bg);
    border-radius: 0 8px 8px 0;
    opacity: 0.75;

    p {
      margin-bottom: 0;
    }
  }

  img {
    display: block;
    max-width: 100%;
    border-radius: 8px;
    margin: 1.5rem auto;
  }

  // Inline code
  code:not(pre code) {
    font-family: 'SF Mono', 'Fira Code', monospace;
    font-size: 0.85em;
    padding: 0.15em 0.45em;
    background: var(--glass-bg);
    border: 1px solid var(--glass-border);
    border-radius: 4px;
  }

  // Code blocks (highlight.js)
  pre.hljs {
    margin: 1.5rem 0;
    border-radius: 10px;
    overflow-x: auto;
    border: 1px solid rgba(255, 255, 255, 0.06);

    code {
      font-family: 'SF Mono', 'Fira Code', 'Consolas', monospace;
      font-size: 0.88rem;
      line-height: 1.65;
      display: block;
      padding: 1.25rem 1.5rem;
    }
  }

  hr {
    border: none;
    border-top: 1px solid var(--glass-border);
    margin: 2.5rem 0;
  }
}

// ── Responsive ──
@media (max-width: 768px) {
  .article-page {
    padding: 1.5rem 1.25rem 4rem;
  }

  .article-hero {
    height: 220px;
    border-radius: 8px;
  }

  .article-title {
    font-size: 1.6rem;
  }

  .article-body {
    font-size: 0.95rem;

    pre.hljs code {
      font-size: 0.8rem;
      padding: 1rem;
    }
  }
}
</style>
