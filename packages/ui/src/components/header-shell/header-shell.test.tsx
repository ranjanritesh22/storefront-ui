import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { HeaderShell } from "./header-shell";

describe("HeaderShell", () => {
  it("always renders the logo slot", () => {
    render(<HeaderShell logo={<span>Acme</span>} />);
    expect(screen.getByText("Acme")).toBeInTheDocument();
  });

  it("only renders optional slots that are provided", () => {
    render(<HeaderShell logo={<span>Acme</span>} />);
    expect(screen.queryByText("Search")).not.toBeInTheDocument();
  });

  it("renders every slot when provided", () => {
    render(
      <HeaderShell
        logo={<span>Acme</span>}
        utilityBar={<span>Free shipping</span>}
        search={<span>Search</span>}
        nav={<span>Nav</span>}
        mobileNav={<span>MobileNav</span>}
        actions={<span>Actions</span>}
      />,
    );
    expect(screen.getByText("Free shipping")).toBeInTheDocument();
    expect(screen.getByText("Search")).toBeInTheDocument();
    expect(screen.getByText("Nav")).toBeInTheDocument();
    expect(screen.getByText("MobileNav")).toBeInTheDocument();
    expect(screen.getByText("Actions")).toBeInTheDocument();
  });

  it("renders a <header> landmark", () => {
    render(<HeaderShell logo={<span>Acme</span>} />);
    expect(screen.getByRole("banner")).toBeInTheDocument();
  });

  it("lets classNames reach the inner container", () => {
    render(<HeaderShell logo={<span>Acme</span>} classNames={{ inner: "custom-inner" }} />);
    expect(document.querySelector(".custom-inner")).toBeInTheDocument();
  });
});
