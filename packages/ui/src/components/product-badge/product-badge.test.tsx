import { render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";
import { ProductBadge } from "./product-badge";
import { Badge } from "../badge/badge";
import { configureMessages, resetMessages } from "../../i18n/messages";

describe("ProductBadge", () => {
  afterEach(() => {
    resetMessages();
  });

  it("renders the dictionary label and danger variant for type=sale", () => {
    render(<ProductBadge type="sale" />);
    const badge = screen.getByText("Sale");
    expect(badge.className).toContain("bg-danger");
  });

  it("renders the dictionary label and primary variant for type=new", () => {
    render(<ProductBadge type="new" />);
    const badge = screen.getByText("New");
    expect(badge.className).toContain("bg-primary");
  });

  it("renders the dictionary label for type=out-of-stock", () => {
    render(<ProductBadge type="out-of-stock" />);
    expect(screen.getByText("Out of stock")).toBeInTheDocument();
  });

  it("requires and renders a `label` for type=custom", () => {
    render(<ProductBadge type="custom" label="Limited edition" />);
    expect(screen.getByText("Limited edition")).toBeInTheDocument();
  });

  it("lets `label` override the dictionary default for a built-in type", () => {
    render(<ProductBadge type="sale" label="Flash sale" />);
    expect(screen.getByText("Flash sale")).toBeInTheDocument();
    expect(screen.queryByText("Sale")).not.toBeInTheDocument();
  });

  it("lets `variant` override the auto-picked colour", () => {
    render(<ProductBadge type="sale" variant="warning" />);
    const badge = screen.getByText("Sale");
    expect(badge.className).toContain("bg-warning");
    expect(badge.className).not.toContain("bg-danger");
  });

  it("is translatable via configureMessages", () => {
    configureMessages({ productBadge: { sale: "Solde" } });
    render(<ProductBadge type="sale" />);
    expect(screen.getByText("Solde")).toBeInTheDocument();
  });

  it("delegates rendering to Badge (renders a <span> by default)", () => {
    render(<ProductBadge type="new" />);
    expect(screen.getByText("New").tagName).toBe("SPAN");
  });

  it("lets a consumer className win", () => {
    render(<ProductBadge type="new" className="uppercase" />);
    expect(screen.getByText("New").className).toContain("uppercase");
  });

  it("lets slots.Badge replace the underlying render", () => {
    render(
      <ProductBadge
        type="new"
        slots={{ Badge: (props) => <Badge {...props} data-testid="custom-badge" /> }}
      />,
    );
    expect(screen.getByTestId("custom-badge")).toHaveTextContent("New");
  });
});
