// Environment utilities

// Returns true if running in a browser (client-side)
export function isClient(): boolean {
  return typeof window !== "undefined" && typeof document !== "undefined";
}

// Returns true when running in a development environment.
export function isDev(): boolean {
  // Only evaluate server-side. If executing in a browser, return false.
  if (isClient()) return false;

  // Server-side (Deno) environment variables fallback
  try {
    // @ts-ignore Deno may not be defined in some runtimes
    if (typeof Deno !== "undefined" && typeof Deno.env?.get === "function") {
      // Prefer explicit DENO_ENV or DEV flags
      const envVal = Deno.env.get("DENO_ENV") || Deno.env.get("DEV") ||
        Deno.env.get("NODE_ENV");
      if (!envVal) return false;
      return ["development", "dev", "true"].includes(envVal.toLowerCase());
    }
  } catch {
    // accessing Deno.env may throw in some runtimes
  }

  // Build-time import.meta checks are intentionally skipped here because
  // this helper is server-only; treat unknown as production by default.
  return false;
}
