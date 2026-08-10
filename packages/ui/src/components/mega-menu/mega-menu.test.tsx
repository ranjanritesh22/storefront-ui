import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import { MegaMenu, type MegaMenuItem } from "./mega-menu";

const items: MegaMenuItem[] = [
  { label: "New Arrivals", href: "/new" },
  {
    label: "Men",
    sections: [
      { heading: "Footwear", links: [{ label: "Shoes", href: "/men/shoes" }] },
      { heading: "Apparel", links: [{ label: "Jackets", href: "/men/jackets" }] },
    ],
    featured: { title: "Winter drop", href: "/men/featured" },
  },
];

describe("MegaMenu", () => {
  it("renders a plain link item", () => {
    render(<MegaMenu items={items} />);
    expect(screen.getByRole("link", { name: "New Arrivals" })).toHaveAttribute("href", "/new");
  });

  it("has a default aria-label from getMessages()", () => {
    render(<MegaMenu items={items} />);
    expect(screen.getByRole("navigation", { name: "Main" })).toBeInTheDocument();
  });

  it("opens a multi-column panel on trigger click, with section headings and links", async () => {
    const user = userEvent.setup();
    render(<MegaMenu items={items} />);
    await user.click(screen.getByRole("button", { name: "Men" }));
    expect(await screen.findByText("Footwear")).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Shoes" })).toHaveAttribute("href", "/men/shoes");
    expect(screen.getByRole("link", { name: "Jackets" })).toHaveAttribute("href", "/men/jackets");
  });

  it("renders the featured link inside the open panel", async () => {
    const user = userEvent.setup();
    render(<MegaMenu items={items} />);
    await user.click(screen.getByRole("button", { name: "Men" }));
    expect(await screen.findByRole("link", { name: "Winter drop" })).toHaveAttribute(
      "href",
      "/men/featured",
    );
  });

  it("lets slots.Link swap the rendered anchor", () => {
    function FakeLink({ href, children, className }: { href: string; children: React.ReactNode; className?: string }) {
      return (
        <a href={href} data-fake-link="true" className={className}>
          {children}
        </a>
      );
    }
    render(<MegaMenu items={[{ label: "New Arrivals", href: "/new" }]} slots={{ Link: FakeLink }} />);
    expect(screen.getByRole("link", { name: "New Arrivals" })).toHaveAttribute(
      "data-fake-link",
      "true",
    );
  });
});
