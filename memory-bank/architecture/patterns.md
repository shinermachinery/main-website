# Development Patterns

**Last Updated**: 2025-12-23

## Overview

This document defines required architectural patterns for Next.js 16 development in this project. These patterns ensure optimal performance, proper streaming, and adherence to Next.js best practices.

**Core Principles:**
- Server Components by default for all pages
- Component-based data fetching with dedicated server components
- Suspense boundaries for streaming and progressive rendering
- Clear separation between server and client responsibilities

## Critical Rules

### Rule 1: Server Components by Default

**All page files MUST be server components** - Never use 'use client' on page files.

✅ **ALLOWED:**
- Server components for all pages (default)
- Exception: `/studio` route (Sanity Studio requires client-side)

❌ **NOT ALLOWED:**
- 'use client' directive on page files
- Direct data fetching in client components

**Rationale:**
- Reduces client JavaScript bundle size
- Enables server-side data fetching with zero client overhead
- Better SEO with server-rendered content
- Improves performance and Core Web Vitals

### Rule 2: Always Await Params and SearchParams

**Next.js 16 requires awaiting `params` and `searchParams` in page components.**

```typescript
// ✅ CORRECT - Always await
export default async function BlogPage({
  params,
  searchParams,
}: {
  params: Promise<{ slug: string }>
  searchParams: Promise<{ category?: string }>
}) {
  const { slug } = await params
  const filters = await searchParams

  // Use slug and filters...
}

// ❌ WRONG - Will cause TypeScript error
export default function BlogPage({ params }) {
  const slug = params.slug // TypeScript error! params is a Promise
}
```

**Why This Matters:**
- Next.js 16 changed params and searchParams to Promises
- TypeScript will enforce this at compile time
- Prevents runtime errors
- Aligns with async server component pattern

### Rule 3: Component-Based Server Data Pattern

**Create separate server component files for each client component that needs data.**

**Pattern:**
- **File naming**: `[component-name]-data.tsx` (e.g., `blog-list-data.tsx`)
- **Location**: `src/components/[feature]/` (alongside client components)
- **Purpose**: Server component fetches data and renders client component with data as props
- **Scaling**: Multiple client components = multiple server data files

```
src/components/blog/
├── blog-list.tsx               # Client component
├── blog-list-data.tsx          # Server component for BlogList data
├── blog-stats.tsx              # Client component
├── blog-stats-data.tsx         # Server component for BlogStats data
└── blog-list-skeleton.tsx      # Loading skeleton
```

**Key Points:**
- **NOT route-based**: Don't create one `data.ts` file per route
- **Component-based**: Each client component gets its own server data file
- **Co-located**: Keep server data components with their corresponding client components

### Rule 4: Wrap Data Fetching in Suspense

**All server data components MUST be wrapped in Suspense boundaries.**

```typescript
<Suspense fallback={<BlogListSkeleton />}>
  <BlogListData filters={params} />
</Suspense>
```

**Benefits:**
- Enables React streaming server rendering
- Shows loading states while data loads
- Improves perceived performance
- Allows parallel data fetching with independent Suspense boundaries

---

## Pattern: Server Page Component

### Correct Implementation

**File: `src/app/blog/page.tsx`**
```typescript
import { Suspense } from 'react'
import { BlogListData } from '@/components/blog/blog-list-data'
import { BlogStatsData } from '@/components/blog/blog-stats-data'
import { BlogListSkeleton } from '@/components/blog/blog-list-skeleton'
import { BlogStatsSkeleton } from '@/components/blog/blog-stats-skeleton'

// Server Component - NO 'use client'
export default async function BlogPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string; page?: string }>
}) {
  // MUST await searchParams (Next.js 16 requirement)
  const params = await searchParams

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-8">Blog</h1>

      {/* Multiple independent Suspense boundaries for parallel streaming */}
      <Suspense fallback={<BlogStatsSkeleton />}>
        <BlogStatsData />
      </Suspense>

      <Suspense fallback={<BlogListSkeleton />}>
        <BlogListData category={params.category} page={params.page} />
      </Suspense>
    </div>
  )
}

// Generate metadata for SEO
export async function generateMetadata() {
  return {
    title: 'Blog Posts',
    description: 'Read our latest blog posts',
  }
}
```

### Incorrect Implementation (DO NOT DO THIS)

