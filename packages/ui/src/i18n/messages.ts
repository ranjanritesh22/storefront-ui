import type * as React from "react";

/**
 * English default copy for every user-facing string this package renders,
 * namespaced by component. No component may hardcode a string a shopper
 * reads or a screen reader announces — it reads from here instead, so a
 * consumer can reword or fully translate without patching component source.
 *
 * Functions (not just strings) are used wherever a message needs data
 * (a count, a formatted price, a page number): overriding a function lets a
 * consumer reorder words for a target language, not just substitute nouns —
 * a plain `{count}`-style template can't do that (e.g. many languages don't
 * pluralize the way English does).
 */
export interface StorefrontMessages {
  dialog: {
    /** aria-label on the default close button. */
    close: string;
  };
  pagination: {
    /** aria-label on the <nav>. */
    nav: string;
    previous: string;
    next: string;
    page: (page: number) => string;
  };
  price: {
    /** aria-label on the struck-through "was" price. Receives the already-formatted amount. */
    original: (formattedAmount: string) => string;
  };
  productCard: {
    addToCart: string;
    addToWishlist: string;
    removeFromWishlist: string;
    colorsCount: (count: number) => string;
  };
  quantityStepper: {
    decrease: string;
    increase: string;
    quantity: string;
  };
  rangeSlider: {
    minimum: string;
    maximum: string;
  };
  rating: {
    label: (args: { value: number; max: number; count?: number }) => string;
  };
  breadcrumb: {
    /** aria-label on the <nav>. */
    nav: string;
  };
  select: {
    /** Shown when no option is chosen. */
    placeholder: string;
  };
  combobox: {
    /** Shown when no option is chosen. */
    placeholder: string;
    /** Rendered in the listbox when the query matches nothing. */
    noResults: string;
    /** Announced to screen readers (via a live region) as the result set changes. */
    resultsCount: (count: number) => string;
    /** aria-label on the clear button. */
    clear: string;
    /** Shown while an async `loadOptions` call is in flight. */
    loading: string;
  };
  fileUpload: {
    /** Instructional copy inside the drop zone. */
    dropzone: string;
    /** The clickable word/phrase inside `dropzone`, e.g. "browse" in "Drag files here or browse". */
    browse: string;
    /** aria-label on a file row's remove button. Receives the file name. */
    remove: (fileName: string) => string;
    /** Accessible text for a file row's progress indicator. */
    progress: (fileName: string, percent: number) => string;
    /** Shown under a file row that failed validation or upload. */
    error: string;
    /** Announced (live region) when files are accepted into the list. */
    filesAdded: (count: number) => string;
    /** Shown when a dropped/selected file exceeds `maxSize`. */
    fileTooLarge: (fileName: string, maxSize: string) => string;
    /** Shown when a dropped/selected file doesn't match `accept`. */
    fileTypeNotAllowed: (fileName: string) => string;
  };
  datePicker: {
    /** Shown when no date is chosen. */
    placeholder: string;
    /** aria-label on the trigger button that opens the calendar. */
    chooseDate: string;
    previousMonth: string;
    nextMonth: string;
    /** aria-label on the clear button. */
    clear: string;
  };
  drawer: {
    /** aria-label on the default close button. */
    close: string;
  };
  toast: {
    /** aria-label on a toast's dismiss button. */
    close: string;
    /** aria-label on the `Toaster` viewport region. */
    region: string;
  };
  alertBanner: {
    /** aria-label on the dismiss button. */
    dismiss: string;
  };
  spinner: {
    /** Accessible text announced while a `Spinner` is visible. */
    loading: string;
  };
  progressBar: {
    /** aria-label fallback when no `label` prop is given. */
    label: string;
  };
  errorState: {
    title: string;
    description: string;
    /** Label on the retry button. */
    retry: string;
  };
  stepper: {
    /** aria-label on the step list container. */
    nav: string;
    /** Screen-reader-only status word for a finished step. */
    completed: string;
    /** Screen-reader-only status word for the active step. */
    current: string;
    /** Screen-reader-only status word for a step not yet reached. */
    upcoming: string;
    /** Full per-step aria-label, e.g. "Step 2 of 4: Shipping, current". */
    step: (args: { index: number; total: number; label: React.ReactNode; status: string }) => string;
  };
  navMenu: {
    /** aria-label on the <nav>. */
    nav: string;
  };
  megaMenu: {
    /** aria-label on the <nav>. */
    nav: string;
  };
  mobileNav: {
    /** aria-label on the trigger button that opens the drawer. */
    open: string;
    /** aria-label on the trigger button that closes the drawer. */
    close: string;
    /** aria-label on the back button, receives the parent category label. */
    back: (categoryLabel: React.ReactNode) => string;
    /** aria-label on the <nav> inside the drawer. */
    nav: string;
  };
  languageCurrencySelector: {
    /** aria-label on the trigger when no custom label is given. */
    trigger: string;
    language: string;
    currency: string;
  };
  storeSelector: {
    /** aria-label on the trigger when no custom label is given. */
    trigger: string;
    /** Label on the button that selects a store. */
    selectStore: string;
    /** Shown next to the currently selected store. */
    selected: string;
  };
  skipLink: {
    /** Default link text when no `children` is given. */
    label: string;
  };
}

