import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { AspectRatio } from "./aspect-ratio";

describe("AspectRatio", () => {
  it("renders its child", () => {
    render(
      <AspectRatio data-testid="ratio" ratio={16 / 9}>
        <div>content</div>
      </AspectRatio>,
    );
    expect(screen.getByTestId("ratio")).toHaveTextContent("content");
  });

  it("lets className win over the default overflow class", () => {
    render(
      <AspectRatio data-testid="ratio" className="overflow-visible">
        <div>content</div>
      </AspectRatio>,
    );
    expect(screen.getByTestId("ratio").className).toContain("overflow-visible");
    expect(screen.getByTestId("ratio").className).not.toContain("overflow-hidden");
  });
});