```typescript
// ❌ WRONG: Using 'use client' on page file
'use client'

export default function BlogPage() {
  // ❌ Can't use async server-side data fetching
  return <div>Blog</div>
}

// ❌ WRONG: Not awaiting searchParams
export default async function BlogPage({ searchParams }) {
  // searchParams is a Promise in Next.js 16
  const category = searchParams.category // ❌ TypeScript error!
  return <div>{category}</div>
}

// ❌ WRONG: No Suspense boundary
export default async function BlogPage() {
  const posts = await getBlogPosts() // ❌ Blocks entire page render
  return <div>{/* ... */}</div>
}
```

---

## Pattern: Server Data Component

### Correct Implementation

**File: `src/components/blog/blog-list-data.tsx`**
```typescript
import { client } from '@/sanity/lib/client'
import type { Post } from '@/sanity/types'
import { BlogList } from './blog-list'

interface BlogListDataProps {
  category?: string
  page?: string
}

// Server component - NO 'use client'
export async function BlogListData({ category, page = '1' }: BlogListDataProps) {
  const pageSize = 10
  const start = (Number.parseInt(page) - 1) * pageSize

  // GROQ query for Sanity CMS
  const query = category
    ? `*[_type == "post" && $category in categories[]->slug.current] | order(publishedAt desc) [$start...$end]`
    : `*[_type == "post"] | order(publishedAt desc) [$start...$end]`

  // Fetch data from Sanity
  const posts = await client.fetch<Post[]>(query, {
    category,
    start,
    end: start + pageSize,
  })

  // Render client component with data as props
  return <BlogList posts={posts} />
}
```

**File: `src/components/blog/blog-list.tsx`** (Client Component)
```typescript
'use client'

import { useState } from 'react'
import type { Post } from '@/sanity/types'

interface BlogListProps {
  posts: Post[]
}

export function BlogList({ posts }: BlogListProps) {
  const [search, setSearch] = useState('')

  // Client-side interactivity
  const filtered = posts.filter((post) =>
    post.title.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div>
      <input
        type="search"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Search posts..."
        className="w-full px-4 py-2 mb-6 border rounded-md"
      />

      <div className="grid gap-6">
        {filtered.map((post) => (
          <article key={post._id} className="p-6 border rounded-lg">
            <h2 className="text-2xl font-semibold mb-2">{post.title}</h2>
            <p className="text-gray-600 dark:text-gray-400">
              {post.publishedAt}
            </p>
          </article>
        ))}
      </div>
    </div>
  )
}
```

**File: `src/components/blog/blog-list-skeleton.tsx`** (Loading State)
```typescript
export function BlogListSkeleton() {
  return (
    <div className="grid gap-6">
      {Array.from({ length: 3 }).map((_, i) => (
        <div key={i} className="p-6 border rounded-lg animate-pulse">
          <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-3/4 mb-4" />
          <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/2 mb-2" />
          <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-full mb-2" />
          <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-5/6" />
        </div>
      ))}
    </div>
  )
}
```

---

## Pattern: Dynamic Routes with Params

**File: `src/app/blog/[slug]/page.tsx`**
```typescript
import { Suspense } from 'react'
import { notFound } from 'next/navigation'
import { BlogPostData } from '@/components/blog/blog-post-data'
import { BlogPostSkeleton } from '@/components/blog/blog-post-skeleton'

interface PageProps {
  params: Promise<{ slug: string }>
}

export default async function BlogPostPage({ params }: PageProps) {
  // MUST await params (Next.js 16 requirement)
  const { slug } = await params

  return (
    <article className="container mx-auto py-8">
      <Suspense fallback={<BlogPostSkeleton />}>
        <BlogPostData slug={slug} />
      </Suspense>
    </article>
  )
}

// Generate static params for SSG
export async function generateStaticParams() {
  const posts = await client.fetch<{ slug: string }[]>(
    `*[_type == "post"]{ "slug": slug.current }`
  )

  return posts.map((post) => ({
    slug: post.slug,
  }))
}

// Generate metadata dynamically
export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params
  const post = await client.fetch(
    `*[_type == "post" && slug.current == $slug][0]{ title }`,
    { slug }
  )

  return {
    title: post?.title || 'Post Not Found',
  }
}
```

**File: `src/components/blog/blog-post-data.tsx`**
```typescript
import { client } from '@/sanity/lib/client'
import { notFound } from 'next/navigation'
import type { Post } from '@/sanity/types'
import { BlogPostContent } from './blog-post-content'

interface BlogPostDataProps {
  slug: string
}

export async function BlogPostData({ slug }: BlogPostDataProps) {
  const query = `*[_type == "post" && slug.current == $slug][0] {
    _id,
    title,
    slug,
    publishedAt,
    author->,
    categories[]->,
    mainImage,
    body
  }`

  const post = await client.fetch<Post | null>(query, { slug })

  if (!post) {
    notFound()
  }

  return <BlogPostContent post={post} />
}
```

