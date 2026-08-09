import { mkdir, copyFile, watch } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { spawn } from "node:child_process";

const root = dirname(fileURLToPath(import.meta.url));
const srcDir = join(root, "src");
const outDir = join(root, "dist");

const cssFiles = [
  ["tokens.css", "tokens.css"],
  ["themes/dark.css", "themes/dark.css"],
  ["themes/acme.css", "themes/acme.css"],
];

function run(cmd, args) {
  return new Promise((resolve, reject) => {
    const child = spawn(cmd, args, { cwd: root, stdio: "inherit" });
    child.on("exit", (code) => (code === 0 ? resolve() : reject(new Error(`${cmd} exited with ${code}`))));
  });
}

async function buildCss() {
  await mkdir(join(outDir, "themes"), { recursive: true });
  for (const [src, dest] of cssFiles) {
    await copyFile(join(srcDir, src), join(outDir, dest));
  }
}

async function buildTs() {
  await run("tsc", ["-p", "tsconfig.json"]);
}

async function build() {
  await Promise.all([buildCss(), buildTs()]);
  console.log("[@storefront/tokens] built dist/tokens.css, dist/themes/*.css, dist/tokens.js");
}

await build();

if (process.argv.includes("--watch")) {
  const watcher = watch(srcDir, { recursive: true });
  console.log("[@storefront/tokens] watching src/ for changes...");
  for await (const _event of watcher) {
    await build();
  }
}
