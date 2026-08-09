import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, describe, expect, it, vi } from "vitest";
import { ProductCard } from "./product-card";
import { Badge } from "../badge/badge";
import { configureMessages, resetMessages } from "../../i18n/messages";
import type { ProductSummary } from "../../types/product";

describe("ProductCard", () => {
  afterEach(() => {
    resetMessages();
  });

  it("accepts a domain-agnostic `product` summary instead of individual props", () => {
    const product: ProductSummary = {
      id: "sku-1",
      name: "Wireless headphones",
      price: 79.99,
      image: { src: "/img.jpg", alt: "Wireless headphones" },
    };
    render(<ProductCard product={product} />);
    expect(screen.getByText("Wireless headphones")).toBeInTheDocument();
    expect(screen.getByText("$79.99")).toBeInTheDocument();
  });

  it("lets an explicit prop win over the matching `product` field", () => {
    const product: ProductSummary = {
      id: "sku-1",
      name: "Wireless headphones",
      price: 79.99,
      image: { src: "/img.jpg", alt: "Wireless headphones" },
    };
    render(<ProductCard product={product} title="Renamed headphones" />);
    expect(screen.getByText("Renamed headphones")).toBeInTheDocument();
    expect(screen.queryByText("Wireless headphones")).not.toBeInTheDocument();
  });

  it("reads its default copy from the message dictionary, translatable via configureMessages", () => {
    configureMessages({ productCard: { addToCart: "In den Warenkorb" } });
    render(<ProductCard title="Mug" imageSrc="/img.jpg" imageAlt="Mug" price={9.99} />);
    expect(screen.getByRole("button", { name: "In den Warenkorb" })).toBeInTheDocument();
  });

  it("composes our own Card, Price, and Button by default", () => {
    render(
      <ProductCard
        title="Wireless headphones"
        imageSrc="/img.jpg"
        imageAlt="Wireless headphones"
        price={79.99}
      />,
    );
    expect(screen.getByText("Wireless headphones")).toBeInTheDocument();
    expect(screen.getByText("$79.99")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Add to cart" })).toBeInTheDocument();
  });

  it("renders the badge only when badgeLabel is given, and shows the sale price", () => {
    const { rerender } = render(
      <ProductCard title="Mug" imageSrc="/img.jpg" imageAlt="Mug" price={9.99} />,
    );
    expect(screen.queryByText("Sale")).not.toBeInTheDocument();

    rerender(
      <ProductCard
        title="Mug"
        imageSrc="/img.jpg"
        imageAlt="Mug"
        price={7.99}
        originalPrice={9.99}
        badgeLabel="Sale"
      />,
    );
    expect(screen.getByText("Sale")).toBeInTheDocument();
    expect(screen.getByText("$7.99")).toBeInTheDocument();
    expect(screen.getByText("$9.99")).toBeInTheDocument();
  });

  it("calls onCtaClick when the CTA is clicked", async () => {
    const user = userEvent.setup();
    const onCtaClick = vi.fn();
    render(
      <ProductCard
        title="Mug"
        imageSrc="/img.jpg"
        imageAlt="Mug"
        price={9.99}
        onCtaClick={onCtaClick}
      />,
    );
    await user.click(screen.getByRole("button", { name: "Add to cart" }));
    expect(onCtaClick).toHaveBeenCalledTimes(1);
  });

  it("wraps the image and title in a link when href is given", () => {
    render(
      <ProductCard
        title="Mug"
        imageSrc="/img.jpg"
        imageAlt="Mug"
        price={9.99}
        href="/products/mug"
      />,
    );
    const links = screen.getAllByRole("link");
    expect(links.length).toBeGreaterThanOrEqual(1);
    expect(links[0]).toHaveAttribute("href", "/products/mug");
  });

  it("lets slots replace the default Badge", () => {
    render(
      <ProductCard
        title="Mug"
        imageSrc="/img.jpg"
        imageAlt="Mug"
        price={9.99}
        badgeLabel="Limited"
        slots={{ Badge: (props) => <Badge {...props} data-testid="custom-badge" /> }}
      />,
    );
    expect(screen.getByTestId("custom-badge")).toHaveTextContent("Limited");
  });

  it("lets classNames reach individual slots", () => {
    render(
      <ProductCard
        title="Mug"
        imageSrc="/img.jpg"
        imageAlt="Mug"
        price={9.99}
        classNames={{ title: "custom-title", cta: "custom-cta" }}
      />,
    );
    expect(screen.getByText("Mug").className).toContain("custom-title");
    expect(screen.getByRole("button", { name: "Add to cart" }).className).toContain("custom-cta");
  });

  it("renders subtitle, rating, and colors count only when given", () => {
    const { rerender } = render(
      <ProductCard title="Mug" imageSrc="/img.jpg" imageAlt="Mug" price={9.99} />,
    );
    expect(screen.queryByRole("img", { name: /Rated/i })).not.toBeInTheDocument();

    rerender(
      <ProductCard
        title="Mug"
        subtitle="Men's Shoes"
        imageSrc="/img.jpg"
        imageAlt="Mug"
        price={9.99}
        rating={4.5}
        ratingCount={1200}
        colorsCount={2}
      />,
    );
    expect(screen.getByText("Men's Shoes")).toBeInTheDocument();
    expect(screen.getByRole("img", { name: /Rated 4.5 out of 5 stars/i })).toBeInTheDocument();
    expect(screen.getByText("2 colors")).toBeInTheDocument();
  });

  it("forwards priceFormatOptions to the Price slot", () => {
    render(
      <ProductCard
        title="Shoe"
        imageSrc="/img.jpg"
        imageAlt="Shoe"
        price={8995}
        currency="INR"
        locale="en-IN"
        priceFormatOptions={{ maximumFractionDigits: 0 }}
      />,
    );
    expect(screen.getByText("₹8,995")).toBeInTheDocument();
  });

  it("shows the wishlist toggle only when onWishlistToggle is given, and forwards clicks", async () => {
    const user = userEvent.setup();
    const onWishlistToggle = vi.fn();
    const { rerender } = render(
      <ProductCard title="Mug" imageSrc="/img.jpg" imageAlt="Mug" price={9.99} />,
    );
    expect(screen.queryByLabelText("Add to wishlist")).not.toBeInTheDocument();

    rerender(
      <ProductCard
        title="Mug"
        imageSrc="/img.jpg"
        imageAlt="Mug"
        price={9.99}
        onWishlistToggle={onWishlistToggle}
      />,
    );
    await user.click(screen.getByLabelText("Add to wishlist"));
    expect(onWishlistToggle).toHaveBeenCalledTimes(1);
  });
});
