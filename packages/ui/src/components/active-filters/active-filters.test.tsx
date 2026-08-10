import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { ActiveFilters, type ActiveFilter } from "./active-filters";

const filters: ActiveFilter[] = [
  { id: "size-m", label: "Size: M" },
  { id: "color-red", label: "Color: Red" },
];

describe("ActiveFilters", () => {
  it("renders one chip per filter", () => {
    render(<ActiveFilters filters={filters} onRemove={vi.fn()} />);
    expect(screen.getByText("Size: M")).toBeInTheDocument();
    expect(screen.getByText("Color: Red")).toBeInTheDocument();
    expect(screen.getAllByRole("listitem")).toHaveLength(2);
  });

  it("renders nothing when there are no filters", () => {
    const { container } = render(<ActiveFilters filters={[]} onRemove={vi.fn()} />);
    expect(container).toBeEmptyDOMElement();
  });

  it("calls onRemove with the filter's id, and gives its remove button a real aria-label", async () => {
    const user = userEvent.setup();
    const onRemove = vi.fn();
    render(<ActiveFilters filters={filters} onRemove={onRemove} />);
    const removeButton = screen.getByRole("button", { name: "Remove Size: M filter" });
    await user.click(removeButton);
    expect(onRemove).toHaveBeenCalledWith("size-m");
  });

  it("shows a 'clear all' action only when onClearAll is given, and calls it on click", async () => {
    const user = userEvent.setup();
    const onClearAll = vi.fn();
    const { rerender } = render(<ActiveFilters filters={filters} onRemove={vi.fn()} />);
    expect(screen.queryByRole("button", { name: "Clear all" })).not.toBeInTheDocument();

    rerender(<ActiveFilters filters={filters} onRemove={vi.fn()} onClearAll={onClearAll} />);
    const clearAll = screen.getByRole("button", { name: "Clear all" });
    await user.click(clearAll);
    expect(onClearAll).toHaveBeenCalledTimes(1);
  });

  it("lets an explicit removeLabel win over the message dictionary", () => {
    render(<ActiveFilters filters={filters} onRemove={vi.fn()} removeLabel={(label) => `Dismiss ${label}`} />);
    expect(screen.getByRole("button", { name: "Dismiss Size: M" })).toBeInTheDocument();
  });

  it("lets classNames reach a chip", () => {
    render(<ActiveFilters filters={filters} onRemove={vi.fn()} classNames={{ chip: "custom-chip" }} />);
    expect(document.querySelectorAll(".custom-chip")).toHaveLength(2);
  });
});
