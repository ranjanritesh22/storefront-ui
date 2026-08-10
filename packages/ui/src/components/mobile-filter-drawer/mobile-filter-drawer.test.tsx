import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { MobileFilterDrawer } from "./mobile-filter-drawer";
import type { FacetGroupData } from "../facet-panel/facet-panel";

const groups: FacetGroupData[] = [
  {
    id: "size",
    label: "Size",
    variant: "checkbox",
    options: [
      { value: "s", label: "Small" },
      { value: "m", label: "Medium" },
    ],
    selectedValues: [],
  },
];

describe("MobileFilterDrawer", () => {
  it("is closed until the trigger opens it, then shows the title and the facet panel", async () => {
    const user = userEvent.setup();
    render(<MobileFilterDrawer trigger={<button type="button">Filter</button>} groups={groups} />);

    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();

    await user.click(screen.getByRole("button", { name: "Filter" }));
    expect(await screen.findByRole("dialog")).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Filters" })).toBeInTheDocument();
    expect(screen.getByText("Small")).toBeInTheDocument();
  });

  it("uses a custom title when given", async () => {
    const user = userEvent.setup();
    render(
      <MobileFilterDrawer trigger={<button type="button">Filter</button>} groups={groups} title="Refine results" />,
    );
    await user.click(screen.getByRole("button", { name: "Filter" }));
    expect(await screen.findByRole("heading", { name: "Refine results" })).toBeInTheDocument();
  });

  it("calls onApply and closes the drawer when the primary action is pressed", async () => {
    const user = userEvent.setup();
    const onApply = vi.fn();
    render(
      <MobileFilterDrawer
        trigger={<button type="button">Filter</button>}
        groups={groups}
        onApply={onApply}
      />,
    );
    await user.click(screen.getByRole("button", { name: "Filter" }));
    await screen.findByRole("dialog");

    await user.click(screen.getByRole("button", { name: "Apply" }));
    expect(onApply).toHaveBeenCalledTimes(1);
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });

  it("shows the result count in the primary action's label when given", async () => {
    const user = userEvent.setup();
    render(<MobileFilterDrawer trigger={<button type="button">Filter</button>} groups={groups} resultCount={128} />);
    await user.click(screen.getByRole("button", { name: "Filter" }));
    expect(await screen.findByRole("button", { name: "Show 128 results" })).toBeInTheDocument();
  });

  it("shows a 'clear all' action only when onClearAll is given", async () => {
    const user = userEvent.setup();
    const onClearAll = vi.fn();
    render(
      <MobileFilterDrawer
        trigger={<button type="button">Filter</button>}
        groups={groups}
        onClearAll={onClearAll}
      />,
    );
    await user.click(screen.getByRole("button", { name: "Filter" }));
    const clearAll = await screen.findByRole("button", { name: "Clear all" });
    await user.click(clearAll);
    expect(onClearAll).toHaveBeenCalledTimes(1);
  });

  it("does not render a 'clear all' action when onClearAll is omitted", async () => {
    const user = userEvent.setup();
    render(<MobileFilterDrawer trigger={<button type="button">Filter</button>} groups={groups} />);
    await user.click(screen.getByRole("button", { name: "Filter" }));
    await screen.findByRole("dialog");
    expect(screen.queryByRole("button", { name: "Clear all" })).not.toBeInTheDocument();
  });
});
