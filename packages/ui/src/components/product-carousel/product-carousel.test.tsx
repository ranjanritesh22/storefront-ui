import { render, screen, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, describe, expect, it, vi } from "vitest";
import { ProductCarousel } from "./product-carousel";
import { configureMessages, resetMessages } from "../../i18n/messages";
import type { ProductSummary } from "../../types/product";

const ITEMS: ProductSummary[] = Array.from({ length: 5 }, (_, index) => ({
  id: `sku-${index + 1}`,
  name: `Product ${index + 1}`,
  price: 10 + index,
  image: { src: "/img.jpg", alt: `Product ${index + 1}` },
}));

/** Makes the track report as scrollable, the way it would in a real browser. */
function makeScrollable(track: HTMLElement) {
  Object.defineProperty(track, "scrollWidth", { value: 2000, configurable: true });
  Object.defineProperty(track, "clientWidth", { value: 500, configurable: true });
  fireEvent.scroll(track);
}

describe("ProductCarousel", () => {
  afterEach(() => {
    resetMessages();
  });

  it("renders nothing when items is empty", () => {
    const { container } = render(<ProductCarousel items={[]} title="Related" />);
    expect(container).toBeEmptyDOMElement();
  });

  it("renders one slide per item, via ProductCard by default", () => {
    render(<ProductCarousel items={ITEMS} />);
    expect(screen.getAllByRole("listitem")).toHaveLength(5);
    expect(screen.getByText("Product 1")).toBeInTheDocument();
    expect(screen.getByText("Product 5")).toBeInTheDocument();
  });

  it("renders the title heading only when given", () => {
    const { rerender } = render(<ProductCarousel items={ITEMS} />);
    expect(screen.queryByRole("heading")).not.toBeInTheDocument();

    rerender(<ProductCarousel items={ITEMS} title="You may also like" />);
    expect(screen.getByRole("heading", { name: "You may also like" })).toBeInTheDocument();
  });

  it("is translatable via configureMessages", () => {
    configureMessages({ productCarousel: { previous: "Zurück", next: "Weiter" } });
    render(<ProductCarousel items={ITEMS} title="Related" />);
    expect(screen.getByRole("button", { name: "Zurück" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Weiter" })).toBeInTheDocument();
  });

  it("disables both nav buttons when the track has no overflow", () => {
    render(<ProductCarousel items={ITEMS} title="Related" />);
    expect(screen.getByRole("button", { name: "Previous slide" })).toBeDisabled();
    expect(screen.getByRole("button", { name: "Next slide" })).toBeDisabled();
  });

  it("enables the nav buttons once the track can scroll, and pages via scrollIntoView on click", async () => {
    const user = userEvent.setup();
    const scrollIntoView = vi.fn();
    window.HTMLElement.prototype.scrollIntoView = scrollIntoView;

    render(<ProductCarousel items={ITEMS} title="Related" />);
    const track = screen.getByRole("list", { name: "Related" });
    makeScrollable(track);

    const nextButton = screen.getByRole("button", { name: "Next slide" });
    expect(nextButton).not.toBeDisabled();

    await user.click(nextButton);
    expect(scrollIntoView).toHaveBeenCalledWith(
      expect.objectContaining({ inline: "start", block: "nearest" }),
    );
  });

  it("pages via the Left/Right arrow keys when the track is focused", () => {
    const scrollIntoView = vi.fn();
    window.HTMLElement.prototype.scrollIntoView = scrollIntoView;

    render(<ProductCarousel items={ITEMS} title="Related" />);
    const track = screen.getByRole("list", { name: "Related" });
    makeScrollable(track);

    fireEvent.keyDown(track, { key: "ArrowRight" });
    expect(scrollIntoView).toHaveBeenCalled();

    scrollIntoView.mockClear();
    fireEvent.keyDown(track, { key: "ArrowLeft" });
    expect(scrollIntoView).toHaveBeenCalled();
  });

  it("keeps each slide's ProductCard CTA independently tabbable", () => {
    render(<ProductCarousel items={ITEMS} ctaLabel="Add to cart" title="Related" />);
    const addToCartButtons = screen.getAllByRole("button", { name: "Add to cart" });
    expect(addToCartButtons).toHaveLength(5);
    for (const button of addToCartButtons) {
      expect(button).not.toHaveAttribute("tabindex", "-1");
    }
  });

  it("forwards onItemCtaClick with the clicked item", async () => {
    const user = userEvent.setup();
    const onItemCtaClick = vi.fn();
    render(<ProductCarousel items={ITEMS} ctaLabel="Add to cart" onItemCtaClick={onItemCtaClick} />);
    const addToCartButtons = screen.getAllByRole("button", { name: "Add to cart" });
    await user.click(addToCartButtons[0]);
    expect(onItemCtaClick).toHaveBeenCalledWith(ITEMS[0]);
  });

  it("lets classNames reach individual slots", () => {
    render(<ProductCarousel items={ITEMS} title="Related" classNames={{ title: "custom-title" }} />);
    expect(screen.getByRole("heading", { name: "Related" }).className).toContain("custom-title");
  });

  it("lets slots.Item replace the default per-slide render", () => {
    render(
      <ProductCarousel
        items={ITEMS}
        slots={{ Item: ({ item }) => <span data-testid="custom-item">{item.name}</span> }}
      />,
    );
    expect(screen.getAllByTestId("custom-item")).toHaveLength(5);
  });

  it("lets a consumer className win on the root", () => {
    const { container } = render(<ProductCarousel items={ITEMS} className="custom-root" />);
    expect(container.firstChild).toHaveClass("custom-root");
  });
});
