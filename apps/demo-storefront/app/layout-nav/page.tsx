import Link from "next/link";
import { LayoutNavDemo } from "../../components/layout-nav-demo";

export default function LayoutNavPage() {
  return (
    <main
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "var(--ui-space-8)",
        padding: "var(--ui-space-8)",
        fontFamily: "var(--ui-font-sans)",
      }}
    >
      <div>
        <Link href="/" style={{ color: "var(--ui-color-primary)", fontSize: "var(--ui-font-size-sm)" }}>
          ← Back to storefront demo
        </Link>
        <h1 style={{ fontSize: "var(--ui-font-size-2xl)", color: "var(--ui-color-foreground)" }}>
          Layout &amp; Navigation
        </h1>
        <p style={{ color: "var(--ui-color-foreground-muted)" }}>
          Every Layout primitive (<code>Container</code>, <code>Grid</code>, <code>Stack</code>,{" "}
          <code>Divider</code>, <code>AspectRatio</code>, <code>ScrollArea</code>,{" "}
          <code>VisuallyHidden</code>, <code>SkipLink</code>) and Navigation component (
          <code>Tabs</code>, <code>Accordion</code>, <code>Stepper</code>, <code>NavMenu</code>,{" "}
          <code>MegaMenu</code>, <code>MobileNav</code>, <code>HeaderShell</code>,{" "}
          <code>FooterShell</code>, <code>LanguageCurrencySelector</code>,{" "}
          <code>StoreSelector</code>) from <code>@storefront/ui</code>, assembled into one page
          frame and rendered three times under the default, Acme brand, and dark themes.
        </p>
      </div>

      <LayoutNavDemo />
    </main>
  );
}
