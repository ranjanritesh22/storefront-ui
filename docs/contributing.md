# Contributing

How to add or modify a component in `@storefront/ui`. Read `ARCHITECTURE.md` first if you
haven't — this doc assumes you know *why* the package is shaped this way and focuses on *how*
to work within it.

## Adding a component

A component lives entirely in one folder under `packages/ui/src/components/<name>/`. Adding
one touches **only** that folder plus one line in `packages/ui/src/index.ts` — nothing else in
the package changes. That's the scalability property this repo is built around; if your change
touches more than that, stop and check you're not solving the wrong problem.

### 1. The folder shape (the only shape allowed)

```
packages/ui/src/components/<name>/
  <name>.tsx           component
  <name>.variants.ts   CVA definition, publicly exported
  <name>.stories.tsx   Storybook
  <name>.test.tsx      Vitest
  index.ts             re-exports
```

Use an existing component as your template — `button/` for a simple component, `product-card/`
for a composite one with `slots` and `classNames`, `dialog/` for a Radix-wrapped one.

### 2. Write the variants file first

```ts
// <name>.variants.ts
import { cva, type VariantProps } from "class-variance-authority";

export const myComponentVariants = cva(["base classes here"], {
  variants: {
    variant: { primary: "...", secondary: "..." },
    size: { sm: "...", md: "..." },
  },
  defaultVariants: { variant: "primary", size: "md" },
});

export type MyComponentVariantsProps = VariantProps<typeof myComponentVariants>;
```

