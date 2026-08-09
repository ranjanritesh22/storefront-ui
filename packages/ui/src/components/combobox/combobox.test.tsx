import { render, screen, waitFor, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { Combobox, type ComboboxOption } from "./combobox";

const brands: ComboboxOption[] = [
  { value: "nike", label: "Nike" },
  { value: "adidas", label: "Adidas" },
  { value: "puma", label: "Puma", disabled: true },
  { value: "new-balance", label: "New Balance" },
];

describe("Combobox", () => {
  it("opens on focus and lists every option before typing narrows it", async () => {
    const user = userEvent.setup();
    render(<Combobox aria-label="Brand" options={brands} />);

    await user.click(screen.getByRole("combobox", { name: "Brand" }));
    expect(await screen.findByRole("listbox")).toBeInTheDocument();
    expect(screen.getAllByRole("option")).toHaveLength(4);
  });

  it("filters options as the user types and announces the result count", async () => {
    const user = userEvent.setup();
    render(<Combobox aria-label="Brand" options={brands} />);

    const input = screen.getByRole("combobox", { name: "Brand" });
    await user.type(input, "ni");

    const listbox = await screen.findByRole("listbox");
    expect(within(listbox).getAllByRole("option")).toHaveLength(1);
    expect(within(listbox).getByRole("option", { name: "Nike" })).toBeInTheDocument();
    expect(screen.getByRole("status")).toHaveTextContent("1 result available");
  });

  it("shows the empty message when nothing matches", async () => {
    const user = userEvent.setup();
    render(<Combobox aria-label="Brand" options={brands} />);

    const input = screen.getByRole("combobox", { name: "Brand" });
    await user.type(input, "zzz");

    expect(await screen.findByText("No results found")).toBeInTheDocument();
  });

  it("moves aria-activedescendant with ArrowDown and selects with Enter, skipping disabled options", async () => {
    const user = userEvent.setup();
    const onValueChange = vi.fn();
    render(<Combobox aria-label="Brand" options={brands} onValueChange={onValueChange} />);

    const input = screen.getByRole("combobox", { name: "Brand" });
    await user.click(input);
    await screen.findByRole("listbox");

    await user.keyboard("{ArrowDown}");
    let activeId = input.getAttribute("aria-activedescendant");
    expect(activeId).toBeTruthy();
    expect(document.getElementById(activeId!)).toHaveTextContent("Nike");

    await user.keyboard("{ArrowDown}");
    await user.keyboard("{ArrowDown}");
    activeId = input.getAttribute("aria-activedescendant");
    // Puma (index 2) is disabled, so the third ArrowDown press lands on New Balance.
    expect(document.getElementById(activeId!)).toHaveTextContent("New Balance");

    await user.keyboard("{Enter}");
    expect(onValueChange).toHaveBeenCalledWith("new-balance", brands[3]);
    expect(input).toHaveValue("New Balance");
  });

  it("closes on Escape and reverts unsaved query text to the current selection", async () => {
    const user = userEvent.setup();
    render(<Combobox aria-label="Brand" options={brands} defaultValue="nike" />);

    const input = screen.getByRole("combobox", { name: "Brand" });
    expect(input).toHaveValue("Nike");

    await user.click(input);
    await user.keyboard("xyz");
    expect((input as HTMLInputElement).value).toContain("xyz");

    await user.keyboard("{Escape}");
    expect(input).toHaveValue("Nike");
    expect(screen.queryByRole("listbox")).not.toBeInTheDocument();
  });

  it("clears the selection via the clear button", async () => {
    const user = userEvent.setup();
    const onValueChange = vi.fn();
    render(<Combobox aria-label="Brand" options={brands} defaultValue="nike" onValueChange={onValueChange} />);

    await user.click(screen.getByRole("button", { name: "Clear selection" }));
    expect(onValueChange).toHaveBeenCalledWith(null, null);
    expect(screen.getByRole("combobox", { name: "Brand" })).toHaveValue("");
  });

  it("supports async loadOptions with a loading state", async () => {
    const user = userEvent.setup();
    const loadOptions = vi.fn(
      (query: string) =>
        new Promise<ComboboxOption[]>((resolve) =>
          setTimeout(() => resolve(brands.filter((b) => b.label.toLowerCase().includes(query.toLowerCase()))), 5),
        ),
    );
    render(<Combobox aria-label="Brand" loadOptions={loadOptions} debounceMs={5} />);

    await user.click(screen.getByRole("combobox", { name: "Brand" }));
    expect(screen.getByRole("status")).toHaveTextContent("Loading options…");

    await waitFor(() => expect(loadOptions).toHaveBeenCalledWith(""));
    await waitFor(() => expect(screen.getAllByRole("option")).toHaveLength(4));
  });

  it("sets data-invalid and aria-invalid when invalid", () => {
    render(<Combobox aria-label="Brand" options={brands} invalid />);
    const input = screen.getByRole("combobox", { name: "Brand" });
    expect(input).toHaveAttribute("data-invalid", "true");
    expect(input).toHaveAttribute("aria-invalid", "true");
  });

  it("lets a consumer className win over the default border utility", () => {
    render(<Combobox aria-label="Brand" options={brands} className="border-danger" />);
    const classes = screen.getByRole("combobox", { name: "Brand" }).className.split(/\s+/);
    expect(classes).toContain("border-danger");
    expect(classes).not.toContain("border-border");
  });
});
