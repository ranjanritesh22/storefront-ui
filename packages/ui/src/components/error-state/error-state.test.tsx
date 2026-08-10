import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { ErrorState } from "./error-state";

describe("ErrorState", () => {
  it("renders default title and description when none are given", () => {
    render(<ErrorState />);
    expect(screen.getByText("Something went wrong")).toBeInTheDocument();
    expect(screen.getByText("We couldn't load this content. Please try again.")).toBeInTheDocument();
  });

  it("lets props override the default copy", () => {
    render(<ErrorState title="Couldn't load reviews" description="Check your connection." />);
    expect(screen.getByText("Couldn't load reviews")).toBeInTheDocument();
    expect(screen.getByText("Check your connection.")).toBeInTheDocument();
  });

  it("renders no retry button unless onRetry is given", () => {
    render(<ErrorState />);
    expect(screen.queryByRole("button")).not.toBeInTheDocument();
  });

  it("calls onRetry when the retry button is clicked", async () => {
    const user = userEvent.setup();
    const onRetry = vi.fn();
    render(<ErrorState onRetry={onRetry} />);

    await user.click(screen.getByRole("button", { name: "Try again" }));
    expect(onRetry).toHaveBeenCalledTimes(1);
  });

  it("lets retryLabel override the default button text", () => {
    render(<ErrorState onRetry={vi.fn()} retryLabel="Reload" />);
    expect(screen.getByRole("button", { name: "Reload" })).toBeInTheDocument();
  });

  it("exposes role=alert", () => {
    render(<ErrorState />);
    expect(screen.getByRole("alert")).toBeInTheDocument();
  });
});
