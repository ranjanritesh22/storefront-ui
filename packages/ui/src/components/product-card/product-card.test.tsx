import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { ProductCard } from "./product-card";
import { Badge } from "../badge/badge";

describe("ProductCard", () => {
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
});
