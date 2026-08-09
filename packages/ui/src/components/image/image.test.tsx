import { render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";
import { Image, configureImageComponent, resetImageComponent, type StorefrontImageProps } from "./image";

describe("Image", () => {
  afterEach(() => {
    resetImageComponent();
  });

  it("renders a plain <img> by default", () => {
    render(<Image src="/shoe.jpg" alt="Running shoe" />);
    const img = screen.getByRole("img", { name: "Running shoe" });
    expect(img.tagName).toBe("IMG");
    expect(img).toHaveAttribute("src", "/shoe.jpg");
  });

  it("defaults to lazy loading, eager when priority is set", () => {
    const { rerender } = render(<Image src="/a.jpg" alt="a" />);
    expect(screen.getByRole("img")).toHaveAttribute("loading", "lazy");
    rerender(<Image src="/a.jpg" alt="a" priority />);
    expect(screen.getByRole("img")).toHaveAttribute("loading", "eager");
  });

  it("lets className win alongside the objectFit variant classes", () => {
    render(<Image src="/a.jpg" alt="a" className="rounded-lg" />);
    expect(screen.getByRole("img").className).toContain("rounded-lg");
  });

  it("configureImageComponent routes every <Image> through the registered component", () => {
    function CustomImage({ src, alt }: StorefrontImageProps) {
      return <img data-testid="custom-image" src={src} alt={alt} />;
    }
    configureImageComponent(CustomImage);
    render(<Image src="/shoe.jpg" alt="Running shoe" />);
    expect(screen.getByTestId("custom-image")).toBeInTheDocument();
  });

  it("resetImageComponent restores the <img> fallback", () => {
    configureImageComponent(() => <div data-testid="custom-image" />);
    resetImageComponent();
    render(<Image src="/shoe.jpg" alt="Running shoe" />);
    expect(screen.queryByTestId("custom-image")).not.toBeInTheDocument();
    expect(screen.getByRole("img", { name: "Running shoe" })).toBeInTheDocument();
  });
});
