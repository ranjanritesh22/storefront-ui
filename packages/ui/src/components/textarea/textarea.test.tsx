import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import { Textarea } from "./textarea";

describe("Textarea", () => {
  it("accepts typed input", async () => {
    const user = userEvent.setup();
    render(<Textarea aria-label="Comments" />);
    const textarea = screen.getByLabelText("Comments");
    await user.type(textarea, "Great fit, true to size.");
    expect(textarea).toHaveValue("Great fit, true to size.");
  });

  it("defaults to 4 rows and lets a consumer override it", () => {
    const { rerender } = render(<Textarea aria-label="Comments" />);
    expect(screen.getByLabelText("Comments")).toHaveAttribute("rows", "4");
    rerender(<Textarea aria-label="Comments" rows={8} />);
    expect(screen.getByLabelText("Comments")).toHaveAttribute("rows", "8");
  });

  it("sets data-invalid and aria-invalid when invalid", () => {
    render(<Textarea aria-label="Comments" invalid />);
    const textarea = screen.getByLabelText("Comments");
    expect(textarea).toHaveAttribute("data-invalid", "true");
    expect(textarea).toHaveAttribute("aria-invalid", "true");
  });

  it("lets a consumer className win over the default border utility", () => {
    render(<Textarea aria-label="Comments" className="border-danger" />);
    const classes = screen.getByLabelText("Comments").className.split(/\s+/);
    expect(classes).toContain("border-danger");
    expect(classes).not.toContain("border-border");
  });
});
