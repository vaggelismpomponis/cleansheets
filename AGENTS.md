<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

<!-- BEGIN:design-system-rules -->
# Design System — Ephtopia Cleans

## Brand Colors (defined in `app/globals.css` and `lib/content.ts`)

Always use these CSS variables / Tailwind color tokens — never hard-code hex values.

| Token | Value | Usage |
|---|---|---|
| `bg-navy` / `text-navy` | `#0C1926` | Primary dark background, headings |
| `bg-navy-light` | `#162336` | Cards on dark backgrounds |
| `text-teal` / `bg-teal` | `#10B981` | Accent, CTAs, active states |
| `text-teal-dark` / `bg-teal-dark` | `#059669` | CTA hover state |
| `text-gold` / `bg-gold` | `#C9A84C` | Secondary accent (benefits, stars) |
| `text-muted` | `#5F6B7A` | Body / secondary text |
| `text-muted-light` | `#8A94A1` | Placeholder, tertiary text |
| `bg-warm-white` | `#F8FAFC` | Light section backgrounds |
| `border-border` | `#E2E4E8` | Card borders |

## Page Section Patterns

### Dark hero sections (e.g. `/careers`, `/services`)
```tsx
<section className="relative bg-navy overflow-hidden pt-32 pb-20">
  <div className="absolute inset-0 grid-pattern opacity-60" />
  {/* teal glow blob */}
  <div className="absolute -top-20 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-teal/10 rounded-full blur-3xl pointer-events-none" />
  <div className="relative max-w-4xl mx-auto px-4 sm:px-6 text-center">
    <h1 className="text-white font-heading font-extrabold">
      Title <span className="gradient-text">Accent</span>
    </h1>
  </div>
</section>
```

### Light content sections
```tsx
<section className="section-padding bg-warm-white">
  <div className="max-w-5xl mx-auto px-4 sm:px-6">...</div>
</section>
```

### Section label (small uppercase tag above headings)
```tsx
<div className="inline-flex items-center gap-2 bg-teal/15 border border-teal/25 rounded-full px-4 py-1.5 mb-6">
  <span className="w-1.5 h-1.5 rounded-full bg-teal animate-pulse" />
  <span className="text-xs font-semibold text-teal tracking-wider uppercase">Label Text</span>
</div>
```

### CTA buttons
```tsx
{/* Primary */}
<button className="bg-teal hover:bg-teal-dark text-white font-bold px-6 py-3 rounded-xl text-sm transition-all hover:shadow-lg hover:shadow-teal/20 hover:-translate-y-0.5">
  Κείμενο CTA
</button>

{/* Secondary / ghost */}
<button className="border border-border text-navy hover:border-teal/40 hover:text-teal font-semibold px-6 py-3 rounded-xl text-sm transition-all">
  Κείμενο
</button>
```

## CSS Utilities (defined in `app/globals.css`)

| Class | What it does |
|---|---|
| `.gradient-text` | Teal gradient on text |
| `.gradient-text-gold` | Gold gradient on text |
| `.section-padding` | Responsive vertical padding (5rem → 8rem) |
| `.glass` | White glassmorphism |
| `.glass-dark` | Dark glassmorphism |
| `.card-hover` | translateY(-2px) + shadow on hover |
| `.grid-pattern` | Subtle dot grid for dark sections |
| `.section-label` | Small teal uppercase label with leading line |
| `.animated-gradient-line` | Animated teal/gold gradient bar |

## Typography

- **Headings**: `font-heading` → Manrope (`--font-manrope`)
- **Body**: `font-body` / `font-sans` → Source Sans 3 (`--font-source-sans`)
- All text content is in **Greek** by default.

## Server Actions constraint (`'use server'` files)

Files with `'use server'` at the top can **only export `async function`s**.
Do NOT export:
- `const`, `interface`, `type`, `class`, Zod schemas, enums, or any non-function value.

Move shared types/schemas to a separate file (e.g. `lib/types/jobs.ts`) if they need to be imported elsewhere.

## Database / Supabase

- Supabase client for **public reads**: `lib/supabase/client.ts` (browser) / `lib/supabase/server.ts` (RSC)
- Supabase **service-role** client (bypasses RLS): `lib/supabase/admin.ts` — **server-only**
- New tables need: RLS enabled, a public read policy, and an authenticated write policy.
- All schema migrations go in `lib/supabase/migrations/`.
- After schema changes, add `revalidatePath(...)` calls in the relevant server actions.
<!-- END:design-system-rules -->
