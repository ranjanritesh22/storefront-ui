import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "./accordion";

function Example() {
  return (
    <Accordion type="single" collapsible>
      <AccordionItem value="shipping">
        <AccordionTrigger>Shipping</AccordionTrigger>
        <AccordionContent>Free delivery over $75.</AccordionContent>
      </AccordionItem>
      <AccordionItem value="returns">
        <AccordionTrigger>Returns</AccordionTrigger>
        <AccordionContent>30-day returns.</AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}

describe("Accordion", () => {
  it("starts with every panel closed when not defaultValue'd", () => {
    render(<Example />);
    expect(screen.getByRole("button", { name: "Shipping" })).toHaveAttribute(
      "aria-expanded",
      "false",
    );
  });

  it("opens a panel when its trigger is clicked", async () => {
    const user = userEvent.setup();
    render(<Example />);
    await user.click(screen.getByRole("button", { name: "Shipping" }));
    expect(screen.getByRole("button", { name: "Shipping" })).toHaveAttribute(
      "aria-expanded",
      "true",
    );
    expect(screen.getByText("Free delivery over $75.")).toBeVisible();
  });

  it("closes the open panel when its trigger is clicked again (collapsible)", async () => {
    const user = userEvent.setup();
    render(<Example />);
    const trigger = screen.getByRole("button", { name: "Shipping" });
    await user.click(trigger);
    await user.click(trigger);
    expect(trigger).toHaveAttribute("aria-expanded", "false");
  });

  it("single type closes the previous panel when another opens", async () => {
    const user = userEvent.setup();
    render(<Example />);
    await user.click(screen.getByRole("button", { name: "Shipping" }));
    await user.click(screen.getByRole("button", { name: "Returns" }));
    expect(screen.getByRole("button", { name: "Shipping" })).toHaveAttribute(
      "aria-expanded",
      "false",
    );
    expect(screen.getByRole("button", { name: "Returns" })).toHaveAttribute(
      "aria-expanded",
      "true",
    );
  });

  it("lets className reach AccordionItem", () => {
    render(
      <Accordion type="single" collapsible>
        <AccordionItem value="a" className="custom-item">
          <AccordionTrigger>A</AccordionTrigger>
          <AccordionContent>A content</AccordionContent>
        </AccordionItem>
      </Accordion>,
    );
    expect(document.querySelector(".custom-item")).toBeInTheDocument();
  });
});
