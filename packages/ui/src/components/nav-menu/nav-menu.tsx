"use client";

import * as React from "react";
import * as NavigationMenuPrimitive from "@radix-ui/react-navigation-menu";
import { cn } from "../../lib/cn";
import { Icon } from "../icon/icon";
import { getMessages } from "../../i18n/messages";
import {
  navMenuVariants,
  navMenuListVariants,
  navMenuTriggerVariants,
  navMenuLinkVariants,
  navMenuContentVariants,
  navMenuViewportVariants,
} from "./nav-menu.variants";

export interface NavMenuProps
  extends React.ComponentPropsWithoutRef<typeof NavigationMenuPrimitive.Root> {}

/**
 * Top-level site navigation bar — a flat list of links, some of which can
 * open a single dropdown panel (see `NavMenuContent`). For a multi-column
 * disclosure panel with hover *and* focus support, reach for `MegaMenu`
 * instead. Wraps `@radix-ui/react-navigation-menu`, which owns roving
 * keyboard navigation and open/close timing.
 */
export const NavMenu = React.forwardRef<
  React.ElementRef<typeof NavigationMenuPrimitive.Root>,
  NavMenuProps
>(({ className, children, ...props }, ref) => (
  <NavigationMenuPrimitive.Root
    ref={ref}
    aria-label={props["aria-label"] ?? getMessages().navMenu.nav}
    className={cn(navMenuVariants(), className)}
    {...props}
  >
    {children}
    <div className="absolute left-0 top-full flex w-full justify-center">
      <NavigationMenuPrimitive.Viewport className={navMenuViewportVariants()} />
    </div>
  </NavigationMenuPrimitive.Root>
));
NavMenu.displayName = "NavMenu";

export interface NavMenuListProps
  extends React.ComponentPropsWithoutRef<typeof NavigationMenuPrimitive.List> {}

export const NavMenuList = React.forwardRef<
  React.ElementRef<typeof NavigationMenuPrimitive.List>,
  NavMenuListProps
>(({ className, ...props }, ref) => (
  <NavigationMenuPrimitive.List
    ref={ref}
    className={cn(navMenuListVariants(), className)}
    {...props}
  />
));
NavMenuList.displayName = "NavMenuList";

export const NavMenuItem = NavigationMenuPrimitive.Item;

export interface NavMenuTriggerProps
  extends React.ComponentPropsWithoutRef<typeof NavigationMenuPrimitive.Trigger> {}

export const NavMenuTrigger = React.forwardRef<
  React.ElementRef<typeof NavigationMenuPrimitive.Trigger>,
  NavMenuTriggerProps
>(({ className, children, ...props }, ref) => (
  <NavigationMenuPrimitive.Trigger
    ref={ref}
    className={cn(navMenuTriggerVariants(), className)}
    {...props}
  >
    {children}
    <Icon name="chevron-down" size="sm" aria-hidden="true" />
  </NavigationMenuPrimitive.Trigger>
));
NavMenuTrigger.displayName = "NavMenuTrigger";

export interface NavMenuContentProps
  extends React.ComponentPropsWithoutRef<typeof NavigationMenuPrimitive.Content> {}

export const NavMenuContent = React.forwardRef<
  React.ElementRef<typeof NavigationMenuPrimitive.Content>,
  NavMenuContentProps
>(({ className, ...props }, ref) => (
  <NavigationMenuPrimitive.Content
    ref={ref}
    className={cn(navMenuContentVariants(), className)}
    {...props}
  />
));
NavMenuContent.displayName = "NavMenuContent";

export interface NavMenuLinkProps
  extends React.ComponentPropsWithoutRef<typeof NavigationMenuPrimitive.Link> {}

export const NavMenuLink = React.forwardRef<
  React.ElementRef<typeof NavigationMenuPrimitive.Link>,
  NavMenuLinkProps
>(({ className, ...props }, ref) => (
  <NavigationMenuPrimitive.Link
    ref={ref}
    className={cn(navMenuLinkVariants(), className)}
    {...props}
  />
));
NavMenuLink.displayName = "NavMenuLink";
