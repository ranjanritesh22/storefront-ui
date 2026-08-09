# CLAUDE.md — Storefront UI Package

Context file for Claude Code. Place at the monorepo root. Read `ARCHITECTURE.md` before any
task; it holds the reasoning behind everything below.

---

## What this repo is

A **standalone, publishable UI + theming package** for Next.js e-commerce storefronts —
the Next.js equivalent of `@spartacus/styles` + Spartacus UI components.

Consumers are **other Next.js apps** built by other developers on the team. They install our
packages and build their storefront with them. They never fork us.

**Non-goals:** no data fetching, no backend/commerce-API types, no routing, no auth, no
business logic, no app-specific pages. If a task asks for any of those, it belongs in the
storefront app, not here. Say so.

---

## Stack

- pnpm workspaces + Turborepo
- TypeScript strict, React 19, Next.js 15 (App Router) for demo/docs apps only
- Tailwind CSS **v4** (CSS-first config — no `tailwind.config.js`; use `@theme` / `@theme inline`)
- `class-variance-authority`, `clsx`, `tailwind-merge` v3
- Radix UI primitives (`@radix-ui/react-slot` and per-component packages)
- `tsup` + `esbuild-plugin-preserve-directives` for builds
- Storybook 8 for docs, Vitest + Testing Library for tests

> Tailwind v4 differs substantially from v3. Verify current syntax rather than relying on
> pre-v4 patterns. If unsure about an API, say so instead of guessing.

---

## Layout

```
packages/tokens/       @storefront/tokens   design tokens + themes, no React
packages/ui/           @storefront/ui       React components
packages/tsconfig/     shared TS config (private)
apps/demo-storefront/  Next.js app consuming the packages as a real customer would
apps/docs/             Storybook
```

Component folder (the only shape allowed):

```
packages/ui/src/components/<name>/
  <name>.tsx           component
  <name>.variants.ts   CVA definition, publicly exported
  <name>.stories.tsx   Storybook
  <name>.test.tsx      Vitest
  index.ts             re-exports
```

Adding a component touches **only** its own folder plus one line in `packages/ui/src/index.ts`.

Three cross-cutting subsystems live outside the per-component folders — every component reads
from these instead of hardcoding an icon, a string, or an `<img>`:

```
packages/ui/src/components/icon/    Icon primitive + the ~40-icon default registry (its own
                                     component folder — same five-file shape)
packages/ui/src/components/image/   Image primitive + the <img> fallback (same shape)
packages/ui/src/i18n/messages.ts    English default copy, namespaced per component
packages/ui/src/types/product.ts    ProductSummary — the domain-agnostic product shape
packages/ui/src/config.ts           configureStorefrontUI() — one-call wrapper around the
                                     three configure*() registries below
```

---

## Hard rules

1. **No literal design values in components.** No hex, rgb, px font sizes, arbitrary spacing.
   Semantic tokens only (`--ui-color-primary`, not `--ui-blue-600`, never `#0057b8`).
   If a needed token doesn't exist, add it to `packages/tokens` and explain why.
2. **`"use client"` is opt-in, not default.** Only for state, effects, refs-on-mount, or
   browser APIs. `Card`, `Badge`, `Price` must stay Server Components.
3. **Every component:** `forwardRef`, spreads `...props` onto the root element, accepts
   `className` merged **last** via `cn()`, and supports `asChild` where an element swap is
   plausible (buttons, links, wrappers).
4. **Layer order is sacred.** `@layer theme, base, ui-components, utilities;` — never move it,
   never use `!important` to win a specificity fight. If an override doesn't apply, the layer
   setup is wrong; fix that instead.
5. **Composite components expose `classNames` (slot map) and `slots` (component map)** — not a
   single `className` that can only reach the root.
6. **State goes on `data-*` attributes**, e.g. `data-state="open"`, `data-loading="true"`,
   `data-variant="danger"`. Consumers style against these.
7. **Logical properties only** (`ps-`, `pe-`, `ms-`, `me-`, `start-`, `end-`) — RTL is required.
8. **React is a peerDependency.** Never a direct dependency. Never bundled.
9. **Accessibility floor:** visible focus-visible ring, full keyboard operation, correct roles
   and labels, `prefers-reduced-motion` honoured. Verify by keyboard, not by assumption.
10. **Public API is a contract.** Removing/renaming a token, variant, or prop is a breaking
    change — call it out in the response, don't do it silently.
