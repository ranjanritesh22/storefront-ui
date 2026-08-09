import { mkdir, copyFile, watch } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = dirname(fileURLToPath(import.meta.url));
const srcFile = join(root, "src/index.css");
const outDir = join(root, "dist");
const outFile = join(outDir, "index.css");

async function build() {
  await mkdir(outDir, { recursive: true });
  await copyFile(srcFile, outFile);
  console.log("[@storefront/tokens] built dist/index.css");
}

await build();

if (process.argv.includes("--watch")) {
  const watcher = watch(join(root, "src"), { recursive: true });
  console.log("[@storefront/tokens] watching src/ for changes...");
  for await (const _event of watcher) {
    await build();
  }
}
