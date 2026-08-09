# Storefront UI Package — Architecture

> The styling + theming package for a Spartacus-equivalent storefront built in Next.js.
> This document explains **what we are building and why**. Read this before writing code.

---

## 1. The problem

Spartacus (Angular) ships storefront UI as a set of npm packages. `@spartacus/styles` owns
all presentation: SCSS variables, `cx-` prefixed component styles, theme layers, and an
override model where a storefront app redefines SCSS variables/CSS custom properties before
importing the library.

We need the same capability in Next.js, with three hard constraints from the assignment:

| Constraint | What it means concretely |
|---|---|
| **Independent** | The package must not know anything about the storefront app — no app imports, no backend types, no routing assumptions. It can be published, versioned and consumed by any Next.js app. |
| **Easy to override** | A storefront dev must be able to rebrand without forking, and restyle a single component without CSS specificity wars. |
| **Scalable** | Adding component #80 must cost the same as adding component #8. No central file that every component edits. |
| **Low complexity to consume** | Day-1 experience is: install, import one CSS file, import a component. No build config required. |

---

## 2. Stack decision

### Options considered

| Approach | Consumer setup cost | Override ergonomics | RSC / App Router | Verdict |
|---|---|---|---|---|
| **SCSS + BEM** (literal Spartacus port) | Consumer needs Sass + variable-override entry file | Override = redeclare `$vars` and recompile → forces consumer build coupling | Fine | ❌ Couples consumer to our build |
| **CSS-in-JS** (Emotion, styled-components) | Provider + SSR registry setup | Excellent (theme object) | ❌ Runtime, breaks Server Components, hurts TTFB | ❌ Wrong for Next 15 |
| **Vanilla Extract** | Consumer needs the VE bundler plugin | Good, type-safe | ✅ zero-runtime | ⚠️ Good, but adds mandatory build config |
| **CSS Modules + CSS variables** | Zero | Token override easy; per-component override fights specificity | ✅ | ⚠️ Safe but weak variant story |
| **Tailwind v4 + CSS variables + CVA** ✅ | Zero (ship precompiled CSS) | Best: tokens → variants → `className` → slots | ✅ | ✅ **Chosen** |

### Chosen: Tailwind CSS v4 (precompiled) + CSS custom-property token layer + CVA + Radix primitives

**Why:**

1. **Zero-config consumption.** We compile our Tailwind to a single static `styles.css`. The
   consumer app does **not** need Tailwind installed. `import "@storefront/ui/styles.css"` is
   the entire setup. This is the "no complexity" requirement.
2. **Tailwind is optional, not required.** If the consumer *does* use Tailwind, their utility
   classes automatically win over ours because of CSS layer ordering (see §4.3), and
   `tailwind-merge` de-duplicates conflicts. Both audiences are served by one artifact.
3. **CSS custom properties are already the Spartacus mental model.** Spartacus exposes
   `--cx-color-primary` etc. Our token layer is `--ui-color-primary`. A migrating SAP dev
   recognises the pattern immediately.
4. **CVA gives typed variants** (`variant`, `size`, `tone`) without inventing a config DSL.
5. **Radix primitives** give us accessibility (focus trap, roving tabindex, ARIA) for free, and
   `asChild` gives consumers element-level control (e.g. render a `Button` as `next/link`).

**Honest trade-offs of this choice:**

- Long `className` strings in component source. Mitigated by keeping variants in a separate
  `*.variants.ts` file per component.
- Consumers who want deep utility-level customisation get the best experience if they *also*
  run Tailwind. Consumers who don't are limited to tokens + their own CSS. That's an
  acceptable ceiling, and it matches how shadcn/Radix-based systems are shipped in practice.
- We are betting on Tailwind v4's CSS-first config. If the team vetoes Tailwind, the fallback
  is **CSS Modules + the same token layer** — §3 and §4.1/§4.4 survive unchanged. The token
  architecture is the durable part; Tailwind is the replaceable part.

---

## 3. Package topology

Split into three published packages plus two local apps. The split matters: tokens must be
consumable by teams who want *only* branding (e.g. an email template, a native app) without
pulling React.

```
storefront-ui/                       ← monorepo root (pnpm workspaces + Turborepo)
├── packages/
│   ├── tokens/            @storefront/tokens   — design tokens, themes. No React.
│   ├── ui/                @storefront/ui       — React components. Depends on tokens.
│   └── tsconfig/          @storefront/tsconfig — shared TS config (private)
└── apps/
    ├── demo-storefront/   Next.js 15 app that consumes the packages like a real customer
    └── docs/              Storybook — living component documentation
```

### Why tokens are a separate package
- A brand team can version and ship `@storefront/tokens@2.0.0` (a rebrand) without touching
  component code.
- It forces the discipline that **no hex value ever appears inside a component file**. If a
  component needs a colour that isn't a token, the token set is incomplete — that's the signal.

