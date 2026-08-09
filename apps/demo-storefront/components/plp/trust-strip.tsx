import styles from "./plp.module.css";

const ITEMS = [
  {
    heading: "100% Original",
    subheading: "Guaranteed Authentic",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className={styles.icon24} aria-hidden="true">
        <path d="M12 3l7 3v6c0 4.5-3 7.5-7 9-4-1.5-7-4.5-7-9V6l7-3z" strokeLinejoin="round" />
        <path d="M9 12l2 2 4-4" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    heading: "Easy Returns",
    subheading: "7-day return policy",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className={styles.icon24} aria-hidden="true">
        <path d="M4 12a8 8 0 1 1 2.5 5.8" strokeLinecap="round" />
        <path d="M4 12V7M4 12h5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    heading: "Free Delivery",
    subheading: "On orders above ₹2,999",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className={styles.icon24} aria-hidden="true">
        <path d="M2 8h13v9H2z" strokeLinejoin="round" />
        <path d="M15 11h4l3 3v3h-7z" strokeLinejoin="round" />
        <circle cx="6.5" cy="19" r="1.6" />
        <circle cx="17.5" cy="19" r="1.6" />
      </svg>
    ),
  },
  {
    heading: "Secure Payments",
    subheading: "100% secure payments",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className={styles.icon24} aria-hidden="true">
        <rect x="3" y="10" width="18" height="11" rx="2" />
        <path d="M7 10V7a5 5 0 0110 0v3" strokeLinecap="round" />
      </svg>
    ),
  },
];

/** Static — no interactive state, stays a plain component. */
export function TrustStrip() {
  return (
    <div className={styles.trustStrip}>
      <div className={styles.trustStripInner}>
        {ITEMS.map((item) => (
          <div key={item.heading} className={styles.trustItem}>
            <span className={styles.trustIcon}>{item.icon}</span>
            <div>
              <p className={styles.trustHeading}>{item.heading}</p>
              <p className={styles.trustSubheading}>{item.subheading}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
