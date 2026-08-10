import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { SkipLink } from "./skip-link";
import { configureMessages, resetMessages } from "../../i18n/messages";

describe("SkipLink", () => {
  afterEach(() => resetMessages());

  it("defaults to jumping to #main-content with the default message", () => {
    render(<SkipLink />);
    const link = screen.getByRole("link", { name: "Skip to main content" });
    expect(link).toHaveAttribute("href", "#main-content");
  });

  it("lets a custom href and children override the defaults", () => {
    render(<SkipLink href="#content">Skip to content</SkipLink>);
    expect(screen.getByRole("link", { name: "Skip to content" })).toHaveAttribute(
      "href",
      "#content",
    );
  });

  it("reads its default label from getMessages()", () => {
    configureMessages({ skipLink: { label: "Aller au contenu" } });
    render(<SkipLink />);
    expect(screen.getByRole("link", { name: "Aller au contenu" })).toBeInTheDocument();
  });

  it("is visually hidden until focused", () => {
    render(<SkipLink />);
    expect(screen.getByRole("link").className).toContain("sr-only");
  });
});
