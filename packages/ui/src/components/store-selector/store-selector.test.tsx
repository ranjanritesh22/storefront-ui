import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { StoreSelector } from "./store-selector";

const stores = [
  { id: "downtown", name: "Downtown", address: "123 Main St", distance: "0.5 mi" },
  { id: "uptown", name: "Uptown", address: "456 Oak Ave", distance: "3.1 mi" },
];

describe("StoreSelector", () => {
  it("shows a fallback trigger label when no store is selected", () => {
    render(<StoreSelector stores={stores} onSelectedStoreIdChange={() => {}} />);
    expect(screen.getByRole("button", { name: "Choose store" })).toBeInTheDocument();
  });

  it("shows the selected store's name on the trigger", () => {
    render(
      <StoreSelector
        stores={stores}
        selectedStoreId="downtown"
        onSelectedStoreIdChange={() => {}}
      />,
    );
    expect(screen.getByRole("button", { name: "Choose store" })).toHaveTextContent("Downtown");
  });

  it("lists every store as a radio option when opened", async () => {
    const user = userEvent.setup();
    render(<StoreSelector stores={stores} onSelectedStoreIdChange={() => {}} />);
    await user.click(screen.getByRole("button", { name: "Choose store" }));
    expect(await screen.findAllByRole("radio")).toHaveLength(2);
    expect(screen.getByText("123 Main St")).toBeInTheDocument();
  });

  it("calls onSelectedStoreIdChange when a store is picked", async () => {
    const user = userEvent.setup();
    const onSelectedStoreIdChange = vi.fn();
    render(<StoreSelector stores={stores} onSelectedStoreIdChange={onSelectedStoreIdChange} />);
    await user.click(screen.getByRole("button", { name: "Choose store" }));
    const radios = await screen.findAllByRole("radio");
    await user.click(radios[1]);
    expect(onSelectedStoreIdChange).toHaveBeenCalledWith("uptown");
  });

  it("marks the selected store's radio as checked", async () => {
    const user = userEvent.setup();
    render(
      <StoreSelector
        stores={stores}
        selectedStoreId="uptown"
        onSelectedStoreIdChange={() => {}}
      />,
    );
    await user.click(screen.getByRole("button", { name: "Choose store" }));
    const radios = await screen.findAllByRole("radio");
    expect(radios[1]).toHaveAttribute("aria-checked", "true");
    expect(radios[0]).toHaveAttribute("aria-checked", "false");
  });
});