export const defaultMessages: StorefrontMessages = {
  dialog: {
    close: "Close",
  },
  pagination: {
    nav: "Pagination",
    previous: "Previous page",
    next: "Next page",
    page: (page) => `Page ${page}`,
  },
  price: {
    original: (formattedAmount) => `Original price ${formattedAmount}`,
  },
  productCard: {
    addToCart: "Add to cart",
    addToWishlist: "Add to wishlist",
    removeFromWishlist: "Remove from wishlist",
    colorsCount: (count) => `${count} ${count === 1 ? "color" : "colors"}`,
  },
  quantityStepper: {
    decrease: "Decrease quantity",
    increase: "Increase quantity",
    quantity: "Quantity",
  },
  rangeSlider: {
    minimum: "Minimum value",
    maximum: "Maximum value",
  },
  rating: {
    label: ({ value, max, count }) =>
      `Rated ${value} out of ${max} stars${typeof count === "number" ? `, ${count} reviews` : ""}`,
  },
  breadcrumb: {
    nav: "Breadcrumb",
  },
  select: {
    placeholder: "Select an option",
  },
  combobox: {
    placeholder: "Select an option",
    noResults: "No results found",
    resultsCount: (count) => `${count} ${count === 1 ? "result" : "results"} available`,
    clear: "Clear selection",
    loading: "Loading options…",
  },
  fileUpload: {
    dropzone: "Drag files here or",
    browse: "browse",
    remove: (fileName) => `Remove ${fileName}`,
    progress: (fileName, percent) => `${fileName}: ${percent}% uploaded`,
    error: "Upload failed",
    filesAdded: (count) => `${count} ${count === 1 ? "file" : "files"} added`,
    fileTooLarge: (fileName, maxSize) => `${fileName} exceeds the ${maxSize} limit`,
    fileTypeNotAllowed: (fileName) => `${fileName} is not an accepted file type`,
  },
  datePicker: {
    placeholder: "Select a date",
    chooseDate: "Choose date",
    previousMonth: "Previous month",
    nextMonth: "Next month",
    clear: "Clear date",
  },
  drawer: {
    close: "Close",
  },
  toast: {
    close: "Dismiss notification",
    region: "Notifications",
  },
  alertBanner: {
    dismiss: "Dismiss",
  },
  spinner: {
    loading: "Loading",
  },
  progressBar: {
    label: "Progress",
  },
  errorState: {
    title: "Something went wrong",
    description: "We couldn't load this content. Please try again.",
    retry: "Try again",
  },
  stepper: {
    nav: "Progress",
    completed: "completed",
    current: "current",
    upcoming: "upcoming",
    step: ({ index, total, label, status }) => `Step ${index} of ${total}: ${label}, ${status}`,
  },
  navMenu: {
    nav: "Main",
  },
  megaMenu: {
    nav: "Main",
  },
  mobileNav: {
    open: "Open menu",
    close: "Close menu",
    back: (categoryLabel) => `Back to ${categoryLabel}`,
    nav: "Main",
  },
  languageCurrencySelector: {
    trigger: "Language and currency",
    language: "Language",
    currency: "Currency",
  },
  storeSelector: {
    trigger: "Choose store",
    selectStore: "Select this store",
    selected: "Selected",
  },
  skipLink: {
    label: "Skip to main content",
  },
};

type MessageOverrides = { [K in keyof StorefrontMessages]?: Partial<StorefrontMessages[K]> };

let activeMessages: StorefrontMessages = defaultMessages;

/**
 * Merges partial overrides into the active dictionary, namespace by
 * namespace — you only need to supply the keys you're changing.
 *
 * Same shape as `configureIcons()` and for the same reason: a plain
 * module-level object, not a React Context, so `getMessages()` is a bare
 * function call that works inside Server Components with no hook and no
 * Client Component boundary.
 *
 * That also means it's process-wide state, correct for the common case of
 * one language per build/deployment. A single server process that must
 * serve multiple locales per request should not rely on this — pass the
 * relevant strings as explicit props on each component instance instead
 * (every string here also has a per-instance prop override, and an explicit
 * prop always wins over the dictionary).
 */
export function configureMessages(overrides: MessageOverrides): void {
  const next: Record<string, unknown> = { ...activeMessages };
  for (const key of Object.keys(overrides) as (keyof StorefrontMessages)[]) {
    const namespaceOverride = overrides[key];
    if (namespaceOverride) {
      next[key] = { ...activeMessages[key], ...namespaceOverride };
    }
  }
  activeMessages = next as unknown as StorefrontMessages;
}

/** Restores the English defaults. Mainly useful for test teardown. */
export function resetMessages(): void {
  activeMessages = defaultMessages;
}

/** Reads the active dictionary. Plain function call — safe in Server Components. */
export function getMessages(): StorefrontMessages {
  return activeMessages;
}
