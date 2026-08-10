import { render } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Skeleton, SkeletonText } from "./skeleton";

describe("Skeleton", () => {
  it("is aria-hidden, since it's purely decorative", () => {
    const { container } = render(<Skeleton data-testid="sk" />);
    expect(container.firstChild).toHaveAttribute("aria-hidden", "true");
  });

  it.each(["text", "circle", "rect"] as const)("renders the %s shape", (shape) => {
    const { container } = render(<Skeleton shape={shape} />);
    expect(container.firstChild).toBeInTheDocument();
  });

  it("lets a consumer className win over the default shape sizing", () => {
    const { container } = render(<Skeleton shape="circle" className="size-20" />);
    const classes = (container.firstChild as HTMLElement).className.split(/\s+/);
    expect(classes).toContain("size-20");
    expect(classes).not.toContain("size-10");
  });
});

describe("SkeletonText", () => {
  it("renders the default number of lines", () => {
    const { container } = render(<SkeletonText />);
    expect(container.firstChild?.childNodes).toHaveLength(3);
  });

  it("renders a custom number of lines", () => {
    const { container } = render(<SkeletonText lines={5} />);
    expect(container.firstChild?.childNodes).toHaveLength(5);
  });

  it("applies a narrower width to only the last line", () => {
    const { container } = render(<SkeletonText lines={2} lastLineClassName="w-1/2" />);
    const [first, last] = Array.from(container.firstChild!.childNodes) as HTMLElement[];
    expect(first.className).not.toContain("w-1/2");
    expect(last.className).toContain("w-1/2");
  });
});
