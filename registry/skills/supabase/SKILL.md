---
name: supabase
description: Supabase patterns for database, authentication, RLS policies, and real-time subscriptions. Use when building applications with Supabase backend.
---

# Supabase

Database, auth, and real-time with Supabase.

## Client Setup

```typescript
// lib/supabase/client.ts
import { createBrowserClient } from '@supabase/ssr';

export function createClient() {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );
}
```

```typescript
// lib/supabase/server.ts
import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';

export async function createClient() {
  const cookieStore = await cookies();

  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value, options }) =>
            cookieStore.set(name, value, options)
          );
        },
      },
    }
  );
}
```

## Database Queries

```typescript
// Select
const { data, error } = await supabase
  .from('posts')
  .select('*')
  .eq('published', true)
  .order('created_at', { ascending: false });

// Select with relations
const { data } = await supabase
  .from('posts')
  .select(`
    *,
    author:users(name, avatar),
    comments(id, content)
  `);

// Insert
const { data, error } = await supabase
  .from('posts')
  .insert({ title, content, user_id })
  .select()
  .single();

// Update
const { error } = await supabase
  .from('posts')
  .update({ title })
  .eq('id', postId);

// Delete
const { error } = await supabase
  .from('posts')
  .delete()
  .eq('id', postId);
```

## Authentication

```typescript
// Sign up
const { data, error } = await supabase.auth.signUp({
  email,
  password,
});

// Sign in
const { data, error } = await supabase.auth.signInWithPassword({
  email,
  password,
});

// Sign out
await supabase.auth.signOut();

// Get user
const { data: { user } } = await supabase.auth.getUser();

// OAuth
await supabase.auth.signInWithOAuth({
  provider: 'google',
  options: { redirectTo: `${origin}/auth/callback` }
});
```

## Row Level Security (RLS)

```sql
-- Enable RLS
ALTER TABLE posts ENABLE ROW LEVEL SECURITY;

-- Users can read all published posts
CREATE POLICY "Public posts are viewable"
ON posts FOR SELECT
USING (published = true);

-- Users can only edit their own posts
CREATE POLICY "Users can update own posts"
ON posts FOR UPDATE
USING (auth.uid() = user_id);

-- Users can only delete their own posts
CREATE POLICY "Users can delete own posts"
ON posts FOR DELETE
USING (auth.uid() = user_id);

-- Users can insert posts as themselves
CREATE POLICY "Users can create posts"
ON posts FOR INSERT
WITH CHECK (auth.uid() = user_id);
```

## Real-time Subscriptions

```typescript
// Subscribe to changes
const channel = supabase
  .channel('posts')
  .on(
    'postgres_changes',
    { event: '*', schema: 'public', table: 'posts' },
    (payload) => {
      console.log('Change:', payload);
    }
  )
  .subscribe();

// Cleanup
channel.unsubscribe();
```

## Storage

```typescript
// Upload file
const { data, error } = await supabase.storage
  .from('avatars')
  .upload(`${userId}/avatar.png`, file);

// Get public URL
const { data } = supabase.storage
  .from('avatars')
  .getPublicUrl(`${userId}/avatar.png`);

// Download file
const { data, error } = await supabase.storage
  .from('avatars')
  .download(`${userId}/avatar.png`);
```

## Best Practices

1. **Always use RLS** - Never disable it in production
2. **Type your queries** - Use generated types from CLI
3. **Handle errors** - Check error on every query
4. **Use transactions** - For related operations
5. **Index properly** - Add indexes for filtered columns
