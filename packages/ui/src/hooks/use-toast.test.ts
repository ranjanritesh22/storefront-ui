import { act, renderHook } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { useToast, toast, dismissToast, clearToasts } from "./use-toast";

beforeEach(() => {
  vi.useFakeTimers();
});

afterEach(() => {
  act(() => clearToasts());
  vi.useRealTimers();
});

describe("useToast", () => {
  it("starts empty and reflects toasts enqueued via the standalone toast() function", () => {
    const { result } = renderHook(() => useToast());
    expect(result.current.toasts).toEqual([]);

    act(() => {
      toast({ title: "Added to cart" });
    });

    expect(result.current.toasts).toHaveLength(1);
    expect(result.current.toasts[0].title).toBe("Added to cart");
    expect(result.current.toasts[0].open).toBe(true);
  });

  it("newest toast is queued first", () => {
    const { result } = renderHook(() => useToast());

    act(() => {
      toast({ id: "first", title: "First" });
      toast({ id: "second", title: "Second" });
    });

    expect(result.current.toasts.map((t) => t.id)).toEqual(["second", "first"]);
  });

  it("drops the oldest toast once the queue exceeds the limit", () => {
    const { result } = renderHook(() => useToast());

    act(() => {
      for (let i = 0; i < 6; i += 1) {
        toast({ id: `t${i}`, title: `Toast ${i}` });
      }
    });

    expect(result.current.toasts).toHaveLength(4);
    expect(result.current.toasts.map((t) => t.id)).toEqual(["t5", "t4", "t3", "t2"]);
  });

  it("auto-dismisses after its duration elapses", () => {
    const { result } = renderHook(() => useToast());

    act(() => {
      toast({ id: "auto", title: "Auto-dismiss", duration: 3000 });
    });
    expect(result.current.toasts).toHaveLength(1);

    act(() => {
      vi.advanceTimersByTime(3000);
    });
    // duration elapsed → open flips false, then removed after the exit transition
    act(() => {
      vi.advanceTimersByTime(200);
    });
    expect(result.current.toasts).toHaveLength(0);
  });

  it("never auto-dismisses when duration is Infinity", () => {
    const { result } = renderHook(() => useToast());

    act(() => {
      toast({ id: "sticky", title: "Sticky", duration: Infinity });
      vi.advanceTimersByTime(60_000);
    });

    expect(result.current.toasts).toHaveLength(1);
  });

  it("dismiss() flips open to false before removal", () => {
    const { result } = renderHook(() => useToast());

    act(() => {
      toast({ id: "dismiss-me", title: "Dismiss me" });
    });
    act(() => {
      dismissToast("dismiss-me");
    });
    expect(result.current.toasts[0].open).toBe(false);

    act(() => {
      vi.advanceTimersByTime(200);
    });
    expect(result.current.toasts).toHaveLength(0);
  });

  it("reusing an id updates the existing toast in place instead of enqueuing a new one", () => {
    const { result } = renderHook(() => useToast());

    act(() => {
      toast({ id: "progress", title: "Uploading…" });
    });
    act(() => {
      toast({ id: "progress", title: "Upload complete", variant: "success" });
    });

    expect(result.current.toasts).toHaveLength(1);
    expect(result.current.toasts[0].title).toBe("Upload complete");
  });
});
