import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { Switch } from "./switch";

describe("Switch", () => {
  it("associates the label with the control via htmlFor/id", () => {
    render(<Switch label="Email me order updates" />);
    expect(screen.getByRole("switch", { name: "Email me order updates" })).toBeInTheDocument();
  });

  it("toggles on click and fires onCheckedChange", async () => {
    const user = userEvent.setup();
    const onCheckedChange = vi.fn();
    render(<Switch label="Notifications" onCheckedChange={onCheckedChange} />);

    const control = screen.getByRole("switch", { name: "Notifications" });
    expect(control).not.toBeChecked();
    await user.click(control);
    expect(control).toBeChecked();
    expect(onCheckedChange).toHaveBeenCalledWith(true);
  });

  it("activates via the keyboard", async () => {
    const user = userEvent.setup();
    render(<Switch label="Notifications" />);

    await user.tab();
    const control = screen.getByRole("switch", { name: "Notifications" });
    expect(control).toHaveFocus();
    await user.keyboard(" ");
    expect(control).toBeChecked();
  });

  it("exposes data-disabled and blocks toggling while disabled", async () => {
    const user = userEvent.setup();
    const onCheckedChange = vi.fn();
    render(<Switch label="Notifications" disabled onCheckedChange={onCheckedChange} />);

    const control = screen.getByRole("switch", { name: "Notifications" });
    expect(control).toHaveAttribute("data-disabled");
    await user.click(control);
    expect(onCheckedChange).not.toHaveBeenCalled();
  });

  it("sets data-invalid and aria-invalid when invalid", () => {
    render(<Switch label="Notifications" invalid />);
    const control = screen.getByRole("switch", { name: "Notifications" });
    expect(control).toHaveAttribute("data-invalid", "true");
    expect(control).toHaveAttribute("aria-invalid", "true");
  });

  it("lets classNames reach the thumb slot", () => {
    render(<Switch label="Notifications" classNames={{ thumb: "custom-thumb" }} />);
    expect(document.querySelector(".custom-thumb")).not.toBeNull();
  });
});
