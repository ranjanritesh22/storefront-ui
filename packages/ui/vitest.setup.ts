import "@testing-library/jest-dom/vitest";

/**
 * jsdom implements neither the Pointer Events capture API nor
 * `scrollIntoView`/`ResizeObserver`. Radix's Select/Popover-based
 * components (Select, Combobox, DatePicker) call these during open/scroll
 * handling, so every test run needs the no-op shims below regardless of
 * which suite runs first.
 */
if (typeof window !== "undefined") {
  if (!window.HTMLElement.prototype.hasPointerCapture) {
    window.HTMLElement.prototype.hasPointerCapture = () => false;
  }
  if (!window.HTMLElement.prototype.setPointerCapture) {
    window.HTMLElement.prototype.setPointerCapture = () => {};
  }
  if (!window.HTMLElement.prototype.releasePointerCapture) {
    window.HTMLElement.prototype.releasePointerCapture = () => {};
  }
  if (!window.HTMLElement.prototype.scrollIntoView) {
    window.HTMLElement.prototype.scrollIntoView = () => {};
  }
  if (!window.ResizeObserver) {
    window.ResizeObserver = class ResizeObserver {
      observe() {}
      unobserve() {}
      disconnect() {}
    };
  }
}
