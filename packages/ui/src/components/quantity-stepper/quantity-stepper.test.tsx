import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { QuantityStepper } from "./quantity-stepper";

describe("QuantityStepper", () => {
  it("increments and decrements via the buttons", async () => {
    const user = userEvent.setup();
    render(<QuantityStepper defaultValue={1} min={1} max={5} />);

    const input = screen.getByLabelText("Quantity");
    expect(input).toHaveValue("1");

    await user.click(screen.getByLabelText("Increase quantity"));
    expect(input).toHaveValue("2");

    await user.click(screen.getByLabelText("Decrease quantity"));
    expect(input).toHaveValue("1");
  });

  it("disables the decrement button at min and increment button at max", async () => {
    const user = userEvent.setup();
    render(<QuantityStepper defaultValue={1} min={1} max={2} />);

    expect(screen.getByLabelText("Decrease quantity")).toBeDisabled();
    await user.click(screen.getByLabelText("Increase quantity"));
    expect(screen.getByLabelText("Increase quantity")).toBeDisabled();
  });

  it("calls onChange with the new value", async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    render(<QuantityStepper defaultValue={1} onChange={onChange} />);

    await user.click(screen.getByLabelText("Increase quantity"));
    expect(onChange).toHaveBeenCalledWith(2);
  });

  it("lets classNames reach individual slots", () => {
    render(
      <QuantityStepper
        classNames={{ root: "custom-root", incrementButton: "custom-increment" }}
      />,
    );
    expect(screen.getByLabelText("Increase quantity").className).toContain("custom-increment");
  });
});
