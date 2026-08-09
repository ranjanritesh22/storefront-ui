import { Input } from "@storefront/ui";
import styles from "./plp.module.css";

const NAV_LINKS = ["New Arrivals", "Men", "Women", "Kids", "Accessories", "Brands"];

function SearchIcon() {
  return (
    <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" className={styles.icon16} aria-hidden="true">
      <circle cx="9" cy="9" r="6" />
      <path d="M17 17l-4-4" strokeLinecap="round" />
    </svg>
  );
}

function UserIcon() {
  return (
    <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" className={styles.icon20} aria-hidden="true">
      <circle cx="10" cy="6.5" r="3.5" />
      <path d="M2.5 17.5a7.5 7.5 0 0115 0" strokeLinecap="round" />
    </svg>
  );
}

function HeartIcon() {
  return (
    <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" className={styles.icon20} aria-hidden="true">
      <path
        d="M10 17s-6.5-4.06-6.5-8.5A3.5 3.5 0 0110 6a3.5 3.5 0 016.5 2.5C16.5 12.94 10 17 10 17z"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function BagIcon() {
  return (
    <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" className={styles.icon20} aria-hidden="true">
      <path d="M5 7h10l-1 10.5H6L5 7z" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M7.5 7V5.5a2.5 2.5 0 015 0V7" strokeLinecap="round" />
    </svg>
  );
}

/**
 * Static shell — no interactive state of its own, so it stays a plain
 * (Server) component; the search `Input` and icon buttons don't wire up to
 * anything (no data fetching / business logic in this package, per
 * CLAUDE.md non-goals — a real storefront app would own cart/wishlist state).
 */
export function SiteHeader() {
  return (
    <>
      <div className={styles.announcementBar}>
        <span>Free delivery on orders above ₹2,999</span>
        <span>Easy 7-day returns</span>
        <span>Download App &amp; Get 10% Off</span>
      </div>
      <header className={styles.header}>
        <div className={styles.headerInner}>
          <a href="/plp" className={styles.logo}>
            KICKO.
          </a>
          <nav className={styles.nav} aria-label="Main">
            {NAV_LINKS.map((link) => (
              <a key={link} href="#" className={styles.navLink}>
                {link}
              </a>
            ))}
            <a href="#" className={styles.navLinkSale}>
              Sale
            </a>
          </nav>
          <div className={styles.searchWrap}>
            <Input
              type="search"
              placeholder="Search for shoes..."
              aria-label="Search"
              className={styles.searchInput}
            />
            <span aria-hidden="true" className={styles.searchIcon}>
              <SearchIcon />
            </span>
          </div>
          <div className={styles.headerActions}>
            <button type="button" className={styles.iconButton} aria-label="Account">
              <UserIcon />
            </button>
            <button type="button" className={styles.iconButton} aria-label="Wishlist">
              <HeartIcon />
            </button>
            <button type="button" className={styles.iconButton} aria-label="Cart, 2 items">
              <BagIcon />
              <span aria-hidden="true" className={styles.cartCount}>
                2
              </span>
            </button>
          </div>
        </div>
      </header>
    </>
  );
}

export { SearchIcon };
