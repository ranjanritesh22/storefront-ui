import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { FacetGroup, type FacetOption } from "./facet-group";

const sizeOptions: FacetOption[] = [
  { value: "s", label: "Small", count: 12 },
  { value: "m", label: "Medium", count: 30 },
  { value: "l", label: "Large", count: 8 },
];

const manyOptions: FacetOption[] = Array.from({ length: 55 }, (_, index) => ({
  value: `opt-${index}`,
  label: `Option ${index}`,
}));

describe("FacetGroup", () => {
  it("renders the label as a disclosure trigger and the options inside", () => {
    render(<FacetGroup id="size" label="Size" variant="checkbox" options={sizeOptions} />);
    expect(screen.getByRole("button", { name: "Size" })).toBeInTheDocument();
    expect(screen.getByText("Small")).toBeInTheDocument();
    expect(screen.getByText("Medium")).toBeInTheDocument();
  });

  it("is open by default and collapses/expands via the trigger, like a real accordion disclosure", async () => {
    const user = userEvent.setup();
    render(<FacetGroup id="size" label="Size" variant="checkbox" options={sizeOptions} />);
    const trigger = screen.getByRole("button", { name: "Size" });
    expect(trigger).toHaveAttribute("aria-expanded", "true");
    await user.click(trigger);
    expect(trigger).toHaveAttribute("aria-expanded", "false");
    await user.click(trigger);
    expect(trigger).toHaveAttribute("aria-expanded", "true");
  });

  it("checkbox variant: reports the full next selection when an option is toggled", async () => {
    const user = userEvent.setup();
    const onSelectionChange = vi.fn();
    render(
      <FacetGroup
        id="size"
        label="Size"
        variant="checkbox"
        options={sizeOptions}
        selectedValues={["s"]}
        onSelectionChange={onSelectionChange}
      />,
    );
    await user.click(screen.getByRole("checkbox", { name: /Medium/ }));
    expect(onSelectionChange).toHaveBeenCalledWith(["s", "m"]);
  });

  it("radio variant: reports the newly selected value", async () => {
    const user = userEvent.setup();
    const onValueChange = vi.fn();
    render(
      <FacetGroup
        id="color"
        label="Color"
        variant="radio"
        options={[
          { value: "red", label: "Red" },
          { value: "blue", label: "Blue" },
        ]}
        onValueChange={onValueChange}
      />,
    );
    await user.click(screen.getByRole("radio", { name: "Blue" }));
    expect(onValueChange).toHaveBeenCalledWith("blue");
  });

  it("color-swatch variant: renders a toggle button per option with an accessible name including the count", async () => {
    const user = userEvent.setup();
    const onSelectionChange = vi.fn();
    render(
      <FacetGroup
        id="color"
        label="Color"
        variant="color-swatch"
        options={[
          { value: "red", label: "Red", count: 4, colorValue: "#b91c1c" },
          { value: "blue", label: "Blue", count: 2, colorValue: "#1d4ed8" },
        ]}
        selectedValues={[]}
        onSelectionChange={onSelectionChange}
      />,
    );
    const redSwatch = screen.getByRole("checkbox", { name: "Red (4)" });
    await user.click(redSwatch);
    expect(onSelectionChange).toHaveBeenCalledWith(["red"]);
  });

  it("rating variant: renders a star preview per threshold row and reports the selected value", async () => {
    const user = userEvent.setup();
    const onValueChange = vi.fn();
    render(
      <FacetGroup
        id="rating"
        label="Rating"
        variant="rating"
        options={[
          { value: "4", label: "4 stars & up", ratingValue: 4, count: 120 },
          { value: "3", label: "3 stars & up", ratingValue: 3, count: 200 },
        ]}
        onValueChange={onValueChange}
      />,
    );
    await user.click(screen.getByRole("radio", { name: /4 stars & up/ }));
    expect(onValueChange).toHaveBeenCalledWith("4");
  });

  it("price-range variant: renders a RangeSlider instead of an option list", () => {
    render(<FacetGroup id="price" label="Price" variant="price-range" min={0} max={200} rangeValue={[20, 150]} />);
    expect(screen.getAllByRole("slider")).toHaveLength(2);
    expect(screen.queryByRole("checkbox")).not.toBeInTheDocument();
  });

  it("caps the initial render at visibleCount and reveals the rest behind 'show more'", async () => {
    const user = userEvent.setup();
    render(<FacetGroup id="brand" label="Brand" variant="checkbox" options={manyOptions} />);
    expect(screen.getAllByRole("checkbox")).toHaveLength(8);
    const showMore = screen.getByRole("button", { name: "Show 47 more" });
    await user.click(showMore);
    expect(screen.getAllByRole("checkbox")).toHaveLength(55);
    expect(screen.getByRole("button", { name: "Show less" })).toBeInTheDocument();
  });

  it("does not render a 'show more' control when options fit within visibleCount", () => {
    render(<FacetGroup id="size" label="Size" variant="checkbox" options={sizeOptions} />);
    expect(screen.queryByText(/show/i)).not.toBeInTheDocument();
  });

  it("lets classNames reach the option list", () => {
    render(
      <FacetGroup
        id="size"
        label="Size"
        variant="checkbox"
        options={sizeOptions}
        classNames={{ list: "custom-list" }}
      />,
    );
    const trigger = screen.getByRole("button", { name: "Size" });
    const region = document.getElementById(trigger.getAttribute("aria-controls") ?? "");
    expect(within(region as HTMLElement).getByText("Small").closest(".custom-list")).toBeTruthy();
  });
});
