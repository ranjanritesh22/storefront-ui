import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Container } from "./container";

describe("Container", () => {
  it("renders children inside a centered max-width wrapper", () => {
    render(<Container data-testid="container">content</Container>);
    expect(screen.getByTestId("container")).toHaveTextContent("content");
  });

  it("applies the size variant's max-width class", () => {
    render(
      <Container data-testid="container" size="sm">
        content
      </Container>,
    );
    expect(screen.getByTestId("container").className).toContain("max-w-3xl");
  });

  it("lets className win over the default size class", () => {
    render(
      <Container data-testid="container" className="max-w-none">
        content
      </Container>,
    );
    expect(screen.getByTestId("container").className).toContain("max-w-none");
    expect(screen.getByTestId("container").className).not.toContain("max-w-7xl");
  });

  it("renders as the child element when asChild is set", () => {
    render(
      <Container asChild>
        <section data-testid="section">content</section>
      </Container>,
    );
    expect(screen.getByTestId("section").tagName).toBe("SECTION");
  });
});
