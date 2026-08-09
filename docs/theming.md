# Theming

How to rebrand, add dark mode, and support multiple brands — all through
`@storefront/tokens`, without forking or rebuilding `@storefront/ui`. Background on *why* it's
built this way: `ARCHITECTURE.md` §4.1.

## The token system: two tiers

**Tier 1 — primitives.** Raw oklch colour ramps (`--ui-blue-600`, `--ui-gray-200`, ...) plus
spacing/radius/type/shadow/z-index/motion scales. You'll rarely reference these directly —
they exist so tier 2 has a full ramp to alias into, and so a rebrand has room to move within.

**Tier 2 — semantic.** The `--ui-color-*` roles below. **These are the only colour variables
any `@storefront/ui` component reads.** A component never says "make this blue" — it says
"make this `primary`." Rebranding is redefining what `primary` *means*, and every component
that uses it updates with zero code changes and zero rebuild.

```css
/* tier 1: primitive — rarely referenced directly */
--ui-blue-600: oklch(0.55 0.18 258);

/* tier 2: semantic — what components actually consume */
--ui-color-primary: var(--ui-blue-600);
```

Non-colour scales (spacing, radius, font, type, shadow, z-index, motion) skip the two-tier
split — their tier-1 step names (`--ui-radius-md`, `--ui-space-4`) are already semantic, so a
second aliasing layer would add indirection without adding meaning. Components consume those
directly.

