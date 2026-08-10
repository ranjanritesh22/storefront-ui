"use client";

import * as React from "react";
import { cn } from "../../lib/cn";
import { getMessages } from "../../i18n/messages";
import {
  Drawer,
  DrawerTrigger,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerBody,
  DrawerFooter,
  DrawerClose,
} from "../drawer/drawer";
import type { DrawerContentVariantsProps } from "../drawer/drawer.variants";
import { Button, type ButtonProps } from "../button/button";
import { FacetPanel, type FacetPanelProps, type FacetGroupData } from "../facet-panel/facet-panel";
import { mobileFilterDrawerBodyVariants } from "./mobile-filter-drawer.variants";

export interface MobileFilterDrawerClassNames {
  overlay?: string;
  content?: string;
  header?: string;
  body?: string;
  footer?: string;
  clearButton?: string;
  applyButton?: string;
  /** Forwarded to the `FacetPanel` rendered inside the body. */
  panel?: FacetPanelProps["classNames"];
}

export interface MobileFilterDrawerSlots {
  /** Swap the panel rendered in the body — defaults to `FacetPanel`. */
  Panel?: React.ComponentType<FacetPanelProps>;
  /** Swap the footer's primary "Apply" action. See ARCHITECTURE.md §4, layer 4. */
  ApplyButton?: React.ComponentType<ButtonProps>;
  /** Swap the footer's "Clear all" action. */
  ClearButton?: React.ComponentType<ButtonProps>;
}

export interface MobileFilterDrawerProps {
  /** Controlled open state — pair with `onOpenChange`. Omit both to let `Drawer` own the state via `defaultOpen`. */
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  /** Element that opens the drawer, e.g. `<Button>Filter</Button>` — wrapped in `DrawerTrigger asChild`. Omit to control `open` externally instead. */
  trigger?: React.ReactNode;
  /** Facet groups shown in the body — the same shape `FacetPanel` itself takes. */
  groups: FacetGroupData[];
  title?: string;
  /** Which edge the drawer slides from. @default "bottom" — the natural mobile-filter pattern. */
  side?: DrawerContentVariantsProps["side"];
  /** When given, renders as part of the primary action's label, e.g. "Show 128 results". */
  resultCount?: number;
  /** Called when the primary action is pressed, in addition to closing the drawer. */
  onApply?: () => void;
  /** Presence of this callback is what shows the footer's "clear all" action. */
  onClearAll?: () => void;
  applyLabel?: string;
  clearLabel?: string;
  classNames?: MobileFilterDrawerClassNames;
  slots?: MobileFilterDrawerSlots;
}

/**
 * The mobile PLP filter surface: `Drawer` (docked to the bottom edge by
 * default) with a `FacetPanel` in the body and Apply/Clear actions in the
 * footer. Composes `Drawer`/`FacetPanel`/`Button` as-is — no reimplemented
 * dialog, focus-trap, or scroll-lock logic; `Drawer` already owns all of
 * that. Client Component: it's a dialog-family surface, the same boundary
 * `Drawer` itself already establishes.
 */
export const MobileFilterDrawer = React.forwardRef<HTMLDivElement, MobileFilterDrawerProps>(
  (
    {
      open,
      defaultOpen,
      onOpenChange,
      trigger,
      groups,
      title,
      side = "bottom",
      resultCount,
      onApply,
      onClearAll,
      applyLabel,
      clearLabel,
      classNames,
      slots,
    },
    ref,
  ) => {
    const t = getMessages().mobileFilterDrawer;
    const PanelSlot = slots?.Panel ?? FacetPanel;
    const ApplyButtonSlot = slots?.ApplyButton ?? Button;
    const ClearButtonSlot = slots?.ClearButton ?? Button;

    return (
      <Drawer open={open} defaultOpen={defaultOpen} onOpenChange={onOpenChange}>
        {trigger ? <DrawerTrigger asChild>{trigger}</DrawerTrigger> : null}
        <DrawerContent
          ref={ref}
          side={side}
          classNames={{ overlay: classNames?.overlay, content: classNames?.content, header: classNames?.header, footer: classNames?.footer }}
        >
          <DrawerHeader>
            <DrawerTitle>{title ?? t.title}</DrawerTitle>
          </DrawerHeader>
          <DrawerBody className={cn(mobileFilterDrawerBodyVariants(), classNames?.body)}>
            <PanelSlot groups={groups} classNames={classNames?.panel} />
          </DrawerBody>
          <DrawerFooter>
            {onClearAll ? (
              <ClearButtonSlot
                type="button"
                variant="outline"
                onClick={onClearAll}
                className={classNames?.clearButton}
              >
                {clearLabel ?? t.clearAll}
              </ClearButtonSlot>
            ) : null}
            <DrawerClose asChild>
              <ApplyButtonSlot type="button" onClick={onApply} className={classNames?.applyButton}>
                {applyLabel ?? t.apply(resultCount)}
              </ApplyButtonSlot>
            </DrawerClose>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    );
  },
);

MobileFilterDrawer.displayName = "MobileFilterDrawer";
