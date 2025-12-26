---
name: nextjs
description: Next.js 15+ patterns including App Router, Server Components, Server Actions, and modern React patterns. Use when building or working with Next.js applications.
---

# Next.js

Modern Next.js development with App Router and Server Components.

## App Router Structure

```
src/app/
├── layout.tsx          # Root layout
├── page.tsx            # Home page
├── loading.tsx         # Loading UI
├── error.tsx           # Error boundary
├── not-found.tsx       # 404 page
├── (auth)/             # Route group
│   ├── login/page.tsx
│   └── register/page.tsx
├── dashboard/
│   ├── layout.tsx      # Nested layout
│   └── page.tsx
└── api/
    └── route.ts        # API routes
```

## Server Components (Default)

```tsx
// app/posts/page.tsx - Server Component by default
async function PostsPage() {
  const posts = await db.posts.findMany();

  return (
    <ul>
      {posts.map(post => (
        <li key={post.id}>{post.title}</li>
      ))}
    </ul>
  );
}

export default PostsPage;
```

## Client Components

```tsx
'use client';

import { useState } from 'react';

export function Counter() {
  const [count, setCount] = useState(0);

  return (
    <button onClick={() => setCount(c => c + 1)}>
      Count: {count}
    </button>
  );
}
```

## Server Actions

```tsx
// app/actions.ts
'use server';

import { revalidatePath } from 'next/cache';

export async function createPost(formData: FormData) {
  const title = formData.get('title') as string;

  await db.posts.create({ data: { title } });

  revalidatePath('/posts');
}
```

```tsx
// Usage in form
<form action={createPost}>
  <input name="title" />
  <button type="submit">Create</button>
</form>
```

## Data Fetching

```tsx
// With caching (default)
const data = await fetch('https://api.example.com/data');

// No cache
const data = await fetch('https://api.example.com/data', {
  cache: 'no-store'
});

// Revalidate every hour
const data = await fetch('https://api.example.com/data', {
  next: { revalidate: 3600 }
});
```

## Metadata

```tsx
// Static metadata
export const metadata = {
  title: 'My Page',
  description: 'Page description',
};

// Dynamic metadata
export async function generateMetadata({ params }) {
  const post = await getPost(params.id);
  return { title: post.title };
}
```

## Best Practices

1. **Default to Server Components** - Only use 'use client' when needed
2. **Colocate files** - Keep related files together
3. **Use route groups** - Organize without affecting URLs
4. **Leverage caching** - Use fetch caching and revalidation
5. **Server Actions for mutations** - Prefer over API routes
6. **Parallel data fetching** - Use Promise.all for independent fetches

## Common Patterns

### Protected Routes
```tsx
// middleware.ts
import { auth } from '@/lib/auth';
import { NextResponse } from 'next/server';

export async function middleware(request) {
  const session = await auth();

  if (!session && request.nextUrl.pathname.startsWith('/dashboard')) {
    return NextResponse.redirect(new URL('/login', request.url));
  }
}
```

### Loading States
```tsx
// app/posts/loading.tsx
export default function Loading() {
  return <PostsSkeleton />;
}
```

### Error Handling
```tsx
// app/posts/error.tsx
'use client';

export default function Error({ error, reset }) {
  return (
    <div>
      <h2>Something went wrong!</h2>
      <button onClick={() => reset()}>Try again</button>
    </div>
  );
}
```
