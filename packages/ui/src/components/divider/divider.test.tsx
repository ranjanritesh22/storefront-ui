import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Divider } from "./divider";

describe("Divider", () => {
  it("is aria-hidden and role='none' by default (decorative)", () => {
    render(<Divider data-testid="divider" />);
    const el = screen.getByTestId("divider");
    expect(el).toHaveAttribute("aria-hidden", "true");
    expect(el).toHaveAttribute("role", "none");
  });

  it("exposes role='separator' when not decorative", () => {
    render(<Divider data-testid="divider" decorative={false} />);
    expect(screen.getByRole("separator")).toBeInTheDocument();
  });

  it("sets aria-orientation only when vertical and semantic", () => {
    render(<Divider data-testid="divider" decorative={false} orientation="vertical" />);
    expect(screen.getByRole("separator")).toHaveAttribute("aria-orientation", "vertical");
  });

  it("applies the orientation class", () => {
    render(<Divider data-testid="divider" orientation="vertical" />);
    expect(screen.getByTestId("divider").className).toContain("w-px");
  });
});
