"use client";

import * as React from "react";
import { cn } from "../../lib/cn";
import { Icon } from "../icon/icon";
import { RadioGroup, Radio } from "../radio-group/radio-group";
import { Popover, PopoverTrigger, PopoverContent } from "../popover/popover";
import { getMessages } from "../../i18n/messages";
import { storeSelectorTriggerVariants, storeSelectorContentVariants } from "./store-selector.variants";

export interface StoreSelectorStore {
  id: string;
  name: React.ReactNode;
  address?: React.ReactNode;
  /** e.g. "1.2 mi away" — rendered end-aligned next to the store's name. */
  distance?: React.ReactNode;
}

export interface StoreSelectorClassNames {
  trigger?: string;
  content?: string;
  group?: string;
}

export interface StoreSelectorProps {
  stores: StoreSelectorStore[];
  selectedStoreId?: string;
  onSelectedStoreIdChange: (storeId: string) => void;
  /** aria-label on the trigger. @default getMessages().storeSelector.trigger */
  label?: string;
  classNames?: StoreSelectorClassNames;
}

/**
 * Pick-a-nearby-store control for "buy online, pick up in store" flows.
 * Composes `RadioGroup`/`Radio` (roving-tabindex, arrow-key selection) inside
 * a `Popover` rather than hand-rolling single-choice list semantics again.
 */
export const StoreSelector = React.forwardRef<HTMLButtonElement, StoreSelectorProps>(
  ({ stores, selectedStoreId, onSelectedStoreIdChange, label, classNames }, ref) => {
    const messages = getMessages().storeSelector;
    const selectedStore = stores.find((store) => store.id === selectedStoreId);

    return (
      <Popover>
        <PopoverTrigger asChild>
          <button
            ref={ref}
            type="button"
            aria-label={label ?? messages.trigger}
            className={cn(storeSelectorTriggerVariants(), classNames?.trigger)}
          >
            <Icon name="map-pin" size="sm" aria-hidden="true" />
            <span>{selectedStore?.name ?? messages.trigger}</span>
            <Icon name="chevron-down" size="sm" aria-hidden="true" />
          </button>
        </PopoverTrigger>
        <PopoverContent
          align="end"
          className={cn(storeSelectorContentVariants(), classNames?.content)}
        >
          <RadioGroup
            value={selectedStoreId}
            onValueChange={onSelectedStoreIdChange}
            className={classNames?.group}
          >
            {stores.map((store) => (
              <Radio
                key={store.id}
                value={store.id}
                label={
                  <span className="flex flex-col">
                    <span className="font-medium text-foreground">{store.name}</span>
                    {store.address ? (
                      <span className="text-xs text-foreground-muted">{store.address}</span>
                    ) : null}
                  </span>
                }
                description={store.distance}
              />
            ))}
          </RadioGroup>
        </PopoverContent>
      </Popover>
    );
  },
);

StoreSelector.displayName = "StoreSelector";
