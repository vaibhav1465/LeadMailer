/* Simple logger wrapper to keep output consistent */
export const logger = {
  info: (msg: unknown, ...rest: unknown[]) => console.log(`[INFO]`, msg, ...rest),
  warn: (msg: unknown, ...rest: unknown[]) => console.warn(`[WARN]`, msg, ...rest),
  error: (msg: unknown, ...rest: unknown[]) => console.error(`[ERROR]`, msg, ...rest),
};
