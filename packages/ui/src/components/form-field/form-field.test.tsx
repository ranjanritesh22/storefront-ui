import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { FormField } from "./form-field";
import { Input } from "../input/input";

describe("FormField", () => {
  it("wires the label to the control via a shared id", () => {
    render(
      <FormField label="Email">
        <Input type="email" />
      </FormField>,
    );
    const input = screen.getByRole("textbox", { name: "Email" });
    expect(input).toHaveAttribute("id");
  });

  it("wires the hint via aria-describedby when there is no error", () => {
    render(
      <FormField label="Email" hint="We'll never share it.">
        <Input type="email" />
      </FormField>,
    );
    const input = screen.getByRole("textbox", { name: "Email" });
    const hint = screen.getByText("We'll never share it.");
    expect(input).toHaveAttribute("aria-describedby", hint.id);
    expect(input).not.toHaveAttribute("aria-invalid");
  });

  it("wires the error, marks aria-invalid/data-invalid, and hides the hint", () => {
    render(
      <FormField label="Email" hint="hint text" error="Enter a valid email address.">
        <Input type="email" />
      </FormField>,
    );
    const input = screen.getByRole("textbox", { name: "Email" });
    const error = screen.getByRole("alert");
    expect(error).toHaveTextContent("Enter a valid email address.");
    expect(input).toHaveAttribute("aria-describedby", error.id);
    expect(input).toHaveAttribute("aria-invalid", "true");
    expect(input).toHaveAttribute("data-invalid", "true");
    expect(screen.queryByText("hint text")).not.toBeInTheDocument();
  });

  it("lets classNames reach individual slots", () => {
    render(
      <FormField label="Email" error="Required" classNames={{ label: "custom-label", error: "custom-error" }}>
        <Input type="email" />
      </FormField>,
    );
    expect(screen.getByText("Email").className).toContain("custom-label");
    expect(screen.getByRole("alert").className).toContain("custom-error");
  });
});
