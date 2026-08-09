import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { Checkbox } from "./checkbox";

describe("Checkbox", () => {
  it("associates the label with the control via htmlFor/id", () => {
    render(<Checkbox label="Nike" />);
    const control = screen.getByRole("checkbox", { name: "Nike" });
    expect(control).toHaveAttribute("id");
  });

  it("toggles checked state and fires onCheckedChange", async () => {
    const user = userEvent.setup();
    const onCheckedChange = vi.fn();
    render(<Checkbox label="Adidas" onCheckedChange={onCheckedChange} />);

    const control = screen.getByRole("checkbox", { name: "Adidas" });
    expect(control).not.toBeChecked();
    await user.click(control);
    expect(control).toBeChecked();
    expect(onCheckedChange).toHaveBeenCalledWith(true);
  });

  it("activates via the keyboard", async () => {
    const user = userEvent.setup();
    render(<Checkbox label="Puma" />);

    await user.tab();
    const control = screen.getByRole("checkbox", { name: "Puma" });
    expect(control).toHaveFocus();
    await user.keyboard(" ");
    expect(control).toBeChecked();
  });

  it("renders a facet count via description", () => {
    render(<Checkbox label="Puma" description="(32)" />);
    expect(screen.getByText("(32)")).toBeInTheDocument();
  });

  it("lets classNames reach individual slots", () => {
    render(<Checkbox label="Reebok" classNames={{ root: "custom-root", box: "custom-box" }} />);
    const label = screen.getByText("Reebok").closest("label");
    expect(label?.className).toContain("custom-root");
  });

  it("respects a controlled checked value", () => {
    render(<Checkbox label="New Balance" checked readOnly />);
    expect(screen.getByRole("checkbox", { name: "New Balance" })).toBeChecked();
  });

  it("renders the indeterminate state and exposes data-disabled", () => {
    render(<Checkbox label="Select all" checked="indeterminate" disabled />);
    const control = screen.getByRole("checkbox", { name: "Select all" });
    expect(control).toHaveAttribute("data-state", "indeterminate");
    expect(control).toHaveAttribute("data-disabled");
  });

  it("sets data-invalid and aria-invalid when invalid", () => {
    render(<Checkbox label="Terms" invalid />);
    const control = screen.getByRole("checkbox", { name: "Terms" });
    expect(control).toHaveAttribute("data-invalid", "true");
    expect(control).toHaveAttribute("aria-invalid", "true");
  });
});
