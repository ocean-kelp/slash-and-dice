// Basic cookie system
// CLIENT-SIDE ONLY: These methods require a browser environment.
// Usage: setCookieClient(alias, name, value, days?), getCookieClient(alias, name), deleteCookieClient(alias, name)

import { isClient } from "@/utilities/enviroments.ts";

const DEFAULT_DAYS = 30;

function getCookieName(alias: string, name: string): string {
  return `${alias}_${name}`;
}

export function setCookieClient(
  alias: string,
  name: string,
  value: string,
  days: number = DEFAULT_DAYS,
) {
  if (!isClient()) {
    throw new Error("setCookieClient must be run on the client side");
  }
  const cookieName = getCookieName(alias, name);
  const expires = new Date(Date.now() + days * 864e5).toUTCString();
  document.cookie = `${cookieName}=${
    encodeURIComponent(value)
  }; expires=${expires}; path=/`;
}

export function getCookieClient(alias: string, name: string): string | null {
  if (!isClient()) {
    throw new Error("getCookieClient must be run on the client side");
  }
  const cookieName = getCookieName(alias, name);
  const cookies = document.cookie.split("; ");
  for (const cookie of cookies) {
    const [key, val] = cookie.split("=");
    if (key === cookieName) {
      return decodeURIComponent(val);
    }
  }
  return null;
}

export function deleteCookieClient(alias: string, name: string) {
  setCookieClient(alias, name, "", -1);
}

// SERVER-SIDE: Generate Set-Cookie header string
// Usage: getSetCookieHeader(alias, name, value, days?)
export function getSetCookieHeader(
  alias: string,
  name: string,
  value: string,
  days: number = DEFAULT_DAYS,
): string {
  const cookieName = getCookieName(alias, name);
  const expires = new Date(Date.now() + days * 864e5).toUTCString();
  return `${cookieName}=${
    encodeURIComponent(value)
  }; expires=${expires}; path=/`;
}
