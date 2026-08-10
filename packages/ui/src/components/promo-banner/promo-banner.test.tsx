import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, describe, expect, it, vi } from "vitest";
import { PromoBanner } from "./promo-banner";
import { Button } from "../button/button";
import { configureMessages, resetMessages } from "../../i18n/messages";

describe("PromoBanner", () => {
  afterEach(() => {
    resetMessages();
  });

  it("renders heading and description only when given", () => {
    const { rerender } = render(<PromoBanner heading="Sale" />);
    expect(screen.getByText("Sale")).toBeInTheDocument();
    expect(screen.queryByText("Free shipping over $50")).not.toBeInTheDocument();

    rerender(<PromoBanner heading="Sale" description="Free shipping over $50" />);
    expect(screen.getByText("Free shipping over $50")).toBeInTheDocument();
  });

  it("reads its default CTA copy from the message dictionary, translatable via configureMessages", () => {
    configureMessages({ promoBanner: { cta: "Jetzt einkaufen" } });
    render(<PromoBanner heading="Sale" onCtaClick={() => {}} />);
    expect(screen.getByRole("button", { name: "Jetzt einkaufen" })).toBeInTheDocument();
  });

  it("shows the CTA only when ctaLabel, onCtaClick, or href is given", () => {
    const { rerender } = render(<PromoBanner heading="Sale" />);
    expect(screen.queryByRole("button")).not.toBeInTheDocument();
    expect(screen.queryByRole("link")).not.toBeInTheDocument();

    rerender(<PromoBanner heading="Sale" ctaLabel="Shop now" onCtaClick={() => {}} />);
    expect(screen.getByRole("button", { name: "Shop now" })).toBeInTheDocument();
  });

  it("calls onCtaClick when the CTA button is clicked", async () => {
    const user = userEvent.setup();
    const onCtaClick = vi.fn();
    render(<PromoBanner heading="Sale" ctaLabel="Shop now" onCtaClick={onCtaClick} />);
    await user.click(screen.getByRole("button", { name: "Shop now" }));
    expect(onCtaClick).toHaveBeenCalledTimes(1);
  });

  it("renders the CTA as a link when href is given", () => {
    render(<PromoBanner heading="Sale" ctaLabel="Shop now" href="/sale" />);
    const link = screen.getByRole("link", { name: "Shop now" });
    expect(link).toHaveAttribute("href", "/sale");
  });

  it("renders a background image and scrim only when imageSrc is given", () => {
    const { container, rerender } = render(<PromoBanner heading="Sale" />);
    expect(container.querySelector("img")).not.toBeInTheDocument();

    rerender(<PromoBanner heading="Sale" imageSrc="/banner.jpg" imageAlt="" />);
    expect(container.querySelector("img")).toHaveAttribute("src", "/banner.jpg");
  });

  it("applies the inverted tone's data attribute and lets tone default to 'default'", () => {
    const { container, rerender } = render(<PromoBanner heading="Sale" />);
    expect(container.firstChild).toHaveAttribute("data-tone", "default");

    rerender(<PromoBanner heading="Sale" tone="inverted" />);
    expect(container.firstChild).toHaveAttribute("data-tone", "inverted");
  });

  it("lets classNames reach individual slots", () => {
    render(
      <PromoBanner
        heading="Sale"
        ctaLabel="Shop now"
        onCtaClick={() => {}}
        classNames={{ heading: "custom-heading", cta: "custom-cta" }}
      />,
    );
    expect(screen.getByText("Sale").className).toContain("custom-heading");
    expect(screen.getByRole("button", { name: "Shop now" }).className).toContain("custom-cta");
  });

  it("lets slots replace the default Cta", () => {
    render(
      <PromoBanner
        heading="Sale"
        ctaLabel="Shop now"
        onCtaClick={() => {}}
        slots={{ Cta: (props) => <Button {...props} data-testid="custom-cta" /> }}
      />,
    );
    expect(screen.getByTestId("custom-cta")).toHaveTextContent("Shop now");
  });

  it("lets a consumer className win on the root", () => {
    const { container } = render(<PromoBanner heading="Sale" className="custom-root" />);
    expect(container.firstChild).toHaveClass("custom-root");
  });
});
