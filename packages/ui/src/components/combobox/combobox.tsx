"use client";

import * as React from "react";
import * as PopoverPrimitive from "@radix-ui/react-popover";
import { cn } from "../../lib/cn";
import { Icon } from "../icon/icon";
import { getMessages } from "../../i18n/messages";
import {
  comboboxInputVariants,
  comboboxContentVariants,
  comboboxOptionVariants,
  type ComboboxVariantsProps,
} from "./combobox.variants";

export interface ComboboxOption {
  value: string;
  /** Plain text — also used as the input's display value once selected, so it can't be a ReactNode. */
  label: string;
  disabled?: boolean;
}

export interface ComboboxClassNames {
  root?: string;
  input?: string;
  iconButton?: string;
  content?: string;
  listbox?: string;
  option?: string;
  empty?: string;
}

export interface ComboboxProps
  extends Omit<
      React.InputHTMLAttributes<HTMLInputElement>,
      "value" | "defaultValue" | "onChange" | "size" | "role"
    >,
    ComboboxVariantsProps {
  /** Static option list — mutually exclusive with `loadOptions`. */
  options?: ComboboxOption[];
  /**
   * Async source: called with the current query on open and on every
   * keystroke (debounced by `debounceMs`). Presence of this prop switches
   * the component into async mode — `options` is ignored.
   */
  loadOptions?: (query: string) => Promise<ComboboxOption[]>;
  /** @default 250 */
  debounceMs?: number;
  /** Custom match predicate for sync `options`. @default case-insensitive substring match against `label` */
  filterOption?: (option: ComboboxOption, query: string) => boolean;
  value?: string | null;
  defaultValue?: string | null;
  /** Seeds the input's display text for a `value`/`defaultValue` that can't be resolved from `options` (e.g. an async-loaded initial selection). */
  defaultInputValue?: string;
  onValueChange?: (value: string | null, option: ComboboxOption | null) => void;
  emptyMessage?: React.ReactNode;
  /** Marks the field invalid: sets `data-invalid`/`aria-invalid` on the input. */
  invalid?: boolean;
  classNames?: ComboboxClassNames;
}

const defaultFilterOption = (option: ComboboxOption, query: string) =>
  option.label.toLowerCase().includes(query.toLowerCase());

function nextEnabledIndex(
  current: number,
  options: ComboboxOption[],
  direction: 1 | -1,
): number {
  const { length } = options;
  if (length === 0) return -1;
  let index = current;
  for (let step = 0; step < length; step++) {
    index = index === -1 ? (direction === 1 ? 0 : length - 1) : (index + direction + length) % length;
    if (!options[index]?.disabled) return index;
  }
  return -1;
}

function firstEnabledIndex(options: ComboboxOption[], direction: 1 | -1): number {
  if (direction === 1) return options.findIndex((o) => !o.disabled);
  for (let i = options.length - 1; i >= 0; i--) {
    if (!options[i]?.disabled) return i;
  }
  return -1;
}

/**
 * A searchable select built from a plain text input + `@radix-ui/react-popover`
 * (for portal/positioning/outside-click dismissal) + a hand-rolled listbox —
 * Radix has no combobox primitive. Follows the WAI-ARIA APG "Combobox with
 * List Autocomplete" pattern: DOM focus stays on the input the whole time
 * (`onOpenAutoFocus`/`onCloseAutoFocus` are prevented on the popover
 * content), keyboard "focus" moves virtually via `aria-activedescendant`,
 * and a visually-hidden live region announces the result count as it
 * changes. Necessarily a Client Component (CLAUDE.md rule 2).
 */
