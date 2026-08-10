import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Stepper } from "./stepper";

const steps = [
  { label: "Cart", href: "/cart" },
  { label: "Shipping", href: "/shipping" },
  { label: "Payment" },
  { label: "Review" },
];

describe("Stepper", () => {
  it("renders every step's label", () => {
    render(<Stepper steps={steps} currentStep={2} />);
    expect(screen.getByText("Cart")).toBeInTheDocument();
    expect(screen.getByText("Payment")).toBeInTheDocument();
  });

  it("marks the current step with aria-current='step'", () => {
    render(<Stepper steps={steps} currentStep={2} />);
    const items = screen.getAllByRole("listitem");
    expect(items[2]).toHaveAttribute("aria-current", "step");
    expect(items[0]).not.toHaveAttribute("aria-current");
  });

  it("marks steps before currentStep as completed via data-state", () => {
    render(<Stepper steps={steps} currentStep={2} />);
    const indicators = document.querySelectorAll("[data-state]");
    expect(indicators[0]).toHaveAttribute("data-state", "completed");
    expect(indicators[1]).toHaveAttribute("data-state", "completed");
    expect(indicators[2]).toHaveAttribute("data-state", "current");
    expect(indicators[3]).toHaveAttribute("data-state", "upcoming");
  });

  it("links a completed step's indicator when it has an href", () => {
    render(<Stepper steps={steps} currentStep={2} />);
    expect(screen.getByRole("link", { name: /cart/i })).toHaveAttribute("href", "/cart");
  });

  it("does not link an upcoming step even if it has an href", () => {
    const stepsWithFutureHref = [
      { label: "Cart", href: "/cart" },
      { label: "Shipping", href: "/shipping" },
    ];
    render(<Stepper steps={stepsWithFutureHref} currentStep={0} />);
    expect(screen.queryByRole("link", { name: /shipping/i })).not.toBeInTheDocument();
  });

  it("applies the vertical orientation class", () => {
    render(<Stepper steps={steps} currentStep={0} orientation="vertical" data-testid="nav" />);
    const list = document.querySelector("ol");
    expect(list?.className).toContain("flex-col");
  });

  it("lets classNames reach the list", () => {
    render(<Stepper steps={steps} currentStep={0} classNames={{ list: "custom-list" }} />);
    expect(document.querySelector("ol")?.className).toContain("custom-list");
  });
});
