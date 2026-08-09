import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Breadcrumb } from "./breadcrumb";

const items = [
  { label: "Home", href: "/" },
  { label: "Men", href: "/men" },
  { label: "Shoes" },
];

describe("Breadcrumb", () => {
  it("renders every item's label", () => {
    render(<Breadcrumb items={items} />);
    expect(screen.getByText("Home")).toBeInTheDocument();
    expect(screen.getByText("Men")).toBeInTheDocument();
    expect(screen.getByText("Shoes")).toBeInTheDocument();
  });

  it("links every item except the last, marking the last as the current page", () => {
    render(<Breadcrumb items={items} />);
    expect(screen.getByRole("link", { name: "Home" })).toHaveAttribute("href", "/");
    expect(screen.getByRole("link", { name: "Men" })).toHaveAttribute("href", "/men");
    expect(screen.queryByRole("link", { name: "Shoes" })).not.toBeInTheDocument();
    expect(screen.getByText("Shoes")).toHaveAttribute("aria-current", "page");
  });

  it("lets a slot swap the anchor for a custom link component", () => {
    function FakeLink({ href, children, className }: { href: string; children: React.ReactNode; className?: string }) {
      return (
        <a href={href} data-fake-link="true" className={className}>
          {children}
        </a>
      );
    }
    render(<Breadcrumb items={items} slots={{ Link: FakeLink }} />);
    expect(screen.getByRole("link", { name: "Home" })).toHaveAttribute("data-fake-link", "true");
  });

  it("lets classNames reach the list", () => {
    render(<Breadcrumb items={items} classNames={{ list: "custom-list" }} />);
    expect(document.querySelector("ol")?.className).toContain("custom-list");
  });
});
