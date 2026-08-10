import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { ProgressBar } from "./progress-bar";

describe("ProgressBar", () => {
  it("exposes role=progressbar with correct aria values", () => {
    render(<ProgressBar value={40} max={100} />);
    const bar = screen.getByRole("progressbar", { name: "Progress" });
    expect(bar).toHaveAttribute("aria-valuemin", "0");
    expect(bar).toHaveAttribute("aria-valuemax", "100");
    expect(bar).toHaveAttribute("aria-valuenow", "40");
  });

  it("clamps the fill width between 0 and 100 percent", () => {
    render(<ProgressBar value={150} max={100} />);
    const fill = screen.getByRole("progressbar").firstChild as HTMLElement;
    expect(fill.style.width).toBe("100%");
  });

  it("omits aria-valuenow when indeterminate", () => {
    render(<ProgressBar indeterminate />);
    expect(screen.getByRole("progressbar")).not.toHaveAttribute("aria-valuenow");
  });

  it("renders the rounded percentage when showValue is set", () => {
    render(<ProgressBar value={33} showValue />);
    expect(screen.getByText("33%")).toBeInTheDocument();
  });

  it("accepts a custom aria-label", () => {
    render(<ProgressBar value={10} label="Upload progress" />);
    expect(screen.getByRole("progressbar", { name: "Upload progress" })).toBeInTheDocument();
  });

  it("lets a consumer className win over the default gap utility", () => {
    render(<ProgressBar value={10} className="gap-4" />);
    const classes = screen.getByRole("progressbar").parentElement!.className.split(/\s+/);
    expect(classes).toContain("gap-4");
    expect(classes).not.toContain("gap-2");
  });
});