---

## Pattern: Multiple Streaming Sections

**File: `src/app/dashboard/page.tsx`**
```typescript
import { Suspense } from 'react'
import { StatsData } from '@/components/dashboard/stats-data'
import { RecentPostsData } from '@/components/dashboard/recent-posts-data'
import { CommentsData } from '@/components/dashboard/comments-data'
import { StatsSkeleton } from '@/components/dashboard/stats-skeleton'
import { RecentPostsSkeleton } from '@/components/dashboard/recent-posts-skeleton'
import { CommentsSkeleton } from '@/components/dashboard/comments-skeleton'

export default function DashboardPage() {
  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-8">Dashboard</h1>

      <div className="grid gap-6">
        {/* Each section streams independently */}
        <Suspense fallback={<StatsSkeleton />}>
          <StatsData />
        </Suspense>

        <Suspense fallback={<RecentPostsSkeleton />}>
          <RecentPostsData />
        </Suspense>

        <Suspense fallback={<CommentsSkeleton />}>
          <CommentsData />
        </Suspense>
      </div>
    </div>
  )
}
```

**File: `src/components/dashboard/stats-data.tsx`**
```typescript
import { client } from '@/sanity/lib/client'
import { StatsDisplay } from './stats-display'

export async function StatsData() {
  // Fetch stats data
  const stats = await client.fetch<{
    totalPosts: number
    totalViews: number
    totalComments: number
  }>(`{
    "totalPosts": count(*[_type == "post"]),
    "totalViews": sum(*[_type == "post"].views),
    "totalComments": count(*[_type == "comment"])
  }`)

  return <StatsDisplay stats={stats} />
}
```

**File: `src/components/dashboard/stats-display.tsx`** (Client Component)
```typescript
'use client'

import { useState } from 'react'

interface StatsDisplayProps {
  stats: {
    totalPosts: number
    totalViews: number
    totalComments: number
  }
}

export function StatsDisplay({ stats }: StatsDisplayProps) {
  const [view, setView] = useState<'grid' | 'list'>('grid')

  // Interactive UI with client-side state
  return (
    <div>
      <div className="flex gap-2 mb-4">
        <button
          onClick={() => setView('grid')}
          className={view === 'grid' ? 'font-bold' : ''}
        >
          Grid
        </button>
        <button
          onClick={() => setView('list')}
          className={view === 'list' ? 'font-bold' : ''}
        >
          List
        </button>
      </div>

      <div className={view === 'grid' ? 'grid grid-cols-3 gap-4' : 'space-y-4'}>
        <div className="p-4 border rounded-lg">
          <div className="text-2xl font-bold">{stats.totalPosts}</div>
          <div className="text-sm text-gray-600">Total Posts</div>
        </div>
        <div className="p-4 border rounded-lg">
          <div className="text-2xl font-bold">{stats.totalViews}</div>
          <div className="text-sm text-gray-600">Total Views</div>
        </div>
        <div className="p-4 border rounded-lg">
          <div className="text-2xl font-bold">{stats.totalComments}</div>
          <div className="text-sm text-gray-600">Total Comments</div>
        </div>
      </div>
    </div>
  )
}
```

---

## Pattern: Error Handling

**File: `src/app/blog/[slug]/error.tsx`**
```typescript
'use client' // Error components MUST be client components

export default function BlogPostError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (
    <div className="flex flex-col items-center justify-center min-h-[400px]">
      <h2 className="text-2xl font-bold mb-4">Something went wrong!</h2>
      <p className="text-gray-600 dark:text-gray-400 mb-6">
        {error.message}
      </p>
      <button
        onClick={reset}
        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        Try again
      </button>
    </div>
  )
}
```

**File: `src/app/blog/[slug]/not-found.tsx`**
```typescript
import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[400px]">
      <h2 className="text-2xl font-bold mb-4">Post Not Found</h2>
      <p className="text-gray-600 dark:text-gray-400 mb-6">
        Could not find the requested blog post.
      </p>
      <Link
        href="/blog"
        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        Back to Blog
      </Link>
    </div>
  )
}
```

---

## Pattern: TypeScript Type Safety

