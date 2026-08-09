import type * as React from "react";
import { render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";
import { Icon, configureIcons, resetIcons } from "./icon";

describe("Icon", () => {
  afterEach(() => {
    resetIcons();
  });

  it("renders the registered glyph for a known name", () => {
    const { container } = render(<Icon name="cart" />);
    expect(container.querySelector("svg")).toBeInTheDocument();
  });

  it("is aria-hidden with no accessible name by default", () => {
    const { container } = render(<Icon name="close" />);
    const svg = container.querySelector("svg");
    expect(svg).toHaveAttribute("aria-hidden", "true");
    expect(svg).not.toHaveAttribute("aria-label");
  });

  it("exposes an accessible name when label is given, and drops aria-hidden", () => {
    render(<Icon name="close" label="Close" />);
    expect(screen.getByRole("img", { name: "Close" })).toBeInTheDocument();
  });

  it("lets className win alongside the size variant classes", () => {
    const { container } = render(<Icon name="star" className="text-warning" />);
    const svg = container.querySelector("svg");
    expect(svg?.getAttribute("class")).toContain("text-warning");
  });

  it("configureIcons swaps the glyph rendered for a given name everywhere", () => {
    function CustomCart(props: React.SVGProps<SVGSVGElement>) {
      return (
        <svg data-testid="custom-cart" {...props}>
          <title>custom</title>
        </svg>
      );
    }
    configureIcons({ cart: CustomCart });
    render(<Icon name="cart" label="Cart" />);
    expect(screen.getByTestId("custom-cart")).toBeInTheDocument();
  });

  it("resetIcons restores the built-in glyph", () => {
    configureIcons({ cart: () => <svg data-testid="custom-cart" /> });
    resetIcons();
    const { container, queryByTestId } = render(<Icon name="cart" />);
    expect(queryByTestId("custom-cart")).not.toBeInTheDocument();
    expect(container.querySelector("svg")).toBeInTheDocument();
  });
});
