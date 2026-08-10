import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { VisuallyHidden } from "./visually-hidden";

describe("VisuallyHidden", () => {
  it("renders its content in the DOM", () => {
    render(<VisuallyHidden>Screen-reader only text</VisuallyHidden>);
    expect(screen.getByText("Screen-reader only text")).toBeInTheDocument();
  });

  it("clips the content visually via inline style", () => {
    render(<VisuallyHidden data-testid="vh">hidden</VisuallyHidden>);
    const el = screen.getByTestId("vh");
    expect(el).toHaveStyle({ position: "absolute" });
  });
});
