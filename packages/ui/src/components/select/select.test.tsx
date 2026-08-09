import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { Select } from "./select";

const options = [
  { value: "popularity", label: "Popularity" },
  { value: "price-asc", label: "Price: low to high" },
];

describe("Select", () => {
  it("renders the given options and forwards value changes", async () => {
    const user = userEvent.setup();
    const onValueChange = vi.fn();
    render(
      <Select aria-label="Sort by" options={options} defaultValue="popularity" onValueChange={onValueChange} />,
    );

    const trigger = screen.getByRole("combobox", { name: "Sort by" });
    expect(trigger).toHaveTextContent("Popularity");

    await user.click(trigger);
    await user.click(await screen.findByRole("option", { name: "Price: low to high" }));

    expect(onValueChange).toHaveBeenCalledWith("price-asc");
  });

  it("supports full keyboard operation", async () => {
    const user = userEvent.setup();
    const onValueChange = vi.fn();
    render(<Select aria-label="Sort by" options={options} onValueChange={onValueChange} />);

    await user.tab();
    expect(screen.getByRole("combobox", { name: "Sort by" })).toHaveFocus();

    await user.keyboard("{Enter}");
    expect(await screen.findByRole("listbox")).toBeInTheDocument();

    // With no value selected, Radix highlights the first option on open — Enter selects it directly.
    await user.keyboard("{Enter}");
    expect(onValueChange).toHaveBeenCalledWith("popularity");
  });

  it("sets data-invalid and aria-invalid when invalid", () => {
    render(<Select aria-label="Size" options={options} invalid />);
    const trigger = screen.getByRole("combobox", { name: "Size" });
    expect(trigger).toHaveAttribute("data-invalid", "true");
    expect(trigger).toHaveAttribute("aria-invalid", "true");
  });

  it("lets a consumer className win over the default border utility", () => {
    render(<Select aria-label="Sort by" options={options} className="border-danger" />);
    const classes = screen.getByRole("combobox", { name: "Sort by" }).className.split(/\s+/);
    expect(classes).toContain("border-danger");
    expect(classes).not.toContain("border-border");
  });

  it("renders grouped options under a label", async () => {
    const user = userEvent.setup();
    render(
      <Select
        aria-label="Category"
        options={[{ label: "Shoes", options: [{ value: "running", label: "Running" }] }]}
      />,
    );

    await user.click(screen.getByRole("combobox", { name: "Category" }));
    expect(await screen.findByText("Shoes")).toBeInTheDocument();
    expect(screen.getByRole("option", { name: "Running" })).toBeInTheDocument();
  });
});
