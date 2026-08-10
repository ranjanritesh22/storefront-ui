import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import { TooltipProvider, Tooltip, TooltipTrigger, TooltipContent } from "./tooltip";

function renderTooltip() {
  return render(
    <TooltipProvider delayDuration={0}>
      <Tooltip>
        <TooltipTrigger>Save</TooltipTrigger>
        <TooltipContent>Save this item for later</TooltipContent>
      </Tooltip>
    </TooltipProvider>,
  );
}

describe("Tooltip", () => {
  it("is hidden until the trigger is hovered", async () => {
    const user = userEvent.setup();
    renderTooltip();

    expect(screen.queryByText("Save this item for later")).not.toBeInTheDocument();

    await user.hover(screen.getByText("Save"));
    expect(await screen.findByText("Save this item for later")).toBeInTheDocument();
  });

  it("shows on keyboard focus, for keyboard-only users", async () => {
    const user = userEvent.setup();
    renderTooltip();

    await user.tab();
    expect(screen.getByText("Save")).toHaveFocus();
    expect(await screen.findByText("Save this item for later")).toBeInTheDocument();
  });

  it("dismisses on Escape", async () => {
    const user = userEvent.setup();
    renderTooltip();

    await user.hover(screen.getByText("Save"));
    expect(await screen.findByText("Save this item for later")).toBeInTheDocument();

    await user.keyboard("{Escape}");
    expect(screen.queryByText("Save this item for later")).not.toBeInTheDocument();
  });

  it("lets a consumer className win over the default background utility", async () => {
    const user = userEvent.setup();
    render(
      <TooltipProvider delayDuration={0}>
        <Tooltip>
          <TooltipTrigger>Save</TooltipTrigger>
          <TooltipContent className="bg-danger">Danger tooltip</TooltipContent>
        </Tooltip>
      </TooltipProvider>,
    );
    await user.hover(screen.getByText("Save"));

    const classes = (await screen.findByText("Danger tooltip")).className.split(/\s+/);
    expect(classes).toContain("bg-danger");
    expect(classes).not.toContain("bg-foreground");
  });
});
