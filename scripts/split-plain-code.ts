/* eslint-disable regexp/no-super-linear-backtracking */
/**
 * Multi-file Plain Code Splitter (TypeScript, Node ≥ 18)
 * ------------------------------------------------------
 * PURPOSE
 *  This script takes a single "plain code" file that actually contains MANY files,
 *  each delimited by a header comment like:
 *
 *    // File: src/index.css
 *    <file contents here until the next header>
 *
 *  It splits the bundle and writes each discovered file to disk, creating folders
 *  as needed. Existing files are overwritten by default.
 *
 * INPUT FORMAT (STRICT BUT FRIENDLY)
 *  • A file can contain any number of sections. Each section MUST begin with a header:
 *        <comment-prefix> File: <relative/path>
 *
 *    where <comment-prefix> may be one of (case-sensitive):
 *        //    #    ;    --    <!--
 *    and the closing --> is allowed for HTML-style comments *on the same line*.
 *
 *    Examples of valid headers:
 *      // File: src/App.tsx
 *      # File: README.md
 *      ; File: scripts/seed.sql
 *      -- File: infra/main.tf
 *      <!-- File: public/index.html -->
 *
 *  • The header line itself is NEVER included in the output file's content.
 *  • A file's content is everything after its header up to (but NOT including)
 *    the next header, or end-of-file.
 *  • File paths MUST be relative. Attempts to escape the output root (e.g. "../")
 *    or use absolute paths are rejected for safety.
 *  • Duplicate file paths are allowed; the LAST one wins (later section overrides earlier).
 *
 * OPTIONAL MARKDOWN CODE FENCE STRIPPING
 *  When exporting from chats, you may end up with per-file content wrapped in
 *  Markdown code fences:
 *
 *      ```ts
 *      // ...real contents...
 *      ```
 *
 *  Pass --strip-md-fences to remove a single leading and trailing triple-backtick
 *  fence *inside each section only if* the section's trimmed content clearly starts
 *  and ends with ``` on its own lines. (Internal fences remain untouched.)
 *
 * WHAT THE SCRIPT DOES
 *  1) Parses the bundle, locating headers with a regex that supports the prefixes above.
 *  2) Builds a list of { relativePath, content } sections.
 *  3) For each section:
 *      - Validates/sanitizes the target path so it cannot escape the output root
 *        (e.g., via ../../).
 *      - Creates parent directories (recursive).
 *      - Writes the file (UTF-8), overwriting if it exists.
 *
 * CLI
 *  split-plain-code.ts <bundlePath> [--out <dir>] [--dry-run] [--strip-md-fences]
 *
 *  • <bundlePath>         Path to the input "plain code" bundle file.
 *  • --out <dir>          Output root directory (default: current working dir).
 *  • --dry-run            Don't write files; just print what would be written.
 *  • --strip-md-fences    Strip surrounding ``` fences in each section when detected.
 *
 * EXIT CODES
 *  • 0 on success
 *  • 1 on validation or IO errors
 *
 * NOTES & TIPS
 *  • Keep headers at the start of a line for best results.
 *  • You can place small descriptive comments between sections; they'll be
 *    treated as part of the previous section unless they introduce a new header.
 *  • If you need different header syntax, tweak HEADER_RE below.
 *
 * SECURITY
 *  • By default, all files are written under --out. Any section whose relative
 *    path would resolve outside --out is rejected.
 *
 * EXAMPLE
 *  ```
 *  // File: src/index.css
 *  \@tailwind base;
 *  \@tailwind components;
 *  \@tailwind utilities;
 *  ```
 *
 *  // File: src/main.tsx
 *  import React from "react";
 *  ...
 *
 *  Running:
 *    npx tsx split-plain-code.ts ./bundle.txt --out .
 *
 *  Produces:
 *    ./src/index.css
 *    ./src/main.tsx
 */
import fs from 'node:fs/promises';
import path from 'node:path';

interface Section {
  relativePath: string;
  content: string;
}

