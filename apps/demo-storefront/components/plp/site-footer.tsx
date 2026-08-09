import { Button, Input } from "@storefront/ui";
import styles from "./plp.module.css";

const FOOTER_COLUMNS = [
  {
    heading: "Shop",
    links: ["Men", "Women", "Kids", "Accessories", "Brands", "Sale"],
  },
  {
    heading: "Help",
    links: ["Contact Us", "FAQs", "Shipping & Delivery", "Returns & Refunds", "Track Order", "Size Guide"],
  },
  {
    heading: "About",
    links: ["About Us", "Careers", "Store Locator", "Press", "Sustainability", "Terms & Conditions"],
  },
];

function SocialIcon({ path }: { path: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={styles.icon16} aria-hidden="true">
      <path d={path} />
    </svg>
  );
}

/** Static — no interactive state (the newsletter input is decorative in this demo), stays a plain component. */
export function SiteFooter() {
  return (
    <footer className={styles.footer}>
      <div className={styles.footerInner}>
        <div>
          <p className={styles.footerBrand}>KICKO.</p>
          <p className={styles.footerTagline}>
            Your ultimate destination for stylish, comfortable and high-performance shoes.
          </p>
          <div className={styles.socialRow}>
            <a href="#" aria-label="Instagram" className={styles.socialLink}>
              <SocialIcon path="M12 2c2.7 0 3.06.01 4.12.06 1.06.05 1.79.22 2.43.47.66.26 1.22.6 1.77 1.16.55.55.9 1.11 1.16 1.77.25.64.42 1.37.47 2.43.05 1.06.06 1.42.06 4.11 0 2.7-.01 3.06-.06 4.12-.05 1.06-.22 1.79-.47 2.43a4.9 4.9 0 01-1.16 1.77 4.9 4.9 0 01-1.77 1.16c-.64.25-1.37.42-2.43.47-1.06.05-1.42.06-4.12.06-2.7 0-3.06-.01-4.11-.06-1.06-.05-1.79-.22-2.43-.47a4.9 4.9 0 01-1.77-1.16 4.9 4.9 0 01-1.16-1.77c-.25-.64-.42-1.37-.47-2.43C2.01 15.06 2 14.7 2 12c0-2.7.01-3.06.06-4.11.05-1.06.22-1.79.47-2.43.26-.66.6-1.22 1.16-1.77A4.9 4.9 0 015.46 2.53c.64-.25 1.37-.42 2.43-.47C8.94 2.01 9.3 2 12 2zm0 1.8c-2.65 0-2.98.01-4.02.06-.86.04-1.33.18-1.64.3-.41.16-.7.35-1.01.65-.3.31-.49.6-.65 1.01-.12.31-.26.78-.3 1.64-.05 1.04-.06 1.37-.06 4.02 0 2.65.01 2.98.06 4.02.04.86.18 1.33.3 1.64.16.41.35.7.65 1.01.31.3.6.49 1.01.65.31.12.78.26 1.64.3 1.04.05 1.37.06 4.02.06 2.65 0 2.98-.01 4.02-.06.86-.04 1.33-.18 1.64-.3.41-.16.7-.35 1.01-.65.3-.31.49-.6.65-1.01.12-.31.26-.78.3-1.64.05-1.04.06-1.37.06-4.02 0-2.65-.01-2.98-.06-4.02-.04-.86-.18-1.33-.3-1.64a2.7 2.7 0 00-.65-1.01 2.7 2.7 0 00-1.01-.65c-.31-.12-.78-.26-1.64-.3-1.04-.05-1.37-.06-4.02-.06zm0 4.6a4.6 4.6 0 110 9.2 4.6 4.6 0 010-9.2zm0 1.8a2.8 2.8 0 100 5.6 2.8 2.8 0 000-5.6zm5.85-2a1.08 1.08 0 11-2.16 0 1.08 1.08 0 012.16 0z" />
            </a>
            <a href="#" aria-label="Facebook" className={styles.socialLink}>
              <SocialIcon path="M13.5 21v-7.5H16l.4-3H13.5V8.4c0-.87.24-1.46 1.5-1.46H16.5V4.35c-.26-.03-1.14-.11-2.17-.11-2.15 0-3.62 1.31-3.62 3.72v2.08H8.25v3H10.7V21h2.8z" />
            </a>
            <a href="#" aria-label="YouTube" className={styles.socialLink}>
              <SocialIcon path="M21.6 7.7a2.5 2.5 0 00-1.76-1.77C18.25 5.5 12 5.5 12 5.5s-6.25 0-7.84.43A2.5 2.5 0 002.4 7.7 26 26 0 002 12a26 26 0 00.4 4.3 2.5 2.5 0 001.76 1.77c1.59.43 7.84.43 7.84.43s6.25 0 7.84-.43a2.5 2.5 0 001.76-1.77A26 26 0 0022 12a26 26 0 00-.4-4.3zM10 15.2V8.8L15.5 12 10 15.2z" />
            </a>
          </div>
        </div>

        {FOOTER_COLUMNS.map((column) => (
          <div key={column.heading}>
            <h3 className={styles.footerHeading}>{column.heading}</h3>
            <ul className={styles.footerLinkList}>
              {column.links.map((link) => (
                <li key={link}>
                  <a href="#" className={styles.footerLink}>
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}

        <div>
          <h3 className={styles.footerHeading}>Stay in the loop</h3>
          <p className={styles.footerNewsletterCopy}>
            Get updates on new arrivals, exclusive offers and more.
          </p>
          <div className={styles.newsletterRow}>
            <Input
              type="email"
              placeholder="Enter your email"
              aria-label="Email address"
              className={styles.newsletterInput}
            />
            <Button variant="secondary">→</Button>
          </div>
        </div>
      </div>
      <div className={styles.footerBottomRow}>
        <p className={styles.footerBottomInner}>© {new Date().getFullYear()} KICKO. All rights reserved.</p>
      </div>
    </footer>
  );
}
