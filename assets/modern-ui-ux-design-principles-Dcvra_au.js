const e=`# Modern UI/UX Design Principles

Good design is invisible — users accomplish their goals without thinking about the interface. These principles guide my design decisions on every project.

## Visual Hierarchy

Every element on a page competes for attention. Use size, weight, and contrast to direct the eye:

\`\`\`css
/* Clear hierarchy with type scale */
h1 { font-size: 3rem;   font-weight: 300; letter-spacing: -0.02em; }
h2 { font-size: 1.75rem; font-weight: 600; }
p  { font-size: 1rem;    line-height: 1.7; opacity: 0.75; }
\`\`\`

## Spacing as a Design Element

Generous whitespace signals quality. Use a consistent spacing scale:

\`\`\`scss
$space-xs:  0.25rem;  //  4px
$space-sm:  0.5rem;   //  8px
$space-md:  1rem;     // 16px
$space-lg:  2rem;     // 32px
$space-xl:  4rem;     // 64px
\`\`\`

## Motion with Purpose

Animations should communicate, not decorate. Keep transitions under 300ms for interactive elements:

\`\`\`css
.button {
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}
.button:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15);
}
\`\`\`

## Summary

- Establish clear visual hierarchy
- Use whitespace generously
- Keep interactions responsive (< 300ms feedback)
- Design for accessibility from the start
- Test on real devices, not just browser DevTools
`;export{e as default};
