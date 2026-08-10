import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { FacetPanel, FacetPanelSkeleton, type FacetGroupData } from "./facet-panel";

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
  {
    id: "color",
    label: "Color",
    variant: "radio",
    options: [
      { value: "red", label: "Red" },
      { value: "blue", label: "Blue" },
    ],
  },
];

describe("FacetPanel", () => {
  it("renders one FacetGroup per entry in `groups`", () => {
    render(<FacetPanel groups={groups} />);
    expect(screen.getByRole("button", { name: "Size" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Color" })).toBeInTheDocument();
    expect(screen.getByText("Small")).toBeInTheDocument();
    expect(screen.getByRole("radio", { name: "Red" })).toBeInTheDocument();
  });

  it("shows the heading only when given", () => {
    // Note: each FacetGroup's own AccordionTrigger renders inside an <h3>, so
    // this asserts absence of the *named* panel heading, not of any heading.
    const { rerender } = render(<FacetPanel groups={groups} />);
    expect(screen.queryByRole("heading", { name: "Filters" })).not.toBeInTheDocument();
    rerender(<FacetPanel groups={groups} heading="Filters" />);
    expect(screen.getByRole("heading", { name: "Filters" })).toBeInTheDocument();
  });

  it("shows a 'clear all' action only when onClearAll is given, and calls it on click", async () => {
    const user = userEvent.setup();
    const onClearAll = vi.fn();
    render(<FacetPanel groups={groups} onClearAll={onClearAll} />);
    const button = screen.getByRole("button", { name: "Clear all" });
    await user.click(button);
    expect(onClearAll).toHaveBeenCalledTimes(1);
  });

  it("does not render a 'clear all' action when onClearAll is omitted", () => {
    render(<FacetPanel groups={groups} />);
    expect(screen.queryByRole("button", { name: "Clear all" })).not.toBeInTheDocument();
  });

  it("lets classNames reach a group", () => {
    render(<FacetPanel groups={groups} classNames={{ group: "custom-group" }} />);
    expect(document.querySelector(".custom-group")).toBeInTheDocument();
  });

  it("lets a slot swap the group renderer", () => {
    render(
      <FacetPanel
        groups={groups}
        slots={{
          Group: ({ label }) => <div data-fake-group="true">{label}</div>,
        }}
      />,
    );
    expect(document.querySelectorAll('[data-fake-group="true"]')).toHaveLength(2);
  });
});

describe("FacetPanelSkeleton", () => {
  it("renders the requested number of placeholder groups, hidden from assistive tech", () => {
    const { container } = render(<FacetPanelSkeleton groupCount={3} />);
    const root = container.firstChild as HTMLElement;
    expect(root).toHaveAttribute("aria-hidden", "true");
    expect(root.querySelectorAll(":scope > div")).toHaveLength(3);
  });

  it("defaults to 4 placeholder groups", () => {
    const { container } = render(<FacetPanelSkeleton />);
    const root = container.firstChild as HTMLElement;
    expect(root.querySelectorAll(":scope > div")).toHaveLength(4);
  });
});
