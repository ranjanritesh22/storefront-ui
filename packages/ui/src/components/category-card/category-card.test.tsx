import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, describe, expect, it, vi } from "vitest";
import { CategoryCard } from "./category-card";
import { Button } from "../button/button";
import { configureMessages, resetMessages } from "../../i18n/messages";

describe("CategoryCard", () => {
  afterEach(() => {
    resetMessages();
  });

  it("accepts an `image` object as an alternative to imageSrc/imageAlt", () => {
    render(<CategoryCard title="Running Shoes" image={{ src: "/img.jpg", alt: "Running Shoes" }} />);
    expect(screen.getByText("Running Shoes")).toBeInTheDocument();
    expect(screen.getByAltText("Running Shoes")).toBeInTheDocument();
  });

  it("lets imageSrc/imageAlt win over the matching `image` fields", () => {
    render(
      <CategoryCard
        title="Running Shoes"
        image={{ src: "/img.jpg", alt: "Running Shoes" }}
        imageSrc="/override.jpg"
        imageAlt="Override alt"
      />,
    );
    expect(screen.getByAltText("Override alt")).toBeInTheDocument();
  });

  it("reads its default CTA copy from the message dictionary, translatable via configureMessages", () => {
    configureMessages({ categoryCard: { shopNow: "Jetzt einkaufen" } });
    render(<CategoryCard title="Shoes" imageSrc="/img.jpg" imageAlt="Shoes" />);
    expect(screen.getByRole("button", { name: "Jetzt einkaufen" })).toBeInTheDocument();
  });

  it("renders `productCount` via the i18n function only when given", () => {
    const { rerender } = render(<CategoryCard title="Shoes" imageSrc="/img.jpg" imageAlt="Shoes" />);
    expect(screen.queryByText(/products?$/)).not.toBeInTheDocument();

    rerender(<CategoryCard title="Shoes" imageSrc="/img.jpg" imageAlt="Shoes" productCount={42} />);
    expect(screen.getByText("42 products")).toBeInTheDocument();
  });

  it("singularizes the product count for 1", () => {
    render(<CategoryCard title="Shoes" imageSrc="/img.jpg" imageAlt="Shoes" productCount={1} />);
    expect(screen.getByText("1 product")).toBeInTheDocument();
  });

  it("calls onCtaClick when the CTA is clicked and no href is given", async () => {
    const user = userEvent.setup();
    const onCtaClick = vi.fn();
    render(<CategoryCard title="Shoes" imageSrc="/img.jpg" imageAlt="Shoes" onCtaClick={onCtaClick} />);
    await user.click(screen.getByRole("button", { name: "Shop now" }));
    expect(onCtaClick).toHaveBeenCalledTimes(1);
  });

  it("wraps the image, title, and CTA in a link when href is given", () => {
    render(<CategoryCard title="Shoes" imageSrc="/img.jpg" imageAlt="Shoes" href="/categories/shoes" />);
    const links = screen.getAllByRole("link", { name: /shoes|shop now/i });
    expect(links.length).toBeGreaterThanOrEqual(2);
    for (const link of links) {
      expect(link).toHaveAttribute("href", "/categories/shoes");
    }
  });

  it("lets classNames reach individual slots", () => {
    render(
      <CategoryCard
        title="Shoes"
        imageSrc="/img.jpg"
        imageAlt="Shoes"
        classNames={{ title: "custom-title", cta: "custom-cta" }}
      />,
    );
    expect(screen.getByText("Shoes").className).toContain("custom-title");
    expect(screen.getByRole("button", { name: "Shop now" }).className).toContain("custom-cta");
  });

  it("lets slots replace the default Cta", () => {
    render(
      <CategoryCard
        title="Shoes"
        imageSrc="/img.jpg"
        imageAlt="Shoes"
        slots={{ Cta: (props) => <Button {...props} data-testid="custom-cta" /> }}
      />,
    );
    expect(screen.getByTestId("custom-cta")).toHaveTextContent("Shop now");
  });

  it("lets a consumer className win on the root", () => {
    render(<CategoryCard title="Shoes" imageSrc="/img.jpg" imageAlt="Shoes" className="custom-root" />);
    expect(screen.getByText("Shoes").closest(".custom-root")).toBeInTheDocument();
  });
});
