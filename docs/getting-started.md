# Getting started

For a developer who has never seen this repo. Twenty minutes, start to finish: install, one
CSS import, first component, and the setup mistakes that cost people time.

## 1. Install

```bash
pnpm add @storefront/ui @storefront/tokens
# or: npm install / yarn add
```

`react` and `react-dom` (>=18) are peer dependencies — `@storefront/ui` never bundles its own
React, so if your Next.js app already has React installed (it does), you're done here.

You do **not** need to install Tailwind CSS. `@storefront/ui` ships a precompiled
`dist/styles.css` — Tailwind is an implementation detail of how *we* build the package, not a
requirement for you to consume it. See [`docs/faq.md`](faq.md#do-i-need-tailwind) if you're
curious why utility classes still work for you if you *do* run Tailwind.

## 2. The one CSS import

Import two stylesheets, once, at your app's root — this is the entire setup:

```css
/* app/globals.css */
@import "@storefront/tokens/tokens.css";
@import "@storefront/ui/styles.css";
```

```tsx
// app/layout.tsx
import "./globals.css";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
```

Order matters: tokens first, component styles second. `tokens.css` defines the `--ui-*`
custom properties that every component's compiled CSS reads — importing it after
`styles.css` still works (CSS custom properties resolve at paint time, not import time), but
tokens-first matches every example in this repo and in Storybook, so keep it that way.

If you want dark mode or the example brand theme, add their stylesheets too — see
[`docs/theming.md`](theming.md) for the full picture:

```css
@import "@storefront/tokens/themes/dark.css";
@import "@storefront/tokens/themes/acme.css";
```

## 3. First component

```tsx
import { Button } from "@storefront/ui";

export function AddToCartButton() {
  return (
    <Button variant="primary" size="lg">
      Add to cart
    </Button>
  );
}
```

Render your app. You should see a filled, rounded button in your brand blue with a visible
focus ring on Tab. If you see an unstyled `<button>` with browser defaults, see
[Common setup errors](#common-setup-errors) below — you're almost always missing the CSS
import, not doing something wrong in the component usage.

Every component is a named export from the package root:

```tsx
import { Button, Card, CardHeader, CardTitle, CardContent, Badge, Price } from "@storefront/ui";
```

...or from its own subpath, if you want smaller import graphs during development:

```tsx
import { Button } from "@storefront/ui/components/button";
```

## 4. Next stop

- Need to match your brand's colours? [`docs/theming.md`](theming.md).
- Need to change how one specific component looks or behaves?
  [`docs/overriding.md`](overriding.md).
- Want to see every component with live controls?
  `pnpm storybook` from the repo, or your team's hosted Storybook URL.

## Common setup errors

**Everything renders unstyled (plain browser button/input, no colours, no spacing).**
You didn't import `@storefront/ui/styles.css`, or you imported it in a file that never
actually loads (a CSS module that isn't imported by any rendered route, a layout that isn't
your root layout). Confirm the import is in a file that's part of every page's render tree —
`app/globals.css` imported from the root `app/layout.tsx` is the safe default.

**Colours are there but everything is default blue — my token overrides aren't applying.**
You're overriding tier-2 tokens (`--ui-color-primary`, etc.) in a stylesheet that's imported
*before* `@storefront/tokens/tokens.css`, or your override selector has lower specificity than
you think. Token overrides on `:root` always work regardless of import order (custom
properties resolve at paint time) — if they're not applying, check for a typo in the token
name first (`--ui-color-primary`, not `--ui-primary-color`), then see
[`docs/faq.md`](faq.md#why-isnt-my-override-applying).

**"Invalid hook call" or "Cannot read properties of null (reading 'useState')".**
Duplicate React in your dependency tree — usually a monorepo/lockfile issue where your app and
`@storefront/ui` resolve to two different copies of `react`. Run `pnpm why react` (or the
npm/yarn equivalent) and dedupe. This is not something `@storefront/ui` can misconfigure on
its own: React is a peer dependency, never bundled (see `ARCHITECTURE.md` §5).

**A component throws when rendered inside a Server Component, or you get a
"useState only works in a Client Component" error.**
You're trying to use a component that needs client interactivity (`QuantityStepper`,
`Dialog`) without an intervening `"use client"` boundary somewhere in your own tree that
requires it — but note the component itself already carries `"use client"`, so this is more
often a sign you *forked* or re-exported the component incorrectly. If it happens on a
component that's documented as a Server Component (`Card`, `Badge`, `Price`), file it as a
bug — see [`docs/faq.md`](faq.md#why-is-this-a-server-component).

**Build fails with a Tailwind-related error in your own app.**
It shouldn't — you don't need Tailwind installed to consume `@storefront/ui`. If you *do* run
Tailwind v4 in your app and see conflicts, check that you're not trying to `@apply` our
classes or re-process our precompiled `dist/styles.css` through your own Tailwind build; treat
it as a plain static stylesheet.
