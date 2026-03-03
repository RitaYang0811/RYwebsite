# Accessibility-First Development

Accessibility isn't a checklist item — it's good engineering. When you build with accessibility in mind from the start, you end up with cleaner HTML, better keyboard support, and a product that works for everyone.

## Semantic HTML

Use the right element for the job. A `<button>` gets keyboard focus and click handling for free; a `<div>` with `onClick` doesn't.

```html
<!-- Bad -->
<div class="btn" onclick="submit()">Submit</div>

<!-- Good -->
<button type="submit">Submit</button>
```

## ARIA When Semantics Aren't Enough

```html
<!-- Custom toggle button -->
<button
  role="switch"
  :aria-checked="isDarkMode"
  @click="toggleTheme"
>
  {{ isDarkMode ? 'Dark' : 'Light' }} mode
</button>

<!-- Live region for dynamic content -->
<div aria-live="polite" aria-atomic="true">
  {{ statusMessage }}
</div>
```

## Keyboard Navigation

Every interactive element must be reachable and operable via keyboard:

```css
/* Never remove focus outlines — style them instead */
:focus-visible {
  outline: 2px solid var(--primary-color);
  outline-offset: 3px;
  border-radius: 4px;
}
```

```ts
// Trap focus inside modals
function trapFocus(el: HTMLElement) {
  const focusable = el.querySelectorAll<HTMLElement>(
    'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
  )
  const first = focusable[0]
  const last  = focusable[focusable.length - 1]

  el.addEventListener('keydown', (e) => {
    if (e.key !== 'Tab') return
    if (e.shiftKey && document.activeElement === first) {
      e.preventDefault(); last.focus()
    } else if (!e.shiftKey && document.activeElement === last) {
      e.preventDefault(); first.focus()
    }
  })
}
```

## Colour Contrast

WCAG AA requires a 4.5:1 contrast ratio for normal text. Use a tool like the Chrome DevTools colour picker or `axe-core` to audit:

```bash
npm install --save-dev axe-core
npx axe https://yoursite.com
```

## Summary

- Use semantic HTML elements
- Add ARIA only when native semantics fall short
- Style `:focus-visible`, never remove it
- Test with a keyboard only — no mouse
- Check colour contrast ratios
- Run `axe-core` as part of your CI pipeline
