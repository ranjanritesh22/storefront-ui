import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import { Select } from "./select";

describe("Select", () => {
  it("renders the given options and forwards value changes", async () => {
    const user = userEvent.setup();
    render(
      <Select aria-label="Sort by" defaultValue="popularity">
        <option value="popularity">Popularity</option>
        <option value="price-asc">Price: low to high</option>
      </Select>,
    );

    const select = screen.getByLabelText("Sort by") as HTMLSelectElement;
    expect(select.value).toBe("popularity");
    await user.selectOptions(select, "price-asc");
    expect(select.value).toBe("price-asc");
  });

  it("sets data-invalid and aria-invalid when invalid", () => {
    render(
      <Select aria-label="Size" invalid>
        <option>8</option>
      </Select>,
    );
    const select = screen.getByLabelText("Size");
    expect(select).toHaveAttribute("data-invalid", "true");
    expect(select).toHaveAttribute("aria-invalid", "true");
  });

  it("lets a consumer className win over the default border utility", () => {
    render(
      <Select aria-label="Sort by" className="border-danger">
        <option>Popularity</option>
      </Select>,
    );
    const classes = screen.getByLabelText("Sort by").className.split(/\s+/);
    expect(classes).toContain("border-danger");
    expect(classes).not.toContain("border-border");
  });

  it("lets classNames reach the icon slot", () => {
    render(
      <Select aria-label="Sort by" classNames={{ icon: "custom-icon" }}>
        <option>Popularity</option>
      </Select>,
    );
    const icon = document.querySelector(".custom-icon");
    expect(icon).not.toBeNull();
  });
});
