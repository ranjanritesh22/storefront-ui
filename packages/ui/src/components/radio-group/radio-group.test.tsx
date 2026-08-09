import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { RadioGroup, Radio } from "./radio-group";

function renderGroup(onValueChange = vi.fn()) {
  render(
    <RadioGroup aria-label="Size" onValueChange={onValueChange}>
      <Radio value="s" label="Small" />
      <Radio value="m" label="Medium" />
      <Radio value="l" label="Large" />
    </RadioGroup>,
  );
  return onValueChange;
}

describe("RadioGroup", () => {
  it("associates each Radio's label via htmlFor/id", () => {
    renderGroup();
    expect(screen.getByRole("radio", { name: "Small" })).toBeInTheDocument();
    expect(screen.getByRole("radio", { name: "Medium" })).toBeInTheDocument();
  });

  it("selects on click and fires onValueChange", async () => {
    const user = userEvent.setup();
    const onValueChange = renderGroup();

    await user.click(screen.getByRole("radio", { name: "Medium" }));
    expect(onValueChange).toHaveBeenCalledWith("m");
    expect(screen.getByRole("radio", { name: "Medium" })).toBeChecked();
  });

  it("moves roving focus across items with arrow keys, each landing as a single Tab stop", async () => {
    const user = userEvent.setup();
    renderGroup();

    await user.tab();
    expect(screen.getByRole("radio", { name: "Small" })).toHaveFocus();
    expect(screen.getByRole("radio", { name: "Medium" })).toHaveAttribute("tabindex", "-1");

    await user.keyboard("{ArrowDown}");
    const medium = screen.getByRole("radio", { name: "Medium" });
    expect(medium).toHaveFocus();

    await user.keyboard("{ArrowDown}");
    const large = screen.getByRole("radio", { name: "Large" });
    expect(large).toHaveFocus();
  });

  it("selects the focused item with Space", async () => {
    const user = userEvent.setup();
    const onValueChange = renderGroup();

    await user.tab();
    await user.keyboard("{ArrowDown}");
    await user.keyboard(" ");

    const medium = screen.getByRole("radio", { name: "Medium" });
    expect(medium).toBeChecked();
    expect(onValueChange).toHaveBeenCalledWith("m");
  });

  it("sets data-invalid and aria-invalid on the group when invalid", () => {
    render(
      <RadioGroup aria-label="Size" invalid>
        <Radio value="s" label="Small" />
      </RadioGroup>,
    );
    const group = screen.getByRole("radiogroup", { name: "Size" });
    expect(group).toHaveAttribute("data-invalid", "true");
    expect(group).toHaveAttribute("aria-invalid", "true");
  });

  it("disables an individual Radio via data-disabled", () => {
    render(
      <RadioGroup aria-label="Size">
        <Radio value="s" label="Small" disabled />
      </RadioGroup>,
    );
    expect(screen.getByRole("radio", { name: "Small" })).toHaveAttribute("data-disabled");
  });
});
