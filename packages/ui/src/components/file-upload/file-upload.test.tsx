import { render, screen, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { FileUpload, type FileUploadItem } from "./file-upload";

function makeFile(name: string, sizeInBytes: number, type = "image/png") {
  const file = new File(["x".repeat(Math.min(sizeInBytes, 10))], name, { type });
  Object.defineProperty(file, "size", { value: sizeInBytes });
  return file;
}

describe("FileUpload", () => {
  it("adds a file selected through the native picker and announces it", async () => {
    const user = userEvent.setup();
    render(<FileUpload aria-label="Product images" />);

    const input = document.querySelector("input[type=file]") as HTMLInputElement;
    const file = makeFile("sneaker.png", 2048);
    await user.upload(input, file);

    expect(screen.getByText("sneaker.png")).toBeInTheDocument();
    expect(screen.getByText("2.0 KB")).toBeInTheDocument();
    expect(screen.getByRole("status")).toHaveTextContent("1 file added");
  });

  it("accepts a dropped file via the dropzone", () => {
    render(<FileUpload aria-label="Product images" />);
    const dropzone = document.querySelector("label") as HTMLLabelElement;
    const file = makeFile("boot.png", 1024);

    fireEvent.drop(dropzone, { dataTransfer: { files: [file] } });

    expect(screen.getByText("boot.png")).toBeInTheDocument();
  });

  it("flags an oversized file with an error row instead of silently dropping it", async () => {
    const user = userEvent.setup();
    render(<FileUpload aria-label="Product images" maxSize={1024} />);

    const input = document.querySelector("input[type=file]") as HTMLInputElement;
    await user.upload(input, makeFile("huge.png", 5000));

    const row = screen.getByText("huge.png").closest("li");
    expect(row).toHaveAttribute("data-status", "error");
    expect(row).toHaveTextContent("exceeds the 1.0 KB limit");
  });

  it("rejects a dropped file that doesn't match accept", () => {
    // Dropped (not picked) files bypass the OS/native `accept` filter, so this
    // component re-validates them itself — assert via drop, since
    // `userEvent.upload` on an <input accept> realistically won't let a
    // mismatched file through the native picker in the first place.
    render(<FileUpload aria-label="Documents" accept="image/*" />);
    const dropzone = document.querySelector("label") as HTMLLabelElement;
    fireEvent.drop(dropzone, { dataTransfer: { files: [makeFile("resume.pdf", 100, "application/pdf")] } });

    const row = screen.getByText("resume.pdf").closest("li");
    expect(row).toHaveAttribute("data-status", "error");
    expect(row).toHaveTextContent("is not an accepted file type");
  });

  it("removes a file via its remove button", async () => {
    const user = userEvent.setup();
    render(<FileUpload aria-label="Product images" />);

    const input = document.querySelector("input[type=file]") as HTMLInputElement;
    await user.upload(input, makeFile("sneaker.png", 2048));
    await user.click(screen.getByRole("button", { name: "Remove sneaker.png" }));

    expect(screen.queryByText("sneaker.png")).not.toBeInTheDocument();
  });

  it("moves the roving remove-button focus with arrow keys and removes with Delete", async () => {
    const user = userEvent.setup();
    render(<FileUpload aria-label="Product images" />);

    const input = document.querySelector("input[type=file]") as HTMLInputElement;
    await user.upload(input, [makeFile("a.png", 100), makeFile("b.png", 100)]);

    const removeA = screen.getByRole("button", { name: "Remove a.png" });
    const removeB = screen.getByRole("button", { name: "Remove b.png" });
    expect(removeA).toHaveAttribute("tabindex", "0");
    expect(removeB).toHaveAttribute("tabindex", "-1");

    removeA.focus();
    await user.keyboard("{ArrowDown}");
    expect(removeB).toHaveFocus();

    await user.keyboard("{Delete}");
    expect(screen.queryByText("b.png")).not.toBeInTheDocument();
  });

  it("supports controlled files + onFilesChange", async () => {
    const user = userEvent.setup();
    const onFilesChange = vi.fn();
    const { rerender } = render(<FileUpload aria-label="Product images" files={[]} onFilesChange={onFilesChange} />);

    const input = document.querySelector("input[type=file]") as HTMLInputElement;
    await user.upload(input, makeFile("sneaker.png", 100));

    expect(onFilesChange).toHaveBeenCalledTimes(1);
    const next = onFilesChange.mock.calls[0][0] as FileUploadItem[];
    expect(next).toHaveLength(1);

    // Parent owns state: without a rerender, the list stays empty.
    expect(screen.queryByText("sneaker.png")).not.toBeInTheDocument();
    rerender(<FileUpload aria-label="Product images" files={next} onFilesChange={onFilesChange} />);
    expect(screen.getByText("sneaker.png")).toBeInTheDocument();
  });

  it("exposes data-invalid and data-disabled on the dropzone", () => {
    render(<FileUpload aria-label="Product images" invalid disabled />);
    const dropzone = document.querySelector("label");
    expect(dropzone).toHaveAttribute("data-invalid", "true");
    expect(dropzone).toHaveAttribute("data-disabled", "true");
  });

  it("lets a consumer className reach the dropzone", () => {
    render(<FileUpload aria-label="Product images" className="custom-dropzone" />);
    expect(document.querySelector("label")?.className).toContain("custom-dropzone");
  });
});
