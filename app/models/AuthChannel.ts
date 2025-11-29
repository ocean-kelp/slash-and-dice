import type { CountryCode, RegionCode } from "./Country.ts";
import { getCountriesInRegion, isCountryInRegion } from "./Country.ts";

/**
 * A channel represents a specific OAuth configuration for an auth provider.
 * Some providers (like LINE) require separate channels per region or country.
 * 
 * A channel can target either:
 * - Regions: A list of region codes (e.g., ["southeast-asia", "northeast-asia"])
 * - Countries: A list of specific country codes (e.g., ["JP", "TH"])
 * - Neither: A default/global channel that serves all countries
 * 
 * At least one of `regions` or `countries` should be set, unless it's a default channel.
 */
export interface AuthChannel {
  /** Unique channel identifier (e.g., "line-jp", "discord-default") */
  id: string;
  /** Display label i18n key */
  labelKey: string;
  /** Regions this channel serves (if region-based targeting) */
  regions?: RegionCode[];
  /** Specific countries this channel serves (if country-based targeting) */
  countries?: CountryCode[];
  /** Whether this is the default/fallback channel */
  isDefault: boolean;
}

/** Create a default channel for providers that don't need regional channels */
export function createDefaultChannel(providerId: string): AuthChannel {
  return {
    id: `${providerId}-default`,
    labelKey: `common.auth.channels.default`,
    isDefault: true,
  };
}

/** Create a region-based channel (targets entire regions) */
export function createRegionChannel(
  providerId: string,
  regionId: string,
  regions: RegionCode[],
  isDefault = false,
): AuthChannel {
  return {
    id: `${providerId}-${regionId}`,
    labelKey: `common.auth.channels.${regionId}`,
    regions,
    isDefault,
  };
}

/** Create a country-based channel (targets specific countries) */
export function createCountryChannel(
  providerId: string,
  channelId: string,
  countries: CountryCode[],
  isDefault = false,
): AuthChannel {
  return {
    id: `${providerId}-${channelId}`,
    labelKey: `common.auth.channels.${channelId}`,
    countries,
    isDefault,
  };
}

/** Find the best matching channel for a country */
export function findChannelForCountry(
  channels: AuthChannel[],
  countryCode: CountryCode,
): AuthChannel | undefined {
  // First priority: Find a channel that explicitly lists this country
  const countryMatch = channels.find(
    (c) => c.countries && c.countries.includes(countryCode),
  );
  if (countryMatch) return countryMatch;

  // Second priority: Find a channel that targets this country's region
  const regionMatch = channels.find(
    (c) => c.regions && c.regions.some((region) =>
      isCountryInRegion(countryCode, region)
    ),
  );
  if (regionMatch) return regionMatch;

  // Fall back to default channel
  return channels.find((c) => c.isDefault);
}

/** Get all countries served by a channel */
export function getChannelCountries(channel: AuthChannel): CountryCode[] {
  // If specific countries are listed, return those
  if (channel.countries && channel.countries.length > 0) {
    return channel.countries;
  }

  // If regions are listed, expand to all countries in those regions
  if (channel.regions && channel.regions.length > 0) {
    return channel.regions.flatMap((region) => getCountriesInRegion(region));
  }

  // Default/global channel serves all countries
  return [];
}
