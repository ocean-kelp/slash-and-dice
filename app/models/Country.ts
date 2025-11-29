// ISO 3166-1 alpha-2 country codes - Global support
export type CountryCode = string; // Any valid ISO 3166-1 alpha-2 code

// Commonly used country codes for reference
export const COMMON_COUNTRIES = [
  "JP", "TH", "TW", "ID", "KR", "CN", // Asia
  "US", "CA", "MX", // North America
  "BR", "AR", "CL", "CO", // South America
  "GB", "DE", "FR", "ES", "IT", "NL", "SE", "NO", "DK", "FI", // Europe
  "AU", "NZ", // Oceania
  "ZA", "EG", "NG", // Africa
  "IN", "PK", "BD", "PH", "VN", "MY", "SG", // More Asia
] as const;

/** Regional groupings for OAuth channels and other features */
export type RegionCode =
  | "northeast-asia" // Japan, South Korea
  | "greater-china" // China, Taiwan, Hong Kong, Macau
  | "southeast-asia" // Thailand, Indonesia, Philippines, Vietnam, Malaysia, Singapore, Myanmar, Cambodia, Laos, Brunei
  | "south-asia" // India, Pakistan, Bangladesh, Sri Lanka, Nepal, Bhutan, Maldives
  | "central-asia" // Kazakhstan, Uzbekistan, Turkmenistan, Kyrgyzstan, Tajikistan
  | "middle-east" // Saudi Arabia, UAE, Israel, Turkey, Iran, Iraq, Egypt, Jordan, Lebanon, etc.
  | "north-america" // United States, Canada, Mexico
  | "central-america" // Guatemala, Honduras, El Salvador, Nicaragua, Costa Rica, Panama, Belize
  | "caribbean" // Cuba, Jamaica, Haiti, Dominican Republic, Trinidad and Tobago, Bahamas, etc.
  | "south-america" // Brazil, Argentina, Colombia, Chile, Peru, Venezuela, Ecuador, Bolivia, Paraguay, Uruguay
  | "western-europe" // UK, Ireland, France, Germany, Netherlands, Belgium, Luxembourg, Austria, Switzerland
  | "northern-europe" // Sweden, Norway, Denmark, Finland, Iceland
  | "southern-europe" // Spain, Italy, Portugal, Greece, Malta, Cyprus
  | "eastern-europe" // Poland, Czech Republic, Hungary, Romania, Bulgaria, Ukraine, etc.
  | "oceania" // Australia, New Zealand, Papua New Guinea, Fiji, etc.
  | "north-africa" // Egypt, Libya, Tunisia, Algeria, Morocco, Sudan
  | "west-africa" // Nigeria, Ghana, Senegal, Ivory Coast, Mali, etc.
  | "east-africa" // Kenya, Ethiopia, Tanzania, Uganda, Somalia, etc.
  | "central-africa" // Democratic Republic of Congo, Cameroon, Chad, etc.
  | "southern-africa"; // South Africa, Zimbabwe, Botswana, Namibia, Zambia, etc.

/** Country display information */
export interface Country {
  code: string;
  /** i18n key for country name (falls back to code if not found) */
  nameKey: string;
  /** Region this country belongs to */
  region: RegionCode;
}

/**
 * Get flag SVG URL from country code using flagcdn.com
 * @example getFlagUrl("US") => "https://flagcdn.com/us.svg"
 * @example getFlagUrl("JP") => "https://flagcdn.com/jp.svg"
 */
export function getFlagUrl(countryCode: string): string {
  return `https://flagcdn.com/${countryCode.toLowerCase()}.svg`;
}

/**
 * Get flag emoji from country code (legacy fallback)
 * Converts ISO 3166-1 alpha-2 code to flag emoji using regional indicator symbols
 */
export function getFlagEmoji(countryCode: string): string {
  const codePoints = countryCode
    .toUpperCase()
    .split("")
    .map((char) => 127397 + char.charCodeAt(0));
  return String.fromCodePoint(...codePoints);
}