11. **No raw `<svg>` icon and no hardcoded icon choice in a component.** Render catalog icons
    via `<Icon name="...">` (`packages/ui/src/components/icon`). This is what lets a consumer
    re-skin the whole icon set with one `configureIcons()` call to match a client's design
    language — a real, recurring requirement, not a hypothetical. Add a new glyph to the
    registry rather than inlining an `<svg>` in a component. A one-off decorative icon that will
    never appear in the registry (not reused, not swappable) is the one exception — say so if
    you reach for it.
12. **No hardcoded user-facing string in a component** — no button text, aria-label, placeholder,
    or pluralized copy. Every string a shopper reads or a screen reader announces comes from
    `getMessages()` (`packages/ui/src/i18n/messages.ts`), with the component's own prop (if any)
    winning over the dictionary. Add the string to `StorefrontMessages`/`defaultMessages` (English)
    rather than typing it inline. This package still has zero i18n-framework dependency — the
    dictionary is a plain object, not a translation library.
13. **No raw `<img>` in a component.** Render every image through `<Image>`
    (`packages/ui/src/components/image`) — defaults to a plain `<img>`, but lets a Next.js
    consumer swap in `next/image` globally via `configureImageComponent()` without this package
    depending on Next.js or pinning a Next version.
14. **Domain-agnostic props only.** No SAP Commerce/OCC types, no backend response shapes, no
    `any`-typed "just pass through what the API gives you" props. Define a minimal prop
    interface for the domain concept you need (see `ProductSummary` in
    `packages/ui/src/types/product.ts`: `id`, `name`, `price`, `image`, `url`, ...) and document
    an adapter — a small function in the *consumer's* code mapping their API response onto it
    (see product-card.mdx). This package never owns that mapping logic; owning it would violate
    the "no backend/commerce-API types" non-goal above.

`configureIcons()`, `configureMessages()`, and `configureImageComponent()` (or the
`configureStorefrontUI()` wrapper covering all three) share one shape on purpose: a plain
module-level registry, not a React Context. Reading one is a bare function/object lookup, so a
component using it needs no hook and stays a Server Component if it was one — the same reason
ARCHITECTURE.md §4 rules out a Context-based registry for whole-component replacement. Call them
once, at module scope in the consumer's app (e.g. imported for its side effect at the top of
`app/layout.tsx`) — they hold process-wide state correct for one icon set / one language / one
image strategy per build or deployment, not per-request state. A single server process that must
serve multiple languages per request should pass the relevant strings as explicit props per
instance instead of relying on `configureMessages()`.

---

## Definition of done for a component

- [ ] Folder shape above, all five files present
- [ ] Variants in `*.variants.ts`, exported from the package barrel
- [ ] `className` override verified to win (test asserts it)
- [ ] Token-only styling — no literals (grep before finishing)
- [ ] No hardcoded user-facing string — every one comes from `getMessages()` (grep for quoted
      text in JSX/aria-label/placeholder before finishing)
- [ ] No raw `<svg>` icon — routed through `<Icon name="...">`; no raw `<img>` — routed through
      `<Image>`
- [ ] If the component takes a "product"/domain object, it's a minimal prop interface (see
      `ProductSummary`), not a backend response type
- [ ] `"use client"` present only if genuinely required
- [ ] Keyboard + screen-reader semantics checked
- [ ] Story with a controls table and an "Overriding this component" doc block
- [ ] Rendered in `apps/demo-storefront` under all three brand themes
- [ ] `pnpm build && pnpm typecheck && pnpm test` clean

---

## Commands

```bash
pnpm dev            # all packages in watch mode + demo app
pnpm --filter @storefront/ui build
pnpm storybook      # docs at :6006
pnpm demo           # demo storefront at :3000
pnpm typecheck
pnpm test
pnpm lint
```

---

## Build hazards to actively guard against

- **`"use client"` stripping.** Bundlers drop it. After any build change, confirm the directive
  survives into `dist/`. There is a CI check (`scripts/check-directives.mjs`) — keep it passing.
  Symptom if broken: consumer app throws on hooks in a Server Component tree.
- **Duplicate React.** Caused by React landing in `dependencies` or not being `external` in
  tsup. Symptom: "Invalid hook call".
- **CSS not shipped.** `dist/styles.css` must exist and be listed in `exports` and `files`.
- **`sideEffects`** must be `["*.css"]` — `false` drops the stylesheet, `true` kills tree-shaking.

---

## How to work in this repo

- Prefer a small vertical slice (one component, fully done) over many half-built ones.
- Before adding a dependency, justify it. This package's weight is a feature of it.
- When a request conflicts with the rules above, say so and propose the compliant alternative
  rather than quietly bending the rule.
- If you're unsure whether an API exists in Tailwind v4 / Next 15 / React 19, say you're unsure
  and check — do not invent config keys.
- Never mark a task done without running `pnpm build && pnpm typecheck && pnpm test`.