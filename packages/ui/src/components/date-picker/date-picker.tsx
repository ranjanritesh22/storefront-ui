"use client";

import * as React from "react";
import * as PopoverPrimitive from "@radix-ui/react-popover";
import { cn } from "../../lib/cn";
import { Icon } from "../icon/icon";
import { getMessages } from "../../i18n/messages";
import {
  datePickerTriggerVariants,
  datePickerContentVariants,
  datePickerNavButtonVariants,
  datePickerDayVariants,
  type DatePickerVariantsProps,
} from "./date-picker.variants";

export interface DatePickerClassNames {
  trigger?: string;
  content?: string;
  day?: string;
}

export interface DatePickerProps
  extends Omit<
      React.ComponentPropsWithoutRef<typeof PopoverPrimitive.Trigger>,
      "asChild" | "onSelect" | "value" | "defaultValue"
    >,
    DatePickerVariantsProps {
  value?: Date | null;
  defaultValue?: Date | null;
  onValueChange?: (date: Date | null) => void;
  placeholder?: string;
  /** Formats the selected date for the trigger button. @default Intl.DateTimeFormat with dateStyle: "medium" */
  formatDate?: (date: Date) => string;
  min?: Date;
  max?: Date;
  isDateDisabled?: (date: Date) => boolean;
  /** @default 0 (Sunday) */
  weekStartsOn?: 0 | 1;
  locale?: string;
  /** Marks the field invalid: sets `data-invalid`/`aria-invalid` on the trigger. */
  invalid?: boolean;
  name?: string;
  classNames?: DatePickerClassNames;
}

function stripTime(date: Date): Date {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate());
}

function addDays(date: Date, amount: number): Date {
  const next = new Date(date);
  next.setDate(next.getDate() + amount);
  return next;
}

function addMonths(date: Date, amount: number): Date {
  const next = new Date(date);
  next.setMonth(next.getMonth() + amount);
  return next;
}

function addYears(date: Date, amount: number): Date {
  const next = new Date(date);
  next.setFullYear(next.getFullYear() + amount);
  return next;
}

function startOfMonth(date: Date): Date {
  return new Date(date.getFullYear(), date.getMonth(), 1);
}

function startOfWeek(date: Date, weekStartsOn: 0 | 1): Date {
  const offset = (date.getDay() - weekStartsOn + 7) % 7;
  return addDays(date, -offset);
}

function isSameDay(a: Date, b: Date): boolean {
  return a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate();
}

function dateKey(date: Date): string {
  return `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`;
}

function buildMonthGrid(viewDate: Date, weekStartsOn: 0 | 1): Date[][] {
  const gridStart = startOfWeek(startOfMonth(viewDate), weekStartsOn);
  const weeks: Date[][] = [];
  let cursor = gridStart;
  for (let week = 0; week < 6; week++) {
    const days: Date[] = [];
    for (let day = 0; day < 7; day++) {
      days.push(cursor);
      cursor = addDays(cursor, 1);
    }
    weeks.push(days);
  }
  return weeks;
}

const defaultFormatDate = (date: Date) => new Intl.DateTimeFormat(undefined, { dateStyle: "medium" }).format(date);

/**
 * A date field built from a trigger button + `@radix-ui/react-popover` +
 * a hand-rolled calendar grid — Radix has no date-picker primitive. Follows
 * the WAI-ARIA APG "Date Picker Dialog" grid pattern: a `<table role="grid">`
 * of day buttons with roving `tabIndex` (arrow keys move by day/week,
 * PageUp/PageDown by month, Shift+PageUp/PageDown by year), and the month
 * heading doubles as an `aria-live` region announcing month/year changes.
 * Necessarily a Client Component (CLAUDE.md rule 2).
 */
