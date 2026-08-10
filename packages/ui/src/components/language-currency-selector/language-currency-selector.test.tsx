import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { LanguageCurrencySelector } from "./language-currency-selector";

const languages = [
  { value: "en", label: "English" },
  { value: "fr", label: "Français" },
];
const currencies = [
  { value: "usd", label: "USD" },
  { value: "eur", label: "EUR" },
];

describe("LanguageCurrencySelector", () => {
  it("shows the selected language and currency on the trigger", () => {
    render(
      <LanguageCurrencySelector
        languages={languages}
        currencies={currencies}
        language="en"
        currency="usd"
        onLanguageChange={() => {}}
        onCurrencyChange={() => {}}
      />,
    );
    expect(screen.getByRole("button", { name: /language and currency/i })).toHaveTextContent(
      "English / USD",
    );
  });

  it("opens a panel with both fields on trigger click", async () => {
    const user = userEvent.setup();
    render(
      <LanguageCurrencySelector
        languages={languages}
        currencies={currencies}
        language="en"
        currency="usd"
        onLanguageChange={() => {}}
        onCurrencyChange={() => {}}
      />,
    );
    await user.click(screen.getByRole("button", { name: /language and currency/i }));
    expect(await screen.findByText("Language")).toBeInTheDocument();
    expect(screen.getByText("Currency")).toBeInTheDocument();
  });

  it("calls onLanguageChange when a new language is picked", async () => {
    const user = userEvent.setup();
    const onLanguageChange = vi.fn();
    render(
      <LanguageCurrencySelector
        languages={languages}
        currencies={currencies}
        language="en"
        currency="usd"
        onLanguageChange={onLanguageChange}
        onCurrencyChange={() => {}}
      />,
    );
    await user.click(screen.getByRole("button", { name: /language and currency/i }));
    await user.click(await screen.findByRole("combobox", { name: "Language" }));
    await user.click(await screen.findByRole("option", { name: "Français" }));
    expect(onLanguageChange).toHaveBeenCalledWith("fr");
  });

  it("lets a custom label override the default trigger aria-label", () => {
    render(
      <LanguageCurrencySelector
        languages={languages}
        currencies={currencies}
        language="en"
        currency="usd"
        onLanguageChange={() => {}}
        onCurrencyChange={() => {}}
        label="Region settings"
      />,
    );
    expect(screen.getByRole("button", { name: "Region settings" })).toBeInTheDocument();
  });
});
