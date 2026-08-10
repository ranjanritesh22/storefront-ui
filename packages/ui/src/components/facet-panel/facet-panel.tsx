import * as React from "react";
import { cn } from "../../lib/cn";
import { getMessages } from "../../i18n/messages";
import { Button, type ButtonProps } from "../button/button";
import { Skeleton } from "../skeleton/skeleton";
import { FacetGroup, type FacetGroupProps } from "../facet-group/facet-group";
import {
  facetPanelVariants,
  facetPanelHeaderVariants,
  facetPanelSkeletonVariants,
  facetPanelSkeletonGroupVariants,
  type FacetPanelVariantsProps,
} from "./facet-panel.variants";

/** One entry in `FacetPanel`'s `groups` prop — the same data `FacetGroup` itself takes, minus the styling-only props. */
export interface FacetGroupData extends Omit<FacetGroupProps, "classNames" | "slots" | "className"> {}

export interface FacetPanelClassNames {
  root?: string;
  header?: string;
  heading?: string;
  group?: string;
  clearAllButton?: string;
}

export interface FacetPanelSlots {
  /** Swap the component every group renders through — defaults to `FacetGroup`. */
  Group?: React.ComponentType<FacetGroupProps>;
  /** Swap the "clear all" action. See ARCHITECTURE.md §4, layer 4. */
  ClearAllButton?: React.ComponentType<ButtonProps>;
}

export interface FacetPanelProps extends React.HTMLAttributes<HTMLDivElement>, FacetPanelVariantsProps {
  /** Data-driven list of facets to render, one `FacetGroup` per entry. */
  groups: FacetGroupData[];
  /** Heading shown above the group list, e.g. "Filters". Omit to hide the header row entirely (unless `onClearAll` is given). */
  heading?: React.ReactNode;
  /** Presence of this callback is what shows the header's "clear all" action — same pattern as `ProductCard`'s wishlist toggle. */
  onClearAll?: () => void;
  clearAllLabel?: string;
  classNames?: FacetPanelClassNames;
  slots?: FacetPanelSlots;
}

/**
 * Lays out a set of `FacetGroup`s from a plain data array — the PLP sidebar
 * / drawer body. No selection state of its own (each `FacetGroupData` entry
 * carries its own `selectedValues`/`onSelectionChange` etc., exactly like
 * using `FacetGroup` directly), so it stays a Server Component, the same way
 * `ProductCard` composes the client `Button` without needing `"use client"`
 * itself.
 */
export const FacetPanel = React.forwardRef<HTMLDivElement, FacetPanelProps>(
  ({ className, classNames, slots, groups, heading, onClearAll, clearAllLabel, ...props }, ref) => {
    const t = getMessages().facetPanel;
    const GroupSlot = slots?.Group ?? FacetGroup;
    const ClearAllButtonSlot = slots?.ClearAllButton ?? Button;
    const showHeader = Boolean(heading) || Boolean(onClearAll);

    return (
      <div ref={ref} className={cn(facetPanelVariants(), classNames?.root, className)} {...props}>
        {showHeader ? (
          <div className={cn(facetPanelHeaderVariants(), classNames?.header)}>
            {heading ? (
              <h2 className={cn("font-sans text-base font-semibold text-foreground", classNames?.heading)}>
                {heading}
              </h2>
            ) : (
              <span />
            )}
            {onClearAll ? (
              <ClearAllButtonSlot
                type="button"
                variant="ghost"
                size="sm"
                onClick={onClearAll}
                className={classNames?.clearAllButton}
              >
                {clearAllLabel ?? t.clearAll}
              </ClearAllButtonSlot>
            ) : null}
          </div>
        ) : null}
        <div className="flex flex-col">
          {groups.map((group) => (
            <GroupSlot key={group.id} className={classNames?.group} {...group} />
          ))}
        </div>
      </div>
    );
  },
);

FacetPanel.displayName = "FacetPanel";

export interface FacetPanelSkeletonClassNames {
  root?: string;
  group?: string;
}

export interface FacetPanelSkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Number of placeholder facet groups to render. @default 4 */
  groupCount?: number;
  classNames?: FacetPanelSkeletonClassNames;
}

/**
 * `FacetPanel`'s loading placeholder — a fixed row of `Skeleton` primitives
 * mirroring a heading + option list per group, matching how `Skeleton` is
 * meant to be composed directly for a specific layout (see skeleton.mdx's
 * "Building a per-component skeleton"). No internal state, stays a Server
 * Component, same as `Skeleton` itself.
 */
export const FacetPanelSkeleton = React.forwardRef<HTMLDivElement, FacetPanelSkeletonProps>(
  ({ className, classNames, groupCount = 4, ...props }, ref) => (
    <div
      ref={ref}
      aria-hidden="true"
      className={cn(facetPanelSkeletonVariants(), classNames?.root, className)}
      {...props}
    >
      {Array.from({ length: groupCount }, (_, index) => (
        <div key={index} className={cn(facetPanelSkeletonGroupVariants(), classNames?.group)}>
          <Skeleton shape="text" className="h-4 w-24" />
          <div className="flex flex-col gap-2.5">
            <Skeleton shape="text" className="h-4 w-full" />
            <Skeleton shape="text" className="h-4 w-5/6" />
            <Skeleton shape="text" className="h-4 w-2/3" />
          </div>
        </div>
      ))}
    </div>
  ),
);

FacetPanelSkeleton.displayName = "FacetPanelSkeleton";
