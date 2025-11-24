export function createTranslator(
  translations: Record<string, Record<string, string>>,
): (key: string) => string {
  return (key: string): string => {
    const keys = key.split('.')
    let result: unknown = translations

    for (const k of keys) {
      if (typeof result === 'object' && result !== null && k in result) {
        result = (result as Record<string, unknown>)[k]
      } else {
        return key
      }
    }

    return typeof result === 'string' ? result : key
  }
}