import * as React from "react";
import { Slot } from "../../lib/slot";
import { cn } from "../../lib/cn";
import { cardVariants, type CardVariantsProps } from "./card.variants";

export interface CardProps
  extends React.HTMLAttributes<HTMLDivElement>,
    CardVariantsProps {
  /** Render as the single child element instead of a `<div>`. */
  asChild?: boolean;
}

export const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className, variant, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "div";
    return (
      <Comp ref={ref} className={cn(cardVariants({ variant }), className)} {...props} />
    );
  },
);
Card.displayName = "Card";

export interface CardSlotProps extends React.HTMLAttributes<HTMLDivElement> {
  asChild?: boolean;
}

export const CardHeader = React.forwardRef<HTMLDivElement, CardSlotProps>(
  ({ className, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "div";
    return <Comp ref={ref} className={cn("flex flex-col gap-1.5 p-6", className)} {...props} />;
  },
);
CardHeader.displayName = "CardHeader";

export interface CardTitleProps extends React.HTMLAttributes<HTMLHeadingElement> {
  asChild?: boolean;
}

export const CardTitle = React.forwardRef<HTMLHeadingElement, CardTitleProps>(
  ({ className, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "h3";
    return (
      <Comp
        ref={ref}
        className={cn("font-sans text-lg font-semibold leading-none tracking-tight", className)}
        {...props}
      />
    );
  },
);
CardTitle.displayName = "CardTitle";

export interface CardDescriptionProps extends React.HTMLAttributes<HTMLParagraphElement> {
  asChild?: boolean;
}

export const CardDescription = React.forwardRef<HTMLParagraphElement, CardDescriptionProps>(
  ({ className, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "p";
    return (
      <Comp ref={ref} className={cn("text-sm text-foreground-muted", className)} {...props} />
    );
  },
);
CardDescription.displayName = "CardDescription";

export const CardContent = React.forwardRef<HTMLDivElement, CardSlotProps>(
  ({ className, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "div";
    return <Comp ref={ref} className={cn("p-6 pt-0", className)} {...props} />;
  },
);
CardContent.displayName = "CardContent";

export const CardFooter = React.forwardRef<HTMLDivElement, CardSlotProps>(
  ({ className, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "div";
    return <Comp ref={ref} className={cn("flex items-center gap-2 p-6 pt-0", className)} {...props} />;
  },
);
CardFooter.displayName = "CardFooter";
