"use client";

import { useState, type CSSProperties, type ReactNode } from "react";
import {
  HeaderShell,
  FooterShell,
  MegaMenu,
  MobileNav,
  LanguageCurrencySelector,
  StoreSelector,
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
  Stepper,
  Container,
  Grid,
  Stack,
  Divider,
  AspectRatio,
  ScrollArea,
  VisuallyHidden,
  SkipLink,
  Icon,
  type MegaMenuItem,
  type MobileNavItem,
} from "@storefront/ui";

const navItems: MegaMenuItem[] = [
  { label: "New Arrivals", href: "#new" },
  {
    label: "Men",
    sections: [
      {
        heading: "Footwear",
        links: [
          { label: "Running", href: "#running" },
          { label: "Basketball", href: "#basketball" },
        ],
      },
      {
        heading: "Apparel",
        links: [{ label: "Jackets", href: "#jackets" }],
      },
    ],
    featured: { title: "Winter running collection", href: "#featured" },
  },
  { label: "Sale", href: "#sale" },
];

const mobileNavItems: MobileNavItem[] = [
  {
    label: "Men",
    children: [
      { label: "Shoes", href: "#shoes" },
      { label: "Apparel", href: "#apparel" },
    ],
  },
  { label: "New Arrivals", href: "#new" },
  { label: "Sale", href: "#sale" },
];

const languages = [
  { value: "en", label: "English" },
  { value: "fr", label: "Français" },
];
const currencies = [
  { value: "usd", label: "USD" },
  { value: "eur", label: "EUR" },
];
const stores = [
  { id: "downtown", name: "Downtown", address: "123 Main St", distance: "0.5 mi" },
  { id: "uptown", name: "Uptown", address: "456 Oak Ave", distance: "3.1 mi" },
];
const checkoutSteps = [
  { label: "Cart" },
  { label: "Shipping", description: "Address & method" },
  { label: "Payment", description: "Card details" },
  { label: "Review" },
];

const panelStyle: CSSProperties = {
  border: "1px solid var(--ui-color-border)",
  borderRadius: "var(--ui-radius-lg)",
  overflow: "auto",
  maxHeight: "38rem",
  position: "relative",
};

interface ThemePanelProps {
  themeLabel: string;
  attrLabel: string;
  dataBrand?: string;
  dataTheme?: string;
}

