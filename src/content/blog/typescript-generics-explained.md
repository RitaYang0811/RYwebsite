# TypeScript Generics Explained

Generics let you write functions and types that work across many types while still being type-safe. Think of them as type-level parameters.

## Basic Syntax

```ts
// Without generics — loses type information
function identity(value: any): any {
  return value
}

// With generics — preserves the type
function identity<T>(value: T): T {
  return value
}

const n = identity(42)       // n: number
const s = identity('hello')  // s: string
```

## Constrained Generics

Use `extends` to restrict what types are accepted:

```ts
function getProperty<T, K extends keyof T>(obj: T, key: K): T[K] {
  return obj[key]
}

const user = { name: 'Rita', age: 28 }
getProperty(user, 'name')  // OK → string
getProperty(user, 'score') // Error: 'score' is not a key of user
```

## Generic Interfaces

```ts
interface Repository<T> {
  findById(id: string): Promise<T>
  findAll(): Promise<T[]>
  save(entity: T): Promise<T>
  delete(id: string): Promise<void>
}

// Concrete implementation
class UserRepository implements Repository<User> {
  async findById(id: string): Promise<User> {
    return fetch(`/api/users/${id}`).then(r => r.json())
  }
  // ...
}
```

## Default Type Parameters

```ts
interface ApiResponse<T = unknown> {
  data: T
  status: number
  message: string
}

// Uses the default when no type is specified
const raw: ApiResponse = { data: null, status: 200, message: 'OK' }

// Fully typed
const users: ApiResponse<User[]> = await fetchUsers()
```

## Summary

Generics are the mechanism that makes TypeScript's type system composable. Once you're comfortable writing `<T>` functions and interfaces, you'll reach for them constantly to avoid `any`.
