import type * as React from "react";
import { cn } from "../../lib/cn";

/**
 * The shape every icon glyph must satisfy — the same surface `lucide-react`,
 * `@heroicons/react`, and hand-rolled SVGs already expose (standard SVG
 * props, `className` wins, `ref` reaches the `<svg>`). That's deliberate:
 * a consumer swapping the whole set via `configureIcons()` can pass icons
 * from any of those sources without an adapter.
 */
export type IconGlyphProps = React.SVGProps<SVGSVGElement> & { ref?: React.Ref<SVGSVGElement> };
export type IconGlyph = (props: IconGlyphProps) => React.ReactElement;

function strokeIcon(viewBox: string, strokeWidth: number, children: React.ReactNode): IconGlyph {
  return function StrokeIcon({ ref, className, ...props }: IconGlyphProps) {
    return (
      <svg
        ref={ref}
        viewBox={viewBox}
        fill="none"
        stroke="currentColor"
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
        className={className}
        {...props}
      >
        {children}
      </svg>
    );
  };
}

// Reused as-is from the components that already shipped them, so extracting
// them into the registry doesn't change any existing component's pixel
// output. New icons below standardize on a 24x24 viewBox / 1.75 stroke.
export const ChevronUpIcon = strokeIcon("0 0 20 20", 1.5, <path d="M5 12.5l5-5 5 5" />);
export const ChevronDownIcon = strokeIcon("0 0 20 20", 1.5, <path d="M5 7.5l5 5 5-5" />);
export const ChevronLeftIcon = strokeIcon("0 0 20 20", 1.5, <path d="M12.5 4l-6 6 6 6" />);
export const ChevronRightIcon = strokeIcon("0 0 20 20", 1.5, <path d="M7.5 4l6 6-6 6" />);
export const CheckIcon = strokeIcon("0 0 16 16", 2, <path d="M3.5 8.5l3 3 6-7" />);
export const CloseIcon = strokeIcon(
  "0 0 24 24",
  2,
  <>
    <path d="M18 6 6 18" />
    <path d="M6 6l12 12" />
  </>,
);
export const HeartIcon = strokeIcon(
  "0 0 20 20",
  1.5,
  <path d="M10 17s-6.5-4.06-6.5-8.5A3.5 3.5 0 0110 6a3.5 3.5 0 016.5 2.5C16.5 12.94 10 17 10 17z" />,
);

export function StarIcon({ ref, className, ...props }: IconGlyphProps) {
  return (
    <svg ref={ref} viewBox="0 0 20 20" fill="currentColor" className={className} {...props}>
      <path d="M10 1.5l2.59 5.25 5.79.84-4.19 4.09.99 5.77L10 14.77l-5.18 2.68.99-5.77L1.62 7.59l5.79-.84L10 1.5z" />
    </svg>
  );
}

export function SpinnerIcon({ ref, className, ...props }: IconGlyphProps) {
  return (
    <svg
      ref={ref}
      viewBox="0 0 24 24"
      fill="none"
      className={cn("motion-safe:animate-spin", className)}
      {...props}
    >
      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
      <path
        className="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 0 1 8-8V0C5.373 0 0 5.373 0 12h4z"
      />
    </svg>
  );
}

