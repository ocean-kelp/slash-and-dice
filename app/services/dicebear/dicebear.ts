/**
 * Return a Dicebear avatar URL for the given seed.
 *
 * Uses the Lorelei style (Dicebear 9.x) and SVG format by default.
 *
 * @example
 *   dicebearUrl('Felix')
 *   // => "https://api.dicebear.com/9.x/lorelei/svg?seed=Felix"
 */
export function dicebearUrl(seed: string): string {
  return `https://api.dicebear.com/9.x/lorelei/svg?seed=${
    encodeURIComponent(seed)
  }`;
}

export default dicebearUrl;
