import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { Checkbox } from "./checkbox";

describe("Checkbox", () => {
  it("associates the label with the input via htmlFor/id", () => {
    render(<Checkbox label="Nike" />);
    const input = screen.getByLabelText("Nike");
    expect(input).toBeInstanceOf(HTMLInputElement);
    expect(input).toHaveAttribute("type", "checkbox");
  });

  it("toggles checked state and fires onChange", async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    render(<Checkbox label="Adidas" onChange={onChange} />);

    const input = screen.getByLabelText("Adidas");
    expect(input).not.toBeChecked();
    await user.click(input);
    expect(input).toBeChecked();
    expect(onChange).toHaveBeenCalledTimes(1);
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
    expect(screen.getByLabelText("New Balance")).toBeChecked();
  });
});
