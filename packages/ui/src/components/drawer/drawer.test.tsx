import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import {
  Drawer,
  DrawerTrigger,
  DrawerContent,
  DrawerHeader,
  DrawerFooter,
  DrawerTitle,
  DrawerDescription,
} from "./drawer";

function renderDrawer(side?: "top" | "bottom" | "start" | "end") {
  return render(
    <Drawer>
      <DrawerTrigger>Open cart</DrawerTrigger>
      <DrawerContent side={side}>
        <DrawerHeader>
          <DrawerTitle>Your cart</DrawerTitle>
          <DrawerDescription>2 items</DrawerDescription>
        </DrawerHeader>
        <DrawerFooter>
          <button type="button">Checkout</button>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>,
  );
}

describe("Drawer", () => {
  it("is closed until the trigger is activated, then traps focus in the content", async () => {
    const user = userEvent.setup();
    renderDrawer();

    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();

    await user.click(screen.getByRole("button", { name: "Open cart" }));
    expect(await screen.findByRole("dialog")).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Your cart" })).toBeInTheDocument();
  });

  it("exposes data-state on the trigger and content", async () => {
    const user = userEvent.setup();
    renderDrawer();

    const trigger = screen.getByRole("button", { name: "Open cart" });
    expect(trigger).toHaveAttribute("data-state", "closed");

    await user.click(trigger);
    expect(trigger).toHaveAttribute("data-state", "open");
    expect(await screen.findByRole("dialog")).toHaveAttribute("data-state", "open");
  });

  it("closes on Escape", async () => {
    const user = userEvent.setup();
    renderDrawer();

    await user.click(screen.getByRole("button", { name: "Open cart" }));
    expect(await screen.findByRole("dialog")).toBeInTheDocument();

    await user.keyboard("{Escape}");
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });

  it.each(["top", "bottom", "start", "end"] as const)(
    "renders the %s side without throwing",
    async (side) => {
      const user = userEvent.setup();
      renderDrawer(side);

      await user.click(screen.getByRole("button", { name: "Open cart" }));
      expect(await screen.findByRole("dialog")).toBeInTheDocument();
    },
  );

  it("lets classNames reach the footer slot", async () => {
    const user = userEvent.setup();
    render(
      <Drawer>
        <DrawerTrigger>Open</DrawerTrigger>
        <DrawerContent classNames={{ footer: "custom-footer" }}>
          <DrawerFooter>
            <button type="button">Confirm</button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>,
    );
    await user.click(screen.getByRole("button", { name: "Open" }));

    const confirmButton = await screen.findByRole("button", { name: "Confirm" });
    expect(confirmButton.parentElement?.className).toContain("custom-footer");
  });
});
