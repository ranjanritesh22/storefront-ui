import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { SearchBox, type SearchSuggestion } from "./search-box";

const suggestions: SearchSuggestion[] = [
  { id: "p1", label: "Running shoes" },
  { id: "p2", label: "Running shorts" },
];

describe("SearchBox", () => {
  it("shows recent searches when the input is empty and focused", async () => {
    const user = userEvent.setup();
    render(<SearchBox aria-label="Search" recentSearches={["running shoes", "socks"]} />);

    await user.click(screen.getByRole("combobox", { name: "Search" }));

    expect(await screen.findByText("running shoes")).toBeInTheDocument();
    expect(screen.getByText("socks")).toBeInTheDocument();
  });

  it("debounces onQueryChange, settling on the final query text", async () => {
    const user = userEvent.setup();
    const onQueryChange = vi.fn();
    render(<SearchBox aria-label="Search" onQueryChange={onQueryChange} debounceMs={30} />);

    const input = screen.getByRole("combobox", { name: "Search" });
    await user.type(input, "shoe");

    await waitFor(() => expect(onQueryChange).toHaveBeenLastCalledWith("shoe"), { timeout: 1000 });
  });

  it("shows consumer-supplied suggestions once the query is non-empty", async () => {
    const user = userEvent.setup();
    render(<SearchBox aria-label="Search" suggestions={suggestions} />);

    const input = screen.getByRole("combobox", { name: "Search" });
    await user.type(input, "run");

    expect(await screen.findByRole("option", { name: "Running shoes" })).toBeInTheDocument();
    expect(screen.getByRole("option", { name: "Running shorts" })).toBeInTheDocument();
  });

  it("moves aria-activedescendant with ArrowDown and selects a suggestion with Enter", async () => {
    const user = userEvent.setup();
    const onSuggestionSelect = vi.fn();
    render(<SearchBox aria-label="Search" suggestions={suggestions} onSuggestionSelect={onSuggestionSelect} />);

    const input = screen.getByRole("combobox", { name: "Search" });
    await user.type(input, "run");
    await screen.findByRole("option", { name: "Running shoes" });

    await user.keyboard("{ArrowDown}");
    let activeId = input.getAttribute("aria-activedescendant");
    expect(document.getElementById(activeId!)).toHaveTextContent("Running shoes");

    await user.keyboard("{ArrowDown}");
    activeId = input.getAttribute("aria-activedescendant");
    expect(document.getElementById(activeId!)).toHaveTextContent("Running shorts");

    await user.keyboard("{Enter}");
    expect(onSuggestionSelect).toHaveBeenCalledWith(suggestions[1]);
    expect(input).toHaveValue("Running shorts");
  });

  it("submits the raw query with Enter when no suggestion is highlighted", async () => {
    const user = userEvent.setup();
    const onSearch = vi.fn();
    render(<SearchBox aria-label="Search" suggestions={suggestions} onSearch={onSearch} />);

    const input = screen.getByRole("combobox", { name: "Search" });
    await user.type(input, "running{Enter}");

    expect(onSearch).toHaveBeenCalledWith("running");
  });

  it("selects a recent search on click and reports it via onRecentSearchSelect and onSearch", async () => {
    const user = userEvent.setup();
    const onRecentSearchSelect = vi.fn();
    const onSearch = vi.fn();
    render(
      <SearchBox
        aria-label="Search"
        recentSearches={["running shoes"]}
        onRecentSearchSelect={onRecentSearchSelect}
        onSearch={onSearch}
      />,
    );

    await user.click(screen.getByRole("combobox", { name: "Search" }));
    await user.click(await screen.findByRole("option", { name: /running shoes/i }));

    expect(onRecentSearchSelect).toHaveBeenCalledWith("running shoes");
    expect(onSearch).toHaveBeenCalledWith("running shoes");
  });

  it("removes a single recent search without selecting it", async () => {
    const user = userEvent.setup();
    const onRecentSearchRemove = vi.fn();
    const onRecentSearchSelect = vi.fn();
    render(
      <SearchBox
        aria-label="Search"
        recentSearches={["running shoes"]}
        onRecentSearchRemove={onRecentSearchRemove}
        onRecentSearchSelect={onRecentSearchSelect}
      />,
    );

    await user.click(screen.getByRole("combobox", { name: "Search" }));
    await user.click(await screen.findByRole("button", { name: "Remove running shoes from recent searches" }));

    expect(onRecentSearchRemove).toHaveBeenCalledWith("running shoes");
    expect(onRecentSearchSelect).not.toHaveBeenCalled();
  });

  it("clears all recent searches via the clear-all button", async () => {
    const user = userEvent.setup();
    const onRecentSearchesClear = vi.fn();
    render(
      <SearchBox
        aria-label="Search"
        recentSearches={["running shoes", "socks"]}
        onRecentSearchesClear={onRecentSearchesClear}
      />,
    );

    await user.click(screen.getByRole("combobox", { name: "Search" }));
    await user.click(await screen.findByRole("button", { name: "Clear all" }));

    expect(onRecentSearchesClear).toHaveBeenCalled();
  });

  it("shows a loading spinner and announces the loading state", async () => {
    const user = userEvent.setup();
    render(<SearchBox aria-label="Search" suggestions={[]} loading />);

    await user.type(screen.getByRole("combobox", { name: "Search" }), "run");
    expect(screen.getByRole("status")).toHaveTextContent("Searching…");
  });

  it("closes on Escape", async () => {
    const user = userEvent.setup();
    render(<SearchBox aria-label="Search" recentSearches={["socks"]} />);

    await user.click(screen.getByRole("combobox", { name: "Search" }));
    expect(await screen.findByRole("listbox")).toBeInTheDocument();

    await user.keyboard("{Escape}");
    expect(screen.queryByRole("listbox")).not.toBeInTheDocument();
  });

  it("lets a consumer className win over the default border utility", () => {
    render(<SearchBox aria-label="Search" className="border-danger" />);
    const classes = screen.getByRole("combobox", { name: "Search" }).className.split(/\s+/);
    expect(classes).toContain("border-danger");
    expect(classes).not.toContain("border-border");
  });
});
