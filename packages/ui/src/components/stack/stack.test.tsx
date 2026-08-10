import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Stack } from "./stack";

describe("Stack", () => {
  it("defaults to a vertical flex column", () => {
    render(<Stack data-testid="stack">content</Stack>);
    expect(screen.getByTestId("stack").className).toContain("flex-col");
  });

  it("switches to a horizontal row", () => {
    render(
      <Stack data-testid="stack" direction="horizontal">
        content
      </Stack>,
    );
    expect(screen.getByTestId("stack").className).toContain("flex-row");
  });

  it("applies gap, align and justify variants", () => {
    render(
      <Stack data-testid="stack" gap="lg" align="center" justify="between">
        content
      </Stack>,
    );
    const el = screen.getByTestId("stack");
    expect(el.className).toContain("gap-6");
    expect(el.className).toContain("items-center");
    expect(el.className).toContain("justify-between");
  });

  it("renders as the child element when asChild is set", () => {
    render(
      <Stack asChild>
        <ul data-testid="list">content</ul>
      </Stack>,
    );
    expect(screen.getByTestId("list").tagName).toBe("UL");
  });
});
