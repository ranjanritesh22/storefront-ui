import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, describe, expect, it, vi } from "vitest";
import { CompareBar, type CompareBarItem } from "./compare-bar";
import { Button } from "../button/button";
import { configureMessages, resetMessages } from "../../i18n/messages";

const ITEMS: CompareBarItem[] = [
  { id: "1", label: "Trail Runner" },
  { id: "2", label: "Road Runner" },
];

describe("CompareBar", () => {
  afterEach(() => {
    resetMessages();
  });

  it("renders nothing when items is empty", () => {
    const { container } = render(<CompareBar items={[]} />);
    expect(container).toBeEmptyDOMElement();
  });

  it("renders each item's label", () => {
    render(<CompareBar items={ITEMS} />);
    expect(screen.getByText("Trail Runner")).toBeInTheDocument();
    expect(screen.getByText("Road Runner")).toBeInTheDocument();
  });

  it("shows the item count in the compare button's default copy", () => {
    render(<CompareBar items={ITEMS} />);
    expect(screen.getByRole("button", { name: "Compare (2)" })).toBeInTheDocument();
  });

  it("is translatable via configureMessages", () => {
    configureMessages({ compareBar: { compare: (count) => `Vergleichen (${count})` } });
    render(<CompareBar items={ITEMS} />);
    expect(screen.getByRole("button", { name: "Vergleichen (2)" })).toBeInTheDocument();
  });

  it("calls onRemoveItem with the item's id when its remove button is clicked", async () => {
    const user = userEvent.setup();
    const onRemoveItem = vi.fn();
    render(<CompareBar items={ITEMS} onRemoveItem={onRemoveItem} />);
    await user.click(screen.getByLabelText("Remove Trail Runner from compare"));
    expect(onRemoveItem).toHaveBeenCalledWith("1");
  });

  it("calls onClearAll when Clear all is clicked", async () => {
    const user = userEvent.setup();
    const onClearAll = vi.fn();
    render(<CompareBar items={ITEMS} onClearAll={onClearAll} />);
    await user.click(screen.getByRole("button", { name: "Clear all" }));
    expect(onClearAll).toHaveBeenCalledTimes(1);
  });

  it("calls onCompare when Compare is clicked", async () => {
    const user = userEvent.setup();
    const onCompare = vi.fn();
    render(<CompareBar items={ITEMS} onCompare={onCompare} />);
    await user.click(screen.getByRole("button", { name: "Compare (2)" }));
    expect(onCompare).toHaveBeenCalledTimes(1);
  });

  it("lets classNames reach individual slots", () => {
    render(<CompareBar items={ITEMS} classNames={{ compareButton: "custom-compare" }} />);
    expect(screen.getByRole("button", { name: "Compare (2)" }).className).toContain("custom-compare");
  });

  it("lets slots replace the default CompareButton", () => {
    render(
      <CompareBar
        items={ITEMS}
        slots={{ CompareButton: (props) => <Button {...props} data-testid="custom-compare" /> }}
      />,
    );
    expect(screen.getByTestId("custom-compare")).toHaveTextContent("Compare (2)");
  });

  it("lets a consumer className win on the root", () => {
    const { container } = render(<CompareBar items={ITEMS} className="custom-root" />);
    expect(container.firstChild).toHaveClass("custom-root");
  });

  it("has an accessible region label", () => {
    render(<CompareBar items={ITEMS} />);
    expect(screen.getByRole("region", { name: "Compare products" })).toBeInTheDocument();
  });
});
