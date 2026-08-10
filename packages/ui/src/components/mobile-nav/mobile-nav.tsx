"use client";

import * as React from "react";
import { cn } from "../../lib/cn";
import { Icon } from "../icon/icon";
import { VisuallyHidden } from "../visually-hidden/visually-hidden";
import {
  Drawer,
  DrawerTrigger,
  DrawerContent,
  DrawerHeader,
  DrawerBody,
  DrawerTitle,
} from "../drawer/drawer";
import { getMessages } from "../../i18n/messages";
import { mobileNavTriggerVariants, mobileNavBackVariants, mobileNavItemVariants } from "./mobile-nav.variants";

export interface MobileNavItem {
  label: React.ReactNode;
  /** A leaf link — omit when `children` drills into a nested category instead. */
  href?: string;
  children?: MobileNavItem[];
}

export interface MobileNavClassNames {
  content?: string;
  header?: string;
  list?: string;
  item?: string;
  link?: string;
}

export interface MobileNavLinkProps {
  href: string;
  className?: string;
  children: React.ReactNode;
}

export interface MobileNavSlots {
  /** Swap the anchor for e.g. `next/link` — see ARCHITECTURE.md §4, layer 4. */
  Link?: React.ComponentType<MobileNavLinkProps>;
}

export interface MobileNavProps {
  items: MobileNavItem[];
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  /** Title announced for the drawer and shown at the root level. @default getMessages().mobileNav.nav */
  label?: string;
  /** Replaces the default hamburger-icon trigger button. */
  trigger?: React.ReactNode;
  /** aria-label on the default trigger button. @default getMessages().mobileNav.open */
  triggerLabel?: string;
  classNames?: MobileNavClassNames;
  slots?: MobileNavSlots;
}

function DefaultMobileNavLink({ href, className, children }: MobileNavLinkProps) {
  return (
    <a href={href} className={className}>
      {children}
    </a>
  );
}

/**
 * Drawer-based mobile navigation with nested categories and back
 * navigation — the off-canvas menu a `HeaderShell` renders on small
 * viewports. Drills into `item.children` one level at a time, keeping a
 * back-stack so the shopper can always retrace their steps; the current
 * category's label is announced via `getMessages().mobileNav.back()`.
 * Wraps `Drawer` (itself `@radix-ui/react-dialog`), so it inherits focus
 * trap, Escape/outside-click dismissal and scroll lock for free.
 */
export const MobileNav = React.forwardRef<HTMLButtonElement, MobileNavProps>(
  (
    { items, open, defaultOpen, onOpenChange, label, trigger, triggerLabel, classNames, slots },
    ref,
  ) => {
    const messages = getMessages().mobileNav;
    const LinkSlot = slots?.Link ?? DefaultMobileNavLink;

    const [internalOpen, setInternalOpen] = React.useState(defaultOpen ?? false);
    const isControlled = open !== undefined;
    const isOpen = isControlled ? open : internalOpen;

    const [stack, setStack] = React.useState<MobileNavItem[]>([]);

    const handleOpenChange = React.useCallback(
      (next: boolean) => {
        if (!next) setStack([]);
        if (!isControlled) setInternalOpen(next);
        onOpenChange?.(next);
      },
      [isControlled, onOpenChange],
    );

    const activeCategory = stack[stack.length - 1];
    const currentItems = activeCategory?.children ?? items;
    const rootLabel = label ?? messages.nav;
    const backTargetLabel = stack.length > 1 ? stack[stack.length - 2]?.label : rootLabel;

    return (
      <Drawer open={isOpen} onOpenChange={handleOpenChange}>
        <DrawerTrigger ref={ref} asChild>
          {trigger ?? (
            <button
              type="button"
              aria-label={triggerLabel ?? messages.open}
              className={mobileNavTriggerVariants()}
            >
              <Icon name="menu" aria-hidden="true" />
            </button>
          )}
        </DrawerTrigger>
        <DrawerContent side="start" classNames={{ content: classNames?.content }}>
          <VisuallyHidden>
            <DrawerTitle>{rootLabel}</DrawerTitle>
          </VisuallyHidden>
          <DrawerHeader className={classNames?.header}>
            {activeCategory ? (
              <button
                type="button"
                onClick={() => setStack((s) => s.slice(0, -1))}
                aria-label={messages.back(backTargetLabel)}
                className={mobileNavBackVariants()}
              >
                <Icon name="arrow-left" size="sm" aria-hidden="true" />
                {activeCategory.label}
              </button>
            ) : (
              <span className="font-sans text-sm font-medium text-foreground">{rootLabel}</span>
            )}
          </DrawerHeader>
          <DrawerBody>
            <nav aria-label={messages.nav}>
              <ul className={cn("flex flex-col", classNames?.list)}>
                {currentItems.map((item, index) => (
                  <li key={index} className={classNames?.item}>
                    {item.children ? (
                      <button
                        type="button"
                        onClick={() => setStack((s) => [...s, item])}
                        className={mobileNavItemVariants()}
                      >
                        {item.label}
                        <Icon name="chevron-right" size="sm" aria-hidden="true" />
                      </button>
                    ) : (
                      <span onClick={() => handleOpenChange(false)}>
                        <LinkSlot
                          href={item.href as string}
                          className={cn(mobileNavItemVariants(), classNames?.link)}
                        >
                          {item.label}
                        </LinkSlot>
                      </span>
                    )}
                  </li>
                ))}
              </ul>
            </nav>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    );
  },
);

MobileNav.displayName = "MobileNav";