// Improved regex: avoids super-linear backtracking and empty alternatives
// eslint-disable-next-line sonarjs/slow-regex
const HEADER_RE = /^\s*(?:\/\/|#|;|--|<!--)\s*File:\s*(\S[^\n]*)\s*(?:-->\s*)?$/;

/**
 * Parses CLI arguments into individual options for the splitter.
 * @param argv - Array of raw argument strings (typically `process.argv.slice(2)`).
 * @returns Parsed options: bundle path, output directory, dry-run flag, and fence-strip flag.
 */
function parseArguments(argv: string[]) {
  let bundlePath: string | undefined;
  let outputDirectory: string | undefined;
  let isDryRun = false;
  let shouldStripMdFences = false;

  const argumentList = [...argv];

  for (let index = 0; index < argumentList.length; index += 1) {
    const argument = argumentList[index];

    switch (argument) {
      case '--out': {
        index += 1;
        outputDirectory = argumentList[index];

        break;
      }

      case '--dry-run': {
        isDryRun = true;

        break;
      }

      case '--strip-md-fences': {
        shouldStripMdFences = true;

        break;
      }

      default: {
        bundlePath ??= argument;
      }
    }
  }

  return { bundlePath, outputDirectory, isDryRun, shouldStripMdFences };
}

/**
 * Normalizes a relative path to use forward slashes and strips a leading `./`.
 * Throws if the path is absolute or looks like a Windows absolute path.
 * @param relativePath - The raw relative path string from a file header.
 * @returns Normalized relative path string.
 */
function normalizeRelativePath(relativePath: string): string {
  if (path.isAbsolute(relativePath) || /^[A-Z]:[\\/]/i.test(relativePath)) {
    throw new Error(`Absolute paths are not allowed: ${relativePath}`);
  }

  const normalized = relativePath.replaceAll('\\', '/');

  return normalized.replace(/^.\//, '');
}

/**
 * Resolves a relative path under the given root and throws if the result escapes the root.
 * @param root - The output root directory (absolute).
 * @param relativePath - The relative path to resolve.
 * @returns Absolute path guaranteed to be inside `root`.
 */
function safeResolveUnder(root: string, relativePath: string): string {
  const cleanRelative = relativePath.replaceAll('\0', '');
  const abs = path.resolve(root, cleanRelative);
  const rootNorm = path.resolve(root) + path.sep;

  if (!abs.startsWith(rootNorm)) {
    throw new Error(`Refusing to write outside output root: ${relativePath}`);
  }

  return abs;
}

/**
 * Splits a raw bundle string into sections, each identified by a file header comment.
 * @param raw - Full contents of the bundle file.
 * @returns Array of sections with normalized relative paths and their content.
 */
function parseSections(raw: string): Section[] {
  const lines = raw.split(/\r?\n/);
  const sections: Section[] = [];
  let currentPath: string | null = null;
  let currentStart = 0;

  const flush = (endIndex: number) => {
    if (currentPath === null) {
      return;
    }

    const content = lines.slice(currentStart, endIndex).join('\n');

    sections.push({ relativePath: normalizeRelativePath(currentPath), content });
    currentPath = null;
  };

  lines.forEach((line, index) => {
    const match = HEADER_RE.exec(line);

    if (match) {
      flush(index);
      currentPath = match[1].replace('(CHANGED)', '').replace('(NEW)', '').trim();
      currentStart = index + 1;
    }
  });

  flush(lines.length);

  return sections;
}

/**
 * Strips a single wrapping Markdown code fence from a section's content when present.
 * Only removes the outermost fence; inner fences are left intact.
 * @param text - Raw section content, potentially wrapped in a triple-backtick fence.
 * @returns Content with the outermost fence removed, or the original text if no fence is found.
 */
function maybeStripMdFence(text: string): string {
  const array = text.split(/\r?\n/);
  let start = 0;
  let end = array.length - 1;

  while (start < array.length && typeof array[start] === 'string' && array[start].trim() === '') {
    start += 1;
  }

  while (end >= 0 && typeof array[end] === 'string' && array[end].trim() === '') {
    end -= 1;
  }

  if (start > end) {
    return text;
  }

  const open = typeof array[start] === 'string' ? array[start].trim() : '';
  const close = typeof array[end] === 'string' ? array[end].trim() : '';
  const isOpenFence = open.startsWith('```');
  const isCloseFence = close === '```';

  if (isOpenFence && isCloseFence) {
    return [array.slice(0, start).join('\n'), array.slice(start + 1, end).join('\n'), array.slice(end + 1).join('\n')]
      .filter(Boolean)
      .join('\n');
  }

  return text;
}

/**
 * Main entry point: reads the bundle, splits it into sections, and writes each file to disk.
 */
async function main() {
  const { bundlePath, outputDirectory, isDryRun, shouldStripMdFences } = parseArguments(process.argv.slice(2));

  if (!bundlePath) {
    throw new Error('Usage: split-plain-code.ts <bundlePath> [--out <dir>] [--dry-run] [--strip-md-fences]');
  }

  const outRoot = path.resolve(outputDirectory ?? process.cwd());

  // Validate bundlePath before reading
  if (typeof bundlePath !== 'string' || bundlePath.includes('..') || path.isAbsolute(bundlePath)) {
    throw new Error('Invalid bundlePath argument');
  }

  const raw = await fs.readFile(bundlePath, 'utf8');
  const sections = parseSections(raw);

  if (sections.length === 0) {
    throw new Error('No sections found. Make sure your file contains lines like: // File: relative/path');
  }

  const byRelativePath = new Map<string, string>();

  sections.forEach((section) => {
    const content = shouldStripMdFences ? maybeStripMdFence(section.content) : section.content;

    byRelativePath.set(section.relativePath, content);
  });

  const writes: Promise<unknown>[] = [];

  [...byRelativePath.entries()].forEach(([relativePath, content]) => {
    // Validate relativePath before using in fs functions
    if (typeof relativePath !== 'string' || relativePath.includes('..') || path.isAbsolute(relativePath)) {
      throw new Error('Invalid relativePath argument');
    }

    const abs = safeResolveUnder(outRoot, relativePath);

    if (isDryRun) {
      const size = new TextEncoder().encode(content).length;

      console.info(`[dry-run] write ${path.relative(process.cwd(), abs)} (${String(size)} bytes)`);
    } else {
      writes.push(
        (async () => {
          await fs.mkdir(path.dirname(abs), { recursive: true });
          await fs.writeFile(abs, content, 'utf8');
          const size = new TextEncoder().encode(content).length;

          console.info(`write ${path.relative(process.cwd(), abs)} (${String(size)} bytes)`);
        })(),
      );
    }
  });

  if (!isDryRun) {
    await Promise.all(writes);
  }
}

main().catch((error: unknown) => {
  const errorMessage = error && typeof error === 'object' && 'message' in error ? String(error.message) : String(error);

  console.error(errorMessage);
  process.exitCode = 1;
});