> If a design change can't be expressed as a token override, ask whether the token set is
> missing a token before writing bespoke CSS — see [Adding a token](faq.md#how-do-i-add-a-token).

## Full semantic token reference

| Token | Controls | Default (light) | Dark override |
|---|---|---|---|
| `--ui-color-surface` | Page/root background — the base layer components sit on | `var(--ui-gray-0)` (white) | `var(--ui-gray-950)` |
| `--ui-color-surface-raised` | Background for elevated surfaces (cards, popovers, dropdowns) | `var(--ui-gray-50)` | `var(--ui-gray-900)` |
| `--ui-color-foreground` | Primary text/icon colour on `surface` | `var(--ui-gray-950)` | `var(--ui-gray-50)` |
| `--ui-color-foreground-muted` | Secondary/de-emphasised text (captions, helper text, placeholders) | `var(--ui-gray-500)` | `var(--ui-gray-400)` |
| `--ui-color-primary` | Brand action colour — primary buttons, links, active/selected state | `var(--ui-blue-600)` | `var(--ui-blue-500)` |
| `--ui-color-primary-fg` | Text/icon colour on top of `primary` | `var(--ui-gray-0)` (white) | `var(--ui-gray-950)` |
| `--ui-color-border` | Default hairline border — inputs, cards, dividers | `var(--ui-gray-200)` | `var(--ui-gray-800)` |
| `--ui-color-ring` | `focus-visible` ring colour | `var(--ui-blue-500)` | `var(--ui-blue-400)` |
| `--ui-color-danger` | Destructive/error state background or accent | `var(--ui-red-600)` | `var(--ui-red-500)` |
| `--ui-color-danger-fg` | Text/icon colour on top of `danger` | `var(--ui-gray-0)` (white) | `var(--ui-gray-950)` |
| `--ui-color-success` | Success/confirmation state accent | `var(--ui-green-600)` | `var(--ui-green-500)` |
| `--ui-color-success-fg` | Text/icon colour on top of `success` | `var(--ui-gray-0)` (white) | `var(--ui-gray-950)` |
| `--ui-color-warning` | Warning/attention state accent | `var(--ui-amber-500)` | `var(--ui-amber-400)` |
| `--ui-color-warning-fg` | Text/icon colour on top of `warning` | `var(--ui-gray-950)` | `var(--ui-gray-950)` |
| `--ui-color-overlay` | Dialog/modal backdrop | `oklch(0 0 0 / 0.5)` | `oklch(0 0 0 / 0.5)` |

Non-colour scales, consumed directly (no tier-2 aliasing):

| Scale | Tokens |
|---|---|
| Spacing | `--ui-space-{0,1,2,3,4,5,6,8,10,12,16,20,24}` (`n × 0.25rem`) |
| Radius | `--ui-radius-{none,sm,md,lg,xl,2xl,full}` |
| Font family | `--ui-font-{sans,serif,mono}` |
| Type scale | `--ui-font-size-*` / `--ui-line-height-*` for `{xs,sm,base,lg,xl,2xl,3xl,4xl,5xl}` |
| Shadow | `--ui-shadow-{sm,md,lg,xl}` |
| Z-index | `--ui-z-{dropdown,sticky,overlay,modal,popover,toast}` |
| Motion | `--ui-duration-{fast,base,slow}`, `--ui-ease-{standard,in,out,emphasized}` |

The full primitive ramp (`--ui-gray-*`, `--ui-blue-*`, `--ui-red-*`, `--ui-amber-*`,
`--ui-green-*`, each `50`–`950`) lives in `packages/tokens/src/tokens.css` if you need to see
every stop. `packages/tokens/README.md` is the source of truth for this table — update it
there first if a token is added or renamed.

Prefer not to hand-write `--ui-*` strings? The TypeScript token map avoids typos:

```ts
import { colorTokens, cssVar } from "@storefront/tokens";

cssVar(colorTokens.primary); // "var(--ui-color-primary)"
```

## Rebrand in 10 lines

This is the whole exercise — no component code changes, no package rebuild:

```css
/* app/globals.css */
@import "@storefront/tokens/tokens.css";
@import "@storefront/ui/styles.css";

:root {
  --ui-color-primary: #c8102e;              /* 1. brand red replaces default blue */
  --ui-color-primary-fg: white;              /* 2. text on top of that red */
  --ui-color-ring: #c8102e;                  /* 3. focus ring matches brand */
  --ui-color-border: oklch(0.9 0.02 25);     /* 4. warm-tinted hairlines */
  --ui-radius-md: 0;                         /* 5. sharp corners, on-brand for this client */
  --ui-radius-lg: 0;                         /* 6. same, larger components */
  --ui-font-sans: "Electrolux Sans", sans-serif; /* 7. brand typeface */
  --ui-shadow-md: 0 2px 4px rgb(0 0 0 / 0.12);   /* 8. slightly heavier card shadow */
}

body {
  background: var(--ui-color-surface);       /* 9. wire the page background to the token */
  color: var(--ui-color-foreground);         /* 10. wire the page text colour to the token */
}
```

Every `Button`, `Badge`, `Card`, `Input`, and `ProductCard` in the app now renders in brand red
with square corners — because none of them ever read `#c8102e` or `blue`, only
`--ui-color-primary`.

## Dark mode

Dark mode is the same override mechanism, scoped to an attribute instead of `:root`:

```css
@import "@storefront/tokens/tokens.css";
@import "@storefront/ui/styles.css";
@import "@storefront/tokens/themes/dark.css"; /* [data-theme="dark"] { ... } */
```

```html
<html data-theme="dark">
```

Toggle it at runtime by flipping the attribute (e.g. from a small client component that
writes `document.documentElement.dataset.theme`). `themes/dark.css` in `@storefront/tokens` is
the worked example — copy its shape for a custom dark palette instead of writing your own from
scratch.

## Multi-brand

Same mechanism again, scoped to `[data-brand="..."]` instead of `[data-theme="..."]`. This is
how you run several storefronts (different clients, different regions) off one deployed build:

```css
@import "@storefront/tokens/tokens.css";
@import "@storefront/ui/styles.css";
@import "@storefront/tokens/themes/acme.css"; /* [data-brand="acme"] { ... } — worked example */
```

```html
<html data-brand="acme">
```

`data-theme` and `data-brand` compose — `<html data-brand="acme" data-theme="dark">` applies
both override layers, dark mode's tokens winning where the two would otherwise conflict
because it's declared later in the cascade in the example above. Order your `@import`s to
control which wins if you support both dimensions at once.

The demo storefront (`apps/demo-storefront`, `pnpm demo`) renders the same PLP/PDP component
tree three times side by side under `data-brand="default"`, `data-brand="acme"`, and
`data-theme="dark"` — the fastest way to see this mechanism prove itself without reading code.

## Adding a token

If a component needs a colour that isn't one of the 14 semantic roles above, that's a signal
the semantic layer is incomplete — add the role in `packages/tokens/src/tokens.css` (and its
row in `packages/tokens/README.md`), don't reach for a tier-1 primitive or a literal value
directly in component code. Removing or renaming a token is a **breaking change** — call it
out explicitly. See [`docs/faq.md`](faq.md#how-do-i-add-a-token) for the full checklist.
