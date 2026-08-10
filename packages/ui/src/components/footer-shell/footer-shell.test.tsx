import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { FooterShell } from "./footer-shell";

describe("FooterShell", () => {
  it("renders every column's heading and content", () => {
    render(
      <FooterShell
        columns={[
          { heading: "Shop", children: <a href="/new">New</a> },
          { heading: "Help", children: <a href="/contact">Contact</a> },
        ]}
      />,
    );
    expect(screen.getByText("Shop")).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "New" })).toHaveAttribute("href", "/new");
    expect(screen.getByText("Help")).toBeInTheDocument();
  });

  it("renders the bottom bar only when provided", () => {
    const { rerender } = render(<FooterShell />);
    expect(screen.queryByText("© 2026 Acme")).not.toBeInTheDocument();
    rerender(<FooterShell bottomBar={<span>© 2026 Acme</span>} />);
    expect(screen.getByText("© 2026 Acme")).toBeInTheDocument();
  });

  it("renders newsletter and social slots when provided", () => {
    render(<FooterShell newsletter={<span>Newsletter</span>} social={<span>Social</span>} />);
    expect(screen.getByText("Newsletter")).toBeInTheDocument();
    expect(screen.getByText("Social")).toBeInTheDocument();
  });

  it("renders a <footer> landmark", () => {
    render(<FooterShell />);
    expect(screen.getByRole("contentinfo")).toBeInTheDocument();
  });

  it("lets classNames reach a column", () => {
    render(
      <FooterShell
        columns={[{ heading: "Shop", children: null }]}
        classNames={{ column: "custom-column" }}
      />,
    );
    expect(document.querySelector(".custom-column")).toBeInTheDocument();
  });
});
