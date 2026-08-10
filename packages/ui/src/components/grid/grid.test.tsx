import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Grid } from "./grid";

describe("Grid", () => {
  it("defaults to a single column", () => {
    render(<Grid data-testid="grid">content</Grid>);
    expect(screen.getByTestId("grid").className).toContain("grid-cols-1");
  });

  it("applies responsive column classes", () => {
    render(
      <Grid data-testid="grid" cols={2} colsMd={3} colsLg={4}>
        content
      </Grid>,
    );
    const el = screen.getByTestId("grid");
    expect(el.className).toContain("grid-cols-2");
    expect(el.className).toContain("md:grid-cols-3");
    expect(el.className).toContain("lg:grid-cols-4");
  });

  it("lets className win over the default gap class", () => {
    render(
      <Grid data-testid="grid" className="gap-10">
        content
      </Grid>,
    );
    expect(screen.getByTestId("grid").className).toContain("gap-10");
    expect(screen.getByTestId("grid").className).not.toContain("gap-4");
  });

  it("renders as the child element when asChild is set", () => {
    render(
      <Grid asChild>
        <ul data-testid="list">content</ul>
      </Grid>,
    );
    expect(screen.getByTestId("list").tagName).toBe("UL");
  });
});
