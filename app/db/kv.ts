/// <reference lib="deno.unstable" />
// Server-only KV wrapper for the app.
// Open a single KV handle at startup and export a few small helpers.
// This file should only be imported from server-side code (routes/services/repositories).

// Open the KV store once (top-level await). Fresh/Deno supports this in server modules.
export const kv: Deno.Kv = await Deno.openKv();

/** Return the raw Kv instance. */
export const getKv = () => kv;

/** Convenience: create an atomic transaction. */
export const atomic = () => kv.atomic();

/** Convenience: typed get value by key array. Returns undefined when missing. */
export async function getValue<T>(key: Deno.KvKey): Promise<T | undefined> {
  const res = await kv.get(key);
  return res.value as T | undefined;
}

/** Convenience: list with options (prefix scans). */
export function list(opts: Deno.KvListSelector) {
  return kv.list(opts);
}

// Export set/get helpers if you prefer functional style
export function setValue(
  key: Deno.KvKey,
  value: unknown,
  opts?: { expireIn?: number },
) {
  return kv.set(key, value, opts);
}
