import * as React from "react";
import { cn } from "../../lib/cn";
import { Container } from "../container/container";
import { headerShellVariants, headerShellUtilityBarVariants } from "./header-shell.variants";

export interface HeaderShellClassNames {
  utilityBar?: string;
  inner?: string;
  logo?: string;
  search?: string;
  nav?: string;
  mobileNav?: string;
  actions?: string;
}

export interface HeaderShellProps extends React.HTMLAttributes<HTMLElement> {
  /** A thin bar above the main row, e.g. a promo message or `LanguageCurrencySelector`. */
  utilityBar?: React.ReactNode;
  logo: React.ReactNode;
  /** Typically a search `Input`. Grows to fill the remaining row width. */
  search?: React.ReactNode;
  /** Desktop navigation, e.g. `NavMenu` or `MegaMenu`. Hidden below `lg`. */
  nav?: React.ReactNode;
  /** The `MobileNav` trigger. Hidden from `lg` up. */
  mobileNav?: React.ReactNode;
  /** Account / wishlist / cart icon buttons. */
  actions?: React.ReactNode;
  classNames?: HeaderShellClassNames;
}

/**
 * Pure slot container for the site header — it owns responsive layout only,
 * no logo, nav shape or action set of its own. No internal state, so it
 * stays a Server Component even though most of what fills its slots
 * (`MegaMenu`, `MobileNav`, a cart button) will be client components.
 */
export const HeaderShell = React.forwardRef<HTMLElement, HeaderShellProps>(
  (
    { className, classNames, utilityBar, logo, search, nav, mobileNav, actions, ...props },
    ref,
  ) => (
    <header ref={ref} className={cn(headerShellVariants(), className)} {...props}>
      {utilityBar ? (
        <div className={cn(headerShellUtilityBarVariants(), classNames?.utilityBar)}>
          {utilityBar}
        </div>
      ) : null}
      <Container size="xl" className={cn("flex items-center gap-4 py-3", classNames?.inner)}>
        {mobileNav ? (
          <div className={cn("shrink-0 lg:hidden", classNames?.mobileNav)}>{mobileNav}</div>
        ) : null}
        <div className={cn("shrink-0", classNames?.logo)}>{logo}</div>
        {nav ? <div className={cn("hidden lg:flex", classNames?.nav)}>{nav}</div> : null}
        {search ? <div className={cn("min-w-0 flex-1", classNames?.search)}>{search}</div> : null}
        {actions ? (
          <div className={cn("ms-auto flex shrink-0 items-center gap-2", classNames?.actions)}>
            {actions}
          </div>
        ) : null}
      </Container>
    </header>
  ),
);

HeaderShell.displayName = "HeaderShell";