// New storefront-catalog icons — original geometry, 24x24, stroke 1.75.
export const PlusIcon = strokeIcon("0 0 24 24", 1.75, <path d="M12 5v14M5 12h14" />);
export const MinusIcon = strokeIcon("0 0 24 24", 1.75, <path d="M5 12h14" />);
export const MoreHorizontalIcon = strokeIcon(
  "0 0 24 24",
  1.75,
  <>
    <circle cx="5" cy="12" r="1.25" fill="currentColor" stroke="none" />
    <circle cx="12" cy="12" r="1.25" fill="currentColor" stroke="none" />
    <circle cx="19" cy="12" r="1.25" fill="currentColor" stroke="none" />
  </>,
);
export const MenuIcon = strokeIcon("0 0 24 24", 1.75, <path d="M4 6h16M4 12h16M4 18h16" />);
export const ArrowLeftIcon = strokeIcon("0 0 24 24", 1.75, <path d="M19 12H5M11 6l-6 6 6 6" />);
export const ArrowRightIcon = strokeIcon("0 0 24 24", 1.75, <path d="M5 12h14M13 6l6 6-6 6" />);
export const HomeIcon = strokeIcon(
  "0 0 24 24",
  1.75,
  <>
    <path d="M4 11.5 12 4l8 7.5" />
    <path d="M6 10v9h12v-9" />
  </>,
);
export const CartIcon = strokeIcon(
  "0 0 24 24",
  1.75,
  <>
    <circle cx="9" cy="21" r="1" fill="currentColor" stroke="none" />
    <circle cx="19" cy="21" r="1" fill="currentColor" stroke="none" />
    <path d="M1.5 3h3l2.6 12.6a2 2 0 0 0 2 1.6h8.4a2 2 0 0 0 2-1.6L21.5 8h-16" />
  </>,
);
export const SearchIcon = strokeIcon(
  "0 0 24 24",
  1.75,
  <>
    <circle cx="10.5" cy="10.5" r="6.5" />
    <path d="M20 20l-4.8-4.8" />
  </>,
);
export const FilterIcon = strokeIcon("0 0 24 24", 1.75, <path d="M4 6h16M7 12h10M10 18h4" />);
export const TrashIcon = strokeIcon(
  "0 0 24 24",
  1.75,
  <>
    <path d="M4 7h16M9 7V4h6v3M6 7l1 13h10l1-13" />
    <path d="M10 11v6M14 11v6" />
  </>,
);
export const TagIcon = strokeIcon(
  "0 0 24 24",
  1.75,
  <>
    <path d="M11.5 3H4v7.5L14.5 21 21 14.5 11.5 3z" />
    <circle cx="8" cy="7" r="1.25" fill="currentColor" stroke="none" />
  </>,
);
export const PercentIcon = strokeIcon(
  "0 0 24 24",
  1.75,
  <>
    <path d="M19 5 5 19" />
    <circle cx="6.5" cy="6.5" r="2.25" />
    <circle cx="17.5" cy="17.5" r="2.25" />
  </>,
);
export const GiftIcon = strokeIcon(
  "0 0 24 24",
  1.75,
  <>
    <rect x="3" y="8" width="18" height="4" />
    <path d="M5 12h14v9H5z" />
    <path d="M12 8v13" />
    <path d="M12 8C10.5 8 8.5 7 8.5 5.5A2.5 2.5 0 0 1 12 3a2.5 2.5 0 0 1 3.5 2.5C15.5 7 13.5 8 12 8z" />
  </>,
);
export const CreditCardIcon = strokeIcon(
  "0 0 24 24",
  1.75,
  <>
    <rect x="2.5" y="5.5" width="19" height="13" rx="2" />
    <path d="M2.5 10h19" />
  </>,
);
export const TruckIcon = strokeIcon(
  "0 0 24 24",
  1.75,
  <>
    <path d="M2 7h11v10H2z" />
    <path d="M13 10h4l4 3v4h-8z" />
    <circle cx="6.5" cy="18.5" r="1.75" />
    <circle cx="16.5" cy="18.5" r="1.75" />
  </>,
);
export const PackageIcon = strokeIcon(
  "0 0 24 24",
  1.75,
  <>
    <path d="M3.5 7.5 12 3l8.5 4.5V16.5L12 21l-8.5-4.5z" />
    <path d="M3.5 7.5 12 12l8.5-4.5M12 12v9" />
  </>,
);
export const UserIcon = strokeIcon(
  "0 0 24 24",
  1.75,
  <>
    <circle cx="12" cy="8" r="3.5" />
    <path d="M4.5 20a7.5 7.5 0 0 1 15 0" />
  </>,
);
export const LockIcon = strokeIcon(
  "0 0 24 24",
  1.75,
  <>
    <rect x="4.5" y="10.5" width="15" height="10" rx="1.5" />
    <path d="M7.5 10.5V7a4.5 4.5 0 0 1 9 0v3.5" />
  </>,
);
export const MailIcon = strokeIcon(
  "0 0 24 24",
  1.75,
  <>
    <rect x="2.5" y="5" width="19" height="14" rx="2" />
    <path d="M3 6.5l9 6.5 9-6.5" />
  </>,
);
export const PhoneIcon = strokeIcon(
  "0 0 24 24",
  1.75,
  <path d="M5 3.5h3.5l1.5 4-2 1.5a12 12 0 0 0 5.5 5.5l1.5-2 4 1.5V18a1.5 1.5 0 0 1-1.5 1.5C10.5 19.5 4.5 13.5 4.5 6A1.5 1.5 0 0 1 5 3.5z" />,
);
export const AlertCircleIcon = strokeIcon(
  "0 0 24 24",
  1.75,
  <>
    <circle cx="12" cy="12" r="9" />
    <path d="M12 7.5v6" />
    <circle cx="12" cy="16.5" r="0.1" fill="currentColor" stroke="currentColor" strokeWidth="2" />
  </>,
);
export const AlertTriangleIcon = strokeIcon(
  "0 0 24 24",
  1.75,
  <>
    <path d="M12 4 2 20h20L12 4z" />
    <path d="M12 10v4" />
    <circle cx="12" cy="17" r="0.1" fill="currentColor" stroke="currentColor" strokeWidth="2" />
  </>,
);
export const InfoIcon = strokeIcon(
  "0 0 24 24",
  1.75,
  <>
    <circle cx="12" cy="12" r="9" />
    <path d="M12 11v5.5" />
    <circle cx="12" cy="7.75" r="0.1" fill="currentColor" stroke="currentColor" strokeWidth="2" />
  </>,
);
export const CheckCircleIcon = strokeIcon(
  "0 0 24 24",
  1.75,
  <>
    <circle cx="12" cy="12" r="9" />
    <path d="M8.5 12.5l2.3 2.3 4.7-5.3" />
  </>,
);
export const EyeIcon = strokeIcon(
  "0 0 24 24",
  1.75,
  <>
    <path d="M2 12s3.5-6.5 10-6.5S22 12 22 12s-3.5 6.5-10 6.5S2 12 2 12z" />
    <circle cx="12" cy="12" r="2.75" />
  </>,
);
export const EyeOffIcon = strokeIcon(
  "0 0 24 24",
  1.75,
  <>
    <path d="M3 3l18 18" />
    <path d="M10.6 5.6A10.6 10.6 0 0 1 12 5.5c6.5 0 10 6.5 10 6.5a15.4 15.4 0 0 1-3.3 4.1M6.6 6.6C4 8.3 2 12 2 12s3.5 6.5 10 6.5c1.3 0 2.5-.2 3.6-.6" />
    <path d="M9.5 9.9a2.75 2.75 0 0 0 3.9 3.9" />
  </>,
);
export const RefreshIcon = strokeIcon(
  "0 0 24 24",
  1.75,
  <>
    <path d="M3.5 12a8.5 8.5 0 0 1 14.5-6" />
    <path d="M20.5 12A8.5 8.5 0 0 1 6 18" />
    <path d="M18 3v4h-4M6 21v-4h4" />
  </>,
);
export const ShareIcon = strokeIcon(
  "0 0 24 24",
  1.75,
  <>
    <circle cx="18" cy="5.5" r="2.25" />
    <circle cx="6" cy="12" r="2.25" />
    <circle cx="18" cy="18.5" r="2.25" />
    <path d="M8 10.8 16 6.7M8 13.2l8 4.1" />
  </>,
);
export const DownloadIcon = strokeIcon(
  "0 0 24 24",
  1.75,
  <>
    <path d="M12 3v12M7.5 10.5 12 15l4.5-4.5" />
    <path d="M4 17v3a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1v-3" />
  </>,
);
export const EditIcon = strokeIcon(
  "0 0 24 24",
  1.75,
  <>
    <path d="M4 20h4L18.5 9.5a2.1 2.1 0 0 0-3-3L5 17v3z" />
    <path d="M13.5 8 16 10.5" />
  </>,
);
export const GridIcon = strokeIcon(
  "0 0 24 24",
  1.75,
  <>
    <rect x="3" y="3" width="8" height="8" />
    <rect x="13" y="3" width="8" height="8" />
    <rect x="3" y="13" width="8" height="8" />
    <rect x="13" y="13" width="8" height="8" />
  </>,
);
export const ListIcon = strokeIcon(
  "0 0 24 24",
  1.75,
  <>
    <path d="M8 6h13M8 12h13M8 18h13" />
    <circle cx="3.5" cy="6" r="1" fill="currentColor" stroke="none" />
    <circle cx="3.5" cy="12" r="1" fill="currentColor" stroke="none" />
    <circle cx="3.5" cy="18" r="1" fill="currentColor" stroke="none" />
  </>,
);
export const CalendarIcon = strokeIcon(
  "0 0 24 24",
  1.75,
  <>
    <rect x="3" y="5" width="18" height="16" rx="2" />
    <path d="M3 10h18M8 3v4M16 3v4" />
  </>,
);
export const UploadIcon = strokeIcon(
  "0 0 24 24",
  1.75,
  <>
    <path d="M12 15V3M7.5 7.5 12 3l4.5 4.5" />
    <path d="M4 17v3a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1v-3" />
  </>,
);
export const FileIcon = strokeIcon(
  "0 0 24 24",
  1.75,
  <>
    <path d="M6 2.5h9L20 8v13a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1v-17a1 1 0 0 1 1-1z" />
    <path d="M14 2.5V8h6" />
  </>,
);