**File: `src/sanity/types.ts`**
```typescript
// Define Sanity content types
export interface Post {
  _id: string
  _type: 'post'
  title: string
  slug: { current: string }
  publishedAt: string
  author: Author
  categories: Category[]
  mainImage?: SanityImage
  body: PortableTextBlock[]
}

export interface Author {
  _id: string
  _type: 'author'
  name: string
  slug: { current: string }
  image?: SanityImage
  bio?: PortableTextBlock[]
}

export interface Category {
  _id: string
  _type: 'category'
  title: string
  slug: { current: string }
  description?: string
}

export interface SanityImage {
  asset: {
    _ref: string
    _type: 'reference'
  }
  alt?: string
}

export type PortableTextBlock = {
  _type: 'block'
  children: Array<{
    _type: 'span'
    text: string
    marks?: string[]
  }>
  style?: string
  markDefs?: Array<{
    _key: string
    _type: string
  }>
}
```

**Usage in server data components:**
```typescript
import { client } from '@/sanity/lib/client'
import type { Post } from '@/sanity/types'

export async function BlogListData() {
  // TypeScript enforces correct type
  const posts = await client.fetch<Post[]>(
    `*[_type == "post"] | order(publishedAt desc)`
  )

  return <BlogList posts={posts} />
}
```

---

## Exception: Sanity Studio Route

The `/studio` route is the **ONLY** route allowed to use client-side rendering.

**File: `src/app/studio/[[...tool]]/page.tsx`**
```typescript
/**
 * This route is responsible for the built-in authoring environment using Sanity Studio.
 * This is an EXCEPTION to the server component rule.
 */

import { NextStudio } from 'next-sanity/studio'
import config from '../../../../sanity.config'

export const dynamic = 'force-static'

export { metadata, viewport } from 'next-sanity/studio'

export default function StudioPage() {
  // NextStudio requires client-side rendering
  return <NextStudio config={config} />
}
```

**Why This Exception:**
- Sanity Studio is a React-based CMS UI that requires client-side interactivity
- Cannot be server-rendered
- This is the only acceptable use of client-side rendering for a page in this project

---

## Best Practices Summary

### DO ✅

- **Keep pages as server components** (no 'use client' on pages)
- **Always await params and searchParams** in Next.js 16
- **Create server data components** for each client component that needs data
- **Name server data files** `[component-name]-data.tsx`
- **Co-locate** server data components with client components in `src/components/`
- **Use Suspense boundaries** for all async data fetching
- **Show loading skeletons** while data loads
- **Define TypeScript types** for all Sanity content
- **Use client components** only for interactivity (forms, events, state)
- **Extract GROQ queries** to server data components
- **Handle errors** with error.tsx boundaries
- **Use generateStaticParams** for static generation of dynamic routes
- **Import Sanity client** from `@/sanity/lib/client`

### DON'T ❌

- **Add 'use client' to page files** (except /studio)
- **Access params/searchParams without awaiting** (Next.js 16 requirement)
- **Create route-based data.ts files** (use component-based pattern instead)
- **Inline GROQ queries in page components** (use server data components)
- **Fetch data without Suspense boundaries** (blocks rendering)
- **Block entire page render** waiting for data (use Suspense for streaming)
- **Mix data fetching with UI rendering** in same component (separate concerns)
- **Use client components unnecessarily** (server components are faster)
- **Forget to handle loading and error states** (poor UX)
- **Skip TypeScript types** (loses type safety)

---

## Performance Benefits

Following these patterns provides:

1. **Faster Initial Load**
   - Server components reduce client JS bundle size
   - Zero JavaScript sent for non-interactive components
   - Faster Time to First Byte (TTFB)

2. **Progressive Rendering**
   - Suspense enables streaming HTML
   - Users see content as it loads, not after everything loads
   - Perceived performance improvement

3. **Better User Experience**
   - Loading states show progress instead of blank screens
   - Multiple sections load in parallel
   - Faster interactions with optimized client components

4. **Improved SEO**
   - Server-rendered content is immediately available to crawlers
   - Better Core Web Vitals scores
   - Faster page indexing

5. **Optimal Caching**
   - Separate server data components enable better cache strategies
   - Static generation with generateStaticParams
   - Granular revalidation per component

6. **Type Safety**
   - TypeScript catches errors at build time
   - Autocomplete for Sanity content structure
   - Refactoring confidence

---

## Decision Log

### Decision 1: Server Components by Default

