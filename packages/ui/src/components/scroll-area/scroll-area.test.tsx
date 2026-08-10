import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { ScrollArea } from "./scroll-area";

describe("ScrollArea", () => {
  it("renders its children inside the viewport", () => {
    render(
      <ScrollArea data-testid="scroll-area">
        <div>content</div>
      </ScrollArea>,
    );
    expect(screen.getByTestId("scroll-area")).toHaveTextContent("content");
  });

  // jsdom reports zero layout size for every element, so Radix's default
  // `type="hover"` scrollbar (visible only when content actually overflows)
  // never mounts in tests. `type="always"` bypasses that overflow
  // measurement and renders unconditionally.
  it("renders only a vertical scrollbar by default", () => {
    render(
      <ScrollArea type="always">
        <div>content</div>
      </ScrollArea>,
    );
    const scrollbars = document.querySelectorAll("[data-orientation]");
    expect(scrollbars).toHaveLength(1);
    expect(scrollbars[0]).toHaveAttribute("data-orientation", "vertical");
  });

  it("renders both scrollbars and a corner when orientation is 'both'", () => {
    render(
      <ScrollArea type="always" orientation="both">
        <div>content</div>
      </ScrollArea>,
    );
    expect(document.querySelectorAll("[data-orientation]")).toHaveLength(2);
  });

  it("lets classNames.viewport reach the viewport", () => {
    render(
      <ScrollArea classNames={{ viewport: "custom-viewport" }}>
        <div>content</div>
      </ScrollArea>,
    );
    expect(document.querySelector(".custom-viewport")).toBeInTheDocument();
  });
});
