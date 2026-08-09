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
