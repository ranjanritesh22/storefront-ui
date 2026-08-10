"use client";

import * as React from "react";
import { cn } from "../../lib/cn";
import { Icon } from "../icon/icon";
import { Label } from "../label/label";
import { Select, type SelectOption } from "../select/select";
import { Popover, PopoverTrigger, PopoverContent } from "../popover/popover";
import { getMessages } from "../../i18n/messages";
import {
  languageCurrencySelectorTriggerVariants,
  languageCurrencySelectorContentVariants,
} from "./language-currency-selector.variants";

export interface LanguageCurrencySelectorClassNames {
  trigger?: string;
  content?: string;
  field?: string;
}

export interface LanguageCurrencySelectorProps {
  languages: SelectOption[];
  currencies: SelectOption[];
  language: string;
  currency: string;
  onLanguageChange: (value: string) => void;
  onCurrencyChange: (value: string) => void;
  /** aria-label on the trigger. @default getMessages().languageCurrencySelector.trigger */
  label?: string;
  classNames?: LanguageCurrencySelectorClassNames;
}

/**
 * A single trigger that opens a panel for picking both language and
 * currency — the header utility-bar control every multi-region storefront
 * needs. Composes the already-accessible `Select` (twice) inside a
 * `Popover` rather than hand-rolling listbox behaviour again.
 */
export const LanguageCurrencySelector = React.forwardRef<
  HTMLButtonElement,
  LanguageCurrencySelectorProps
>(
  (
    { languages, currencies, language, currency, onLanguageChange, onCurrencyChange, label, classNames },
    ref,
  ) => {
    const messages = getMessages().languageCurrencySelector;
    const languageId = React.useId();
    const currencyId = React.useId();

    const selectedLanguage = languages.find((option) => option.value === language);
    const selectedCurrency = currencies.find((option) => option.value === currency);

    return (
      <Popover>
        <PopoverTrigger asChild>
          <button
            ref={ref}
            type="button"
            aria-label={label ?? messages.trigger}
            className={cn(languageCurrencySelectorTriggerVariants(), classNames?.trigger)}
          >
            <Icon name="globe" size="sm" aria-hidden="true" />
            <span>
              {selectedLanguage?.label} / {selectedCurrency?.label}
            </span>
            <Icon name="chevron-down" size="sm" aria-hidden="true" />
          </button>
        </PopoverTrigger>
        <PopoverContent
          align="end"
          className={cn(languageCurrencySelectorContentVariants(), classNames?.content)}
        >
          <div className={classNames?.field}>
            <Label htmlFor={languageId}>{messages.language}</Label>
            <Select
              id={languageId}
              className="mt-1.5 w-full"
              options={languages}
              value={language}
              onValueChange={onLanguageChange}
            />
          </div>
          <div className={classNames?.field}>
            <Label htmlFor={currencyId}>{messages.currency}</Label>
            <Select
              id={currencyId}
              className="mt-1.5 w-full"
              options={currencies}
              value={currency}
              onValueChange={onCurrencyChange}
            />
          </div>
        </PopoverContent>
      </Popover>
    );
  },
);

LanguageCurrencySelector.displayName = "LanguageCurrencySelector";
