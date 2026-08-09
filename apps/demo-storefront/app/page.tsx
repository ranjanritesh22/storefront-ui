import Link from "next/link";
import { ThemeDemo } from "../components/theme-demo";
import styles from "./page.module.css";

export default function Home() {
  return (
    <main className={styles.main}>
      <header className={styles.header}>
        <h1 className={styles.heading}>PLP + PDP, one component tree, three themes</h1>
        <p className={styles.subheading}>
          The grid below and the compact product panel are the same <code>@storefront/ui</code>{" "}
          component code, rendered three times under <code>data-brand=&quot;default&quot;</code>,{" "}
          <code>data-brand=&quot;acme&quot;</code>, and <code>data-theme=&quot;dark&quot;</code>.
          Only the token layer differs. See{" "}
          <Link href="/buttons" className={styles.link}>
            the Button showcase
          </Link>{" "}
          for the individual component in isolation.
        </p>
      </header>

      <ThemeDemo />
    </main>
  );
}
