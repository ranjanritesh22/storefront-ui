import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Spinner } from "./spinner";

describe("Spinner", () => {
  it("renders a status role with the default 'Loading' text for screen readers", () => {
    render(<Spinner />);
    expect(screen.getByRole("status")).toHaveTextContent("Loading");
  });

  it("accepts a custom label", () => {
    render(<Spinner label="Loading recommendations" />);
    expect(screen.getByRole("status")).toHaveTextContent("Loading recommendations");
  });

  it("lets a consumer className win over the default tone utility", () => {
    render(<Spinner tone="primary" className="text-danger" />);
    const svg = screen.getByRole("status").querySelector("svg")!;
    const classes = svg.getAttribute("class")!.split(/\s+/);
    expect(classes).toContain("text-danger");
    expect(classes).not.toContain("text-primary");
  });
});
