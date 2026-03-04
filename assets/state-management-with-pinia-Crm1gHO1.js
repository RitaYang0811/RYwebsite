const t=`# State Management with Pinia

Pinia is Vue 3's official state management library — lighter, simpler, and fully TypeScript-aware compared to Vuex.

## Defining a Store

\`\`\`ts
// stores/useCartStore.ts
import { defineStore } from 'pinia'
import type { Product } from '@/types'

export const useCartStore = defineStore('cart', {
  state: () => ({
    items: [] as { product: Product; qty: number }[],
  }),

  getters: {
    totalItems: (state) => state.items.reduce((sum, i) => sum + i.qty, 0),
    totalPrice: (state) => state.items.reduce((sum, i) => sum + i.product.price * i.qty, 0),
  },

  actions: {
    addItem(product: Product) {
      const existing = this.items.find(i => i.product.id === product.id)
      if (existing) {
        existing.qty++
      } else {
        this.items.push({ product, qty: 1 })
      }
    },
    removeItem(productId: string) {
      this.items = this.items.filter(i => i.product.id !== productId)
    },
  },
})
\`\`\`

## Using in Components

\`\`\`vue
<script setup lang="ts">
import { useCartStore } from '@/stores/useCartStore'

const cart = useCartStore()
<\/script>

<template>
  <div>
    <p>{{ cart.totalItems }} items — \${{ cart.totalPrice }}</p>
    <button @click="cart.addItem(product)">Add to cart</button>
  </div>
</template>
\`\`\`

## Setup Store Syntax

Prefer the setup syntax for complex stores — it's the same API as \`<script setup>\`:

\`\`\`ts
export const useUserStore = defineStore('user', () => {
  const user = ref<User | null>(null)
  const isLoggedIn = computed(() => !!user.value)

  async function login(email: string, password: string) {
    user.value = await authApi.login(email, password)
  }

  function logout() {
    user.value = null
  }

  return { user, isLoggedIn, login, logout }
})
\`\`\`

## Persistence

Use \`pinia-plugin-persistedstate\` to sync state to localStorage:

\`\`\`ts
import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'

const pinia = createPinia()
pinia.use(piniaPluginPersistedstate)
\`\`\`

\`\`\`ts
defineStore('cart', { /* ... */ }, { persist: true })
\`\`\`

## Summary

Pinia is the recommended choice for all new Vue 3 projects. Its setup-syntax stores, first-class TypeScript support, and Vue DevTools integration make it a pleasure to work with.
`;export{t as default};
