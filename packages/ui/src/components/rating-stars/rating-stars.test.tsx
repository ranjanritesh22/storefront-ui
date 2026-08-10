import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { RatingStars } from "./rating-stars";

describe("RatingStars — read-only mode", () => {
  it("renders as a non-interactive role=img with a descriptive aria-label", () => {
    render(<RatingStars value={4.5} max={5} readOnly />);
    const img = screen.getByRole("img", { name: "Rated 4.5 out of 5 stars" });
    expect(img).toBeInTheDocument();
    expect(screen.queryByRole("radio")).not.toBeInTheDocument();
  });

  it("renders max stars regardless of value", () => {
    render(<RatingStars value={2} max={5} readOnly />);
    // 5 stars, each rendered as two overlaid <svg> (empty track + filled overlay).
    expect(document.querySelectorAll("svg")).toHaveLength(10);
  });
});

describe("RatingStars — interactive mode", () => {
  it("renders a radiogroup of radio stars with the current value checked", () => {
    render(<RatingStars value={3} max={5} />);
    expect(screen.getByRole("radiogroup", { name: "Rating" })).toBeInTheDocument();
    expect(screen.getAllByRole("radio")).toHaveLength(5);
    expect(screen.getByRole("radio", { name: "Rate 3 out of 5 stars" })).toHaveAttribute("aria-checked", "true");
    expect(screen.getByRole("radio", { name: "Rate 4 out of 5 stars" })).toHaveAttribute("aria-checked", "false");
  });

  it("commits a new value on click", async () => {
    const user = userEvent.setup();
    const onValueChange = vi.fn();
    render(<RatingStars value={2} max={5} onValueChange={onValueChange} />);

    await user.click(screen.getByRole("radio", { name: "Rate 5 out of 5 stars" }));
    expect(onValueChange).toHaveBeenCalledWith(5);
  });

  it("previews on hover without committing", async () => {
    const user = userEvent.setup();
    const onValueChange = vi.fn();
    render(<RatingStars value={2} max={5} onValueChange={onValueChange} />);

    await user.hover(screen.getByRole("radio", { name: "Rate 5 out of 5 stars" }));
    expect(onValueChange).not.toHaveBeenCalled();

    await user.unhover(screen.getByRole("radio", { name: "Rate 5 out of 5 stars" }));
    expect(onValueChange).not.toHaveBeenCalled();
  });

  it("supports keyboard operation: arrows change value, Home/End jump to min/max", async () => {
    const user = userEvent.setup();
    const onValueChange = vi.fn();
    render(<RatingStars value={3} max={5} onValueChange={onValueChange} />);

    await user.tab();
    expect(screen.getByRole("radio", { name: "Rate 3 out of 5 stars" })).toHaveFocus();

    await user.keyboard("{ArrowRight}");
    expect(onValueChange).toHaveBeenLastCalledWith(4);

    await user.keyboard("{ArrowLeft}");
    expect(onValueChange).toHaveBeenLastCalledWith(2);

    await user.keyboard("{End}");
    expect(onValueChange).toHaveBeenLastCalledWith(5);

    await user.keyboard("{Home}");
    expect(onValueChange).toHaveBeenLastCalledWith(1);
  });

  it("only the star matching the current value is a tab stop (roving tabindex)", () => {
    render(<RatingStars value={3} max={5} />);
    const radios = screen.getAllByRole("radio");
    expect(radios[2]).toHaveAttribute("tabindex", "0");
    expect(radios[0]).toHaveAttribute("tabindex", "-1");
    expect(radios[4]).toHaveAttribute("tabindex", "-1");
  });

  it("disables every star and blocks keyboard commits when disabled", async () => {
    const user = userEvent.setup();
    const onValueChange = vi.fn();
    render(<RatingStars value={3} max={5} disabled onValueChange={onValueChange} />);

    for (const radio of screen.getAllByRole("radio")) {
      expect(radio).toBeDisabled();
    }
    await user.click(screen.getByRole("radio", { name: "Rate 5 out of 5 stars" }));
    expect(onValueChange).not.toHaveBeenCalled();
  });

  it("lets a consumer className win over a default utility", () => {
    render(<RatingStars value={3} max={5} className="gap-4" />);
    const classes = screen.getByRole("radiogroup").className.split(/\s+/);
    expect(classes).toContain("gap-4");
    expect(classes).not.toContain("gap-0.5");
  });
});
