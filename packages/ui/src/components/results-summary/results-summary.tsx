import * as React from "react";
import { cn } from "../../lib/cn";
import { getMessages } from "../../i18n/messages";
import { resultsSummaryVariants, type ResultsSummaryVariantsProps } from "./results-summary.variants";

export interface ResultsSummaryClassNames {
  root?: string;
  text?: string;
}

export interface ResultsSummaryProps
  extends Omit<React.HTMLAttributes<HTMLParagraphElement>, "children">,
    ResultsSummaryVariantsProps {
  /** 1-based index of the first item on the current page. */
  start: number;
  /** 1-based index of the last item on the current page. */
  end: number;
  /** Total item count across all pages. */
  total: number;
  classNames?: ResultsSummaryClassNames;
}

/**
 * Presentational "Showing 1–12 of 240" text for a PLP toolbar. Pure
 * data-in/text-out, no internal state — stays a Server Component (CLAUDE.md
 * rule 2). The whole sentence — not just the numbers — comes from
 * `getMessages()` so a locale can reorder words a `{start}`-style template
 * literal couldn't (CLAUDE.md rule 12).
 */
export const ResultsSummary = React.forwardRef<HTMLParagraphElement, ResultsSummaryProps>(
  ({ className, classNames, size, start, end, total, ...props }, ref) => {
    const t = getMessages();
    const message = total === 0 ? t.resultsSummary.noResults : t.resultsSummary.showing({ start, end, total });

    return (
      <p
        ref={ref}
        className={cn(resultsSummaryVariants({ size }), classNames?.root, className)}
        {...props}
      >
        <span className={classNames?.text}>{message}</span>
      </p>
    );
  },
);

ResultsSummary.displayName = "ResultsSummary";
