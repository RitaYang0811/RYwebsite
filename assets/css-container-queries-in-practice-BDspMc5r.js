const n=`# CSS Container Queries in Practice

For years, we built responsive components based on the viewport width. Container queries change the game — a component now responds to the size of its *container*, not the screen.

## Basic Setup

\`\`\`css
/* 1. Define a containment context */
.card-wrapper {
  container-type: inline-size;
  container-name: card;
}

/* 2. Query the container */
@container card (min-width: 400px) {
  .card {
    display: grid;
    grid-template-columns: 120px 1fr;
  }
}
\`\`\`

## Why This Matters

A sidebar card at 240px wide should look different from the same card in a main content area at 600px — even when both are on the same viewport. With media queries alone, you can't express this. Container queries can.

## Practical Example: Product Card

\`\`\`css
.product-grid {
  container-type: inline-size;
}

.product-card {
  /* Mobile-first: stacked layout */
  display: flex;
  flex-direction: column;
}

@container (min-width: 320px) {
  .product-card {
    /* Side-by-side when container is wide enough */
    flex-direction: row;
    align-items: center;
    gap: 1rem;
  }
  .product-card__image {
    width: 100px;
    flex-shrink: 0;
  }
}
\`\`\`

## Container Query Units

\`\`\`css
@container (min-width: 400px) {
  .card__title {
    /* cqi = 1% of container inline size */
    font-size: clamp(1rem, 4cqi, 1.5rem);
  }
}
\`\`\`

## Browser Support

Container queries have broad support in all modern browsers (Chrome 105+, Safari 16+, Firefox 110+). For older browsers, a media query fallback is the safe approach.

## Summary

Container queries make components truly self-contained — they can be dropped anywhere in a layout and respond appropriately without media query overrides.
`;export{n as default};