function ThemePanel({ themeLabel, attrLabel, dataBrand, dataTheme }: ThemePanelProps) {
  const [language, setLanguage] = useState("en");
  const [currency, setCurrency] = useState("usd");
  const [selectedStoreId, setSelectedStoreId] = useState("downtown");

  return (
    <div data-brand={dataBrand} data-theme={dataTheme} style={panelStyle}>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "0.5rem 1rem",
          borderBottom: "1px solid var(--ui-color-border)",
          background: "var(--ui-color-surface-raised)",
          fontFamily: "var(--ui-font-sans)",
        }}
      >
        <span style={{ fontSize: "var(--ui-font-size-sm)", fontWeight: 600, color: "var(--ui-color-foreground)" }}>
          {themeLabel}
        </span>
        <code style={{ fontSize: "var(--ui-font-size-xs)", color: "var(--ui-color-foreground-muted)" }}>
          {attrLabel}
        </code>
      </div>

      <SkipLink />

      <HeaderShell
        utilityBar={
          <div style={{ display: "flex", justifyContent: "center", padding: "0.375rem 0" }}>
            Free delivery on orders over $75
          </div>
        }
        logo={
          <a href="#" className="font-sans text-lg font-bold text-foreground">
            ACME
          </a>
        }
        mobileNav={<MobileNav items={mobileNavItems} />}
        nav={<MegaMenu items={navItems} className="static justify-start" />}
        actions={
          <>
            <LanguageCurrencySelector
              languages={languages}
              currencies={currencies}
              language={language}
              currency={currency}
              onLanguageChange={setLanguage}
              onCurrencyChange={setCurrency}
            />
            <StoreSelector
              stores={stores}
              selectedStoreId={selectedStoreId}
              onSelectedStoreIdChange={setSelectedStoreId}
            />
            <button type="button" aria-label="Cart" className="rounded-md p-2 hover:bg-surface-raised">
              <Icon name="cart" />
            </button>
          </>
        }
      />

      <main id="main-content" style={{ paddingTop: "1.5rem", paddingBottom: "1.5rem" }}>
        <Container size="xl">
          <Stack gap="lg">
            <section>
              <SectionHeading>Stepper</SectionHeading>
              <Stepper steps={checkoutSteps} currentStep={1} />
            </section>

            <Divider />

            <section>
              <SectionHeading>Tabs</SectionHeading>
              <Tabs defaultValue="details">
                <TabsList>
                  <TabsTrigger value="details">Details</TabsTrigger>
                  <TabsTrigger value="reviews">Reviews</TabsTrigger>
                </TabsList>
                <TabsContent value="details" className="text-sm text-foreground">
                  Full-grain leather upper, cushioned midsole.
                </TabsContent>
                <TabsContent value="reviews" className="text-sm text-foreground">
                  4.6 out of 5 stars, based on 128 reviews.
                </TabsContent>
              </Tabs>
            </section>

            <section>
              <SectionHeading>Accordion</SectionHeading>
              <Accordion type="single" collapsible>
                <AccordionItem value="shipping">
                  <AccordionTrigger>Shipping &amp; delivery</AccordionTrigger>
                  <AccordionContent>Free delivery on orders over $75.</AccordionContent>
                </AccordionItem>
                <AccordionItem value="returns">
                  <AccordionTrigger>Returns</AccordionTrigger>
                  <AccordionContent>30-day returns on unworn items.</AccordionContent>
                </AccordionItem>
              </Accordion>
            </section>

            <section>
              <SectionHeading>Grid + AspectRatio</SectionHeading>
              <Grid cols={2} colsMd={4} gap="md">
                {Array.from({ length: 4 }, (_, i) => (
                  <AspectRatio key={i} ratio={1}>
                    <div className="flex size-full items-center justify-center bg-surface-raised text-xs text-foreground-muted">
                      {i + 1} / 1
                    </div>
                  </AspectRatio>
                ))}
              </Grid>
            </section>

            <section>
              <SectionHeading>ScrollArea</SectionHeading>
              <ScrollArea className="h-32 rounded-md border border-border">
                <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem", padding: "0.75rem" }}>
                  {Array.from({ length: 12 }, (_, i) => (
                    <span key={i} className="text-sm text-foreground">
                      Row {i + 1}
                    </span>
                  ))}
                </div>
              </ScrollArea>
            </section>
          </Stack>
        </Container>
      </main>

      <FooterShell
        columns={[
          { heading: "Shop", children: <FooterLinks links={["New Arrivals", "Men", "Sale"]} /> },
          { heading: "Help", children: <FooterLinks links={["Shipping", "Returns", "Contact"]} /> },
        ]}
        bottomBar={<span>© 2026 Acme, Inc.</span>}
      />
    </div>
  );
}

function SectionHeading({ children }: { children: ReactNode }) {
  return (
    <h2 className="mb-2 font-sans text-sm font-semibold text-foreground">
      <VisuallyHidden>Section: </VisuallyHidden>
      {children}
    </h2>
  );
}

function FooterLinks({ links }: { links: string[] }) {
  return (
    <ul className="flex flex-col gap-2 text-sm text-foreground-muted">
      {links.map((link) => (
        <li key={link}>
          <a href="#" className="hover:text-foreground hover:underline">
            {link}
          </a>
        </li>
      ))}
    </ul>
  );
}

/**
 * All eighteen new Layout + Navigation components, assembled into one page
 * frame (`HeaderShell` → content → `FooterShell`) and rendered three times
 * under the same token override the rest of this demo uses — proof they're
 * the same component code, not three hand-tuned copies (ARCHITECTURE.md §7).
 */
export function LayoutNavDemo() {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
      <ThemePanel themeLabel="Default" attrLabel='data-brand="default"' dataBrand="default" />
      <ThemePanel themeLabel="Acme brand" attrLabel='data-brand="acme"' dataBrand="acme" />
      <ThemePanel themeLabel="Dark theme" attrLabel='data-theme="dark"' dataTheme="dark" />
    </div>
  );
}