export const DatePicker = React.forwardRef<HTMLButtonElement, DatePickerProps>(
  (
    {
      className,
      classNames,
      size,
      value,
      defaultValue,
      onValueChange,
      placeholder,
      formatDate = defaultFormatDate,
      min,
      max,
      isDateDisabled,
      weekStartsOn = 0,
      locale,
      invalid = false,
      disabled = false,
      id,
      name,
      ...triggerProps
    },
    forwardedRef,
  ) => {
    const t = getMessages();
    const generatedId = React.useId();
    const controlId = id ?? generatedId;
    const headingId = `${controlId}-heading`;

    const triggerRef = React.useRef<HTMLButtonElement>(null);
    React.useImperativeHandle(forwardedRef, () => triggerRef.current as HTMLButtonElement);
    const dayRefs = React.useRef<Map<string, HTMLButtonElement>>(new Map());

    const isControlled = value !== undefined;
    const [uncontrolledSelected, setUncontrolledSelected] = React.useState<Date | null>(defaultValue ?? null);
    const selectedDate = isControlled ? (value ?? null) : uncontrolledSelected;

    const today = React.useMemo(() => stripTime(new Date()), []);
    const [open, setOpen] = React.useState(false);
    const [viewDate, setViewDate] = React.useState<Date>(startOfMonth(selectedDate ?? today));
    const [focusedDate, setFocusedDate] = React.useState<Date>(selectedDate ?? today);

    React.useEffect(() => {
      if (!isControlled) return;
      const next = value ?? today;
      setViewDate(startOfMonth(next));
      setFocusedDate(next);
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [value?.getTime(), isControlled]);

    React.useEffect(() => {
      if (!open) return;
      dayRefs.current.get(dateKey(focusedDate))?.focus();
    }, [open, focusedDate, viewDate]);

    const monthYearLabel = React.useMemo(
      () => new Intl.DateTimeFormat(locale, { month: "long", year: "numeric" }).format(viewDate),
      [locale, viewDate],
    );
    const weekdayLabels = React.useMemo(() => {
      const formatter = new Intl.DateTimeFormat(locale, { weekday: "short" });
      const longFormatter = new Intl.DateTimeFormat(locale, { weekday: "long" });
      const base = startOfWeek(today, weekStartsOn);
      return Array.from({ length: 7 }, (_, i) => {
        const day = addDays(base, i);
        return { short: formatter.format(day), full: longFormatter.format(day) };
      });
    }, [locale, weekStartsOn, today]);

    const weeks = React.useMemo(() => buildMonthGrid(viewDate, weekStartsOn), [viewDate, weekStartsOn]);

    function isDisabled(date: Date): boolean {
      if (min && stripTime(date) < stripTime(min)) return true;
      if (max && stripTime(date) > stripTime(max)) return true;
      return isDateDisabled?.(date) ?? false;
    }

    function handleOpenChange(next: boolean) {
      setOpen(next);
      if (next) {
        const base = selectedDate ?? today;
        setViewDate(startOfMonth(base));
        setFocusedDate(base);
      }
    }

    function selectDate(date: Date) {
      if (isDisabled(date)) return;
      if (!isControlled) setUncontrolledSelected(date);
      onValueChange?.(date);
      setOpen(false);
      triggerRef.current?.focus();
    }

    function clearDate() {
      if (!isControlled) setUncontrolledSelected(null);
      onValueChange?.(null);
    }

    function moveFocus(next: Date) {
      setFocusedDate(next);
      if (next.getMonth() !== viewDate.getMonth() || next.getFullYear() !== viewDate.getFullYear()) {
        setViewDate(startOfMonth(next));
      }
    }

    function handleDayKeyDown(event: React.KeyboardEvent<HTMLButtonElement>, date: Date) {
      switch (event.key) {
        case "ArrowLeft":
          event.preventDefault();
          moveFocus(addDays(date, -1));
          break;
        case "ArrowRight":
          event.preventDefault();
          moveFocus(addDays(date, 1));
          break;
        case "ArrowUp":
          event.preventDefault();
          moveFocus(addDays(date, -7));
          break;
        case "ArrowDown":
          event.preventDefault();
          moveFocus(addDays(date, 7));
          break;
        case "Home":
          event.preventDefault();
          moveFocus(startOfWeek(date, weekStartsOn));
          break;
        case "End":
          event.preventDefault();
          moveFocus(addDays(startOfWeek(date, weekStartsOn), 6));
          break;
        case "PageUp":
          event.preventDefault();
          moveFocus(event.shiftKey ? addYears(date, -1) : addMonths(date, -1));
          break;
        case "PageDown":
          event.preventDefault();
          moveFocus(event.shiftKey ? addYears(date, 1) : addMonths(date, 1));
          break;
        case "Enter":
        case " ":
          event.preventDefault();
          selectDate(date);
          break;
        default:
          break;
      }
    }

    const isPrevMonthBlocked = !!min && addDays(startOfMonth(viewDate), -1) < stripTime(min);
    const isNextMonthBlocked = !!max && addMonths(startOfMonth(viewDate), 1) > stripTime(max);

    return (
      <PopoverPrimitive.Root open={open} onOpenChange={handleOpenChange}>
        <div className="relative w-full">
          <PopoverPrimitive.Trigger
            ref={triggerRef}
            id={controlId}
            type="button"
            disabled={disabled}
            data-invalid={invalid ? "true" : undefined}
            data-disabled={disabled ? "true" : undefined}
            data-placeholder={!selectedDate ? "true" : undefined}
            aria-invalid={invalid || undefined}
            className={cn(
              datePickerTriggerVariants({ size }),
              selectedDate ? "pe-9" : undefined,
              classNames?.trigger,
              className,
            )}
            {...triggerProps}
          >
            <span className="flex min-w-0 items-center gap-2">
              <Icon name="calendar" size="sm" className="shrink-0 text-foreground-muted" />
              <span className="truncate">
                {selectedDate ? formatDate(selectedDate) : (placeholder ?? t.datePicker.placeholder)}
              </span>
            </span>
          </PopoverPrimitive.Trigger>
          {selectedDate ? (
            <button
              type="button"
              tabIndex={-1}
              aria-label={t.datePicker.clear}
              disabled={disabled}
              onClick={(event) => {
                event.stopPropagation();
                clearDate();
              }}
              className="absolute end-2 top-1/2 flex size-6 -translate-y-1/2 items-center justify-center rounded text-foreground-muted outline-none hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring"
            >
              <Icon name="close" size="sm" />
            </button>
          ) : null}
          {name ? <input type="hidden" name={name} value={selectedDate ? dateKey(selectedDate) : ""} /> : null}
        </div>
        <PopoverPrimitive.Portal>
          <PopoverPrimitive.Content
            sideOffset={4}
            align="start"
            aria-label={t.datePicker.chooseDate}
            onOpenAutoFocus={(event) => {
              // Radix mounts Content (via Presence) a tick after `open` flips, so a
              // plain effect keyed on `open` can fire before the day buttons exist.
              // This callback is Radix's own signal that Content just finished
              // mounting and is ready to receive focus — use it instead of its
              // default "focus the first focusable descendant" behavior.
              event.preventDefault();
              dayRefs.current.get(dateKey(focusedDate))?.focus();
            }}
            className={cn(datePickerContentVariants(), classNames?.content)}
          >
            <div className="flex items-center justify-between">
              <button
                type="button"
                aria-label={t.datePicker.previousMonth}
                disabled={isPrevMonthBlocked}
                onClick={() => setViewDate(addMonths(viewDate, -1))}
                className={datePickerNavButtonVariants()}
              >
                <Icon name="chevron-left" size="sm" />
              </button>
              <div id={headingId} aria-live="polite" className="font-sans text-sm font-medium text-foreground">
                {monthYearLabel}
              </div>
              <button
                type="button"
                aria-label={t.datePicker.nextMonth}
                disabled={isNextMonthBlocked}
                onClick={() => setViewDate(addMonths(viewDate, 1))}
                className={datePickerNavButtonVariants()}
              >
                <Icon name="chevron-right" size="sm" />
              </button>
            </div>
            <table role="grid" aria-labelledby={headingId} className="mt-2 w-full border-collapse">
              <thead>
                <tr>
                  {weekdayLabels.map((weekday) => (
                    <th key={weekday.full} scope="col" abbr={weekday.full} className="pb-1 font-sans text-xs font-medium text-foreground-muted">
                      {weekday.short}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {weeks.map((week, weekIndex) => (
                  <tr key={weekIndex}>
                    {week.map((day) => {
                      const outsideMonth = day.getMonth() !== viewDate.getMonth();
                      const selected = !!selectedDate && isSameDay(day, selectedDate);
                      const isToday = isSameDay(day, today);
                      const dayDisabled = isDisabled(day);
                      return (
                        <td
                          key={dateKey(day)}
                          role="gridcell"
                          aria-selected={selected}
                          aria-current={isToday ? "date" : undefined}
                          className="p-0.5 text-center"
                        >
                          <button
                            ref={(node) => {
                              if (node) dayRefs.current.set(dateKey(day), node);
                              else dayRefs.current.delete(dateKey(day));
                            }}
                            type="button"
                            tabIndex={isSameDay(day, focusedDate) ? 0 : -1}
                            aria-label={new Intl.DateTimeFormat(locale, { dateStyle: "full" }).format(day)}
                            data-selected={selected ? "true" : undefined}
                            data-today={isToday ? "true" : undefined}
                            data-outside-month={outsideMonth ? "true" : undefined}
                            data-disabled={dayDisabled ? "true" : undefined}
                            disabled={dayDisabled}
                            onClick={() => selectDate(day)}
                            onKeyDown={(event) => handleDayKeyDown(event, day)}
                            onFocus={() => setFocusedDate(day)}
                            className={cn(datePickerDayVariants(), classNames?.day)}
                          >
                            {day.getDate()}
                          </button>
                        </td>
                      );
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
            {selectedDate ? (
              <div className="mt-2 flex justify-end border-t border-border pt-2">
                <button
                  type="button"
                  onClick={() => {
                    clearDate();
                    setOpen(false);
                    triggerRef.current?.focus();
                  }}
                  className="font-sans text-sm text-foreground-muted underline outline-none hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring"
                >
                  {t.datePicker.clear}
                </button>
              </div>
            ) : null}
          </PopoverPrimitive.Content>
        </PopoverPrimitive.Portal>
      </PopoverPrimitive.Root>
    );
  },
);

DatePicker.displayName = "DatePicker";
