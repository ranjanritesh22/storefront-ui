import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import { MobileNav, type MobileNavItem } from "./mobile-nav";

const items: MobileNavItem[] = [
  {
    label: "Men",
    children: [
      { label: "Shoes", href: "/men/shoes" },
      { label: "Apparel", href: "/men/apparel" },
    ],
  },
  { label: "Sale", href: "/sale" },
];

describe("MobileNav", () => {
  it("opens the drawer when the trigger is clicked", async () => {
    const user = userEvent.setup();
    render(<MobileNav items={items} />);
    await user.click(screen.getByRole("button", { name: "Open menu" }));
    expect(screen.getByRole("dialog")).toBeInTheDocument();
    expect(screen.getByText("Men")).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Sale" })).toHaveAttribute("href", "/sale");
  });

  it("drills into a category and shows a back button", async () => {
    const user = userEvent.setup();
    render(<MobileNav items={items} />);
    await user.click(screen.getByRole("button", { name: "Open menu" }));
    await user.click(screen.getByRole("button", { name: "Men" }));
    expect(screen.getByRole("link", { name: "Shoes" })).toHaveAttribute("href", "/men/shoes");
    expect(screen.queryByRole("link", { name: "Sale" })).not.toBeInTheDocument();
    expect(screen.getByRole("button", { name: /back to/i })).toBeInTheDocument();
  });

  it("navigates back to the root list", async () => {
    const user = userEvent.setup();
    render(<MobileNav items={items} />);
    await user.click(screen.getByRole("button", { name: "Open menu" }));
    await user.click(screen.getByRole("button", { name: "Men" }));
    await user.click(screen.getByRole("button", { name: /back to/i }));
    expect(screen.getByRole("link", { name: "Sale" })).toBeInTheDocument();
  });

  it("closes the drawer when a leaf link is clicked", async () => {
    const user = userEvent.setup();
    render(<MobileNav items={items} />);
    await user.click(screen.getByRole("button", { name: "Open menu" }));
    await user.click(screen.getByRole("link", { name: "Sale" }));
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });

  it("supports a controlled open prop", () => {
    render(<MobileNav items={items} open onOpenChange={() => {}} />);
    expect(screen.getByRole("dialog")).toBeInTheDocument();
  });

  it("lets a custom trigger replace the default hamburger button", () => {
    render(
      <MobileNav items={items} trigger={<button type="button">Custom trigger</button>} />,
    );
    expect(screen.getByRole("button", { name: "Custom trigger" })).toBeInTheDocument();
  });

  it("does not nest a <button> inside the default trigger's <button>", () => {
    render(<MobileNav items={items} />);
    const trigger = screen.getByRole("button", { name: "Open menu" });
    expect(trigger.tagName).toBe("BUTTON");
    expect(trigger.querySelector("button")).toBeNull();
  });
});
