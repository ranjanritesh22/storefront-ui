import * as React from "react";
import { cn } from "../../lib/cn";
import { Container } from "../container/container";
import { Grid } from "../grid/grid";
import {
  footerShellVariants,
  footerShellColumnHeadingVariants,
  footerShellBottomBarVariants,
} from "./footer-shell.variants";

export interface FooterShellColumn {
  heading: React.ReactNode;
  /** The column's own link list — a plain `<ul>`, or anything else. Not a fixed link-item shape, so this stays domain-agnostic. */
  children: React.ReactNode;
}

export interface FooterShellClassNames {
  inner?: string;
  columns?: string;
  column?: string;
  columnHeading?: string;
  newsletter?: string;
  social?: string;
  bottomBar?: string;
}

export interface FooterShellProps extends React.HTMLAttributes<HTMLElement> {
  /** Link columns, e.g. "Shop" / "Help" / "Company". */
  columns?: FooterShellColumn[];
  /** A newsletter signup form, rendered alongside the columns. */
  newsletter?: React.ReactNode;
  /** Social links row. */
  social?: React.ReactNode;
  /** Copyright, legal links, payment icons, `LanguageCurrencySelector` — rendered in a bar below a divider. */
  bottomBar?: React.ReactNode;
  classNames?: FooterShellClassNames;
}

/**
 * Pure slot container for the site footer — column layout only, no default
 * columns, links or bottom-bar content. No internal state, so it stays a
 * Server Component.
 */
export const FooterShell = React.forwardRef<HTMLElement, FooterShellProps>(
  ({ className, classNames, columns, newsletter, social, bottomBar, ...props }, ref) => (
    <footer ref={ref} className={cn(footerShellVariants(), className)} {...props}>
      <Container size="xl" className={cn("py-10", classNames?.inner)}>
        {columns || newsletter ? (
          <Grid
            cols={2}
            colsMd={newsletter ? 5 : 4}
            gap="lg"
            className={classNames?.columns}
          >
            {columns?.map((column, index) => (
              <div key={index} className={classNames?.column}>
                <h3 className={cn(footerShellColumnHeadingVariants(), classNames?.columnHeading)}>
                  {column.heading}
                </h3>
                {column.children}
              </div>
            ))}
            {newsletter ? (
              <div className={cn("col-span-2 md:col-span-1", classNames?.newsletter)}>
                {newsletter}
              </div>
            ) : null}
          </Grid>
        ) : null}
        {social ? <div className={cn("mt-8", classNames?.social)}>{social}</div> : null}
      </Container>
      {bottomBar ? (
        <Container size="xl">
          <div className={cn(footerShellBottomBarVariants(), classNames?.bottomBar)}>
            {bottomBar}
          </div>
        </Container>
      ) : null}
    </footer>
  ),
);

FooterShell.displayName = "FooterShell";
