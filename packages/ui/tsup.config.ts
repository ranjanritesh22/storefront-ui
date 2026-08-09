import { defineConfig } from "tsup";

export default defineConfig({
  // Every non-test, non-story module is its own entry — required by
  // `bundle: false` below so internal relative imports (e.g. Button
  // importing cn()) resolve to real compiled files instead of being
  // silently left unresolved.
  entry: ["src/**/*.{ts,tsx}", "!src/**/*.test.{ts,tsx}", "!src/**/*.stories.{ts,tsx}"],
  format: ["esm"],
  dts: true,
  // esbuild-plugin-preserve-directives (the CLAUDE.md-documented approach)
  // mutates its in-memory outputFiles correctly but tsup@8.5.1 never writes
  // those mutated bytes to disk — verified by instrumenting the plugin, the
  // directive lands in `file.contents` yet dist/*.js ships without it.
  // `bundle: false` sidesteps the whole hazard: each source module compiles
  // to its own dist file 1:1, so a "use client" directive is never merged
  // into a file alongside directive-less modules and dropped by esbuild.
  bundle: false,
  sourcemap: true,
  clean: true,
  external: ["react", "react-dom"],
});
