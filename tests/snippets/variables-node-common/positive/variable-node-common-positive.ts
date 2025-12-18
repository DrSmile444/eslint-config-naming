import path from 'node:path';
import { fileURLToPath } from 'node:url';

// Should allow __filename and __dirname as they are common Node.js variables
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Example usage
export const currentDir = __dirname;
export const currentFile = __filename;

