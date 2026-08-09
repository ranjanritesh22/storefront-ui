import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { DatePicker } from "./date-picker";

// March 15, 2024 is a Friday — used as `defaultValue` throughout so the
// rendered month/weekday labels are deterministic without mocking `Date`
// (Radix Popover's own rAF-driven positioning doesn't play well with fake
// timers, so real timers stay on for these tests).
const MARCH_15_2024 = new Date(2024, 2, 15);

describe("DatePicker", () => {
  it("shows the placeholder until a date is chosen", () => {
    render(<DatePicker aria-label="Delivery date" />);
    expect(screen.getByRole("button", { name: /Delivery date/ })).toHaveTextContent("Select a date");
  });

  it("opens the calendar on the selected date's month and selects a day", async () => {
    const user = userEvent.setup();
    const onValueChange = vi.fn();
    render(
      <DatePicker aria-label="Delivery date" locale="en-US" defaultValue={MARCH_15_2024} onValueChange={onValueChange} />,
    );

    await user.click(screen.getByRole("button", { name: /Delivery date/ }));
    expect(await screen.findByRole("grid")).toBeInTheDocument();
    expect(screen.getByText("March 2024")).toBeInTheDocument();

    await user.click(screen.getByRole("button", { name: /Wednesday, March 20, 2024/ }));

    expect(onValueChange).toHaveBeenCalledTimes(1);
    const selected = onValueChange.mock.calls[0][0] as Date;
    expect(selected.getDate()).toBe(20);
    expect(screen.queryByRole("grid")).not.toBeInTheDocument();
  });

  it("moves the focused day with arrow keys and jumps months with PageDown", async () => {
    const user = userEvent.setup();
    render(<DatePicker aria-label="Delivery date" locale="en-US" defaultValue={MARCH_15_2024} />);

    await user.click(screen.getByRole("button", { name: /Delivery date/ }));
    const startDay = await screen.findByRole("button", { name: /Friday, March 15, 2024/ });
    expect(startDay).toHaveFocus();

    await user.keyboard("{ArrowRight}");
    expect(screen.getByRole("button", { name: /Saturday, March 16, 2024/ })).toHaveFocus();

    await user.keyboard("{PageDown}");
    expect(screen.getByText("April 2024")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /Tuesday, April 16, 2024/ })).toHaveFocus();
  });

  it("disables days outside min/max and blocks navigating past them", async () => {
    const user = userEvent.setup();
    render(
      <DatePicker
        aria-label="Delivery date"
        locale="en-US"
        defaultValue={MARCH_15_2024}
        min={new Date(2024, 2, 10)}
        max={new Date(2024, 2, 20)}
      />,
    );

    await user.click(screen.getByRole("button", { name: /Delivery date/ }));
    expect(screen.getByRole("button", { name: /Friday, March 1, 2024/ })).toBeDisabled();
    expect(screen.getByRole("button", { name: /Sunday, March 31, 2024/ })).toBeDisabled();
    expect(screen.getByRole("button", { name: /previous month/i })).toBeDisabled();
    expect(screen.getByRole("button", { name: /next month/i })).toBeDisabled();
  });

  it("clears the selection via the footer Clear button", async () => {
    const user = userEvent.setup();
    const onValueChange = vi.fn();
    render(
      <DatePicker aria-label="Delivery date" locale="en-US" defaultValue={MARCH_15_2024} onValueChange={onValueChange} />,
    );

    await user.click(screen.getByRole("button", { name: /Delivery date/ }));
    const grid = await screen.findByRole("grid");
    await user.click(within(grid.parentElement as HTMLElement).getByRole("button", { name: "Clear date" }));

    expect(onValueChange).toHaveBeenCalledWith(null);
  });

  it("clears the selection via the compact clear button next to the trigger", async () => {
    const user = userEvent.setup();
    const onValueChange = vi.fn();
    render(
      <DatePicker aria-label="Delivery date" locale="en-US" defaultValue={MARCH_15_2024} onValueChange={onValueChange} />,
    );

    await user.click(screen.getByRole("button", { name: "Clear date" }));
    expect(onValueChange).toHaveBeenCalledWith(null);
    expect(screen.queryByRole("grid")).not.toBeInTheDocument();
  });

  it("sets data-invalid and aria-invalid when invalid", () => {
    render(<DatePicker aria-label="Delivery date" invalid />);
    const trigger = screen.getByRole("button", { name: /Delivery date/ });
    expect(trigger).toHaveAttribute("data-invalid", "true");
    expect(trigger).toHaveAttribute("aria-invalid", "true");
  });

  it("lets a consumer className win on the trigger", () => {
    render(<DatePicker aria-label="Delivery date" className="border-danger" />);
    const classes = screen.getByRole("button", { name: /Delivery date/ }).className.split(/\s+/);
    expect(classes).toContain("border-danger");
  });
});
