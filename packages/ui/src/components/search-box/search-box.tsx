"use client";

import * as React from "react";
import * as PopoverPrimitive from "@radix-ui/react-popover";
import { cn } from "../../lib/cn";
import { Icon } from "../icon/icon";
import { Image } from "../image/image";
import { getMessages } from "../../i18n/messages";
import {
  searchBoxInputVariants,
  searchBoxContentVariants,
  searchBoxOptionVariants,
  searchBoxRecentItemVariants,
  type SearchBoxVariantsProps,
} from "./search-box.variants";

export interface SearchSuggestion {
  id: string;
  label: string;
  imageSrc?: string;
  imageAlt?: string;
}

export interface SearchBoxClassNames {
  root?: string;
  input?: string;
  iconButton?: string;
  content?: string;
  listbox?: string;
  option?: string;
  optionImage?: string;
  recentHeader?: string;
  recentItem?: string;
  recentRemove?: string;
  clearAll?: string;
  empty?: string;
}

export interface SearchBoxProps
  extends Omit<
      React.InputHTMLAttributes<HTMLInputElement>,
      "value" | "defaultValue" | "onChange" | "size" | "role"
    >,
    SearchBoxVariantsProps {
  value?: string;
  defaultValue?: string;
  /**
   * Called (debounced by `debounceMs`) with the current query text as the
   * user types, while the popover is open. This package does no data
   * fetching itself — use this to trigger your own suggestion lookup and
   * feed the result back through `suggestions` / `loading`.
   */
  onQueryChange?: (query: string) => void;
  /** @default 300 */
  debounceMs?: number;
  /** Fired on explicit submit: Enter with no suggestion highlighted, or a click on the leading search icon. */
  onSearch?: (query: string) => void;
  /** Consumer-controlled suggestion list, shown once the query is non-empty. */
  suggestions?: SearchSuggestion[];
  onSuggestionSelect?: (suggestion: SearchSuggestion) => void;
  /** Consumer-controlled loading flag — shows a spinner and a "searching" row instead of an empty state. */
  loading?: boolean;
  /** Plain strings, most-recent first. Shown while the input is empty and focused. */
  recentSearches?: string[];
  onRecentSearchSelect?: (query: string) => void;
  onRecentSearchRemove?: (query: string) => void;
  onRecentSearchesClear?: () => void;
  emptyMessage?: React.ReactNode;
  classNames?: SearchBoxClassNames;
}

type NavItem =
  | { kind: "recent"; index: number; value: string }
  | { kind: "suggestion"; index: number; value: SearchSuggestion };

function cyclicIndex(current: number, length: number, direction: 1 | -1): number {
  if (length === 0) return -1;
  if (current === -1) return direction === 1 ? 0 : length - 1;
  return (current + direction + length) % length;
}

/**
 * Search input with a suggestion dropdown and a "recent searches" section —
 * forked from Combobox's interaction pattern (text input + Radix Popover for
 * portal/positioning + a hand-rolled listbox with `aria-activedescendant`
 * virtual focus) because SearchBox's two mutually-exclusive sections (recent
 * searches when the query is empty, suggestions once it isn't) don't fit
 * Combobox's single-selected-value shape. This package does no data
 * fetching (CLAUDE.md non-goals) — `onQueryChange` is debounced and it's the
 * consumer's job to fetch and feed results back via `suggestions`/`loading`.
 * Necessarily a Client Component (CLAUDE.md rule 2).
 */
