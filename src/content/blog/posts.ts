import blog1 from '@/assets/images/blog-01.jpg'
import blog2 from '@/assets/images/blog-02.jpg'
import blog3 from '@/assets/images/blog-03.jpg'
import blog4 from '@/assets/images/blog-04.jpg'

export interface BlogPost {
  slug: string
  title: string
  excerpt: string
  image: string
  category: string
  date: string
  readTime: number
}

export const posts: BlogPost[] = [
  {
    slug: 'building-scalable-vue-apps',
    title: 'Building Scalable Vue.js Applications',
    excerpt: 'Learn how to structure large-scale Vue.js applications with best practices and proven patterns.',
    image: blog1,
    category: 'Vue.js',
    date: 'March 15, 2024',
    readTime: 8,
  },
  {
    slug: 'advanced-typescript-patterns',
    title: 'Advanced TypeScript Patterns',
    excerpt: 'Explore advanced TypeScript patterns and techniques to write more maintainable code.',
    image: blog2,
    category: 'TypeScript',
    date: 'March 10, 2024',
    readTime: 12,
  },
  {
    slug: 'optimizing-web-performance',
    title: 'Optimizing Web Performance',
    excerpt: 'Tips and techniques for improving your website\'s loading speed and performance.',
    image: blog3,
    category: 'Web Performance',
    date: 'March 5, 2024',
    readTime: 10,
  },
  {
    slug: 'modern-ui-ux-design-principles',
    title: 'Modern UI/UX Design Principles',
    excerpt: 'Understanding modern design principles and how to apply them in web development.',
    image: blog4,
    category: 'UI/UX',
    date: 'March 1, 2024',
    readTime: 7,
  },
  {
    slug: 'vue3-composition-api-deep-dive',
    title: 'Vue 3 Composition API Deep Dive',
    excerpt: 'A comprehensive guide to mastering the Composition API in Vue 3 for cleaner and more reusable code.',
    image: blog1,
    category: 'Vue.js',
    date: 'Feb 25, 2024',
    readTime: 15,
  },
  {
    slug: 'typescript-generics-explained',
    title: 'TypeScript Generics Explained',
    excerpt: 'Understanding generics in TypeScript and how to use them effectively in real-world projects.',
    image: blog2,
    category: 'TypeScript',
    date: 'Feb 20, 2024',
    readTime: 9,
  },
  {
    slug: 'css-container-queries-in-practice',
    title: 'CSS Container Queries in Practice',
    excerpt: 'How container queries change the way we build responsive components.',
    image: blog3,
    category: 'UI/UX',
    date: 'Feb 15, 2024',
    readTime: 6,
  },
  {
    slug: 'lazy-loading-strategies-for-spas',
    title: 'Lazy Loading Strategies for SPAs',
    excerpt: 'Improve initial load time with smart code-splitting and lazy loading techniques.',
    image: blog4,
    category: 'Web Performance',
    date: 'Feb 10, 2024',
    readTime: 8,
  },
  {
    slug: 'docker-for-frontend-developers',
    title: 'Docker for Frontend Developers',
    excerpt: 'A beginner-friendly guide to using Docker in your frontend development workflow.',
    image: blog1,
    category: 'DevOps',
    date: 'Feb 5, 2024',
    readTime: 11,
  },
  {
    slug: 'state-management-with-pinia',
    title: 'State Management with Pinia',
    excerpt: 'Why Pinia is the recommended state management solution for Vue 3 and how to use it.',
    image: blog2,
    category: 'Vue.js',
    date: 'Jan 30, 2024',
    readTime: 10,
  },
  {
    slug: 'cicd-pipelines-with-github-actions',
    title: 'CI/CD Pipelines with GitHub Actions',
    excerpt: 'Automate your build, test, and deploy workflows with GitHub Actions.',
    image: blog3,
    category: 'DevOps',
    date: 'Jan 25, 2024',
    readTime: 13,
  },
  {
    slug: 'accessibility-first-development',
    title: 'Accessibility-First Development',
    excerpt: 'Building inclusive web experiences that meet WCAG standards from day one.',
    image: blog4,
    category: 'UI/UX',
    date: 'Jan 20, 2024',
    readTime: 9,
  },
]

export const categories = ['All', 'Vue.js', 'TypeScript', 'Web Performance', 'UI/UX', 'DevOps']
