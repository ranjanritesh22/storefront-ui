import { afterEach, describe, expect, it } from "vitest";
import { configureMessages, defaultMessages, getMessages, resetMessages } from "./messages";

describe("messages", () => {
  afterEach(() => {
    resetMessages();
  });

  it("returns the English defaults with no configuration", () => {
    expect(getMessages().productCard.addToCart).toBe("Add to cart");
  });

  it("merges a partial namespace override, leaving sibling keys untouched", () => {
    configureMessages({ productCard: { addToCart: "In den Warenkorb" } });
    const messages = getMessages();
    expect(messages.productCard.addToCart).toBe("In den Warenkorb");
    expect(messages.productCard.addToWishlist).toBe(defaultMessages.productCard.addToWishlist);
  });

  it("leaves namespaces not mentioned in the override untouched", () => {
    configureMessages({ productCard: { addToCart: "In den Warenkorb" } });
    expect(getMessages().dialog.close).toBe(defaultMessages.dialog.close);
  });

  it("supports overriding a message function, not just a string", () => {
    configureMessages({
      productCard: { colorsCount: (count) => `${count} Farbe${count === 1 ? "" : "n"}` },
    });
    expect(getMessages().productCard.colorsCount(1)).toBe("1 Farbe");
    expect(getMessages().productCard.colorsCount(3)).toBe("3 Farben");
  });

  it("resetMessages restores the English defaults", () => {
    configureMessages({ dialog: { close: "Schließen" } });
    resetMessages();
    expect(getMessages().dialog.close).toBe("Close");
  });
});