**Date**: 2025-12-23
**Context**: Next.js 16 with React 19 defaults to server components
**Decision**: All pages must be server components unless requiring client interactivity
**Rationale**:
- Reduces client JavaScript bundle size significantly
- Enables server-side data fetching with zero client overhead
- Better SEO and performance out of the box
- Aligns with Next.js 16 best practices and React 19 features
**Alternatives**: Could use 'use client' everywhere, but sacrifices performance
**Consequences**:
- Developers must think about server/client boundary
- Better default performance
- Clearer separation of concerns

### Decision 2: Component-Based Server Data Pattern

**Date**: 2025-12-23
**Context**: Need reusable, testable, granular data fetching
**Decision**: Create `[component-name]-data.tsx` server components per client component
**Rationale**:
- **Granular Suspense**: Each component can stream independently
- **Separation of Concerns**: Data fetching separate from UI rendering
- **Reusability**: Server data components can be reused across pages
- **Testability**: Data fetching logic isolated and testable
- **Co-location**: Server and client components live together
- **Scaling**: Clear 1:1 mapping (client component → server data component)
**Alternatives Considered**:
- Route-based data.ts files: Less granular, harder to stream independently
- Inline data fetching in pages: Blocks entire page render, no streaming
- Utility functions: Doesn't leverage React Server Components benefits
**Consequences**:
- More files to maintain (one per client component)
- Clearer architecture and responsibilities
- Better streaming and performance
- Easier to understand data flow

### Decision 3: Mandatory Suspense Boundaries

**Date**: 2025-12-23
**Context**: Enable React streaming and progressive rendering
**Decision**: All async server data components must be wrapped in Suspense
**Rationale**:
- Enables streaming server rendering (HTML sent as ready)
- Shows loading states automatically (better UX)
- Improves perceived performance significantly
- Allows parallel data fetching with independent Suspense boundaries
- Prevents blocking entire page render
**Alternatives**: Await all data at page level, but blocks entire render
**Consequences**:
- Requires loading skeleton components for each Suspense boundary
- Better user experience with progressive loading
- More complex component hierarchy
- Significant performance improvement

### Decision 4: Always Await Params/SearchParams

**Date**: 2025-12-23
**Context**: Next.js 16 changed params/searchParams to Promises
**Decision**: Must always await params and searchParams in Next.js 16 pages
**Rationale**:
- **Required by Next.js 16**: API change in framework
- TypeScript enforces this pattern (compile-time safety)
- Prevents runtime errors from accessing Promise properties
- Aligns with async server components paradigm
- Enables better prefetching and optimization by Next.js
**Alternatives**: None - this is a framework requirement
**Consequences**:
- Must remember to await in every page component
- TypeScript catches mistakes at build time
- Better alignment with React async components

---

## Troubleshooting

### Common Problems

**Problem 1: TypeScript error "Property 'slug' does not exist on type 'Promise'"**
```typescript
// ❌ WRONG
export default function Page({ params }) {
  const slug = params.slug // Error!
}

// ✅ CORRECT
export default async function Page({ params }) {
  const { slug } = await params // Fixed!
}
```

**Problem 2: "Cannot use 'use client' on page components"**
- **Cause**: Trying to add 'use client' to a page file
- **Solution**: Keep page as server component, move interactivity to client components in `src/components/`

**Problem 3: Entire page waits for data instead of streaming**
- **Cause**: Data fetching not wrapped in Suspense
- **Solution**: Create server data component and wrap in Suspense

**Problem 4: Can't figure out where to put data fetching logic**
- **Cause**: Unclear about component-based data pattern
- **Solution**:
  1. Identify which client component needs data
  2. Create `[component-name]-data.tsx` in same folder
  3. Fetch data and render client component

**Problem 5: Too many files being created**
- **Cause**: Creating server data components for everything
- **Solution**: Only create server data components for client components that need data

---

## Related Documentation

### External Resources
- [Next.js 16 Server Components](https://nextjs.org/docs/app/building-your-application/rendering/server-components)
- [Next.js 16 Loading UI](https://nextjs.org/docs/app/building-your-application/routing/loading-ui-and-streaming)
- [React Suspense](https://react.dev/reference/react/Suspense)
- [Sanity GROQ Queries](https://www.sanity.io/docs/groq)

### Internal Documentation
- [Tech Stack](./tech-stack.md) - Technology details
- [System Overview](./system-overview.md) - Architecture overview
- [CLAUDE.md](../../CLAUDE.md) - Development guidelines

---

**Last Reviewed**: 2025-12-23
**Review Schedule**: Update when Next.js or React patterns change
**Owner**: Team
