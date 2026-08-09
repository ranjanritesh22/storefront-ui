import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogDescription,
} from "./dialog";

function renderDialog() {
  return render(
    <Dialog>
      <DialogTrigger>Open</DialogTrigger>
      <DialogContent classNames={{ footer: "custom-footer" }}>
        <DialogHeader>
          <DialogTitle>Remove item</DialogTitle>
          <DialogDescription>This can't be undone.</DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <button type="button">Confirm</button>
        </DialogFooter>
      </DialogContent>
    </Dialog>,
  );
}

describe("Dialog", () => {
  it("is closed until the trigger is activated, then traps focus in the content", async () => {
    const user = userEvent.setup();
    renderDialog();

    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();

    await user.click(screen.getByRole("button", { name: "Open" }));

    const dialog = await screen.findByRole("dialog");
    expect(dialog).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Remove item" })).toBeInTheDocument();
  });

  it("exposes data-state on the trigger and content", async () => {
    const user = userEvent.setup();
    renderDialog();

    const trigger = screen.getByRole("button", { name: "Open" });
    expect(trigger).toHaveAttribute("data-state", "closed");

    await user.click(trigger);
    expect(trigger).toHaveAttribute("data-state", "open");
    expect(await screen.findByRole("dialog")).toHaveAttribute("data-state", "open");
  });

  it("closes on Escape", async () => {
    const user = userEvent.setup();
    renderDialog();

    await user.click(screen.getByRole("button", { name: "Open" }));
    expect(await screen.findByRole("dialog")).toBeInTheDocument();

    await user.keyboard("{Escape}");
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });

  it("lets classNames reach the footer slot", async () => {
    const user = userEvent.setup();
    renderDialog();
    await user.click(screen.getByRole("button", { name: "Open" }));

    const confirmButton = await screen.findByRole("button", { name: "Confirm" });
    expect(confirmButton.parentElement?.className).toContain("custom-footer");
  });
});
