const e=`# Building Scalable Vue.js Applications

When a Vue.js project grows beyond a handful of components, the structure you chose on day one starts to matter a lot. This article covers the patterns and conventions I've found most effective for keeping large codebases maintainable.

## Project Structure

A feature-based folder structure scales far better than grouping by file type.

\`\`\`
src/
├── features/
│   ├── auth/
│   │   ├── components/
│   │   ├── composables/
│   │   ├── store/
│   │   └── views/
│   └── products/
│       ├── components/
│       ├── composables/
│       └── views/
├── shared/
│   ├── components/
│   └── composables/
└── router/
\`\`\`

Each feature owns everything it needs. Shared utilities live in \`shared/\` only once they're truly reused across two or more features.

## Composables Over Mixins

Vue 3's Composition API makes it natural to extract reusable logic into composables. Here's a simple example for paginated data fetching:

\`\`\`ts
// features/products/composables/useProducts.ts
import { ref, computed } from 'vue'
import type { Product } from '../types'

export function useProducts() {
  const items = ref<Product[]>([])
  const loading = ref(false)
  const page = ref(1)

  const totalPages = computed(() => Math.ceil(items.value.length / 10))

  async function fetchPage(n: number) {
    loading.value = true
    try {
      const res = await fetch(\`/api/products?page=\${n}\`)
      items.value = await res.json()
      page.value = n
    } finally {
      loading.value = false
    }
  }

  return { items, loading, page, totalPages, fetchPage }
}
\`\`\`

The component stays clean — it only handles rendering:

\`\`\`vue
<script setup lang="ts">
import { onMounted } from 'vue'
import { useProducts } from '../composables/useProducts'

const { items, loading, page, totalPages, fetchPage } = useProducts()
onMounted(() => fetchPage(1))
<\/script>
\`\`\`

## Typed Route Params

Use typed route helpers to avoid silent typos in navigation.

\`\`\`ts
// router/index.ts
import { createRouter, createWebHashHistory } from 'vue-router'

const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    { path: '/products/:id', name: 'product-detail', component: () => import('@/features/products/views/ProductDetail.vue') }
  ]
})

export default router
\`\`\`

\`\`\`ts
// In a component
import { useRouter } from 'vue-router'

const router = useRouter()
router.push({ name: 'product-detail', params: { id: '42' } })
\`\`\`

## Performance: Lazy Routes + Keep-Alive

Route-level code splitting is built into Vue Router — just use a dynamic import:

\`\`\`ts
{ path: '/dashboard', component: () => import('@/features/dashboard/views/DashboardView.vue') }
\`\`\`

For tabs or frequently revisited views, wrap with \`<KeepAlive>\` to avoid re-mounting:

\`\`\`vue
<RouterView v-slot="{ Component }">
  <KeepAlive :include="['DashboardView']">
    <component :is="Component" />
  </KeepAlive>
</RouterView>
\`\`\`

## State Management with Pinia

Keep stores small and focused. One store per feature domain:

\`\`\`ts
// features/auth/store/useAuthStore.ts
import { defineStore } from 'pinia'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null as User | null,
    token: localStorage.getItem('token') ?? ''
  }),
  getters: {
    isLoggedIn: (state) => !!state.token
  },
  actions: {
    async login(email: string, password: string) {
      const { token, user } = await authApi.login(email, password)
      this.token = token
      this.user = user
      localStorage.setItem('token', token)
    }
  }
})
\`\`\`

## Summary

The key principles for scalable Vue apps:

1. **Feature folders** — co-locate everything a feature needs
2. **Composables** — extract logic early, keep components focused on rendering
3. **Typed everything** — TypeScript catches refactoring mistakes before the browser does
4. **Lazy load routes** — ship only what's needed per page
5. **Small focused stores** — one Pinia store per domain, not one giant global store

These patterns won't prevent all problems, but they make the codebase navigable when it grows to tens of thousands of lines.
`;export{e as default};
