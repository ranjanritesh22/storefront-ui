import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuCheckboxItem,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSub,
  DropdownMenuSubTrigger,
  DropdownMenuSubContent,
} from "./dropdown-menu";

function renderMenu(onSelect = vi.fn()) {
  const utils = render(
    <DropdownMenu>
      <DropdownMenuTrigger>Actions</DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem onSelect={onSelect}>Edit</DropdownMenuItem>
        <DropdownMenuItem variant="danger">Delete</DropdownMenuItem>
        <DropdownMenuSub>
          <DropdownMenuSubTrigger>Move to</DropdownMenuSubTrigger>
          <DropdownMenuSubContent>
            <DropdownMenuItem>Archive</DropdownMenuItem>
            <DropdownMenuItem>Trash</DropdownMenuItem>
          </DropdownMenuSubContent>
        </DropdownMenuSub>
      </DropdownMenuContent>
    </DropdownMenu>,
  );
  return { ...utils, onSelect };
}

describe("DropdownMenu", () => {
  it("is closed until the trigger is activated", async () => {
    const user = userEvent.setup();
    renderMenu();

    expect(screen.queryByRole("menu")).not.toBeInTheDocument();

    await user.click(screen.getByRole("button", { name: "Actions" }));
    expect(await screen.findByRole("menu")).toBeInTheDocument();
    expect(screen.getByRole("menuitem", { name: "Edit" })).toBeInTheDocument();
  });

  it("calls onSelect and closes when an item is chosen", async () => {
    const user = userEvent.setup();
    const { onSelect } = renderMenu();

    await user.click(screen.getByRole("button", { name: "Actions" }));
    await user.click(await screen.findByRole("menuitem", { name: "Edit" }));

    expect(onSelect).toHaveBeenCalledTimes(1);
    expect(screen.queryByRole("menu")).not.toBeInTheDocument();
  });

  it("supports full keyboard operation, including opening a submenu", async () => {
    const user = userEvent.setup();
    renderMenu();

    await user.tab();
    expect(screen.getByRole("button", { name: "Actions" })).toHaveFocus();

    await user.keyboard("{Enter}");
    expect(await screen.findByRole("menu")).toBeInTheDocument();

    await user.keyboard("{ArrowDown}{ArrowDown}{ArrowRight}");
    expect(await screen.findByRole("menuitem", { name: "Archive" })).toBeInTheDocument();
  });

  it("renders a checkbox item with its checked state", async () => {
    const user = userEvent.setup();
    const onCheckedChange = vi.fn();
    render(
      <DropdownMenu defaultOpen>
        <DropdownMenuTrigger>View</DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuCheckboxItem checked={false} onCheckedChange={onCheckedChange}>
            Show sold out
          </DropdownMenuCheckboxItem>
        </DropdownMenuContent>
      </DropdownMenu>,
    );

    const item = await screen.findByRole("menuitemcheckbox", { name: "Show sold out" });
    expect(item).toHaveAttribute("aria-checked", "false");

    await user.click(item);
    expect(onCheckedChange).toHaveBeenCalledWith(true);
  });

  it("renders a radio group and reports the selected item", async () => {
    const user = userEvent.setup();
    const onValueChange = vi.fn();
    render(
      <DropdownMenu defaultOpen>
        <DropdownMenuTrigger>Sort</DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuRadioGroup value="newest" onValueChange={onValueChange}>
            <DropdownMenuRadioItem value="newest">Newest</DropdownMenuRadioItem>
            <DropdownMenuRadioItem value="oldest">Oldest</DropdownMenuRadioItem>
          </DropdownMenuRadioGroup>
        </DropdownMenuContent>
      </DropdownMenu>,
    );

    expect(await screen.findByRole("menuitemradio", { name: "Newest" })).toHaveAttribute(
      "aria-checked",
      "true",
    );

    await user.click(screen.getByRole("menuitemradio", { name: "Oldest" }));
    expect(onValueChange).toHaveBeenCalledWith("oldest");
  });

  it("lets a consumer className win over the default min-width utility", async () => {
    const user = userEvent.setup();
    render(
      <DropdownMenu>
        <DropdownMenuTrigger>Actions</DropdownMenuTrigger>
        <DropdownMenuContent className="min-w-64">
          <DropdownMenuItem>Edit</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>,
    );
    await user.click(screen.getByRole("button", { name: "Actions" }));

    const classes = (await screen.findByRole("menu")).className.split(/\s+/);
    expect(classes).toContain("min-w-64");
    expect(classes).not.toContain("min-w-48");
  });
});
