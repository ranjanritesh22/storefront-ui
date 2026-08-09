"use client";

import { useState } from "react";
import { Button } from "@storefront/ui";
import {
  products,
  featuredProduct,
  merinoRibbedBeanie,
  vacuumSteelBottle,
  trailrunnerWirelessEarbuds,
} from "../data/products";
import { StorefrontPanel } from "./storefront-panel";
import { OverridesPanel } from "./overrides-panel";
import styles from "./demo.module.css";

interface ThemeSpec {
  key: string;
  label: string;
  dataBrand?: string;
  dataTheme?: string;
  attrLabel: string;
}

const THEMES: ThemeSpec[] = [
  { key: "default", label: "Default", dataBrand: "default", attrLabel: 'data-brand="default"' },
  { key: "acme", label: "Acme brand", dataBrand: "acme", attrLabel: 'data-brand="acme"' },
  { key: "dark", label: "Dark theme", dataTheme: "dark", attrLabel: 'data-theme="dark"' },
];

/**
 * Owns the one piece of state this screen shares: `inStock`. It's lifted
 * above all three theme panels so flipping it re-renders <StorefrontPanel>
 * identically in each — proof the three columns really are the same
 * component code, not three hand-tuned copies (ARCHITECTURE.md §7).
 */
export function ThemeDemo() {
  const [inStock, setInStock] = useState(true);

  return (
    <div className={styles.root}>
      <div className={styles.toggleRow}>
        <span className={styles.toggleLabel}>
          Live toggle — flips one <code>inStock</code> state shared by all three panels below.
        </span>
        <Button
          variant={inStock ? "secondary" : "danger"}
          size="sm"
          onClick={() => setInStock((value) => !value)}
        >
          {inStock ? "Simulate: out of stock" : "Simulate: back in stock"}
        </Button>
      </div>

      <div className={styles.themeGrid}>
        {THEMES.map((theme) => (
          <div
            key={theme.key}
            data-brand={theme.dataBrand}
            data-theme={theme.dataTheme}
            className={styles.panel}
          >
            <div className={styles.panelHeader}>
              <span className={styles.panelTitle}>{theme.label}</span>
              <code className={styles.panelAttr}>{theme.attrLabel}</code>
            </div>
            <StorefrontPanel products={products} featured={featuredProduct} inStock={inStock} />
          </div>
        ))}
      </div>

      <OverridesPanel
        classNameProduct={merinoRibbedBeanie}
        slotMapProduct={vacuumSteelBottle}
        swappedPriceProduct={trailrunnerWirelessEarbuds}
      />
    </div>
  );
}
