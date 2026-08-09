import { act, renderHook } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { useQuantity } from "./use-quantity";

describe("useQuantity", () => {
  it("defaults to 1 and increments/decrements by step", () => {
    const { result } = renderHook(() => useQuantity());
    expect(result.current.value).toBe(1);

    act(() => result.current.increment());
    expect(result.current.value).toBe(2);

    act(() => result.current.decrement());
    expect(result.current.value).toBe(1);
  });

  it("clamps to min and reports canDecrement/canIncrement", () => {
    const { result } = renderHook(() => useQuantity({ defaultValue: 1, min: 1, max: 2 }));
    expect(result.current.canDecrement).toBe(false);

    act(() => result.current.decrement());
    expect(result.current.value).toBe(1);

    act(() => result.current.increment());
    expect(result.current.canIncrement).toBe(false);

    act(() => result.current.increment());
    expect(result.current.value).toBe(2);
  });

  it("mirrors a controlled value instead of owning state", () => {
    const onChange = vi.fn();
    const { result, rerender } = renderHook(
      ({ value }) => useQuantity({ value, onChange }),
      { initialProps: { value: 3 } },
    );
    expect(result.current.value).toBe(3);

    act(() => result.current.increment());
    expect(onChange).toHaveBeenCalledWith(4);
    // Controlled: internal value doesn't change until the prop does.
    expect(result.current.value).toBe(3);

    rerender({ value: 4 });
    expect(result.current.value).toBe(4);
  });

  it("ignores NaN from setValue", () => {
    const { result } = renderHook(() => useQuantity({ defaultValue: 5 }));
    act(() => result.current.setValue(Number("not-a-number")));
    expect(result.current.value).toBe(5);
  });
});
