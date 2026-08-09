import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { Button } from "./button";

describe("Button", () => {
  it("lets a consumer className win over the default variant on a conflicting utility", () => {
    render(<Button className="bg-danger">Click me</Button>);
    const button = screen.getByRole("button", { name: "Click me" });
    const classes = button.className.split(/\s+/);
    expect(classes).toContain("bg-danger");
    expect(classes).not.toContain("bg-primary");
  });

  it("renders an anchor when asChild is given an <a>", () => {
    render(
      <Button asChild>
        <a href="/cart">Go to cart</a>
      </Button>,
    );
    const link = screen.getByRole("link", { name: "Go to cart" });
    expect(link.tagName).toBe("A");
    expect(link).toHaveAttribute("href", "/cart");
  });

  it("activates via the keyboard", async () => {
    const user = userEvent.setup();
    const onClick = vi.fn();
    render(<Button onClick={onClick}>Save</Button>);

    await user.tab();
    expect(screen.getByRole("button", { name: "Save" })).toHaveFocus();

    await user.keyboard("{Enter}");
    expect(onClick).toHaveBeenCalledTimes(1);

    await user.keyboard(" ");
    expect(onClick).toHaveBeenCalledTimes(2);
  });

  it("blocks clicks while disabled", async () => {
    const user = userEvent.setup();
    const onClick = vi.fn();
    render(
      <Button disabled onClick={onClick}>
        Save
      </Button>,
    );

    await user.click(screen.getByRole("button", { name: "Save" }));
    expect(onClick).not.toHaveBeenCalled();
  });

  it("blocks clicks while loading and exposes loading state", async () => {
    const user = userEvent.setup();
    const onClick = vi.fn();
    render(
      <Button loading onClick={onClick}>
        Save
      </Button>,
    );

    const button = screen.getByRole("button", { name: "Save" });
    expect(button).toHaveAttribute("aria-busy", "true");
    expect(button).toHaveAttribute("data-loading", "true");

    await user.click(button);
    expect(onClick).not.toHaveBeenCalled();
  });
});
