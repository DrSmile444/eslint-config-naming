const VERBOSE = process.env.ESLINT_DEBUG === 'true';

/**
 * Colors a console output with ANSI escape codes based on the context and method.
 * @param {string} context - The context label (e.g., ESLint plugin name).
 * @param {string} method - The console method name (e.g., 'log', 'info', 'warn').
 * @returns {string} A formatted string with ANSI color prefix and the context label.
 */
function colorContext(context, method) {
  const METHOD_COLORS = {
    log: '[32m',
    info: '[36m',
    warn: '[33m',
    error: '[31m',
    dir: '[35m',
    table: '[32m',
  };

  // eslint-disable-next-line security/detect-object-injection
  const methodColor = METHOD_COLORS[method] || '';

  if (methodColor) {
    return `${methodColor}[ESLint:${context}][0m`;
  }

  return `[ESLint:${context}]`;
}

const noop = () => {};

/**
 * Creates a logger instance with context-prefixed, colored console output.
 * Enable output by setting ESLINT_DEBUG=true in your environment.
 * @param {string} context - The context label to prefix log messages with.
 * @returns {object} An object with log, info, warn, error, dir, and table methods.
 */
export function eslintLogger(context) {
  if (!VERBOSE) {
    return { log: noop, info: noop, warn: noop, error: noop, dir: noop, table: noop };
  }

  return {
    /* eslint-disable no-console */
    log: (...arguments_) => console.log(colorContext(context, 'log'), ...arguments_),
    info: (...arguments_) => console.info(colorContext(context, 'info'), ...arguments_),
    warn: (...arguments_) => console.warn(colorContext(context, 'warn'), ...arguments_),
    error: (...arguments_) => console.error(colorContext(context, 'error'), ...arguments_),
    dir: (...arguments_) => console.dir(colorContext(context, 'dir'), ...arguments_),
    table: (...arguments_) => console.table(colorContext(context, 'table'), ...arguments_),
    /* eslint-enable no-console */
  };
}
