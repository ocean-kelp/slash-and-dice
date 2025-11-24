/**
 * Creates a translator function for flat key structure.
 * Returns a function that translates keys using the provided flat translation data.
 * @param translationData - The flat translation object with dot-separated keys.
 * @returns A function that takes a translation key and returns the translated string.
 */
export function translate(
  translationData: Record<string, unknown>,
): (key: string) => string {
  return (key: string): string => {
    // First, try to find the key directly (for flat key structure)
    if (key in translationData) {
      const value = translationData[key];
      if (typeof value === "string") {
        return value;
      } else {
        // Show warnings in development (both server and client side)
        if (import.meta.env?.DEV) {
          console.warn(
            `❌ Translation key "${key}" exists but is not a string value`,
          );
          console.warn(`   Expected: string, Got:`, typeof value, value);
          console.warn(
            `   📁 Root keys in translation data:`,
            Object.keys(translationData),
          );
        } else if (
          key === "common.home.title" || key === "common.header.ariaLabel"
        ) {
          console.log(
            `🔍 Production debug - Key exists but not string: "${key}"`,
          );
          console.log(`🔍 Value type:`, typeof value, value);
        }

        // Development: show key in UI, Production: return empty string
        if (import.meta.env?.DEV) {
          return `[${key}]`;
        } else {
          return ""; // Clean production experience
        }
      }
    }

    // Key not found in flat structure
    // Show warnings in development (both server and client side)
    if (import.meta.env?.DEV) {
      console.warn(`❌ Missing translation key: "${key}"`);
      console.warn(
        `   Available keys:`,
        Object.keys(translationData),
      );
    } else {
      // Production debugging - only for missing keys that should exist
      if (
        key === "common.home.title" || key === "common.header.ariaLabel"
      ) {
        console.log(`🔍 Production debug - Missing key: "${key}"`);
        console.log(
          `🔍 Available keys:`,
          Object.keys(translationData).slice(0, 10),
        );
      }
    }

    // Development: show key in UI, Production: return empty string
    if (import.meta.env?.DEV) {
      return `[${key}]`;
    } else {
      return ""; // Clean production experience
    }
  };
}
