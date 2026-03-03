# Lazy Loading Strategies for SPAs

Single-page applications can grow to large JavaScript bundles quickly. Lazy loading defers loading of code that isn't needed immediately, improving Time to Interactive.

## Route-Level Code Splitting

The highest-impact change: load each route's code only when it's visited.

```ts
// router/index.ts
const routes = [
  {
    path: '/',
    component: HomeView, // eager — loads immediately
  },
  {
    path: '/dashboard',
    // lazy — loads only when user visits /dashboard
    component: () => import('@/views/DashboardView.vue'),
  },
]
```

Vite automatically creates a separate chunk for each dynamic import.

## Component-Level Lazy Loading

For heavy components that aren't visible on initial render:

```ts
import { defineAsyncComponent } from 'vue'

const HeavyChart = defineAsyncComponent(() =>
  import('./HeavyChart.vue')
)
```

With loading and error states:

```ts
const HeavyChart = defineAsyncComponent({
  loader: () => import('./HeavyChart.vue'),
  loadingComponent: SpinnerComponent,
  errorComponent: ErrorComponent,
  delay: 200,
  timeout: 5000,
})
```

## Intersection Observer for Images

Load images only when they scroll into view:

```ts
export function useLazyImage(src: string) {
  const imgRef = ref<HTMLImageElement | null>(null)
  const loaded = ref(false)

  onMounted(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        imgRef.value!.src = src
        loaded.value = true
        observer.disconnect()
      }
    })
    if (imgRef.value) observer.observe(imgRef.value)
  })

  return { imgRef, loaded }
}
```

## Prefetching Critical Routes

For routes the user is likely to visit, prefetch in the background after the main bundle loads:

```ts
// After initial render, prefetch probable next routes
onMounted(() => {
  setTimeout(() => {
    import('@/views/ProductsView.vue')
    import('@/views/CartView.vue')
  }, 2000)
})
```

## Summary

- Split code at the route level first — highest impact, lowest effort
- Use `defineAsyncComponent` for heavy components
- Lazy-load images with IntersectionObserver
- Prefetch probable next routes after initial load
