import type { CSSProperties } from "react";
import Link from "next/link";
import { Button } from "@storefront/ui";

/**
 * This app has no Tailwind toolchain of its own — it only imports the
 * prebuilt `@storefront/ui/styles.css` (see globals.css), which contains
 * exactly the utility classes packages/ui's own source uses. Layout here is
 * done with inline styles reading design tokens directly, so it doesn't
 * depend on utilities that only happen to exist in that prebuilt file.
 */
const sectionStyle: CSSProperties = {
  background: "var(--ui-color-surface)",
  color: "var(--ui-color-foreground)",
  border: "1px solid var(--ui-color-border)",
  borderRadius: "var(--ui-radius-lg)",
  padding: "var(--ui-space-6)",
  fontFamily: "var(--ui-font-sans)",
  display: "flex",
  flexDirection: "column",
  gap: "var(--ui-space-4)",
};

const rowStyle: CSSProperties = {
  display: "flex",
  flexWrap: "wrap",
  alignItems: "center",
  gap: "var(--ui-space-3)",
};

const rowLabelStyle: CSSProperties = {
  color: "var(--ui-color-foreground-muted)",
  fontSize: "var(--ui-font-size-sm)",
  width: "6rem",
  flexShrink: 0,
};

function ButtonShowcase() {
  return (
    <>
      <div style={rowStyle}>
        <span style={rowLabelStyle}>variant</span>
        <Button variant="primary">Primary</Button>
        <Button variant="secondary">Secondary</Button>
        <Button variant="outline">Outline</Button>
        <Button variant="ghost">Ghost</Button>
        <Button variant="danger">Danger</Button>
      </div>
      <div style={rowStyle}>
        <span style={rowLabelStyle}>size</span>
        <Button size="sm">Small</Button>
        <Button size="md">Medium</Button>
        <Button size="lg">Large</Button>
        <Button size="icon" aria-label="Add to cart">
          +
        </Button>
      </div>
      <div style={rowStyle}>
        <span style={rowLabelStyle}>state</span>
        <Button loading>Loading</Button>
        <Button disabled>Disabled</Button>
      </div>
      <div style={rowStyle}>
        <span style={rowLabelStyle}>asChild</span>
        <Button asChild variant="outline">
          <a href="#cart">Go to cart</a>
        </Button>
      </div>
      <div style={{ ...rowStyle, flexWrap: "nowrap" }}>
        <span style={rowLabelStyle}>fullWidth</span>
        <div style={{ flex: 1 }}>
          <Button fullWidth>Checkout</Button>
        </div>
      </div>
    </>
  );
}

export default function ButtonsPage() {
  return (
    <main
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "var(--ui-space-8)",
        padding: "var(--ui-space-8)",
        maxWidth: "48rem",
        margin: "0 auto",
        fontFamily: "var(--ui-font-sans)",
      }}
    >
      <div>
        <Link href="/" style={{ color: "var(--ui-color-primary)", fontSize: "var(--ui-font-size-sm)" }}>
          ← Back to storefront demo
        </Link>
        <h1 style={{ fontSize: "var(--ui-font-size-2xl)" }}>Button</h1>
        <p style={{ color: "var(--ui-color-foreground-muted)" }}>
          <code>Button</code> from <code>@storefront/ui</code>, rendered under all three shipped
          themes — default, dark, and the Acme brand override.
        </p>
      </div>

      <section style={sectionStyle}>
        <h2>Default theme</h2>
        <ButtonShowcase />
      </section>

      <section data-theme="dark" style={sectionStyle}>
        <h2>Dark theme</h2>
        <ButtonShowcase />
      </section>

      <section data-brand="acme" style={sectionStyle}>
        <h2>Acme brand</h2>
        <ButtonShowcase />
      </section>
    </main>
  );
}
