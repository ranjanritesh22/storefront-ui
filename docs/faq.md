# FAQ

## Do I need Tailwind?

No. `@storefront/ui` compiles its own Tailwind v4 source down to a single static
`dist/styles.css` at publish time. You `import "@storefront/ui/styles.css"` and get fully
styled components — no Tailwind install, no `tailwind.config`, no build plugin in your app.

If you *do* run Tailwind v4 in your own app, nothing conflicts: your utility classes and ours
both land in Tailwind's `utilities` cascade layer, which is declared last, so your classes
reliably win over ours on any overlapping property — see
[Why isn't my override applying?](#why-isnt-my-override-applying) for the mechanism. Tailwind
being optional-not-required for consumers is a deliberate design goal — see `ARCHITECTURE.md`
§2.

## Why isn't my override applying?

Almost always one of two things, in this order:

**1. You're fighting the cascade layers, not CSS specificity.** Every stylesheet in this
system participates in one declared layer order:

```css
@layer theme, base, ui-components, utilities;
```

Component styles live in `ui-components`. Tailwind utility classes — ours *and* yours — live
in `utilities`, declared last, so a plain utility class reliably beats a component's default
styling with **no `!important` needed**. If your override genuinely isn't applying:

- Check it's actually a utility class landing in the `utilities` layer, not a plain CSS rule
  you wrote outside any `@layer` block — unlayered CSS has *the highest* priority of all,
  which sounds like it should always win, but means it also beats your *other* overrides
  unpredictably and is easy to lose track of. Prefer Tailwind utilities or scope your override
  inside `@layer utilities` explicitly.
- Never reach for `!important` to force a win — if you need it, the layer setup is wrong
  somewhere, not your class. Fix the layer, don't paper over it. See `ARCHITECTURE.md` §5,
  "CSS layer ordering."

**2. You're overriding a token that isn't the one actually consumed.** Check the token name
against the reference table in [`docs/theming.md`](theming.md) — `--ui-color-primary`, not
`--ui-primary` or `--ui-primary-color`. A misspelled custom property fails silently in CSS;
there's no error, the browser just ignores the declaration.

If it's still not applying after both of those, check the token override is actually loaded —
`:root` overrides work regardless of where they're declared relative to
`@storefront/tokens/tokens.css` (custom properties resolve at paint time, not import order),
but `[data-theme]`/`[data-brand]`-scoped overrides only apply if that attribute is actually
present on an ancestor element in the DOM you're inspecting.

## Why is this a Server Component?

Because it can be, and every component that *can* be a Server Component *is* one by default —
`"use client"` is opt-in, never the default, in this package (`ARCHITECTURE.md` §2, and
`CLAUDE.md` rule 2). `Card`, `Badge`, and `Price` have no state, no effects, no event
listeners, and no browser-only API — there's nothing about them that requires client JS, so
shipping them as Server Components means less JavaScript sent to the browser and no
hydration cost for something static.

`QuantityStepper` and `Dialog` genuinely need client interactivity (state, Radix's focus trap)
and carry `"use client"` accordingly. If you need a component that's documented as a Server
Component to hold local state — say, you want an interactive `Card` — wrap only the
interactive part in your own small client component rather than asking the primitive itself
to become one; that keeps the rest of the tree server-rendered.

## How do I use a Button as a link?

`asChild`, not a `href` prop — `Button` doesn't have one, on purpose, since "is this a link"
is a structural decision, not a styling one:

```tsx
import Link from "next/link";
import { Button } from "@storefront/ui";

<Button asChild>
  <Link href="/cart">Go to cart</Link>
</Button>;
```

`asChild` swaps the rendered element (via Radix `Slot`) from `<button>` to whatever single
child you pass, while keeping `Button`'s classes, variant styling, and props merged onto it.
The child must be a single valid React element — not a fragment, not text, not multiple
children. See [`docs/overriding.md`](overriding.md#layer-4--slots--aschild) for the general
pattern, which every component with `asChild` support follows the same way.

## How do I add a token?

1. Confirm it's genuinely missing — check the reference table in
   [`docs/theming.md`](theming.md) first; if an existing semantic token already expresses what
   you need, use that instead of adding a near-duplicate.
2. Add the tier-2 custom property in `packages/tokens/src/tokens.css`, aliasing a tier-1
   primitive (or adding a new primitive first, if the ramp doesn't have the value you need):
   ```css
   --ui-color-info: var(--ui-blue-500);
   --ui-color-info-fg: var(--ui-gray-0);
   ```
3. Add matching overrides to `packages/tokens/src/themes/dark.css` (and `acme.css` if it's a
   brand-relevant token) so the new role behaves correctly in every existing theme, not just
   the default.
4. Add the token to the TypeScript map in `packages/tokens/src/tokens.ts` (`colorTokens` or
   the relevant tier-1 map) so JS/TS consumers get it without hard-coding the string.
5. Document it: add the row to the table in `packages/tokens/README.md`, and mirror it into
   [`docs/theming.md`](theming.md) if it's a token consumers are likely to reach for directly.
6. If a component now consumes it, use the token in `*.variants.ts`, never a literal value.

Removing or renaming an existing token is a **breaking change** — call it out explicitly in
the PR, don't fold it into an unrelated change (`ARCHITECTURE.md` §6, item 8).
