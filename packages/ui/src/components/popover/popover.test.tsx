import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import { Popover, PopoverTrigger, PopoverContent } from "./popover";

function renderPopover() {
  return render(
    <Popover>
      <PopoverTrigger>Open filters</PopoverTrigger>
      <PopoverContent>
        <p>Filter content</p>
      </PopoverContent>
    </Popover>,
  );
}

describe("Popover", () => {
  it("is closed until the trigger is activated", async () => {
    const user = userEvent.setup();
    renderPopover();

    expect(screen.queryByText("Filter content")).not.toBeInTheDocument();

    await user.click(screen.getByRole("button", { name: "Open filters" }));
    expect(await screen.findByText("Filter content")).toBeInTheDocument();
  });

  it("exposes data-state on the trigger and content", async () => {
    const user = userEvent.setup();
    renderPopover();

    const trigger = screen.getByRole("button", { name: "Open filters" });
    expect(trigger).toHaveAttribute("data-state", "closed");

    await user.click(trigger);
    expect(trigger).toHaveAttribute("data-state", "open");
    expect((await screen.findByText("Filter content")).closest("[data-state]")).toHaveAttribute(
      "data-state",
      "open",
    );
  });

  it("closes on Escape", async () => {
    const user = userEvent.setup();
    renderPopover();

    await user.click(screen.getByRole("button", { name: "Open filters" }));
    expect(await screen.findByText("Filter content")).toBeInTheDocument();

    await user.keyboard("{Escape}");
    expect(screen.queryByText("Filter content")).not.toBeInTheDocument();
  });

  it("lets a consumer className win over the default width utility", async () => {
    render(
      <Popover defaultOpen>
        <PopoverTrigger>Open</PopoverTrigger>
        <PopoverContent className="w-96">Content</PopoverContent>
      </Popover>,
    );

    const classes = (await screen.findByText("Content")).className.split(/\s+/);
    expect(classes).toContain("w-96");
    expect(classes).not.toContain("w-72");
  });
});
