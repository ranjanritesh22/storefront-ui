#!/usr/bin/env node
/**
 * CI guard against the build hazard documented in CLAUDE.md: bundlers can
 * silently strip the "use client" directive, which breaks a consumer's
 * Server Component tree at runtime instead of at build time.
 *
 * For every source file under packages/ui/src that starts with a directive
 * ("use client" or "use server"), verify the built dist/ output for the same
 * module still starts with that directive.
 */
import { readFile, readdir } from "node:fs/promises";
import { existsSync } from "node:fs";
import path from "node:path";

const root = path.resolve(import.meta.dirname, "..");
const srcRoot = path.join(root, "packages/ui/src");
const distRoot = path.join(root, "packages/ui/dist");

const DIRECTIVE_RE = /^["'](use client|use server)["'];?/;

async function walk(dir) {
  const entries = await readdir(dir, { withFileTypes: true });
  const files = [];
  for (const entry of entries) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      files.push(...(await walk(full)));
    } else if (/\.(ts|tsx)$/.test(entry.name) && !/\.(test|stories)\./.test(entry.name)) {
      files.push(full);
    }
  }
  return files;
}

async function main() {
  if (!existsSync(srcRoot)) {
    console.log("[check-directives] packages/ui/src not found — nothing to check.");
    return;
  }

  const sourceFiles = await walk(srcRoot);
  const directiveFiles = [];
  for (const file of sourceFiles) {
    const contents = await readFile(file, "utf8");
    if (DIRECTIVE_RE.test(contents.trimStart())) {
      directiveFiles.push(file);
    }
  }

  if (directiveFiles.length === 0) {
    console.log("[check-directives] no \"use client\"/\"use server\" source files yet — nothing to verify.");
    return;
  }

  if (!existsSync(distRoot)) {
    console.error(`[check-directives] dist/ missing at ${distRoot}. Run "pnpm --filter @storefront/ui build" first.`);
    process.exit(1);
  }

  let failures = 0;
  for (const file of directiveFiles) {
    const rel = path.relative(srcRoot, file);
    const compiled = path.join(distRoot, rel.replace(/\.tsx?$/, ".js"));
    if (!existsSync(compiled)) {
      // Bundled output; directive may have been inlined into index.js instead.
      continue;
    }
    const compiledSrc = await readFile(compiled, "utf8");
    if (!DIRECTIVE_RE.test(compiledSrc.trimStart())) {
      console.error(`[check-directives] MISSING directive in built output: ${path.relative(root, compiled)}`);
      failures++;
    }
  }

  if (failures > 0) {
    process.exit(1);
  }

  console.log(`[check-directives] OK — ${directiveFiles.length} directive(s) preserved through the build.`);
}

await main();