/**
 * The default ~40-icon catalog, keyed by name. `Icon` looks glyphs up here;
 * `configureIcons()` overrides entries at the same keys.
 */
export const defaultIcons = {
  "chevron-up": ChevronUpIcon,
  "chevron-down": ChevronDownIcon,
  "chevron-left": ChevronLeftIcon,
  "chevron-right": ChevronRightIcon,
  close: CloseIcon,
  check: CheckIcon,
  plus: PlusIcon,
  minus: MinusIcon,
  "more-horizontal": MoreHorizontalIcon,
  menu: MenuIcon,
  "arrow-left": ArrowLeftIcon,
  "arrow-right": ArrowRightIcon,
  home: HomeIcon,
  cart: CartIcon,
  search: SearchIcon,
  filter: FilterIcon,
  trash: TrashIcon,
  heart: HeartIcon,
  star: StarIcon,
  tag: TagIcon,
  percent: PercentIcon,
  gift: GiftIcon,
  "credit-card": CreditCardIcon,
  truck: TruckIcon,
  package: PackageIcon,
  user: UserIcon,
  lock: LockIcon,
  mail: MailIcon,
  phone: PhoneIcon,
  "alert-circle": AlertCircleIcon,
  "alert-triangle": AlertTriangleIcon,
  info: InfoIcon,
  "check-circle": CheckCircleIcon,
  spinner: SpinnerIcon,
  eye: EyeIcon,
  "eye-off": EyeOffIcon,
  refresh: RefreshIcon,
  share: ShareIcon,
  download: DownloadIcon,
  edit: EditIcon,
  grid: GridIcon,
  list: ListIcon,
  calendar: CalendarIcon,
  upload: UploadIcon,
  file: FileIcon,
} satisfies Record<string, IconGlyph>;

export type IconName = keyof typeof defaultIcons;
