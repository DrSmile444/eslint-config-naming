#!/usr/bin/env node
/* eslint-disable no-console */
/**
 * Post-build script to fix the legacy.cjs export format for ESLint compatibility.
 * ESLint's legacy .eslintrc format doesn't recognize "default" as a top-level property,
 * so we need to unwrap the named export from the ES module interop wrapper.
 */

import { readFileSync, writeFileSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const { dirname, join } = path;

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const legacyCjsPath = join(__dirname, '../dist/legacy.cjs');

try {
  let content = readFileSync(legacyCjsPath, 'utf8');

  // Check if legacyEslintrcConfig is exported (works with minified code)
  // Pattern looks like: {legacyEslintrcConfig:()=>G} or similar
  const hasLegacyExport = /legacyEslintrcConfig\s*[:=]/.test(content);

  // Append code to unwrap legacyEslintrcConfig if it exists
  // This ensures that when you require('naming/legacy'), you get the config object directly
  // instead of { default: config, legacyEslintrcConfig: config } or { legacyEslintrcConfig: config }
  const footer = '\nif (module.exports.legacyEslintrcConfig) { module.exports = module.exports.legacyEslintrcConfig; }\n';

  if (!hasLegacyExport) {
    console.log('⚠️  Warning: legacyEslintrcConfig export not found');
  } else if (content.includes(footer.trim())) {
    console.log('✓ Legacy export fix already applied');
  } else {
    content += footer;
    writeFileSync(legacyCjsPath, content, 'utf8');
    console.log('✓ Fixed legacy.cjs export for ESLint compatibility');
  }
} catch (error) {
  console.error('Error fixing legacy.cjs:', error);
  process.exit(1);
}
