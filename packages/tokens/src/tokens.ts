/**
 * @storefront/tokens
 *
 * Token *names*, not resolved values. Resolved values live in tokens.css /
 * themes/*.css — that's the only place a rebrand should ever touch. This
 * module exists so JS/TS can reference a token by name (e.g. to read it via
 * getComputedStyle, or to build an inline style object) without hard-coding
 * the custom-property string.
 */

/** Tier 1 — colour primitives. Rarely referenced directly; prefer colorTokens. */
export const colorPrimitiveTokens = {
  gray: {
    0: "--ui-gray-0",
    50: "--ui-gray-50",
    100: "--ui-gray-100",
    200: "--ui-gray-200",
    300: "--ui-gray-300",
    400: "--ui-gray-400",
    500: "--ui-gray-500",
    600: "--ui-gray-600",
    700: "--ui-gray-700",
    800: "--ui-gray-800",
    900: "--ui-gray-900",
    950: "--ui-gray-950",
  },
  blue: {
    50: "--ui-blue-50",
    100: "--ui-blue-100",
    200: "--ui-blue-200",
    300: "--ui-blue-300",
    400: "--ui-blue-400",
    500: "--ui-blue-500",
    600: "--ui-blue-600",
    700: "--ui-blue-700",
    800: "--ui-blue-800",
    900: "--ui-blue-900",
    950: "--ui-blue-950",
  },
  red: {
    50: "--ui-red-50",
    100: "--ui-red-100",
    200: "--ui-red-200",
    300: "--ui-red-300",
    400: "--ui-red-400",
    500: "--ui-red-500",
    600: "--ui-red-600",
    700: "--ui-red-700",
    800: "--ui-red-800",
    900: "--ui-red-900",
    950: "--ui-red-950",
  },
  amber: {
    50: "--ui-amber-50",
    100: "--ui-amber-100",
    200: "--ui-amber-200",
    300: "--ui-amber-300",
    400: "--ui-amber-400",
    500: "--ui-amber-500",
    600: "--ui-amber-600",
    700: "--ui-amber-700",
    800: "--ui-amber-800",
    900: "--ui-amber-900",
    950: "--ui-amber-950",
  },
  green: {
    50: "--ui-green-50",
    100: "--ui-green-100",
    200: "--ui-green-200",
    300: "--ui-green-300",
    400: "--ui-green-400",
    500: "--ui-green-500",
    600: "--ui-green-600",
    700: "--ui-green-700",
    800: "--ui-green-800",
    900: "--ui-green-900",
    950: "--ui-green-950",
  },
} as const;

/** Tier 1 — spacing scale. */
export const spacingTokens = {
  0: "--ui-space-0",
  1: "--ui-space-1",
  2: "--ui-space-2",
  3: "--ui-space-3",
  4: "--ui-space-4",
  5: "--ui-space-5",
  6: "--ui-space-6",
  8: "--ui-space-8",
  10: "--ui-space-10",
  12: "--ui-space-12",
  16: "--ui-space-16",
  20: "--ui-space-20",
  24: "--ui-space-24",
} as const;

/** Tier 1 — radius scale. */
export const radiusTokens = {
  none: "--ui-radius-none",
  sm: "--ui-radius-sm",
  md: "--ui-radius-md",
  lg: "--ui-radius-lg",
  xl: "--ui-radius-xl",
  "2xl": "--ui-radius-2xl",
  full: "--ui-radius-full",
} as const;

/** Tier 1 — font stacks. */
export const fontFamilyTokens = {
  sans: "--ui-font-sans",
  serif: "--ui-font-serif",
  mono: "--ui-font-mono",
} as const;

/** Tier 1 — type scale (font-size / line-height pairs). */
export const fontSizeTokens = {
  xs: { fontSize: "--ui-font-size-xs", lineHeight: "--ui-line-height-xs" },
  sm: { fontSize: "--ui-font-size-sm", lineHeight: "--ui-line-height-sm" },
  base: { fontSize: "--ui-font-size-base", lineHeight: "--ui-line-height-base" },
  lg: { fontSize: "--ui-font-size-lg", lineHeight: "--ui-line-height-lg" },
  xl: { fontSize: "--ui-font-size-xl", lineHeight: "--ui-line-height-xl" },
  "2xl": { fontSize: "--ui-font-size-2xl", lineHeight: "--ui-line-height-2xl" },
  "3xl": { fontSize: "--ui-font-size-3xl", lineHeight: "--ui-line-height-3xl" },
  "4xl": { fontSize: "--ui-font-size-4xl", lineHeight: "--ui-line-height-4xl" },
  "5xl": { fontSize: "--ui-font-size-5xl", lineHeight: "--ui-line-height-5xl" },
} as const;

/** Tier 1 — shadow scale. */
export const shadowTokens = {
  sm: "--ui-shadow-sm",
  md: "--ui-shadow-md",
  lg: "--ui-shadow-lg",
  xl: "--ui-shadow-xl",
} as const;

/** Tier 1 — z-index scale. */
export const zIndexTokens = {
  dropdown: "--ui-z-dropdown",
  sticky: "--ui-z-sticky",
  overlay: "--ui-z-overlay",
  modal: "--ui-z-modal",
  popover: "--ui-z-popover",
  toast: "--ui-z-toast",
} as const;

/** Tier 1 — motion durations. */
export const durationTokens = {
  fast: "--ui-duration-fast",
  base: "--ui-duration-base",
  slow: "--ui-duration-slow",
} as const;

/** Tier 1 — motion easings. */
export const easingTokens = {
  standard: "--ui-ease-standard",
  in: "--ui-ease-in",
  out: "--ui-ease-out",
  emphasized: "--ui-ease-emphasized",
} as const;

/**
 * Tier 2 — semantic colour tokens. The only colour variables components
 * should reference; every other token above is a JS-side convenience,
 * still going through tier 2 for colour at the CSS level.
 */
export const colorTokens = {
  surface: "--ui-color-surface",
  surfaceRaised: "--ui-color-surface-raised",
  foreground: "--ui-color-foreground",
  foregroundMuted: "--ui-color-foreground-muted",
  primary: "--ui-color-primary",
  primaryFg: "--ui-color-primary-fg",
  border: "--ui-color-border",
  ring: "--ui-color-ring",
  danger: "--ui-color-danger",
  dangerFg: "--ui-color-danger-fg",
  success: "--ui-color-success",
  successFg: "--ui-color-success-fg",
  warning: "--ui-color-warning",
  warningFg: "--ui-color-warning-fg",
  overlay: "--ui-color-overlay",
} as const;

/** Wraps a token name as a `var()` reference, e.g. `cssVar(colorTokens.primary)` → `"var(--ui-color-primary)"`. */
export function cssVar(token: string): string {
  return `var(${token})`;
}
