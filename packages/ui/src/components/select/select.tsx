"use client";

import * as React from "react";
import * as SelectPrimitive from "@radix-ui/react-select";
import { cn } from "../../lib/cn";
import { Icon } from "../icon/icon";
import { getMessages } from "../../i18n/messages";
import {
  selectVariants,
  selectContentVariants,
  selectItemVariants,
  type SelectVariantsProps,
} from "./select.variants";

export interface SelectOption {
  value: string;
  label: React.ReactNode;
  disabled?: boolean;
}

export interface SelectOptionGroup {
  label: React.ReactNode;
  options: SelectOption[];
}

function isGroup(option: SelectOption | SelectOptionGroup): option is SelectOptionGroup {
  return "options" in option;
}

export interface SelectClassNames {
  trigger?: string;
  value?: string;
  icon?: string;
  content?: string;
  viewport?: string;
  item?: string;
  group?: string;
  groupLabel?: string;
}

export interface SelectProps
  extends Omit<React.ComponentPropsWithoutRef<typeof SelectPrimitive.Trigger>, "asChild">,
    SelectVariantsProps {
  /** Flat list, or groups (each rendered under a label with a separator-free heading). */
  options: (SelectOption | SelectOptionGroup)[];
  placeholder?: string;
  /** Marks the field invalid: sets `data-invalid`/`aria-invalid` on the trigger. */
  invalid?: boolean;
  classNames?: SelectClassNames;
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
  name?: string;
  required?: boolean;
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  dir?: "ltr" | "rtl";
}

function SelectItem({ option, className }: { option: SelectOption; className?: string }) {
  return (
    <SelectPrimitive.Item
      value={option.value}
      disabled={option.disabled}
      className={cn(selectItemVariants(), className)}
    >
      <SelectPrimitive.ItemIndicator className="absolute start-2 inline-flex items-center">
        <Icon name="check" size="sm" />
      </SelectPrimitive.ItemIndicator>
      <SelectPrimitive.ItemText>{option.label}</SelectPrimitive.ItemText>
    </SelectPrimitive.Item>
  );
}

/**
 * Built on `@radix-ui/react-select` — necessarily a Client Component
 * (CLAUDE.md rule 2: owns open/close and highlighted-item state). The
 * `options` prop covers the common flat-or-grouped list; reach for the
 * re-exported Radix primitives directly (`SelectPrimitive` via
 * `@radix-ui/react-select`) for anything more bespoke.
 */
export const Select = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Trigger>,
  SelectProps
>(
  (
    {
      className,
      classNames,
      size,
      options,
      placeholder,
      invalid = false,
      id,
      value,
      defaultValue,
      onValueChange,
      name,
      required,
      disabled,
      open,
      defaultOpen,
      onOpenChange,
      dir,
      ...triggerProps
    },
    ref,
  ) => {
    const t = getMessages();
    const generatedId = React.useId();
    const controlId = id ?? generatedId;

    return (
      <SelectPrimitive.Root
        value={value}
        defaultValue={defaultValue}
        onValueChange={onValueChange}
        name={name}
        required={required}
        disabled={disabled}
        open={open}
        defaultOpen={defaultOpen}
        onOpenChange={onOpenChange}
        dir={dir}
      >
        <SelectPrimitive.Trigger
          ref={ref}
          id={controlId}
          data-invalid={invalid ? "true" : undefined}
          aria-invalid={invalid || undefined}
          className={cn(selectVariants({ size }), classNames?.trigger, className)}
          {...triggerProps}
        >
          <SelectPrimitive.Value
            placeholder={placeholder ?? t.select.placeholder}
            className={classNames?.value}
          />
          <SelectPrimitive.Icon asChild>
            <Icon
              name="chevron-down"
              className={cn("pointer-events-none text-foreground-muted", classNames?.icon)}
            />
          </SelectPrimitive.Icon>
        </SelectPrimitive.Trigger>
        <SelectPrimitive.Portal>
          <SelectPrimitive.Content
            position="popper"
            sideOffset={4}
            className={cn(selectContentVariants(), classNames?.content)}
          >
            <SelectPrimitive.ScrollUpButton className="flex items-center justify-center py-1 text-foreground-muted">
              <Icon name="chevron-up" size="sm" />
            </SelectPrimitive.ScrollUpButton>
            <SelectPrimitive.Viewport className={cn("p-1", classNames?.viewport)}>
              {options.map((option, index) =>
                isGroup(option) ? (
                  <SelectPrimitive.Group
                    key={`group-${index}`}
                    className={classNames?.group}
                  >
                    <SelectPrimitive.Label
                      className={cn(
                        "px-2 py-1.5 font-sans text-xs font-medium text-foreground-muted",
                        classNames?.groupLabel,
                      )}
                    >
                      {option.label}
                    </SelectPrimitive.Label>
                    {option.options.map((groupOption) => (
                      <SelectItem key={groupOption.value} option={groupOption} className={classNames?.item} />
                    ))}
                  </SelectPrimitive.Group>
                ) : (
                  <SelectItem key={option.value} option={option} className={classNames?.item} />
                ),
              )}
            </SelectPrimitive.Viewport>
            <SelectPrimitive.ScrollDownButton className="flex items-center justify-center py-1 text-foreground-muted">
              <Icon name="chevron-down" size="sm" />
            </SelectPrimitive.ScrollDownButton>
          </SelectPrimitive.Content>
        </SelectPrimitive.Portal>
      </SelectPrimitive.Root>
    );
  },
);

Select.displayName = "Select";
