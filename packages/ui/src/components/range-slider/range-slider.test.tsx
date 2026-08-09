import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { RangeSlider } from "./range-slider";

describe("RangeSlider", () => {
  it("renders two labeled thumbs at the default bounds", () => {
    render(<RangeSlider min={0} max={100} />);
    expect(screen.getByLabelText("Minimum value")).toHaveValue("0");
    expect(screen.getByLabelText("Maximum value")).toHaveValue("100");
  });

  it("keeps the lower thumb from crossing the upper thumb", () => {
    render(<RangeSlider min={0} max={100} defaultValue={[20, 80]} minStepsBetweenThumbs={5} />);

    const lower = screen.getByLabelText("Minimum value") as HTMLInputElement;
    fireEvent.change(lower, { target: { value: "95" } });

    expect(Number(lower.value)).toBeLessThanOrEqual(75);
  });

  it("calls onChange with the committed [lower, upper] tuple", () => {
    const onChange = vi.fn();
    render(<RangeSlider min={0} max={100} defaultValue={[20, 80]} onChange={onChange} />);

    const upper = screen.getByLabelText("Maximum value") as HTMLInputElement;
    fireEvent.change(upper, { target: { value: "60" } });

    expect(onChange).toHaveBeenCalledWith([20, 60]);
  });

  it("formats the output row via formatValue", () => {
    render(
      <RangeSlider
        min={999}
        max={15999}
        defaultValue={[999, 15999]}
        formatValue={(v) => `₹${v.toLocaleString("en-IN")}`}
      />,
    );
    expect(screen.getByText("₹999")).toBeInTheDocument();
  });

  it("hides the output row when hideOutput is set", () => {
    render(<RangeSlider defaultValue={[0, 100]} hideOutput />);
    expect(screen.queryByText("0")).not.toBeInTheDocument();
  });
});
