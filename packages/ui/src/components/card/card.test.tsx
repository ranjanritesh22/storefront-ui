import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "./card";

describe("Card", () => {
  it("lets a consumer className win over the default variant on a conflicting utility", () => {
    render(<Card className="bg-danger">content</Card>);
    const card = screen.getByText("content");
    const classes = card.className.split(/\s+/);
    expect(classes).toContain("bg-danger");
    expect(classes).not.toContain("bg-surface");
  });

  it("renders all composed parts", () => {
    render(
      <Card>
        <CardHeader>
          <CardTitle>Title</CardTitle>
          <CardDescription>Description</CardDescription>
        </CardHeader>
        <CardContent>Body</CardContent>
        <CardFooter>Footer</CardFooter>
      </Card>,
    );
    expect(screen.getByRole("heading", { name: "Title" })).toBeInTheDocument();
    expect(screen.getByText("Description")).toBeInTheDocument();
    expect(screen.getByText("Body")).toBeInTheDocument();
    expect(screen.getByText("Footer")).toBeInTheDocument();
  });

  it("renders a section when asChild is given one", () => {
    render(
      <Card asChild>
        <section aria-label="Product">content</section>
      </Card>,
    );
    const section = screen.getByRole("region", { name: "Product" });
    expect(section.tagName).toBe("SECTION");
  });
});
