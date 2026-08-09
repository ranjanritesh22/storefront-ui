import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import { Input } from "./input";

describe("Input", () => {
  it("lets a consumer className win over the default variant on a conflicting utility", () => {
    render(<Input aria-label="Email" className="bg-danger" />);
    const input = screen.getByRole("textbox", { name: "Email" });
    const classes = input.className.split(/\s+/);
    expect(classes).toContain("bg-danger");
    expect(classes).not.toContain("bg-surface");
  });

  it("accepts typed input", async () => {
    const user = userEvent.setup();
    render(<Input aria-label="Email" />);
    const input = screen.getByRole("textbox", { name: "Email" });
    await user.type(input, "hi@example.com");
    expect(input).toHaveValue("hi@example.com");
  });

  it("exposes data-invalid and aria-invalid when invalid", () => {
    render(<Input aria-label="Email" invalid />);
    const input = screen.getByRole("textbox", { name: "Email" });
    expect(input).toHaveAttribute("data-invalid", "true");
    expect(input).toHaveAttribute("aria-invalid", "true");
  });

  it("omits data-invalid and aria-invalid by default", () => {
    render(<Input aria-label="Email" />);
    const input = screen.getByRole("textbox", { name: "Email" });
    expect(input).not.toHaveAttribute("data-invalid");
    expect(input).not.toHaveAttribute("aria-invalid");
  });
});
