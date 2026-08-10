import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { ViewToggle } from "./view-toggle";

describe("ViewToggle", () => {
  it("defaults to grid view and marks it checked", () => {
    render(<ViewToggle />);
    expect(screen.getByRole("radio", { name: "Grid view" })).toHaveAttribute("aria-checked", "true");
    expect(screen.getByRole("radio", { name: "List view" })).toHaveAttribute("aria-checked", "false");
  });

  it("switches view on click and calls onValueChange", async () => {
    const user = userEvent.setup();
    const onValueChange = vi.fn();
    render(<ViewToggle defaultValue="grid" onValueChange={onValueChange} />);

    await user.click(screen.getByRole("radio", { name: "List view" }));

    expect(onValueChange).toHaveBeenCalledWith("list");
    expect(screen.getByRole("radio", { name: "List view" })).toHaveAttribute("data-state", "active");
    expect(screen.getByRole("radio", { name: "Grid view" })).toHaveAttribute("data-state", "inactive");
  });

  it("supports full keyboard operation via roving tabindex", async () => {
    const user = userEvent.setup();
    const onValueChange = vi.fn();
    render(<ViewToggle defaultValue="grid" onValueChange={onValueChange} />);

    const gridButton = screen.getByRole("radio", { name: "Grid view" });
    const listButton = screen.getByRole("radio", { name: "List view" });
    expect(gridButton).toHaveAttribute("tabindex", "0");
    expect(listButton).toHaveAttribute("tabindex", "-1");

    await user.tab();
    expect(gridButton).toHaveFocus();

    await user.keyboard("{ArrowRight}");
    expect(onValueChange).toHaveBeenCalledWith("list");
    expect(listButton).toHaveFocus();
    expect(listButton).toHaveAttribute("tabindex", "0");
    expect(gridButton).toHaveAttribute("tabindex", "-1");

    await user.keyboard("{ArrowLeft}");
    expect(onValueChange).toHaveBeenCalledWith("grid");
    expect(gridButton).toHaveFocus();
  });

  it("Home/End jump to the first/last option", async () => {
    const user = userEvent.setup();
    const onValueChange = vi.fn();
    render(<ViewToggle defaultValue="grid" onValueChange={onValueChange} />);

    await user.tab();
    await user.keyboard("{End}");
    expect(onValueChange).toHaveBeenLastCalledWith("list");

    await user.keyboard("{Home}");
    expect(onValueChange).toHaveBeenLastCalledWith("grid");
  });

  it("works as a controlled component", async () => {
    const user = userEvent.setup();
    const onValueChange = vi.fn();
    const { rerender } = render(<ViewToggle value="grid" onValueChange={onValueChange} />);

    await user.click(screen.getByRole("radio", { name: "List view" }));
    expect(onValueChange).toHaveBeenCalledWith("list");
    // Controlled: the visual state doesn't change until the consumer feeds the new value back in.
    expect(screen.getByRole("radio", { name: "Grid view" })).toHaveAttribute("aria-checked", "true");

    rerender(<ViewToggle value="list" onValueChange={onValueChange} />);
    expect(screen.getByRole("radio", { name: "List view" })).toHaveAttribute("aria-checked", "true");
  });

  it("lets a consumer className win over the default border utility", () => {
    render(<ViewToggle className="border-danger" />);
    const classes = screen.getByRole("radiogroup").className.split(/\s+/);
    expect(classes).toContain("border-danger");
    expect(classes).not.toContain("border-border");
  });
});
