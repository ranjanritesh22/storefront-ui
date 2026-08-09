# @storefront/ui

A standalone, publishable UI + theming package for Next.js e-commerce storefronts — the
Next.js equivalent of `@spartacus/styles` + Spartacus UI components.

You install it into a Next.js app you own. It ships React components, a two-tier design-token
system, and a precompiled stylesheet. It never fetches data, never talks to a backend, and
never assumes routing or auth — that's your app's job. See [`ARCHITECTURE.md`](ARCHITECTURE.md)
for the full reasoning; this README gets you running.

## What's in here

| Package / app | What it is |
|---|---|
| [`packages/tokens`](packages/tokens) | `@storefront/tokens` — design tokens + themes, no React |
| [`packages/ui`](packages/ui) | `@storefront/ui` — the React components |
| `apps/demo-storefront` | A Next.js app consuming the packages like a real customer would |
| `apps/docs` | Storybook — the living component reference, at `:6006` |

## 60-second quickstart

Install both packages in your Next.js app:

```bash
pnpm add @storefront/ui @storefront/tokens
```

Import the token stylesheet and the component stylesheet once, at your app root:

```css
/* app/globals.css */
@import "@storefront/tokens/tokens.css";
@import "@storefront/ui/styles.css";
```

Use a component:

```tsx
import { Button } from "@storefront/ui";

export function AddToCart() {
  return <Button variant="primary">Add to cart</Button>;
}
```

That's the entire setup — no Tailwind install, no build config, no provider to wrap your app
in. Full walkthrough (including error cases): [`docs/getting-started.md`](docs/getting-started.md).

## Working in this repo

```bash
pnpm install
pnpm dev            # every package in watch mode + the demo app
pnpm storybook      # component reference at :6006
pnpm demo           # demo storefront at :3000
pnpm build && pnpm typecheck && pnpm test
```

## Documentation map

| Doc | Read it when you want to... |
|---|---|
| [`docs/getting-started.md`](docs/getting-started.md) | Install the package and render your first component |
| [`docs/theming.md`](docs/theming.md) | Rebrand, add dark mode, or support multiple brands |
| [`docs/overriding.md`](docs/overriding.md) | Change how a specific component looks or is structured |
| [`docs/contributing.md`](docs/contributing.md) | Add or modify a component in this repo |
| [`docs/faq.md`](docs/faq.md) | Answer a specific "why does X work this way" question |
| [`ARCHITECTURE.md`](ARCHITECTURE.md) | Understand *why* the package is built this way |
| Storybook (`pnpm storybook`) | See every component, its variants, and three live styling examples per component |

## Non-goals

No data fetching, no backend/commerce-API types, no routing, no auth, no business logic, no
app-specific pages. If you need one of those, it belongs in your storefront app, not here.
