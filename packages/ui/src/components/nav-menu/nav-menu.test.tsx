import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import {
  NavMenu,
  NavMenuList,
  NavMenuItem,
  NavMenuTrigger,
  NavMenuContent,
  NavMenuLink,
} from "./nav-menu";

function Example() {
  return (
    <NavMenu>
      <NavMenuList>
        <NavMenuItem>
          <NavMenuLink href="/new">New Arrivals</NavMenuLink>
        </NavMenuItem>
        <NavMenuItem>
          <NavMenuTrigger>Men</NavMenuTrigger>
          <NavMenuContent>
            <NavMenuLink href="/men/shoes">Shoes</NavMenuLink>
          </NavMenuContent>
        </NavMenuItem>
      </NavMenuList>
    </NavMenu>
  );
}

describe("NavMenu", () => {
  it("renders a plain link item", () => {
    render(<Example />);
    expect(screen.getByRole("link", { name: "New Arrivals" })).toHaveAttribute("href", "/new");
  });

  it("has a default aria-label from getMessages()", () => {
    render(<Example />);
    expect(screen.getByRole("navigation", { name: "Main" })).toBeInTheDocument();
  });

  it("opens a trigger's content on click", async () => {
    const user = userEvent.setup();
    render(<Example />);
    await user.click(screen.getByRole("button", { name: "Men" }));
    expect(await screen.findByRole("link", { name: "Shoes" })).toBeInTheDocument();
  });

  it("lets a custom aria-label override the default", () => {
    render(
      <NavMenu aria-label="Utility">
        <NavMenuList>
          <NavMenuItem>
            <NavMenuLink href="/help">Help</NavMenuLink>
          </NavMenuItem>
        </NavMenuList>
      </NavMenu>,
    );
    expect(screen.getByRole("navigation", { name: "Utility" })).toBeInTheDocument();
  });
});
