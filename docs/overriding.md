# Overriding components

Five layers, cheapest first. Almost every real request is solved at layer 1 or 3 — reach for
layer 4 or 5 only when the problem is genuinely structural. Full reasoning:
`ARCHITECTURE.md` §4.

## Decision table: I want to change X → use layer N

| I want to... | Use | Layer |
|---|---|---|
| Change the brand colour, corner radius, or typeface everywhere | Token override | 1 |
| Add dark mode or a second brand | Token override, scoped to `[data-theme]`/`[data-brand]` | 1 |
| Style an element that isn't one of our components the same way ours look | Exported `*Variants` function | 2 |
| Tweak one instance of one component (padding, rounding, width) | `className` | 3 |
| Reach a specific inner part of a composite component (a card's image, a dialog's footer) | `classNames` slot map | 3 |
| Render a `Button`/`Badge`/`Card` as a different element (e.g. `next/link`) | `asChild` | 4 |
| Replace one part of a composite component (swap the image renderer, the price display) | `slots` | 4 |
| Replace a component everywhere in your app, keep everything else | Build-time alias (`next.config.ts`) | 5 |
| Run genuinely different components per tenant in one running deployment | Runtime registry (escape hatch, ask first) | 5 |

If you're not sure which layer applies, start at 1 and work down — jumping straight to layer 4
or 5 for a problem layer 1 or 3 would solve is the most common way this system gets
over-engineered against.

## Layer 1 — Tokens

**Solves:** rebranding, dark mode, multi-brand — anything expressible as "this colour/radius/
font should be different," applied globally or scoped to a theme/brand attribute.

Components only ever read tier-2 semantic tokens (`--ui-color-primary`, never a hex value or a
tier-1 primitive directly). Overriding a token requires no rebuild of `@storefront/ui` — the
value is resolved by the browser at paint time.

```css
/* consumer: app/globals.css, after importing @storefront/tokens/tokens.css */
:root {
  --ui-color-primary: #c8102e;
  --ui-radius-md: 0;
}
```

Every `Button`, `Badge`, `Input` etc. in the app updates immediately. Full token reference and
worked rebrand: [`docs/theming.md`](theming.md).

## Layer 2 — Variants (`*Variants`)

**Solves:** "I want this exact styling, but on an element that isn't our component" — e.g. an
`<a>` that should look like a `Button` without importing `Button` for a plain link.

Every component publicly exports its CVA variant function:

```tsx
import { buttonVariants } from "@storefront/ui";

<a className={buttonVariants({ variant: "secondary", size: "lg" })} href="/cart">
  Cart
</a>;
```

This works because the classes returned are the same Tailwind utility classes `Button` itself
applies — no duplicated CSS, no drift between the "real" button and this one.

## Layer 3 — `className` / `classNames`

**Solves:** a one-off tweak to a single instance of a component, without affecting every other
instance.

Every component accepts `className`, merged through `cn()` (`clsx` + `tailwind-merge`) *last*
— so your class always wins over the component's default on a conflicting utility, with no
`!important` and no specificity war:

```tsx
import { Button } from "@storefront/ui";

<Button className="rounded-full px-8">Checkout</Button>;
```

Composite components (multiple visual parts) expose a `classNames` slot map instead of one
`className` that can only reach the root:

```tsx
import { ProductCard } from "@storefront/ui";

<ProductCard
  classNames={{ image: "grayscale", price: "text-lg font-bold", cta: "rounded-full" }}
  title="Wireless headphones"
  imageSrc="/headphones.jpg"
  imageAlt="Wireless headphones"
  price={79.99}
/>;
```

## Layer 4 — Slots & `asChild`

**Solves:** a structural change — the rendered element itself needs to be different, not just
its classes.

`asChild` (built on Radix `Slot`) lets you swap the rendered element while keeping the
component's styling and behaviour. The canonical case: a "button" that must actually be a
`next/link` for client-side navigation and prefetching.

```tsx
import Link from "next/link";
import { Button } from "@storefront/ui";

<Button asChild>
  <Link href="/cart">Go to cart</Link>
</Button>;
```

Composite components additionally accept a `slots` prop to replace one internal part while
keeping the rest of the composition:

```tsx
import { ProductCard } from "@storefront/ui";
import NextImage from "next/image";

function NextImageAdapter({ src, alt, className }: { src: string; alt: string; className?: string }) {
  return <NextImage src={src} alt={alt} fill className={className} />;
}

<ProductCard
  slots={{ Image: NextImageAdapter }}
  title="Wireless headphones"
  imageSrc="/headphones.jpg"
  imageAlt="Wireless headphones"
  price={79.99}
/>;
```

## Layer 5 — Whole-component replacement

**Solves:** "this component needs to be entirely different code for us," everywhere it's used,
with zero runtime cost.

**Recommended: build-time aliasing** in your `next.config.ts`, using the package's subpath
exports:

```ts
// next.config.ts
export default {
  webpack(config) {
    config.resolve.alias["@storefront/ui/components/button"] = "./src/ui/my-button";
    return config;
  },
};
```

Every import of `Button` from that subpath now resolves to your own component, everywhere,
with no runtime registry and no forced Client Component boundary.

**Not recommended by default:** a runtime `UIProvider` registry (React Context-based component
swapping, the way Spartacus does it). It works, but it forces every component in the
consuming tree to become a Client Component to read the context — a real cost in Next.js App
Router that a Spartacus/Angular app never had to pay. Only reach for this if you have a
demonstrated need to swap components *per request* in a single deployment (e.g. true
multi-tenant SSR where the tenant isn't known until request time). If that's your situation,
raise it explicitly rather than building it speculatively — see `ARCHITECTURE.md` §4, Layer 5.
