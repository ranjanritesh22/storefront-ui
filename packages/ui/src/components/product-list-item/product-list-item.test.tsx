import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { ProductListItem } from "./product-list-item";

describe("ProductListItem", () => {
  it("renders as a horizontal ProductCard", () => {
    render(<ProductListItem title="Mug" imageSrc="/img.jpg" imageAlt="Mug" price={9.99} />);
    expect(screen.getByText("Mug").closest("[data-orientation]")).toHaveAttribute(
      "data-orientation",
      "horizontal",
    );
  });

  it("applies the size variant to the image column width, with classNames.image still able to win", () => {
    const { rerender, container } = render(
      <ProductListItem title="Mug" imageSrc="/img.jpg" imageAlt="Mug" price={9.99} size="sm" />,
    );
    expect(container.querySelector(".w-20")).toBeInTheDocument();

    rerender(
      <ProductListItem
        title="Mug"
        imageSrc="/img.jpg"
        imageAlt="Mug"
        price={9.99}
        size="sm"
        classNames={{ image: "w-64" }}
      />,
    );
    expect(container.querySelector(".w-64")).toBeInTheDocument();
    expect(container.querySelector(".w-20")).not.toBeInTheDocument();
  });

  it("renders the price and CTA like ProductCard", () => {
    render(<ProductListItem title="Mug" imageSrc="/img.jpg" imageAlt="Mug" price={9.99} />);
    expect(screen.getByText("$9.99")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Add to cart" })).toBeInTheDocument();
  });
});
