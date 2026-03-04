const e=`# Optimizing Web Performance

Web performance directly impacts user experience and search rankings. This article covers the most impactful optimizations you can apply to a modern SPA.

## Core Web Vitals

Google's Core Web Vitals are the metrics that matter most: **LCP** (Largest Contentful Paint), **FID** (First Input Delay), and **CLS** (Cumulative Layout Shift).

\`\`\`js
// Measure CLS with PerformanceObserver
const observer = new PerformanceObserver((list) => {
  for (const entry of list.getEntries()) {
    if (!entry.hadRecentInput) {
      console.log('CLS entry:', entry.value)
    }
  }
})
observer.observe({ type: 'layout-shift', buffered: true })
\`\`\`

## Image Optimization

Images are often the biggest contributor to page weight. Use modern formats and lazy loading:

\`\`\`html
<img
  src="hero.webp"
  srcset="hero-480.webp 480w, hero-960.webp 960w"
  sizes="(max-width: 600px) 480px, 960px"
  loading="lazy"
  alt="Hero image"
/>
\`\`\`

## Code Splitting

Split bundles by route so users only download what they need:

\`\`\`ts
// vite.config.ts
export default defineConfig({
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['vue', 'vue-router', 'pinia'],
          gsap: ['gsap'],
        }
      }
    }
  }
})
\`\`\`

## Summary

- Measure first with Lighthouse and WebPageTest
- Optimize images with WebP and lazy loading
- Split code by route and vendor
- Defer non-critical JavaScript
- Set proper cache headers on static assets
`;export{e as default};
