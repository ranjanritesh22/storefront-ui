import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, describe, expect, it, vi } from "vitest";
import { ProductGrid } from "./product-grid";
import { configureMessages, resetMessages } from "../../i18n/messages";
import type { ProductSummary } from "../../types/product";

const items: ProductSummary[] = [
  { id: "1", name: "Mug", price: 9.99, image: { src: "/mug.jpg", alt: "Mug" } },
  { id: "2", name: "Plate", price: 14.99, image: { src: "/plate.jpg", alt: "Plate" } },
];

describe("ProductGrid", () => {
  afterEach(() => {
    resetMessages();
  });

  it("renders one ProductCard per item", () => {
    render(<ProductGrid items={items} />);
    expect(screen.getByText("Mug")).toBeInTheDocument();
    expect(screen.getByText("Plate")).toBeInTheDocument();
  });

  it("renders loadingCount skeletons instead of items when loading", () => {
    const { container } = render(<ProductGrid items={items} loading loadingCount={4} />);
    expect(screen.queryByText("Mug")).not.toBeInTheDocument();
    expect(container.querySelectorAll('[aria-hidden="true"]').length).toBeGreaterThan(0);
    expect(container.querySelectorAll("a, [data-orientation]").length).toBe(4);
  });

  it("shows an EmptyState when items is empty and not loading", () => {
    render(<ProductGrid items={[]} />);
    expect(screen.getByText("No products found")).toBeInTheDocument();
  });

  it("translates the empty state via configureMessages", () => {
    configureMessages({ productGrid: { emptyTitle: "Keine Produkte gefunden" } });
    render(<ProductGrid items={[]} />);
    expect(screen.getByText("Keine Produkte gefunden")).toBeInTheDocument();
  });

  it("forwards per-item id-based callbacks to the underlying ProductCard", async () => {
    const user = userEvent.setup();
    const onCtaClick = vi.fn();
    const onWishlistToggle = vi.fn();
    render(
      <ProductGrid
        items={items}
        onCtaClick={onCtaClick}
        onWishlistToggle={onWishlistToggle}
        wishlistedIds={["2"]}
      />,
    );
    const addToCartButtons = screen.getAllByRole("button", { name: "Add to cart" });
    await user.click(addToCartButtons[0]);
    expect(onCtaClick).toHaveBeenCalledWith("1");

    await user.click(screen.getByLabelText("Remove from wishlist"));
    expect(onWishlistToggle).toHaveBeenCalledWith("2");
  });

  it("lets slots.Item replace the default ProductCard", () => {
    render(
      <ProductGrid
        items={items}
        slots={{ Item: (props) => <div data-testid={`custom-${props.product?.id}`} /> }}
      />,
    );
    expect(screen.getByTestId("custom-1")).toBeInTheDocument();
    expect(screen.getByTestId("custom-2")).toBeInTheDocument();
  });
});
