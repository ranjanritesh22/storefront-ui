# @storefront/tokens

Design tokens and themes for the storefront UI package. No React, no build step
required to consume — three static CSS files plus a TypeScript token-name map.
See `ARCHITECTURE.md` §4.1 at the repo root for the reasoning behind the
two-tier model; this file documents the actual token set.

## Install & use

```css
/* consumer: app/globals.css */
@import "@storefront/tokens/tokens.css";

/* optional: dark mode and/or a brand theme */
@import "@storefront/tokens/themes/dark.css";
@import "@storefront/tokens/themes/acme.css";
```

```html
<html data-theme="dark" data-brand="acme">
```

```ts
import { colorTokens, cssVar } from "@storefront/tokens";

cssVar(colorTokens.primary); // "var(--ui-color-primary)"
```

## Two tiers

- **Tier 1 — primitives.** Raw oklch colour ramps, spacing/radius/type/shadow/
  z-index/motion scales. Rarely referenced directly. Exist so tier 2 has a
  ramp to alias and a rebrand has room to move within.
- **Tier 2 — semantic.** The `--ui-color-*` roles below. **These are the only
  colour variables `@storefront/ui` components are allowed to reference.**
  Non-colour scales (spacing, radius, font, type, shadow, z-index, motion) are
  consumed directly from tier 1 — their step names (e.g. `--ui-radius-md`)
  are already semantic, so a second aliasing layer would just add
  indirection without adding meaning.

A rebrand or a dark mode is always a tier-2-only override, scoped under
`[data-theme="..."]` or `[data-brand="..."]`. Nothing else in the package
changes. `themes/dark.css` and `themes/acme.css` are worked examples of
exactly this.

## Semantic colour tokens

| Token | Controls | Default (light) | Dark override | Consumed by |
|---|---|---|---|---|
| `--ui-color-surface` | Page/root background — the base layer components sit on | `var(--ui-gray-0)` (white) | `var(--ui-gray-950)` | `Card`, `Dialog`, `ProductCard` |
| `--ui-color-surface-raised` | Background for elevated surfaces (cards, popovers, dropdowns) that need to read as "above" `surface` | `var(--ui-gray-50)` | `var(--ui-gray-900)` | `Card`, `Dialog`, `ProductCard` |
| `--ui-color-foreground` | Primary text/icon colour on `surface` | `var(--ui-gray-950)` | `var(--ui-gray-50)` | all text-bearing components (`Button`, `Input`, `Badge`, `Price`, `Card`) |
| `--ui-color-foreground-muted` | Secondary/de-emphasised text (captions, helper text, placeholders) | `var(--ui-gray-500)` | `var(--ui-gray-400)` | `Input`/`FormField` helper text, `Price` compare-at text, `Card` metadata |
| `--ui-color-primary` | Brand action colour — primary buttons, links, active/selected state | `var(--ui-blue-600)` | `var(--ui-blue-500)` | `Button` (primary variant), `QuantityStepper`, focus/selected states |
| `--ui-color-primary-fg` | Text/icon colour on top of `primary` | `var(--ui-gray-0)` (white) | `var(--ui-gray-950)` | `Button` (primary variant) |
| `--ui-color-border` | Default hairline border — inputs, cards, dividers | `var(--ui-gray-200)` | `var(--ui-gray-800)` | `Input`/`FormField`, `Card`, `Dialog`, `Badge` (outline variant) |
| `--ui-color-ring` | `focus-visible` ring colour | `var(--ui-blue-500)` | `var(--ui-blue-400)` | every interactive component (accessibility floor, see root `CLAUDE.md` rule 9) |
| `--ui-color-danger` | Destructive/error state background or accent | `var(--ui-red-600)` | `var(--ui-red-500)` | `Button` (danger variant), `Input`/`FormField` (invalid state), `Badge` |
| `--ui-color-danger-fg` | Text/icon colour on top of `danger` | `var(--ui-gray-0)` (white) | `var(--ui-gray-950)` | `Button` (danger variant) |
| `--ui-color-success` | Success/confirmation state accent | `var(--ui-green-600)` | `var(--ui-green-500)` | `Badge`, form validation success state |
| `--ui-color-success-fg` | Text/icon colour on top of `success` | `var(--ui-gray-0)` (white) | `var(--ui-gray-950)` | `Badge` (success variant) |
| `--ui-color-warning` | Warning/attention state accent | `var(--ui-amber-500)` | `var(--ui-amber-400)` | `Badge`, low-stock/attention states |
| `--ui-color-warning-fg` | Text/icon colour on top of `warning` | `var(--ui-gray-950)` | `var(--ui-gray-950)` | `Badge` (warning variant) |

> "Consumed by" lists the components each token is designed for per
> ARCHITECTURE.md §7's demo scope. `@storefront/ui` has no components yet
> (this is the tokens foundation, built first) — update this column as each
> component lands, since consuming a token that isn't listed here is a signal
> the token set needs review, not that the rule is being ignored.

## Non-colour scales (tier 1, consumed directly)

| Scale | Tokens | Notes |
|---|---|---|
| Spacing | `--ui-space-{0,1,2,3,4,5,6,8,10,12,16,20,24}` | `n × 0.25rem` |
| Radius | `--ui-radius-{none,sm,md,lg,xl,2xl,full}` | |
| Font family | `--ui-font-{sans,serif,mono}` | `sans` is the default UI stack (Inter) |
| Type scale | `--ui-font-size-*` / `--ui-line-height-*` for `{xs,sm,base,lg,xl,2xl,3xl,4xl,5xl}` | paired, same suffix |
| Shadow | `--ui-shadow-{sm,md,lg,xl}` | |
| Z-index | `--ui-z-{dropdown,sticky,overlay,modal,popover,toast}` | ascending in that order |
| Motion | `--ui-duration-{fast,base,slow}`, `--ui-ease-{standard,in,out,emphasized}` | respect `prefers-reduced-motion` at the component, not the token, level |

## TypeScript token map

`@storefront/tokens` exports token **names**, not resolved values — the
resolved value only exists in CSS, and can differ per theme/brand. Use the
map to avoid hard-coding `--ui-*` strings in component code:

```ts
import { colorTokens, radiusTokens, spacingTokens, cssVar } from "@storefront/tokens";

colorTokens.primary; // "--ui-color-primary"
cssVar(colorTokens.primary); // "var(--ui-color-primary)"
```

Exported maps: `colorTokens` (tier 2), `colorPrimitiveTokens`, `spacingTokens`,
`radiusTokens`, `fontFamilyTokens`, `fontSizeTokens`, `shadowTokens`,
`zIndexTokens`, `durationTokens`, `easingTokens` (tier 1).

## Adding a token

If a component needs a colour that isn't one of the 14 roles above, that's a
signal the semantic layer is incomplete — add the role here (and to this
table) rather than reaching for a tier-1 primitive or a literal value
directly in component code. Removing or renaming a token is a **breaking
change** (root `CLAUDE.md` rule 10) — call it out explicitly.
