import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Badge } from "./badge";

describe("Badge", () => {
  it("lets a consumer className win over the default variant on a conflicting utility", () => {
    render(<Badge className="bg-danger">Sale</Badge>);
    const badge = screen.getByText("Sale");
    const classes = badge.className.split(/\s+/);
    expect(classes).toContain("bg-danger");
    expect(classes).not.toContain("bg-surface-raised");
  });

  it("renders an anchor when asChild is given an <a>", () => {
    render(
      <Badge asChild>
        <a href="/sale">Sale</a>
      </Badge>,
    );
    const link = screen.getByRole("link", { name: "Sale" });
    expect(link.tagName).toBe("A");
    expect(link).toHaveAttribute("href", "/sale");
  });

  it("renders a span by default", () => {
    render(<Badge>New</Badge>);
    const badge = screen.getByText("New");
    expect(badge.tagName).toBe("SPAN");
  });
});