### `@storefront/ui` internal structure

```
packages/ui/src/
├── styles/
│   ├── index.css            # @import tailwindcss + @theme mapping + component layer
│   └── layers.css           # @layer declaration order (critical — see §4.3)
├── lib/
│   ├── cn.ts                # clsx + tailwind-merge
│   └── slot.ts              # re-export @radix-ui/react-slot
├── components/
│   └── button/
│       ├── button.tsx           # component (RSC-safe unless it needs state)
│       ├── button.variants.ts   # CVA definition — exported publicly
│       ├── button.stories.tsx   # Storybook docs
│       ├── button.test.tsx
│       └── index.ts
├── hooks/                   # headless logic, e.g. useQuantity, useDisclosure
└── index.ts                 # barrel — re-exports every component + variants + types
```

**One folder per component. Nothing outside that folder changes when a component is added**
(except one line in `index.ts`). That is the scalability property.

---

## 4. The override model — the core of this package

Five layers, cheapest first. A consumer should almost always solve their problem at layer 1 or 3.

### Layer 1 — Tokens (rebranding, ~80% of real requests)

Two tiers, and the distinction is not decorative:

```css
/* tier 1: primitives — raw palette. Rarely referenced directly. */
--ui-blue-600: oklch(0.55 0.18 258);
--ui-gray-100: oklch(0.96 0 0);

/* tier 2: semantic — what components actually consume. */
--ui-color-primary:          var(--ui-blue-600);
--ui-color-primary-fg:       white;
--ui-color-surface:          white;
--ui-color-border:           var(--ui-gray-200);
--ui-color-danger:           var(--ui-red-600);
--ui-radius-md:              0.5rem;
--ui-space-4:                1rem;
--ui-font-sans:              "Inter", system-ui, sans-serif;
--ui-shadow-card:            0 1px 3px oklch(0 0 0 / 0.1);
```

Components **only ever reference tier 2**. A rebrand is then:

```css
/* consumer: app/globals.css */
@import "@storefront/ui/styles.css";

:root {
  --ui-color-primary: #c8102e;   /* client brand red */
  --ui-radius-md: 0;             /* sharp corners */
  --ui-font-sans: "Electrolux Sans", sans-serif;
}
```

No rebuild of our package. No forking. Theming (dark mode, multi-brand) is the same mechanism
scoped to an attribute:

```css
[data-theme="dark"]  { --ui-color-surface: oklch(0.2 0 0); ... }
[data-brand="acme"]  { --ui-color-primary: #ff6b00; ... }
```

> **Rule:** if a design change can't be expressed as a token override, ask whether the token
> set is missing a token before writing bespoke CSS.

### Layer 2 — Variants (CVA)

Every component exports its CVA object publicly:

```ts
export const buttonVariants = cva(base, {
  variants: {
    variant: { primary: "...", secondary: "...", ghost: "...", danger: "..." },
    size:    { sm: "...", md: "...", lg: "...", icon: "..." },
  },
  defaultVariants: { variant: "primary", size: "md" },
});
```

A consumer can build their own component on top of our styling without using our component:

```tsx
<a className={buttonVariants({ variant: "secondary" })} href="/cart">Cart</a>
```

### Layer 3 — `className` merge (single-component tweaks)

Every component accepts `className`, merged through `cn()` (clsx + `tailwind-merge`) **last**,
so the consumer always wins on conflicting utilities:

```tsx
<Button className="rounded-full px-8">Checkout</Button>
```

For compound components, expose a `classNames` slot map instead of one blunt `className`:

```tsx
<ProductCard classNames={{ root: "...", image: "...", price: "...", cta: "..." }} />
```

### Layer 4 — Slots & `asChild` (structural change)

`asChild` (Radix Slot) lets the consumer control the rendered element — critical in Next.js
where a button must often *be* a `next/link`:

```tsx
<Button asChild><Link href="/cart">Go to cart</Link></Button>
```

Composite components accept a `slots` prop to replace an internal part:

```tsx
<ProductCard slots={{ Price: MyCustomPrice, Badge: MyBadge }} />
```

### Layer 5 — Whole-component replacement

Spartacus solves this with runtime component mapping / outlets. **We should not copy that
directly.** A React Context registry forces every consuming component to be a Client
Component, which kills Server Components for the whole tree — a real cost in Next.js App
Router that Angular never had to pay.

**Recommended:** build-time aliasing in the consumer's `next.config.ts`:

```ts
// swap our Button for theirs, everywhere, zero runtime cost
resolveAlias: { "@storefront/ui/components/button": "./src/ui/my-button" }
```

This requires subpath exports (§5), which we ship anyway.

Provide a runtime `UIProvider` registry **only** if the team later needs per-tenant swapping
in a single deployment. Document it as the escape hatch, not the default. Flag this to your
lead explicitly — it's the one place where we deliberately diverge from Spartacus, and the
reason is Server Components.

