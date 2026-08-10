import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { Backdrop } from "./backdrop";

describe("Backdrop", () => {
  it("is aria-hidden, since it's purely decorative", () => {
    render(<Backdrop data-testid="backdrop" />);
    expect(screen.getByTestId("backdrop")).toHaveAttribute("aria-hidden", "true");
  });

  it("defaults data-state to open", () => {
    render(<Backdrop data-testid="backdrop" />);
    expect(screen.getByTestId("backdrop")).toHaveAttribute("data-state", "open");
  });

  it("sets data-state to closed when open is false", () => {
    render(<Backdrop data-testid="backdrop" open={false} />);
    expect(screen.getByTestId("backdrop")).toHaveAttribute("data-state", "closed");
  });

  it("forwards onClick, for click-to-dismiss overlays", async () => {
    const user = userEvent.setup();
    const onClick = vi.fn();
    render(<Backdrop data-testid="backdrop" onClick={onClick} />);

    await user.click(screen.getByTestId("backdrop"));
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it("lets a consumer className win over the default z-index utility", () => {
    render(<Backdrop data-testid="backdrop" className="z-50" />);
    const classes = screen.getByTestId("backdrop").className.split(/\s+/);
    expect(classes).toContain("z-50");
    expect(classes.some((c) => c.startsWith("z-[var(--ui-z-overlay)]"))).toBe(false);
  });
});
