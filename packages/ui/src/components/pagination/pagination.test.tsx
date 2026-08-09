import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { Pagination, getPaginationItems } from "./pagination";

describe("getPaginationItems", () => {
  it("returns every page when totalPages fits within the window", () => {
    expect(getPaginationItems(1, 5, 1)).toEqual([1, 2, 3, 4, 5]);
  });

  it("collapses the right side with an ellipsis near the start", () => {
    expect(getPaginationItems(1, 11, 1)).toEqual([1, 2, 3, 4, 5, "ellipsis", 11]);
  });

  it("collapses the left side with an ellipsis near the end", () => {
    expect(getPaginationItems(11, 11, 1)).toEqual([1, "ellipsis", 7, 8, 9, 10, 11]);
  });

  it("collapses both sides with an ellipsis in the middle", () => {
    expect(getPaginationItems(6, 11, 1)).toEqual([1, "ellipsis", 5, 6, 7, "ellipsis", 11]);
  });
});

describe("Pagination", () => {
  it("marks the current page with aria-current", () => {
    render(<Pagination page={3} totalPages={11} />);
    const current = screen.getByRole("button", { name: "Page 3" });
    expect(current).toHaveAttribute("aria-current", "page");
    expect(current).toHaveAttribute("data-state", "active");
  });

  it("disables previous on page 1 and next on the last page", () => {
    const { rerender } = render(<Pagination page={1} totalPages={5} />);
    expect(screen.getByRole("button", { name: "Previous page" })).toBeDisabled();

    rerender(<Pagination page={5} totalPages={5} />);
    expect(screen.getByRole("button", { name: "Next page" })).toBeDisabled();
  });

  it("calls onPageChange with the clicked page", async () => {
    const user = userEvent.setup();
    const onPageChange = vi.fn();
    render(<Pagination page={1} totalPages={5} onPageChange={onPageChange} />);

    await user.click(screen.getByRole("button", { name: "Page 2" }));
    expect(onPageChange).toHaveBeenCalledWith(2);
  });

  it("renders links instead of buttons when hrefFor is given", () => {
    render(<Pagination page={2} totalPages={5} hrefFor={(p) => `?page=${p}`} />);
    expect(screen.getByRole("link", { name: "Page 3" })).toHaveAttribute("href", "?page=3");
  });
});