---

## 5. Build & packaging

### Bundler: `tsup` + `esbuild-plugin-preserve-directives`

The non-obvious hazard: bundlers strip the `"use client"` directive. If it's stripped, an
interactive component silently breaks in a consumer's Server Component tree. Configure
directive preservation and **verify it** by grepping `dist/` in CI.

```ts
// tsup.config.ts
export default defineConfig({
  entry: ["src/index.ts", "src/components/*/index.ts"],
  format: ["esm"],
  dts: true,
  splitting: true,
  treeshake: true,
  external: ["react", "react-dom", "next"],
  esbuildPlugins: [preserveDirectives()],
});
```

`bunchee` is a valid alternative — it handles directives natively with less config. Either is
defensible; pick one and don't mix.

### CSS build
Compile `src/styles/index.css` with the Tailwind CLI to `dist/styles.css`. Ship it as a real
file so the consumer's `import "@storefront/ui/styles.css"` needs no plugin.

### Exports map

```jsonc
{
  "sideEffects": ["*.css"],
  "exports": {
    ".":                     { "types": "./dist/index.d.ts", "import": "./dist/index.js" },
    "./components/*":        { "types": "./dist/components/*/index.d.ts", "import": "./dist/components/*/index.js" },
    "./styles.css":          "./dist/styles.css",
    "./tailwind-preset.css": "./dist/tailwind-preset.css"
  },
  "peerDependencies": { "react": ">=18", "react-dom": ">=18" }
}
```

- Subpath exports enable tree-shaking **and** the layer-5 aliasing above.
- `sideEffects` marks only CSS as side-effectful so unused components are dropped.
- React must be a **peer** dependency. Bundling React causes duplicate-React hook crashes.

### CSS layer ordering (§4.3 mechanism)

Declare the cascade order once, before anything else:

```css
@layer theme, base, ui-components, utilities;
```

Our component styles live in `ui-components`; Tailwind utilities (ours *and* the consumer's)
live in `utilities`, which is declared last and therefore wins. This is what makes
`className="px-8"` reliably override our padding **without `!important` and without
specificity hacks**. It is the single most important line of CSS in the package.

---

## 6. Conventions (non-negotiable, enforced in review)

1. No hard-coded colour, spacing, radius, font or shadow value in a component. Tokens only.
2. `"use client"` only on components that genuinely need state, effects, or event handlers.
   `Button` with an `onClick` prop is fine as a client component; `Card` is not.
3. Every component: `forwardRef`, spreads `...props` to the root element, accepts `className`,
   supports `asChild` where an element swap is plausible.
4. Expose state as `data-*` attributes (`data-state="open"`, `data-loading`), never as
   internal-only classes. Consumers style against `data-*` reliably.
5. Logical CSS properties (`ps-4`, `me-2`) not physical (`pl-4`, `mr-2`) — the storefront will
   need RTL.
6. Accessibility floor: visible focus ring, keyboard operable, correct roles, `prefers-reduced-motion`
   respected. Test with keyboard before opening the PR.
7. Every component ships with a story and a test in the same folder.
8. Semantic versioning is real: removing a token or a variant is a **breaking** change.

---

## 7. Demo scope (foundation phase)

Enough components to prove all five override layers work end-to-end — not a full catalogue.

| Component | Proves |
|---|---|
| `Button` | CVA variants, `asChild`, className merge |
| `Input` + `FormField` | data-state styling, error tokens, a11y wiring |
| `Badge` | pure token consumption |
| `Card` | Server Component (no `"use client"`) |
| `Price` | locale/currency formatting as headless logic |
| `QuantityStepper` | client state + `useQuantity` hook split |
| `ProductCard` | composite: `slots`, `classNames` map |
| `Dialog` | Radix wrapper, portal, focus trap |

Plus in `apps/demo-storefront`: a PLP grid and a mini PDP, rendered **three times** under
`data-brand="default" | "acme" | "dark"` from the same component code. That single screen is
the argument you make to your lead — it demonstrates the whole value proposition without
words.

---

## 8. Known risks

- **Tailwind v4 is CSS-first config.** Much v3 guidance online is wrong for v4 (`tailwind.config.js`
  is largely gone; use `@theme` / `@theme inline`). Verify against current docs, don't trust
  memory or older blog posts.
- **Directive stripping** (see §5) is the most likely silent production bug. Add the CI grep.
- **Token sprawl.** If tier-2 tokens grow past ~60, the semantic layer is being used as a
  dumping ground. Review it.
- **Over-engineering the registry.** Ship layers 1–4 first. Layer 5 runtime registry only on
  demonstrated need.
- **Licensing.** Spartacus is Apache-2.0. Emulating its architecture and patterns is fine;
  copying source verbatim requires attribution. Keep our implementation original.