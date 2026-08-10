"use client";

import * as React from "react";
import * as NavigationMenuPrimitive from "@radix-ui/react-navigation-menu";
import { cn } from "../../lib/cn";
import { Icon } from "../icon/icon";
import { getMessages } from "../../i18n/messages";
import {
  megaMenuVariants,
  megaMenuListVariants,
  megaMenuTriggerVariants,
  megaMenuLinkVariants,
  megaMenuContentVariants,
  megaMenuViewportVariants,
  megaMenuSectionHeadingVariants,
  megaMenuFeaturedVariants,
} from "./mega-menu.variants";

export interface MegaMenuLinkItem {
  label: React.ReactNode;
  href: string;
  description?: React.ReactNode;
}

export interface MegaMenuSection {
  heading?: React.ReactNode;
  links: MegaMenuLinkItem[];
}

export interface MegaMenuFeatured {
  title: React.ReactNode;
  href: string;
  image?: React.ReactNode;
}

export interface MegaMenuItem {
  label: React.ReactNode;
  /** A plain link item — omit when `sections` opens a disclosure panel instead. */
  href?: string;
  /** Present → this item opens a multi-column disclosure panel. */
  sections?: MegaMenuSection[];
  featured?: MegaMenuFeatured;
}

export interface MegaMenuClassNames {
  root?: string;
  list?: string;
  item?: string;
  trigger?: string;
  content?: string;
  section?: string;
  sectionHeading?: string;
  link?: string;
  featured?: string;
}

export interface MegaMenuLinkProps {
  href: string;
  className?: string;
  children: React.ReactNode;
}

export interface MegaMenuSlots {
  /** Swap the anchor for e.g. `next/link` — see ARCHITECTURE.md §4, layer 4. */
  Link?: React.ComponentType<MegaMenuLinkProps>;
}

export interface MegaMenuProps
  extends Omit<React.ComponentPropsWithoutRef<typeof NavigationMenuPrimitive.Root>, "children"> {
  items: MegaMenuItem[];
  classNames?: MegaMenuClassNames;
  slots?: MegaMenuSlots;
}

function DefaultMegaMenuLink({ href, className, children }: MegaMenuLinkProps) {
  return (
    <a href={href} className={className}>
      {children}
    </a>
  );
}

/**
 * Multi-column disclosure navigation — the top-level "Men" / "Women" /
 * "Sale" panels a category mega menu needs. Data-driven from `items`, built
 * on `@radix-ui/react-navigation-menu` for roving keyboard navigation and
 * combined hover-intent + focus open/close behaviour (a mouse user hovers
 * the trigger; a keyboard user tabs to it and presses Enter/Space — both
 * open the same panel). The shared, size-animated `Viewport` means opening a
 * wider or taller panel never shifts page layout.
 */
export const MegaMenu = React.forwardRef<
  React.ElementRef<typeof NavigationMenuPrimitive.Root>,
  MegaMenuProps
>(({ className, classNames, items, slots, ...props }, ref) => {
  const LinkSlot = slots?.Link ?? DefaultMegaMenuLink;

  return (
    <NavigationMenuPrimitive.Root
      ref={ref}
      aria-label={props["aria-label"] ?? getMessages().megaMenu.nav}
      className={cn(megaMenuVariants(), className, classNames?.root)}
      {...props}
    >
      <NavigationMenuPrimitive.List className={cn(megaMenuListVariants(), classNames?.list)}>
        {items.map((item, index) => (
          <NavigationMenuPrimitive.Item key={index} className={classNames?.item}>
            {item.sections ? (
              <>
                <NavigationMenuPrimitive.Trigger
                  className={cn(megaMenuTriggerVariants(), classNames?.trigger)}
                >
                  {item.label}
                  <Icon name="chevron-down" size="sm" aria-hidden="true" />
                </NavigationMenuPrimitive.Trigger>
                <NavigationMenuPrimitive.Content
                  className={cn(megaMenuContentVariants(), classNames?.content)}
                >
                  <div className="grid grid-cols-3 gap-6">
                    {item.sections.map((section, sectionIndex) => (
                      <div key={sectionIndex} className={classNames?.section}>
                        {section.heading ? (
                          <p className={cn(megaMenuSectionHeadingVariants(), classNames?.sectionHeading)}>
                            {section.heading}
                          </p>
                        ) : null}
                        <ul className="flex flex-col gap-1">
                          {section.links.map((link, linkIndex) => (
                            <li key={linkIndex}>
                              <NavigationMenuPrimitive.Link asChild>
                                <LinkSlot
                                  href={link.href}
                                  className={cn(megaMenuLinkVariants(), classNames?.link)}
                                >
                                  <span className="flex flex-col">
                                    <span>{link.label}</span>
                                    {link.description ? (
                                      <span className="text-xs text-foreground-muted">
                                        {link.description}
                                      </span>
                                    ) : null}
                                  </span>
                                </LinkSlot>
                              </NavigationMenuPrimitive.Link>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                    {item.featured ? (
                      <NavigationMenuPrimitive.Link asChild>
                        <LinkSlot
                          href={item.featured.href}
                          className={cn(megaMenuFeaturedVariants(), classNames?.featured)}
                        >
                          {item.featured.image}
                          <span className="text-sm font-medium text-foreground">
                            {item.featured.title}
                          </span>
                        </LinkSlot>
                      </NavigationMenuPrimitive.Link>
                    ) : null}
                  </div>
                </NavigationMenuPrimitive.Content>
              </>
            ) : (
              <NavigationMenuPrimitive.Link asChild>
                <LinkSlot
                  href={item.href as string}
                  className={cn(megaMenuLinkVariants(), classNames?.link)}
                >
                  {item.label}
                </LinkSlot>
              </NavigationMenuPrimitive.Link>
            )}
          </NavigationMenuPrimitive.Item>
        ))}
      </NavigationMenuPrimitive.List>
      <div className="absolute left-0 top-full flex w-full justify-center">
        <NavigationMenuPrimitive.Viewport className={megaMenuViewportVariants()} />
      </div>
    </NavigationMenuPrimitive.Root>
  );
});

MegaMenu.displayName = "MegaMenu";
