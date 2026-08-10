import { act, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { Toaster } from "./toast";
import { toast, clearToasts } from "../../hooks/use-toast";

beforeEach(() => {
  vi.useFakeTimers({ shouldAdvanceTime: true });
});

afterEach(() => {
  act(() => clearToasts());
  vi.useRealTimers();
});

describe("Toaster", () => {
  it("renders a region that starts empty", () => {
    render(<Toaster />);
    expect(screen.getByRole("region", { name: "Notifications" })).toBeInTheDocument();
  });

  it("renders a toast enqueued via toast(), with role=status for non-danger variants", () => {
    render(<Toaster />);

    act(() => {
      toast({ title: "Added to cart", description: "Running shoes, size 10" });
    });

    expect(screen.getByRole("status")).toBeInTheDocument();
    expect(screen.getByText("Added to cart")).toBeInTheDocument();
    expect(screen.getByText("Running shoes, size 10")).toBeInTheDocument();
  });

  it("uses role=alert for the danger variant", () => {
    render(<Toaster />);

    act(() => {
      toast({ title: "Payment failed", variant: "danger" });
    });

    expect(screen.getByRole("alert")).toBeInTheDocument();
  });

  it("renders an action button and calls its handler", async () => {
    const user = userEvent.setup({ advanceTimers: vi.advanceTimersByTime });
    render(<Toaster />);
    const onClick = vi.fn();

    act(() => {
      toast({ title: "Item removed", action: { label: "Undo", onClick } });
    });

    await user.click(screen.getByRole("button", { name: "Undo" }));
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it("dismisses on close button click", async () => {
    const user = userEvent.setup({ advanceTimers: vi.advanceTimersByTime });
    render(<Toaster />);

    act(() => {
      toast({ id: "closable", title: "Closable", duration: Infinity });
    });
    expect(screen.getByText("Closable")).toBeInTheDocument();

    await user.click(screen.getByRole("button", { name: "Dismiss notification" }));
    act(() => {
      vi.advanceTimersByTime(200);
    });
    expect(screen.queryByText("Closable")).not.toBeInTheDocument();
  });

  it("auto-dismisses after its duration", () => {
    render(<Toaster />);

    act(() => {
      toast({ title: "Auto", duration: 1000 });
    });
    expect(screen.getByText("Auto")).toBeInTheDocument();

    act(() => {
      vi.advanceTimersByTime(1200);
    });
    expect(screen.queryByText("Auto")).not.toBeInTheDocument();
  });

  it("keeps only the newest toasts once the queue exceeds its limit", () => {
    render(<Toaster />);

    act(() => {
      for (let i = 0; i < 6; i += 1) {
        toast({ id: `t${i}`, title: `Toast ${i}`, duration: Infinity });
      }
    });

    expect(screen.queryByText("Toast 0")).not.toBeInTheDocument();
    expect(screen.getByText("Toast 5")).toBeInTheDocument();
  });
});
