import { render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";
import { StockIndicator } from "./stock-indicator";
import { configureMessages, resetMessages } from "../../i18n/messages";
import type { ProductSummary } from "../../types/product";

describe("StockIndicator", () => {
  afterEach(() => {
    resetMessages();
  });

  it("reads its default copy from the message dictionary for each status", () => {
    const { rerender } = render(<StockIndicator status="in-stock" />);
    expect(screen.getByText("In stock")).toBeInTheDocument();

    rerender(<StockIndicator status="low-stock" />);
    expect(screen.getByText("Low stock")).toBeInTheDocument();

    rerender(<StockIndicator status="out-of-stock" />);
    expect(screen.getByText("Out of stock")).toBeInTheDocument();
  });

  it("resolves status from a `product` prop when no explicit status is given", () => {
    const inStock: ProductSummary = {
      id: "1",
      name: "Mug",
      price: 9.99,
      image: { src: "/img.jpg", alt: "Mug" },
      inStock: true,
    };
    const { rerender } = render(<StockIndicator product={inStock} />);
    expect(screen.getByText("In stock")).toBeInTheDocument();

    const outOfStock: ProductSummary = { ...inStock, inStock: false };
    rerender(<StockIndicator product={outOfStock} />);
    expect(screen.getByText("Out of stock")).toBeInTheDocument();
  });

  it("lets an explicit status win over the product's inStock field", () => {
    const product: ProductSummary = {
      id: "1",
      name: "Mug",
      price: 9.99,
      image: { src: "/img.jpg", alt: "Mug" },
      inStock: true,
    };
    render(<StockIndicator product={product} status="low-stock" />);
    expect(screen.getByText("Low stock")).toBeInTheDocument();
  });

  it("lets a `label` prop override the dictionary copy", () => {
    render(<StockIndicator status="in-stock" label="Ships today" />);
    expect(screen.getByText("Ships today")).toBeInTheDocument();
  });

  it("is translatable via configureMessages", () => {
    configureMessages({ stockIndicator: { inStock: "Auf Lager" } });
    render(<StockIndicator status="in-stock" />);
    expect(screen.getByText("Auf Lager")).toBeInTheDocument();
  });

  it("sets data-status on the root element", () => {
    render(<StockIndicator status="low-stock" />);
    expect(screen.getByText("Low stock").closest("[data-status]")).toHaveAttribute(
      "data-status",
      "low-stock",
    );
  });

  it("lets classNames reach the label and indicator slots", () => {
    render(
      <StockIndicator
        status="in-stock"
        classNames={{ root: "custom-root", indicator: "custom-dot", label: "custom-label" }}
      />,
    );
    expect(screen.getByText("In stock").className).toContain("custom-label");
  });

  it("lets a consumer className win on the root element", () => {
    render(<StockIndicator status="in-stock" className="gap-4" />);
    const root = screen.getByText("In stock").parentElement;
    expect(root?.className).toContain("gap-4");
  });

  it("lets slots.Indicator replace the default dot", () => {
    render(
      <StockIndicator
        status="in-stock"
        slots={{ Indicator: (props) => <span {...props} data-testid="custom-indicator" /> }}
      />,
    );
    expect(screen.getByTestId("custom-indicator")).toBeInTheDocument();
  });
});
