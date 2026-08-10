import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { SortSelect, type SortOption } from "./sort-select";

const options: SortOption[] = [
  { value: "relevance", label: "Relevance" },
  { value: "price-asc", label: "Price: low to high" },
];

describe("SortSelect", () => {
  it("renders the given options and forwards value changes", async () => {
    const user = userEvent.setup();
    const onValueChange = vi.fn();
    render(<SortSelect options={options} defaultValue="relevance" onValueChange={onValueChange} />);

    const trigger = screen.getByRole("combobox");
    expect(trigger).toHaveTextContent("Relevance");

    await user.click(trigger);
    await user.click(await screen.findByRole("option", { name: "Price: low to high" }));

    expect(onValueChange).toHaveBeenCalledWith("price-asc");
  });

  it("falls back to the 'Sort by' aria-label when no visible label and no explicit aria-label are given", () => {
    render(<SortSelect options={options} />);
    expect(screen.getByRole("combobox", { name: "Sort by" })).toBeInTheDocument();
  });

  it("renders a visible label and associates it via htmlFor/id instead of aria-label when showLabel is set", () => {
    render(<SortSelect options={options} showLabel />);
    const label = document.querySelector("label");
    expect(label).toHaveTextContent("Sort by");
    // The trigger's accessible name now comes from the associated <label>, not a redundant aria-label.
    const trigger = screen.getByRole("combobox", { name: "Sort by" });
    expect(label).toHaveAttribute("for", trigger.id);
  });

  it("lets an explicit aria-label win over the default", () => {
    render(<SortSelect options={options} aria-label="Sort products" />);
    expect(screen.getByRole("combobox", { name: "Sort products" })).toBeInTheDocument();
  });

  it("lets a consumer className win over the default border utility", () => {
    render(<SortSelect options={options} className="border-danger" />);
    const classes = screen.getByRole("combobox").className.split(/\s+/);
    expect(classes).toContain("border-danger");
    expect(classes).not.toContain("border-border");
  });
});
