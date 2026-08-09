import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Price } from "./price";

describe("Price", () => {
  it("formats the value using Intl.NumberFormat for the given locale/currency", () => {
    render(<Price value={49.99} currency="USD" locale="en-US" />);
    expect(screen.getByText("$49.99")).toBeInTheDocument();
  });

  it("formats using a different locale/currency pair", () => {
    render(<Price value={49.99} currency="EUR" locale="de-DE" />);
    expect(screen.getByText(/49,99/)).toBeInTheDocument();
  });

  it("renders a struck-through original price and flips data-sale when on sale", () => {
    render(<Price value={34.99} originalValue={49.99} currency="USD" locale="en-US" />);
    expect(screen.getByText("$34.99")).toBeInTheDocument();
    const original = screen.getByText("$49.99");
    expect(original.tagName).toBe("S");
    expect(original.closest("span")).toHaveAttribute("data-sale", "true");
  });

  it("omits the original price and data-sale when not on sale", () => {
    render(<Price value={49.99} originalValue={49.99} currency="USD" locale="en-US" />);
    expect(screen.queryByText("S", { selector: "s" })).not.toBeInTheDocument();
    const root = screen.getByText("$49.99").closest("span");
    expect(root).not.toHaveAttribute("data-sale");
  });

  it("lets a consumer className win on a conflicting utility", () => {
    render(<Price value={9.99} className="text-sm" size="lg" />);
    const root = screen.getByText("$9.99").closest("span");
    expect(root?.className.split(/\s+/)).toContain("text-sm");
  });
});
