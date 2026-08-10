import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { AlertBanner } from "./alert-banner";

describe("AlertBanner", () => {
  it("renders a title and description", () => {
    render(
      <AlertBanner variant="success" title="Order confirmed">
        You&apos;ll get a shipping email soon.
      </AlertBanner>,
    );
    expect(screen.getByText("Order confirmed")).toBeInTheDocument();
    expect(screen.getByText("You'll get a shipping email soon.")).toBeInTheDocument();
  });

  it("sets data-variant to the given variant", () => {
    render(<AlertBanner variant="danger" title="Payment failed" />);
    expect(screen.getByText("Payment failed").closest("[data-variant]")).toHaveAttribute(
      "data-variant",
      "danger",
    );
  });

  it("renders no dismiss button unless onDismiss is given", () => {
    render(<AlertBanner title="Info" />);
    expect(screen.queryByRole("button")).not.toBeInTheDocument();
  });

  it("calls onDismiss when the dismiss button is clicked", async () => {
    const user = userEvent.setup();
    const onDismiss = vi.fn();
    render(<AlertBanner title="Dismissible" onDismiss={onDismiss} />);

    await user.click(screen.getByRole("button", { name: "Dismiss" }));
    expect(onDismiss).toHaveBeenCalledTimes(1);
  });

  it("renders the given action content", () => {
    render(
      <AlertBanner title="Update available" action={<button type="button">Refresh</button>} />,
    );
    expect(screen.getByRole("button", { name: "Refresh" })).toBeInTheDocument();
  });

  it("lets a consumer className win over the default background utility", () => {
    render(<AlertBanner variant="info" title="Info" className="bg-transparent" />);
    const classes = screen.getByText("Info").closest("[data-variant]")!.className.split(/\s+/);
    expect(classes).toContain("bg-transparent");
    expect(classes).not.toContain("bg-surface-raised");
  });
});
