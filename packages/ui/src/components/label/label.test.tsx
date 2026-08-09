import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import { Label } from "./label";
import { Input } from "../input/input";

describe("Label", () => {
  it("focuses the associated control when clicked", async () => {
    const user = userEvent.setup();
    render(
      <>
        <Label htmlFor="email">Email</Label>
        <Input id="email" />
      </>,
    );
    await user.click(screen.getByText("Email"));
    expect(screen.getByLabelText("Email")).toHaveFocus();
  });

  it("renders a visually-hidden required asterisk", () => {
    render(<Label required>Email</Label>);
    const label = screen.getByText("Email", { exact: false });
    expect(label.tagName).toBe("LABEL");
    expect(label).toHaveTextContent("Email *");
  });

  it("lets a consumer className win", () => {
    render(<Label className="text-danger">Email</Label>);
    const classes = screen.getByText("Email", { exact: false }).className.split(/\s+/);
    expect(classes).toContain("text-danger");
  });
});
