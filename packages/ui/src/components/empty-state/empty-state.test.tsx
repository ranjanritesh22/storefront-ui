import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { EmptyState } from "./empty-state";
import { Icon } from "../icon/icon";

describe("EmptyState", () => {
  it("renders the title", () => {
    render(<EmptyState title="No results found" />);
    expect(screen.getByText("No results found")).toBeInTheDocument();
  });

  it("renders a description when given", () => {
    render(<EmptyState title="No results found" description="Try a different search." />);
    expect(screen.getByText("Try a different search.")).toBeInTheDocument();
  });

  it("renders no description when omitted", () => {
    const { container } = render(<EmptyState title="No results found" />);
    expect(container.querySelectorAll("p")).toHaveLength(1);
  });

  it("renders the given icon and action as-is", () => {
    render(
      <EmptyState
        title="Your cart is empty"
        icon={<Icon name="cart" size="xl" />}
        action={<button type="button">Start shopping</button>}
      />,
    );
    expect(screen.getByRole("button", { name: "Start shopping" })).toBeInTheDocument();
  });

  it("lets a consumer className win over the default padding utility", () => {
    render(<EmptyState title="Empty" className="p-4" />);
    const classes = screen.getByText("Empty").parentElement!.className.split(/\s+/);
    expect(classes).toContain("p-4");
    expect(classes).not.toContain("p-8");
  });
});