export const SearchBox = React.forwardRef<HTMLInputElement, SearchBoxProps>(
  (
    {
      className,
      classNames,
      size,
      value,
      defaultValue,
      onQueryChange,
      debounceMs = 300,
      onSearch,
      suggestions = [],
      onSuggestionSelect,
      loading = false,
      recentSearches = [],
      onRecentSearchSelect,
      onRecentSearchRemove,
      onRecentSearchesClear,
      emptyMessage,
      placeholder,
      disabled = false,
      id,
      onFocus,
      onBlur,
      onKeyDown,
      ...inputProps
    },
    forwardedRef,
  ) => {
    const t = getMessages();
    const isControlled = value !== undefined;

    const generatedId = React.useId();
    const controlId = id ?? generatedId;
    const listboxId = `${controlId}-listbox`;

    const inputRef = React.useRef<HTMLInputElement>(null);
    React.useImperativeHandle(forwardedRef, () => inputRef.current as HTMLInputElement);
    const wrapperRef = React.useRef<HTMLDivElement>(null);
    const optionRefs = React.useRef<Array<HTMLLIElement | null>>([]);

    const [open, setOpen] = React.useState(false);
    const [uncontrolledQuery, setUncontrolledQuery] = React.useState(defaultValue ?? "");
    const query = isControlled ? (value as string) : uncontrolledQuery;
    const [activeIndex, setActiveIndex] = React.useState(-1);

    const showRecent = query.trim() === "";
    const navItems: NavItem[] = showRecent
      ? recentSearches.map((value, index) => ({ kind: "recent", index, value }))
      : suggestions.map((value, index) => ({ kind: "suggestion", index, value }));

    function setQuery(next: string) {
      if (!isControlled) setUncontrolledQuery(next);
    }

    // Debounced notification — only while the popover is open, mirroring
    // Combobox's async-fetch effect gate (avoids firing before the user has
    // engaged with the field at all).
    React.useEffect(() => {
      if (!open) return;
      const handle = setTimeout(() => {
        onQueryChange?.(query);
      }, debounceMs);
      return () => clearTimeout(handle);
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [open, query, debounceMs]);

    React.useEffect(() => {
      optionRefs.current[activeIndex]?.scrollIntoView({ block: "nearest" });
    }, [activeIndex]);

    // Keep the active index in range as the underlying list changes size
    // (e.g. new suggestions arrive, or a recent search is removed).
    React.useEffect(() => {
      setActiveIndex((current) => (current >= navItems.length ? -1 : current));
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [navItems.length]);

    function submitSearch(query: string) {
      onSearch?.(query);
      setOpen(false);
      setActiveIndex(-1);
    }

    function selectSuggestion(suggestion: SearchSuggestion) {
      setQuery(suggestion.label);
      onSuggestionSelect?.(suggestion);
      setOpen(false);
      setActiveIndex(-1);
      inputRef.current?.focus();
    }

    function selectRecent(recentQuery: string) {
      setQuery(recentQuery);
      onRecentSearchSelect?.(recentQuery);
      onSearch?.(recentQuery);
      setOpen(false);
      setActiveIndex(-1);
      inputRef.current?.focus();
    }

    function selectNavItem(item: NavItem) {
      if (item.kind === "recent") selectRecent(item.value);
      else selectSuggestion(item.value);
    }

    function removeRecent(event: React.MouseEvent, recentQuery: string) {
      event.stopPropagation();
      event.preventDefault();
      onRecentSearchRemove?.(recentQuery);
      inputRef.current?.focus();
    }

    const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
      switch (event.key) {
        case "ArrowDown": {
          event.preventDefault();
          if (!open) {
            setOpen(true);
            return;
          }
          setActiveIndex((current) => cyclicIndex(current, navItems.length, 1));
          break;
        }
        case "ArrowUp": {
          event.preventDefault();
          if (!open) {
            setOpen(true);
            return;
          }
          setActiveIndex((current) => cyclicIndex(current, navItems.length, -1));
          break;
        }
        case "Enter": {
          event.preventDefault();
          if (open && activeIndex >= 0 && navItems[activeIndex]) {
            selectNavItem(navItems[activeIndex]);
          } else {
            submitSearch(query);
          }
          break;
        }
        case "Escape": {
          if (open) {
            event.preventDefault();
            setOpen(false);
            setActiveIndex(-1);
          }
          break;
        }
        default:
          break;
      }
      onKeyDown?.(event);
    };

    const activeItem = activeIndex >= 0 ? navItems[activeIndex] : undefined;
    const liveMessage = !open
      ? ""
      : showRecent
        ? ""
        : loading
          ? t.searchBox.loading
          : t.searchBox.resultsCount(suggestions.length);

    return (
      <PopoverPrimitive.Root open={open} onOpenChange={setOpen}>
        <PopoverPrimitive.Anchor asChild>
          <div ref={wrapperRef} className={cn("relative w-full", classNames?.root)}>
            <button
              type="button"
              tabIndex={-1}
              aria-label={t.searchBox.submit}
              disabled={disabled}
              onClick={() => submitSearch(query)}
              className={cn(
                "absolute start-2 top-1/2 flex size-6 -translate-y-1/2 items-center justify-center rounded text-foreground-muted outline-none",
                "hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring",
                classNames?.iconButton,
              )}
            >
              <Icon name="search" size="sm" />
            </button>
            <input
              ref={inputRef}
              id={controlId}
              type="search"
              role="combobox"
              aria-expanded={open}
              aria-controls={listboxId}
              aria-autocomplete="list"
              aria-activedescendant={activeItem ? `${listboxId}-option-${activeIndex}` : undefined}
              data-disabled={disabled ? "true" : undefined}
              disabled={disabled}
              placeholder={placeholder ?? t.searchBox.placeholder}
              value={query}
              autoComplete="off"
              className={cn(searchBoxInputVariants({ size }), classNames?.input, className)}
              onChange={(event) => {
                setQuery(event.target.value);
                setActiveIndex(-1);
                if (!open) setOpen(true);
              }}
              onFocus={(event) => {
                setOpen(true);
                onFocus?.(event);
              }}
              onBlur={(event) => {
                setOpen(false);
                setActiveIndex(-1);
                onBlur?.(event);
              }}
              onKeyDown={handleKeyDown}
              {...inputProps}
            />
            <div className="absolute end-2 top-1/2 flex -translate-y-1/2 items-center gap-1">
              {loading ? <Icon name="spinner" size="sm" className="text-foreground-muted" /> : null}
            </div>
            <span role="status" aria-live="polite" className="sr-only">
              {liveMessage}
            </span>
          </div>
        </PopoverPrimitive.Anchor>
        <PopoverPrimitive.Portal>
          <PopoverPrimitive.Content
            sideOffset={4}
            align="start"
            onOpenAutoFocus={(event) => event.preventDefault()}
            onCloseAutoFocus={(event) => event.preventDefault()}
            onInteractOutside={(event) => {
              if (wrapperRef.current?.contains(event.target as Node)) event.preventDefault();
            }}
            className={cn(searchBoxContentVariants(), classNames?.content)}
          >
            {showRecent ? (
              recentSearches.length > 0 ? (
                <>
                  <div className={cn("flex items-center justify-between px-2 py-1.5", classNames?.recentHeader)}>
                    <span className="font-sans text-xs font-medium text-foreground-muted">
                      {t.searchBox.recentSearchesLabel}
                    </span>
                    {onRecentSearchesClear ? (
                      <button
                        type="button"
                        onMouseDown={(event) => event.preventDefault()}
                        onClick={onRecentSearchesClear}
                        className={cn(
                          "rounded font-sans text-xs text-foreground-muted outline-none hover:text-foreground",
                          "focus-visible:ring-2 focus-visible:ring-ring",
                          classNames?.clearAll,
                        )}
                      >
                        {t.searchBox.clearRecentSearches}
                      </button>
                    ) : null}
                  </div>
                  <ul id={listboxId} role="listbox" aria-label={t.searchBox.recentSearchesLabel} className="flex flex-col">
                    {recentSearches.map((recentQuery, index) => (
                      <li
                        key={recentQuery}
                        ref={(node) => {
                          optionRefs.current[index] = node;
                        }}
                        role="presentation"
                        className={cn(searchBoxRecentItemVariants(), classNames?.recentItem)}
                        data-highlighted={index === activeIndex ? "true" : undefined}
                      >
                        <button
                          type="button"
                          id={`${listboxId}-option-${index}`}
                          role="option"
                          aria-selected={index === activeIndex}
                          onMouseEnter={() => setActiveIndex(index)}
                          onMouseDown={(event) => event.preventDefault()}
                          onClick={() => selectRecent(recentQuery)}
                          className={cn(searchBoxOptionVariants(), "flex-1 text-start")}
                        >
                          <Icon name="search" size="sm" className="shrink-0 text-foreground-muted" />
                          {recentQuery}
                        </button>
                        {onRecentSearchRemove ? (
                          <button
                            type="button"
                            aria-label={t.searchBox.removeRecentSearch(recentQuery)}
                            onMouseDown={(event) => event.preventDefault()}
                            onClick={(event) => removeRecent(event, recentQuery)}
                            className={cn(
                              "me-1 flex size-6 shrink-0 items-center justify-center rounded text-foreground-muted outline-none",
                              "hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring",
                              classNames?.recentRemove,
                            )}
                          >
                            <Icon name="close" size="sm" />
                          </button>
                        ) : null}
                      </li>
                    ))}
                  </ul>
                </>
              ) : (
                <p className={cn("px-2 py-1.5 font-sans text-sm text-foreground-muted", classNames?.empty)}>
                  {emptyMessage ?? t.searchBox.noResults}
                </p>
              )
            ) : (
              <ul id={listboxId} role="listbox" className={cn("flex flex-col", classNames?.listbox)}>
                {suggestions.map((suggestion, index) => (
                  <li
                    key={suggestion.id}
                    ref={(node) => {
                      optionRefs.current[index] = node;
                    }}
                    id={`${listboxId}-option-${index}`}
                    role="option"
                    aria-selected={index === activeIndex}
                    data-highlighted={index === activeIndex ? "true" : undefined}
                    onMouseEnter={() => setActiveIndex(index)}
                    onMouseDown={(event) => event.preventDefault()}
                    onClick={() => selectSuggestion(suggestion)}
                    className={cn(searchBoxOptionVariants(), classNames?.option)}
                  >
                    {suggestion.imageSrc ? (
                      <Image
                        src={suggestion.imageSrc}
                        alt={suggestion.imageAlt ?? suggestion.label}
                        width={32}
                        height={32}
                        className={cn("size-8 shrink-0 rounded object-cover", classNames?.optionImage)}
                      />
                    ) : null}
                    {suggestion.label}
                  </li>
                ))}
                {loading && suggestions.length === 0 ? (
                  <li
                    aria-hidden="true"
                    className="flex items-center gap-2 px-2 py-3 font-sans text-sm text-foreground-muted"
                  >
                    <Icon name="spinner" size="sm" />
                    {t.searchBox.loading}
                  </li>
                ) : null}
                {!loading && suggestions.length === 0 ? (
                  <li className={cn("px-2 py-1.5 font-sans text-sm text-foreground-muted", classNames?.empty)}>
                    {emptyMessage ?? t.searchBox.noResults}
                  </li>
                ) : null}
              </ul>
            )}
          </PopoverPrimitive.Content>
        </PopoverPrimitive.Portal>
      </PopoverPrimitive.Root>
    );
  },
);

SearchBox.displayName = "SearchBox";