/** Get country display info with fallback */
export function getCountryInfo(countryCode: string): Country {
  const upperCode = countryCode.toUpperCase();
  const existing = COUNTRIES[upperCode];

  if (existing) {
    return existing;
  }

  // Fallback for unknown countries
  return {
    code: upperCode,
    nameKey: `countries.${upperCode.toLowerCase()}`,
    region: "eastern-europe", // Default fallback region
  };
}

/** Known countries with display info - expand as needed */
export const COUNTRIES: Record<string, Country> = {
  // Northeast Asia
  JP: { code: "JP", nameKey: "countries.japan", region: "northeast-asia" },
  KR: { code: "KR", nameKey: "countries.southKorea", region: "northeast-asia" },
  KP: { code: "KP", nameKey: "countries.northKorea", region: "northeast-asia" },

  // Greater China
  CN: { code: "CN", nameKey: "countries.china", region: "greater-china" },
  TW: { code: "TW", nameKey: "countries.taiwan", region: "greater-china" },
  HK: { code: "HK", nameKey: "countries.hongKong", region: "greater-china" },
  MO: { code: "MO", nameKey: "countries.macau", region: "greater-china" },

  // Southeast Asia
  TH: { code: "TH", nameKey: "countries.thailand", region: "southeast-asia" },
  ID: { code: "ID", nameKey: "countries.indonesia", region: "southeast-asia" },
  PH: { code: "PH", nameKey: "countries.philippines", region: "southeast-asia" },
  VN: { code: "VN", nameKey: "countries.vietnam", region: "southeast-asia" },
  MY: { code: "MY", nameKey: "countries.malaysia", region: "southeast-asia" },
  SG: { code: "SG", nameKey: "countries.singapore", region: "southeast-asia" },
  MM: { code: "MM", nameKey: "countries.myanmar", region: "southeast-asia" },
  KH: { code: "KH", nameKey: "countries.cambodia", region: "southeast-asia" },
  LA: { code: "LA", nameKey: "countries.laos", region: "southeast-asia" },
  BN: { code: "BN", nameKey: "countries.brunei", region: "southeast-asia" },
  TL: { code: "TL", nameKey: "countries.timorLeste", region: "southeast-asia" },

  // South Asia
  IN: { code: "IN", nameKey: "countries.india", region: "south-asia" },
  PK: { code: "PK", nameKey: "countries.pakistan", region: "south-asia" },
  BD: { code: "BD", nameKey: "countries.bangladesh", region: "south-asia" },
  LK: { code: "LK", nameKey: "countries.sriLanka", region: "south-asia" },
  NP: { code: "NP", nameKey: "countries.nepal", region: "south-asia" },
  BT: { code: "BT", nameKey: "countries.bhutan", region: "south-asia" },
  MV: { code: "MV", nameKey: "countries.maldives", region: "south-asia" },

  // North America
  US: { code: "US", nameKey: "countries.unitedStates", region: "north-america" },
  CA: { code: "CA", nameKey: "countries.canada", region: "north-america" },
  MX: { code: "MX", nameKey: "countries.mexico", region: "north-america" },

  // South America
  BR: { code: "BR", nameKey: "countries.brazil", region: "south-america" },
  AR: { code: "AR", nameKey: "countries.argentina", region: "south-america" },
  CL: { code: "CL", nameKey: "countries.chile", region: "south-america" },
  CO: { code: "CO", nameKey: "countries.colombia", region: "south-america" },
  PE: { code: "PE", nameKey: "countries.peru", region: "south-america" },
  VE: { code: "VE", nameKey: "countries.venezuela", region: "south-america" },
  EC: { code: "EC", nameKey: "countries.ecuador", region: "south-america" },
  BO: { code: "BO", nameKey: "countries.bolivia", region: "south-america" },
  PY: { code: "PY", nameKey: "countries.paraguay", region: "south-america" },
  UY: { code: "UY", nameKey: "countries.uruguay", region: "south-america" },

  // Western Europe
  GB: { code: "GB", nameKey: "countries.unitedKingdom", region: "western-europe" },
  IE: { code: "IE", nameKey: "countries.ireland", region: "western-europe" },
  FR: { code: "FR", nameKey: "countries.france", region: "western-europe" },
  DE: { code: "DE", nameKey: "countries.germany", region: "western-europe" },
  NL: { code: "NL", nameKey: "countries.netherlands", region: "western-europe" },
  BE: { code: "BE", nameKey: "countries.belgium", region: "western-europe" },
  LU: { code: "LU", nameKey: "countries.luxembourg", region: "western-europe" },
  AT: { code: "AT", nameKey: "countries.austria", region: "western-europe" },
  CH: { code: "CH", nameKey: "countries.switzerland", region: "western-europe" },

  // Northern Europe
  SE: { code: "SE", nameKey: "countries.sweden", region: "northern-europe" },
  NO: { code: "NO", nameKey: "countries.norway", region: "northern-europe" },
  DK: { code: "DK", nameKey: "countries.denmark", region: "northern-europe" },
  FI: { code: "FI", nameKey: "countries.finland", region: "northern-europe" },
  IS: { code: "IS", nameKey: "countries.iceland", region: "northern-europe" },

  // Southern Europe
  ES: { code: "ES", nameKey: "countries.spain", region: "southern-europe" },
  IT: { code: "IT", nameKey: "countries.italy", region: "southern-europe" },
  PT: { code: "PT", nameKey: "countries.portugal", region: "southern-europe" },
  GR: { code: "GR", nameKey: "countries.greece", region: "southern-europe" },
  MT: { code: "MT", nameKey: "countries.malta", region: "southern-europe" },
  CY: { code: "CY", nameKey: "countries.cyprus", region: "southern-europe" },

  // Eastern Europe
  PL: { code: "PL", nameKey: "countries.poland", region: "eastern-europe" },
  CZ: { code: "CZ", nameKey: "countries.czechia", region: "eastern-europe" },
  HU: { code: "HU", nameKey: "countries.hungary", region: "eastern-europe" },
  RO: { code: "RO", nameKey: "countries.romania", region: "eastern-europe" },
  BG: { code: "BG", nameKey: "countries.bulgaria", region: "eastern-europe" },
  UA: { code: "UA", nameKey: "countries.ukraine", region: "eastern-europe" },
  RU: { code: "RU", nameKey: "countries.russia", region: "eastern-europe" },

  // Oceania
  AU: { code: "AU", nameKey: "countries.australia", region: "oceania" },
  NZ: { code: "NZ", nameKey: "countries.newZealand", region: "oceania" },

  // Africa
  ZA: { code: "ZA", nameKey: "countries.southAfrica", region: "southern-africa" },
  EG: { code: "EG", nameKey: "countries.egypt", region: "north-africa" },
  NG: { code: "NG", nameKey: "countries.nigeria", region: "west-africa" },
  KE: { code: "KE", nameKey: "countries.kenya", region: "east-africa" },

  // Middle East
  SA: { code: "SA", nameKey: "countries.saudiArabia", region: "middle-east" },
  AE: { code: "AE", nameKey: "countries.uae", region: "middle-east" },
  IL: { code: "IL", nameKey: "countries.israel", region: "middle-east" },
  TR: { code: "TR", nameKey: "countries.turkey", region: "middle-east" },
};

/** Get the region for a given country code */
export function getRegionForCountry(countryCode: string): RegionCode {
  const country = getCountryInfo(countryCode);
  return country.region;
}

/** Get all countries in a given region from the COUNTRIES registry */
export function getCountriesInRegion(region: RegionCode): string[] {
  return Object.values(COUNTRIES)
    .filter((country) => country.region === region)
    .map((country) => country.code);
}

/** Check if a country is in a given region */
export function isCountryInRegion(
  countryCode: string,
  region: RegionCode,
): boolean {
  return getRegionForCountry(countryCode) === region;
}
