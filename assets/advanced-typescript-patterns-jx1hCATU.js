const e=`# Advanced TypeScript Patterns

TypeScript's type system is far more expressive than it first appears. Beyond basic annotations, these patterns help model complex domains accurately and catch whole categories of bugs at compile time.

## Discriminated Unions

When a value can be one of several shapes, discriminated unions make the impossible states unrepresentable.

\`\`\`ts
type LoadingState = { status: 'idle' }
type PendingState = { status: 'loading' }
type SuccessState<T> = { status: 'success'; data: T }
type ErrorState = { status: 'error'; message: string }

type AsyncState<T> = LoadingState | PendingState | SuccessState<T> | ErrorState

function renderUser(state: AsyncState<User>) {
  switch (state.status) {
    case 'idle':    return 'Not started'
    case 'loading': return 'Loading...'
    case 'success': return state.data.name   // TypeScript knows data exists here
    case 'error':   return \`Error: \${state.message}\`
  }
}
\`\`\`

The \`switch\` is exhaustive — if you add a new variant to \`AsyncState\` without handling it, TypeScript will warn you.

## Template Literal Types

Combine string literals to generate derived types automatically:

\`\`\`ts
type Direction = 'top' | 'right' | 'bottom' | 'left'
type Margin = \`margin-\${Direction}\`
// → 'margin-top' | 'margin-right' | 'margin-bottom' | 'margin-left'

type EventName = 'click' | 'focus' | 'blur'
type Handler = \`on\${Capitalize<EventName>}\`
// → 'onClick' | 'onFocus' | 'onBlur'
\`\`\`

This is especially useful for generating CSS-in-JS type-safe property names.

## Mapped Types

Transform every key in an existing type systematically:

\`\`\`ts
type Readonly<T> = {
  readonly [K in keyof T]: T[K]
}

type Optional<T> = {
  [K in keyof T]?: T[K]
}

// Make specific keys required, rest optional
type RequireFields<T, K extends keyof T> = Omit<T, K> & Required<Pick<T, K>>

type UserForm = RequireFields<User, 'email' | 'name'>
// email and name are required; everything else is optional
\`\`\`

## Conditional Types

Types that depend on other types — useful for writing generic utilities:

\`\`\`ts
type Flatten<T> = T extends Array<infer Item> ? Item : T

type A = Flatten<string[]>   // string
type B = Flatten<number>     // number (not an array, returns itself)
\`\`\`

A practical use: extracting the resolved value from a Promise:

\`\`\`ts
type Awaited<T> = T extends Promise<infer R> ? Awaited<R> : T

type Result = Awaited<Promise<Promise<string>>>  // string
\`\`\`

## \`satisfies\` Operator

Added in TypeScript 4.9, \`satisfies\` validates a value against a type without widening it:

\`\`\`ts
const palette = {
  red: [255, 0, 0],
  green: '#00ff00',
  blue: [0, 0, 255],
} satisfies Record<string, string | number[]>

// TypeScript still knows the precise type of each value:
palette.red.map(x => x * 2)    // OK — TypeScript knows it's number[]
palette.green.toUpperCase()    // OK — TypeScript knows it's string
\`\`\`

Without \`satisfies\`, you'd need a type annotation that loses the specificity.

## Branded Types

Prevent accidentally mixing structurally identical types:

\`\`\`ts
type UserId   = string & { readonly _brand: 'UserId' }
type ProductId = string & { readonly _brand: 'ProductId' }

function brand<T extends string, B extends string>(value: T): T & { _brand: B } {
  return value as T & { _brand: B }
}

const uid = brand<string, 'UserId'>('user-123')
const pid = brand<string, 'ProductId'>('product-456')

function getUser(id: UserId) { /* ... */ }

getUser(uid)   // OK
getUser(pid)   // Error: Argument of type 'ProductId' is not assignable to 'UserId'
getUser('raw') // Error: string is not assignable to UserId
\`\`\`

## Summary

These patterns move type errors from runtime to compile time:

- **Discriminated unions** — model state machines correctly
- **Template literals** — generate string union types from combinations
- **Mapped types** — transform types systematically
- **Conditional types** — write generic type-level logic
- **\`satisfies\`** — validate without losing inference
- **Branded types** — prevent ID type confusion

The goal isn't clever types for their own sake — it's encoding your domain rules in the type system so that incorrect code simply doesn't compile.
`;export{e as default};
