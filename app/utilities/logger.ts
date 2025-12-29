// Simple colorized logger utility for server-side logs
const RESET = "\x1b[0m";
const BRIGHT = "\x1b[1m";
const DIM = "\x1b[2m";

const FG_RED = "\x1b[31m";
const FG_YELLOW = "\x1b[33m";
const FG_GREEN = "\x1b[32m";
const FG_CYAN = "\x1b[36m";
const FG_MAGENTA = "\x1b[35m";
const FG_GRAY = "\x1b[90m";

function formatPrefix(level: string, color: string) {
  const time = new Date().toISOString();
  return `${DIM}${time}${RESET} ${BRIGHT}${color}[${level}]${RESET}`;
}

function pretty(o: unknown) {
  try {
    return typeof o === "string" ? o : JSON.stringify(o, null, 2);
  } catch {
    return String(o);
  }
}

export const logger = {
  info(...args: unknown[]) {
    const prefix = formatPrefix("INFO", FG_CYAN);
    console.log(prefix, ...args.map(pretty));
  },
  warn(...args: unknown[]) {
    const prefix = formatPrefix("WARN", FG_YELLOW);
    console.warn(prefix, ...args.map(pretty));
  },
  error(...args: unknown[]) {
    const prefix = formatPrefix("ERROR", FG_RED);
    console.error(prefix, ...args.map(pretty));
  },
  success(...args: unknown[]) {
    const prefix = formatPrefix("OK", FG_GREEN);
    console.log(prefix, ...args.map(pretty));
  },
  debug(...args: unknown[]) {
    const prefix = formatPrefix("DBG", FG_MAGENTA);
    console.log(prefix, ...args.map(pretty));
  },
};

export default logger;
