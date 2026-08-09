import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Rating } from "./rating";

describe("Rating", () => {
  it("exposes the value and max via an accessible label", () => {
    render(<Rating value={4.5} />);
    expect(screen.getByRole("img", { name: /Rated 4.5 out of 5 stars/i })).toBeInTheDocument();
  });

  it("renders one star per max, clamped to the given value", () => {
    const { container } = render(<Rating value={3} max={5} />);
    const stars = container.querySelectorAll('[aria-hidden="true"] > span');
    expect(stars).toHaveLength(5);
  });

  it("formats and parenthesizes the review count", () => {
    render(<Rating value={4.5} count={1234} />);
    expect(screen.getByText("(1.2K)")).toBeInTheDocument();
  });

  it("clamps out-of-range values into the label", () => {
    render(<Rating value={7} max={5} />);
    expect(screen.getByRole("img", { name: /Rated 5 out of 5 stars/i })).toBeInTheDocument();
  });
});
