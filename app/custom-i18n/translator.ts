export interface TranslationConfig {
  locale?: string;
  defaultLocale?: string;
  fallbackKeys?: Set<string>;
  showKeysInProd?: boolean;
  showFallbackIndicator?: boolean;
  fallbackIndicatorFormat?: (text: string, defaultLocale: string) => string;
  shouldShowFallbackIndicator?: (text: string, locale: string) => boolean;
  applyFallbackOnDev?: boolean;
  isProduction?: () => boolean;
}

/**
 * Creates a translator function for flat key structure.
 * @param translationData - The flat translation object with dot-separated keys.
 * @param config - Translation configuration (all optional).
 * @returns A function that takes a translation key and returns the translated string.
 */
export function translate(
  translationData: Record<string, unknown>,
  config?: TranslationConfig,
): (key: string) => string {
  const {
    locale,
    defaultLocale,
    fallbackKeys,
    showKeysInProd = false,
    showFallbackIndicator = false,
    fallbackIndicatorFormat,
    shouldShowFallbackIndicator,
    applyFallbackOnDev = false,
    isProduction,
  } = config ?? {};

  const localeInfo = locale ? ` [locale: ${locale}]` : "";

  // Check if running in production mode
  // Use custom function if provided, otherwise use Vite's env vars
  const isProd = isProduction
    ? isProduction()
    : (!import.meta.env?.DEV || import.meta.env?.VITE_SIMULATE_PROD === "true");

  // Determine if we should use production behavior
  const useProductionBehavior = isProd || applyFallbackOnDev;

  return (key: string): string => {
    // First, try to find the key directly (for flat key structure)
    if (key in translationData) {
      const value = translationData[key];
      if (typeof value === "string") {
        // If showing fallback indicator and this key is a fallback
        if (
          useProductionBehavior &&
          showFallbackIndicator &&
          fallbackKeys?.has(key) &&
          defaultLocale &&
          fallbackIndicatorFormat
        ) {
          // If shouldShowFallbackIndicator function is provided, check if we should show
          // Otherwise, always show the indicator
          if (!shouldShowFallbackIndicator || shouldShowFallbackIndicator(value, defaultLocale)) {
            return fallbackIndicatorFormat(value, defaultLocale);
          }
        }
        return value;
      } else {
        // Show warnings in development (both server and client side)
        if (!useProductionBehavior) {
          console.warn(
            `❌ Translation key "${key}" exists but is not a string value${localeInfo}`,
          );
          console.warn(`   Expected: string, Got:`, typeof value, value);
          console.warn(
            `   📁 Root keys in translation data:`,
            Object.keys(translationData),
          );
        }

        // Development: show key in UI, Production: return empty string
        return useProductionBehavior ? "" : `[${key}]`;
      }
    }

    // Key not found - show warnings in development
    if (!useProductionBehavior) {
      console.warn(`❌ Missing translation key: "${key}"${localeInfo}`);
      console.warn(
        `   Available keys (first 3):`,
        Object.keys(translationData).slice(0, 3),
      );
    }

    // Production behavior: show key if showKeysInProd is enabled, otherwise empty string
    if (useProductionBehavior && showKeysInProd) {
      return `[${key}]`;
    }

    // Development: show key in UI, Production: return empty string
    return useProductionBehavior ? "" : `[${key}]`;
  };
}
