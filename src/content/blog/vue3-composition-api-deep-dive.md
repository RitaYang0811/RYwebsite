# Vue 3 Composition API Deep Dive

The Composition API fundamentally changes how we organise Vue logic. Instead of scattering related code across `data`, `methods`, `computed`, and `watch`, everything for a single concern lives together.

## `ref` vs `reactive`

Use `ref` for primitives and `reactive` for objects — but prefer `ref` when in doubt since it's explicit about reactivity:

```ts
import { ref, reactive, computed } from 'vue'

// ref wraps any value; access via .value
const count = ref(0)
count.value++

// reactive unwraps automatically in templates
const form = reactive({ name: '', email: '' })
form.name = 'Rita'

// computed is lazy — only recalculates when dependencies change
const doubled = computed(() => count.value * 2)
```

## `watch` vs `watchEffect`

```ts
import { watch, watchEffect } from 'vue'

// watch: explicit source, runs when it changes
watch(count, (newVal, oldVal) => {
  console.log(`${oldVal} → ${newVal}`)
})

// watchEffect: auto-tracks all reactive reads inside
watchEffect(() => {
  document.title = `Count: ${count.value}`
})
```

## Composable Pattern

Extract logic into composables — functions starting with `use` that return reactive state:

```ts
// useWindowSize.ts
import { ref, onMounted, onUnmounted } from 'vue'

export function useWindowSize() {
  const width  = ref(window.innerWidth)
  const height = ref(window.innerHeight)

  function update() {
    width.value  = window.innerWidth
    height.value = window.innerHeight
  }

  onMounted(() => window.addEventListener('resize', update))
  onUnmounted(() => window.removeEventListener('resize', update))

  return { width, height }
}
```

## `provide` / `inject`

Pass data down component trees without prop drilling:

```ts
// Parent
import { provide } from 'vue'
provide('theme', ref('dark'))

// Any descendant
import { inject } from 'vue'
const theme = inject<Ref<string>>('theme')
```

## Summary

The Composition API makes code more portable, testable, and readable. The key shift is thinking in composables rather than component options.
