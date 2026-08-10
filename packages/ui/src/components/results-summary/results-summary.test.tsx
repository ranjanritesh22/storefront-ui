import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { ResultsSummary } from "./results-summary";

describe("ResultsSummary", () => {
  it("renders the formatted 'Showing X–Y of Z' message", () => {
    render(<ResultsSummary start={1} end={12} total={240} />);
    expect(screen.getByText("Showing 1–12 of 240")).toBeInTheDocument();
  });

  it("renders a distinct message when there are no results", () => {
    render(<ResultsSummary start={0} end={0} total={0} />);
    expect(screen.getByText("No results")).toBeInTheDocument();
    expect(screen.queryByText(/Showing/)).not.toBeInTheDocument();
  });

  it("lets classNames reach the root and the text span", () => {
    render(<ResultsSummary start={1} end={12} total={240} classNames={{ root: "custom-root", text: "custom-text" }} />);
    const root = screen.getByText("Showing 1–12 of 240").parentElement;
    expect(root?.className).toContain("custom-root");
    expect(screen.getByText("Showing 1–12 of 240").className).toContain("custom-text");
  });

  it("lets a consumer className win over the default text-size utility", () => {
    render(<ResultsSummary start={1} end={12} total={240} size="sm" className="text-lg" />);
    const root = screen.getByText("Showing 1–12 of 240").parentElement;
    const classes = root!.className.split(/\s+/);
    expect(classes).toContain("text-lg");
    expect(classes).not.toContain("text-xs");
  });
});
