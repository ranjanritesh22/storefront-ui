import * as React from "react";
import { cn } from "../../lib/cn";
import { Icon } from "../icon/icon";
import { getMessages } from "../../i18n/messages";
import {
  stepperVariants,
  stepperItemVariants,
  stepperConnectorVariants,
  stepperIndicatorVariants,
  stepperLabelVariants,
  type StepperVariantsProps,
  type StepperState,
} from "./stepper.variants";

export interface StepperStep {
  label: React.ReactNode;
  description?: React.ReactNode;
  /** Present on a completed step, this renders its indicator as a link back to it. */
  href?: string;
}

export interface StepperClassNames {
  root?: string;
  list?: string;
  item?: string;
  indicator?: string;
  label?: string;
  description?: string;
  connector?: string;
}

export interface StepperLinkProps {
  href: string;
  className?: string;
  children: React.ReactNode;
  "aria-label"?: string;
}

export interface StepperSlots {
  /** Swap the anchor for e.g. `next/link` — see ARCHITECTURE.md §4, layer 4. */
  Link?: React.ComponentType<StepperLinkProps>;
}

export interface StepperProps
  extends Omit<React.HTMLAttributes<HTMLElement>, "children">,
    StepperVariantsProps {
  steps: StepperStep[];
  /** 0-based index of the active step. */
  currentStep: number;
  label?: string;
  classNames?: StepperClassNames;
  slots?: StepperSlots;
}

function DefaultStepLink({ href, className, children, "aria-label": ariaLabel }: StepperLinkProps) {
  return (
    <a href={href} className={className} aria-label={ariaLabel}>
      {children}
    </a>
  );
}

function stepState(index: number, currentStep: number): StepperState {
  if (index < currentStep) return "completed";
  if (index === currentStep) return "current";
  return "upcoming";
}

/**
 * Checkout-style progress indicator — horizontal (default) or vertical.
 * Purely data-driven (no internal state), so it stays a Server Component.
 */
export const Stepper = React.forwardRef<HTMLElement, StepperProps>(
  ({ className, classNames, orientation = "horizontal", steps, currentStep, label, slots, ...props }, ref) => {
    const messages = getMessages().stepper;
    const LinkSlot = slots?.Link ?? DefaultStepLink;
    const isVertical = orientation === "vertical";

    return (
      <nav
        ref={ref}
        aria-label={label ?? messages.nav}
        className={cn(classNames?.root, className)}
        {...props}
      >
        <ol className={cn(stepperVariants({ orientation }), classNames?.list)}>
          {steps.map((step, index) => {
            const state = stepState(index, currentStep);
            const isLast = index === steps.length - 1;
            const statusWord =
              state === "completed" ? messages.completed : state === "current" ? messages.current : messages.upcoming;
            const stepLabel = messages.step({
              index: index + 1,
              total: steps.length,
              label: step.label,
              status: statusWord,
            });

            const indicator = (
              <span
                data-state={state}
                className={cn(stepperIndicatorVariants({ state }), classNames?.indicator)}
              >
                {state === "completed" ? (
                  <Icon name="check" size="sm" aria-hidden="true" />
                ) : (
                  <span aria-hidden="true">{index + 1}</span>
                )}
              </span>
            );

            const text = (
              <span
                aria-hidden="true"
                className={cn(isVertical ? "" : "mt-2 text-center", "flex flex-col")}
              >
                <span className={cn(stepperLabelVariants({ state }), classNames?.label)}>
                  {step.label}
                </span>
                {step.description ? (
                  <span className={cn("text-xs text-foreground-muted", classNames?.description)}>
                    {step.description}
                  </span>
                ) : null}
              </span>
            );

            return (
              <li
                key={index}
                aria-current={state === "current" ? "step" : undefined}
                className={cn(stepperItemVariants({ orientation }), classNames?.item)}
              >
                <span className="sr-only">{stepLabel}</span>
                {isVertical ? (
                  <>
                    <span className="flex flex-col items-center">
                      {state === "completed" && step.href ? (
                        <LinkSlot href={step.href} aria-label={stepLabel}>
                          {indicator}
                        </LinkSlot>
                      ) : (
                        indicator
                      )}
                      {!isLast ? (
                        <span
                          aria-hidden="true"
                          className={cn(
                            stepperConnectorVariants({ orientation, state }),
                            classNames?.connector,
                          )}
                        />
                      ) : null}
                    </span>
                    <span className="ms-3 pb-6">{text}</span>
                  </>
                ) : (
                  <>
                    <span className="flex w-full items-center">
                      {state === "completed" && step.href ? (
                        <LinkSlot href={step.href} aria-label={stepLabel}>
                          {indicator}
                        </LinkSlot>
                      ) : (
                        indicator
                      )}
                      {!isLast ? (
                        <span
                          aria-hidden="true"
                          className={cn(
                            stepperConnectorVariants({ orientation, state }),
                            classNames?.connector,
                          )}
                        />
                      ) : null}
                    </span>
                    {text}
                  </>
                )}
              </li>
            );
          })}
        </ol>
      </nav>
    );
  },
);

Stepper.displayName = "Stepper";