export const Combobox = React.forwardRef<HTMLInputElement, ComboboxProps>(
  (
    {
      className,
      classNames,
      size,
      options: syncOptions,
      loadOptions,
      debounceMs = 250,
      filterOption = defaultFilterOption,
      value,
      defaultValue,
      defaultInputValue,
      onValueChange,
      placeholder,
      emptyMessage,
      invalid = false,
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
    const isAsync = typeof loadOptions === "function";
    const isControlled = value !== undefined;

    const generatedId = React.useId();
    const controlId = id ?? generatedId;
    const listboxId = `${controlId}-listbox`;

    const inputRef = React.useRef<HTMLInputElement>(null);
    React.useImperativeHandle(forwardedRef, () => inputRef.current as HTMLInputElement);
    const wrapperRef = React.useRef<HTMLDivElement>(null);
    const optionRefs = React.useRef<Array<HTMLLIElement | null>>([]);

    const initialValue = (isControlled ? value : defaultValue) ?? null;
    const initialOption = initialValue != null ? (syncOptions?.find((o) => o.value === initialValue) ?? null) : null;

    const [open, setOpen] = React.useState(false);
    const [query, setQuery] = React.useState(defaultInputValue ?? initialOption?.label ?? "");
    const [selectedOption, setSelectedOption] = React.useState<ComboboxOption | null>(initialOption);
    const [activeIndex, setActiveIndex] = React.useState(-1);
    const [asyncOptions, setAsyncOptions] = React.useState<ComboboxOption[]>([]);
    const [loading, setLoading] = React.useState(false);

    // Keep the resolved selection in sync with a controlled `value`.
    React.useEffect(() => {
      if (!isControlled) return;
      if (value == null) {
        setSelectedOption(null);
        setQuery("");
        return;
      }
      const match =
        syncOptions?.find((o) => o.value === value) ??
        (selectedOption?.value === value ? selectedOption : null) ??
        (asyncOptions.find((o) => o.value === value) ?? null);
      if (match) {
        setSelectedOption(match);
        setQuery(match.label);
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [value, isControlled, syncOptions]);

    // Async fetch, debounced, only while the popover is open.
    React.useEffect(() => {
      if (!isAsync || !open) return;
      let cancelled = false;
      setLoading(true);
      const handle = setTimeout(() => {
        loadOptions!(query)
          .then((result) => {
            if (!cancelled) {
              setAsyncOptions(result);
              setLoading(false);
            }
          })
          .catch(() => {
            if (!cancelled) {
              setAsyncOptions([]);
              setLoading(false);
            }
          });
      }, debounceMs);
      return () => {
        cancelled = true;
        clearTimeout(handle);
      };
    }, [isAsync, open, query, debounceMs, loadOptions]);

    const visibleOptions = React.useMemo(() => {
      if (isAsync) return asyncOptions;
      const list = syncOptions ?? [];
      return query ? list.filter((option) => filterOption(option, query)) : list;
    }, [isAsync, asyncOptions, syncOptions, query, filterOption]);

    React.useEffect(() => {
      optionRefs.current[activeIndex]?.scrollIntoView({ block: "nearest" });
    }, [activeIndex]);

    function selectOption(option: ComboboxOption) {
      if (option.disabled) return;
      setSelectedOption(option);
      setQuery(option.label);
      onValueChange?.(option.value, option);
      setOpen(false);
      setActiveIndex(-1);
      inputRef.current?.focus();
    }

    function clearSelection() {
      setSelectedOption(null);
      setQuery("");
      onValueChange?.(null, null);
      setActiveIndex(-1);
      inputRef.current?.focus();
    }

    function resetQueryToSelection() {
      setQuery(selectedOption ? selectedOption.label : "");
    }

    const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
      switch (event.key) {
        case "ArrowDown": {
          event.preventDefault();
          if (!open) {
            setOpen(true);
            return;
          }
          setActiveIndex((current) => nextEnabledIndex(current, visibleOptions, 1));
          break;
        }
        case "ArrowUp": {
          event.preventDefault();
          if (!open) {
            setOpen(true);
            return;
          }
          setActiveIndex((current) => nextEnabledIndex(current, visibleOptions, -1));
          break;
        }
        case "Home": {
          if (!open) break;
          event.preventDefault();
          setActiveIndex(firstEnabledIndex(visibleOptions, 1));
          break;
        }
        case "End": {
          if (!open) break;
          event.preventDefault();
          setActiveIndex(firstEnabledIndex(visibleOptions, -1));
          break;
        }
        case "Enter": {
          if (open && activeIndex >= 0 && visibleOptions[activeIndex]) {
            event.preventDefault();
            selectOption(visibleOptions[activeIndex]);
          }
          break;
        }
        case "Escape": {
          if (open) {
            event.preventDefault();
            setOpen(false);
            setActiveIndex(-1);
            resetQueryToSelection();
          }
          break;
        }
        default:
          break;
      }
      onKeyDown?.(event);
    };

    const activeOption = activeIndex >= 0 ? visibleOptions[activeIndex] : undefined;
    const liveMessage = !open ? "" : loading ? t.combobox.loading : t.combobox.resultsCount(visibleOptions.length);

    return (
      <PopoverPrimitive.Root open={open} onOpenChange={setOpen}>
        <PopoverPrimitive.Anchor asChild>
          <div ref={wrapperRef} className={cn("relative w-full", classNames?.root)}>
            <input
              ref={inputRef}
              id={controlId}
              type="text"
              role="combobox"
              aria-expanded={open}
              aria-controls={listboxId}
              aria-autocomplete="list"
              aria-activedescendant={activeOption ? `${listboxId}-option-${activeIndex}` : undefined}
              aria-invalid={invalid || undefined}
              data-invalid={invalid ? "true" : undefined}
              data-disabled={disabled ? "true" : undefined}
              disabled={disabled}
              placeholder={placeholder ?? t.combobox.placeholder}
              value={query}
              autoComplete="off"
              className={cn(comboboxInputVariants({ size }), classNames?.input, className)}
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
                resetQueryToSelection();
                onBlur?.(event);
              }}
              onKeyDown={handleKeyDown}
              {...inputProps}
            />
            <div className="absolute end-2 top-1/2 flex -translate-y-1/2 items-center gap-1">
              {loading ? (
                <Icon name="spinner" size="sm" className="text-foreground-muted" />
              ) : selectedOption || query ? (
                <button
                  type="button"
                  tabIndex={-1}
                  aria-label={t.combobox.clear}
                  disabled={disabled}
                  onClick={clearSelection}
                  className={cn(
                    "flex size-6 items-center justify-center rounded text-foreground-muted outline-none",
                    "hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring",
                    classNames?.iconButton,
                  )}
                >
                  <Icon name="close" size="sm" />
                </button>
              ) : null}
              <Icon name="chevron-down" size="sm" className="pointer-events-none text-foreground-muted" />
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
            className={cn(comboboxContentVariants(), classNames?.content)}
          >
            <ul id={listboxId} role="listbox" className={cn("flex flex-col", classNames?.listbox)}>
              {visibleOptions.map((option, index) => (
                <li
                  key={option.value}
                  ref={(node) => {
                    optionRefs.current[index] = node;
                  }}
                  id={`${listboxId}-option-${index}`}
                  role="option"
                  aria-selected={selectedOption?.value === option.value}
                  data-highlighted={index === activeIndex ? "true" : undefined}
                  data-disabled={option.disabled ? "true" : undefined}
                  onMouseEnter={() => setActiveIndex(index)}
                  onMouseDown={(event) => event.preventDefault()}
                  onClick={() => selectOption(option)}
                  className={cn(comboboxOptionVariants(), classNames?.option)}
                >
                  {selectedOption?.value === option.value ? (
                    <Icon name="check" size="sm" />
                  ) : (
                    <span className="inline-block size-3.5" aria-hidden="true" />
                  )}
                  {option.label}
                </li>
              ))}
              {!loading && visibleOptions.length === 0 ? (
                <li className={cn("px-2 py-1.5 font-sans text-sm text-foreground-muted", classNames?.empty)}>
                  {emptyMessage ?? t.combobox.noResults}
                </li>
              ) : null}
            </ul>
          </PopoverPrimitive.Content>
        </PopoverPrimitive.Portal>
      </PopoverPrimitive.Root>
    );
  },
);

Combobox.displayName = "Combobox";
