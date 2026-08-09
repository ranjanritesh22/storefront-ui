import type { Metadata } from "next";
import { SiteHeader } from "../../components/plp/site-header";
import { PlpExplorer } from "../../components/plp/plp-explorer";
import { TrustStrip } from "../../components/plp/trust-strip";
import { SiteFooter } from "../../components/plp/site-footer";

export const metadata: Metadata = {
  title: "Men's Shoes — KICKO",
  description: "A full PLP built entirely from @storefront/ui components.",
};

/**
 * A full product-listing page assembled from @storefront/ui — the "does
 * this library actually build a real page" proof. `SiteHeader`/`TrustStrip`/
 * `SiteFooter` are static and stay server-rendered; `PlpExplorer` is the one
 * client boundary (it owns filter/sort/pagination state).
 */
export default function PlpPage() {
  return (
    <>
      <SiteHeader />
      <PlpExplorer />
      <TrustStrip />
      <SiteFooter />
    </>
  );
}
