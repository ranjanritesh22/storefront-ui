import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Fieldset } from "./fieldset";
import { Radio, RadioGroup } from "../radio-group/radio-group";

describe("Fieldset", () => {
  it("renders the legend as the group's accessible name", () => {
    render(
      <Fieldset legend="Shipping method">
        <RadioGroup aria-label="Shipping method">
          <Radio value="standard" label="Standard" />
        </RadioGroup>
      </Fieldset>,
    );
    expect(screen.getByRole("group", { name: "Shipping method" })).toBeInTheDocument();
  });

  it("disables every descendant control natively", () => {
    render(
      <Fieldset legend="Shipping method" disabled>
        <RadioGroup aria-label="Shipping method">
          <Radio value="standard" label="Standard" />
        </RadioGroup>
      </Fieldset>,
    );
    expect(screen.getByRole("radio", { name: "Standard" })).toBeDisabled();
  });

  it("exposes data-disabled and data-invalid for styling hooks", () => {
    render(
      <Fieldset legend="Shipping method" disabled invalid data-testid="fieldset">
        <p>content</p>
      </Fieldset>,
    );
    const fieldset = screen.getByTestId("fieldset");
    expect(fieldset).toHaveAttribute("data-disabled", "true");
    expect(fieldset).toHaveAttribute("data-invalid", "true");
    expect(fieldset).toHaveAttribute("aria-invalid", "true");
  });

  it("wires description via aria-describedby", () => {
    render(
      <Fieldset legend="Shipping method" description="Choose one option." data-testid="fieldset">
        <p>content</p>
      </Fieldset>,
    );
    const fieldset = screen.getByTestId("fieldset");
    const description = screen.getByText("Choose one option.");
    expect(fieldset).toHaveAttribute("aria-describedby", description.id);
  });
});
