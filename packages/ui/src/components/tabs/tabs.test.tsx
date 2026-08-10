import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "./tabs";

function Example() {
  return (
    <Tabs defaultValue="details">
      <TabsList>
        <TabsTrigger value="details">Details</TabsTrigger>
        <TabsTrigger value="reviews">Reviews</TabsTrigger>
      </TabsList>
      <TabsContent value="details">Product details</TabsContent>
      <TabsContent value="reviews">Product reviews</TabsContent>
    </Tabs>
  );
}

describe("Tabs", () => {
  it("shows the default tab's content and hides the other", () => {
    render(<Example />);
    expect(screen.getByText("Product details")).toBeVisible();
    expect(screen.queryByText("Product reviews")).not.toBeInTheDocument();
  });

  it("switches panels when a trigger is clicked", async () => {
    const user = userEvent.setup();
    render(<Example />);
    await user.click(screen.getByRole("tab", { name: "Reviews" }));
    expect(screen.getByText("Product reviews")).toBeVisible();
    expect(screen.queryByText("Product details")).not.toBeInTheDocument();
  });

  it("supports arrow-key navigation between tabs", async () => {
    const user = userEvent.setup();
    render(<Example />);
    screen.getByRole("tab", { name: "Details" }).focus();
    await user.keyboard("{ArrowRight}");
    expect(screen.getByRole("tab", { name: "Reviews" })).toHaveFocus();
  });

  it("marks the active trigger with data-state and aria-selected", async () => {
    render(<Example />);
    expect(screen.getByRole("tab", { name: "Details" })).toHaveAttribute(
      "data-state",
      "active",
    );
    expect(screen.getByRole("tab", { name: "Details" })).toHaveAttribute(
      "aria-selected",
      "true",
    );
  });

  it("lets className reach TabsList", () => {
    render(
      <Tabs defaultValue="a">
        <TabsList className="custom-list">
          <TabsTrigger value="a">A</TabsTrigger>
        </TabsList>
        <TabsContent value="a">A content</TabsContent>
      </Tabs>,
    );
    expect(screen.getByRole("tablist").className).toContain("custom-list");
  });
});