Every class here must resolve to a semantic token (`bg-primary`, `text-foreground`,
`rounded-md`) — Tailwind utilities are mapped to `--ui-*` custom properties in
`packages/ui/src/styles/index.css`'s `@theme inline` block. No hex, no `rgb()`, no arbitrary
`px` spacing. If the token you need doesn't exist, add it in `packages/tokens` first (see
[`docs/theming.md`](theming.md#adding-a-token)) and explain why in your PR — don't reach for a
literal value as a shortcut.

### 3. Write the component

```tsx
// <name>.tsx
"use client"; // only if it genuinely needs state, effects, or refs-on-mount

import * as React from "react";
import { Slot } from "../../lib/slot";
import { cn } from "../../lib/cn";
import { myComponentVariants, type MyComponentVariantsProps } from "./my-component.variants";

export interface MyComponentProps
  extends React.HTMLAttributes<HTMLDivElement>,
    MyComponentVariantsProps {
  asChild?: boolean;
}

export const MyComponent = React.forwardRef<HTMLDivElement, MyComponentProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "div";
    return (
      <Comp
        ref={ref}
        className={cn(myComponentVariants({ variant, size }), className)}
        {...props}
      />
    );
  },
);
MyComponent.displayName = "MyComponent";
```

Non-negotiable per component, regardless of complexity:

- `forwardRef`, ref forwarded to the root DOM element.
- `...props` spread onto the root element.
- `className` accepted and merged **last** via `cn()`, so a consumer's class always wins.
- `asChild` support wherever an element swap is plausible (buttons, links, wrapper elements).
- State exposed as `data-*` attributes (`data-state="open"`, `data-loading="true"`,
  `data-invalid="true"`) — never a bespoke internal-only class. Consumers style against these.
- Logical CSS properties only (`ps-`, `pe-`, `ms-`, `me-`, `start-`, `end-`) — never `pl-`/`pr-`/
  `left-`/`right-`. RTL is required.
- `"use client"` only if the component genuinely needs state, effects, refs-on-mount, or a
  browser API. `Card`, `Badge`, `Price` prove a component can stay a Server Component; default
  to that unless you have a concrete reason not to.

For a composite component (multiple visual parts, like `ProductCard` or `FormField`), also
add:

- A `classNames` prop — a slot map (`{ root?, image?, price?, ... }`), not a single blunt
  `className`, so a consumer can reach any part.
- A `slots` prop where a part is plausibly replaceable (see `product-card.tsx` for the
  pattern: `slots?: { Image?: ComponentType<...>; Price?: ComponentType<...> }`, each
  defaulting to the built-in implementation).

### 4. Write the story

Every `*.stories.tsx` needs `tags: ["autodocs"]`, a controls table via `argTypes`, and an
**"Overriding this component" doc block** in `parameters.docs.description.component` covering
whichever layers from `ARCHITECTURE.md` §4 actually apply to this component (tokens is always
relevant; variants/className/asChild/slots depend on the component). Copy the shape from
`button.stories.tsx` or `product-card.stories.tsx`.

Then add a colocated `<name>.mdx` file that attaches to the stories file via `<Meta of={...} />`
and renders the same "styled three ways" override demo as a live `Canvas` — see any existing
`*.mdx` in the component's folder for the pattern, and add three story exports (one per
override layer you're demonstrating) for the MDX to reference.

### 5. Write the test

Cover, at minimum: default render, each variant renders the expected class/attribute, `ref`
forwarding works, `className` override wins over a conflicting default class (assert this —
don't just eyeball it), and `asChild`/`slots`/`classNames` if the component has them.

### 6. Wire the barrel export

One line (well, one block) in `packages/ui/src/index.ts`:

```ts
export { MyComponent, myComponentVariants } from "./components/my-component";
export type { MyComponentProps, MyComponentVariantsProps } from "./components/my-component";
```

### 7. Render it in the demo app

Add or extend a panel in `apps/demo-storefront` so the component renders under all three demo
themes (`data-brand="default"`, `data-brand="acme"`, `data-theme="dark"`) — `pnpm demo` at
`:3000`. This is the fastest way to catch a token you forgot to route through, or an override
layer that doesn't actually work end-to-end.

## Definition of done

- [ ] Folder shape above, all five files present (`.tsx`, `.variants.ts`, `.stories.tsx`,
      `.test.tsx`, `index.ts`)
- [ ] Variants in `*.variants.ts`, exported from the package barrel
- [ ] `className` override verified to win (test asserts it, not just visually confirmed)
- [ ] Token-only styling — no literal hex/rgb/px-font-size/arbitrary-spacing values (grep the
      component file for `#`, `rgb(`, and bare `px` before finishing)
- [ ] `"use client"` present only if genuinely required
- [ ] Keyboard + screen-reader semantics checked by hand (Tab through it, not just assumed)
- [ ] Story with a controls table and an "Overriding this component" doc block
- [ ] `.mdx` docs page added with a live three-way styling demo
- [ ] Rendered in `apps/demo-storefront` under all three brand themes
- [ ] `pnpm build && pnpm typecheck && pnpm test` clean

## Conventions (enforced in review)

1. No hard-coded colour, spacing, radius, font, or shadow value in a component. Tokens only.
2. `"use client"` only on components that genuinely need state, effects, or event handlers.
3. Every component: `forwardRef`, spreads `...props` to the root element, accepts `className`,
   supports `asChild` where an element swap is plausible.
4. State as `data-*` attributes, never internal-only classes.
5. Logical CSS properties, not physical ones.
6. Accessibility floor: visible focus ring, keyboard operable, correct roles, honours
   `prefers-reduced-motion`. Test with keyboard before opening the PR — don't assume.
7. Every component ships a story and a test in the same folder.
8. Semantic versioning is real: removing a token or a variant is a **breaking change**. Say so
   explicitly in the PR description; don't let it hide in a diff.

## PR checklist

- [ ] `pnpm build && pnpm typecheck && pnpm test` all pass locally
- [ ] `pnpm --filter @storefront/ui build` output checked: `"use client"` survives into
      `dist/` for any client component you touched (`scripts/check-directives.mjs` runs this
      automatically as part of the package build — don't skip it)
- [ ] No new dependency without a one-line justification in the PR description — this
      package's weight is a feature of it
- [ ] Any removed/renamed token, prop, or variant is called out explicitly as a breaking change
- [ ] Screenshot or Storybook link showing the component under at least the default and dark
      themes
