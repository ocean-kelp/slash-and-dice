# Internationalization (i18n) Strategy

## Purpose

This document explains how i18n (internationalization) is implemented in this
project using `@elsoul/fresh-i18n`, and describes our custom adjustments. It
serves as a guide for developers on how translation files, locale detection, and
language switching work in our app.

---

## Overview of Approach

- We use `@elsoul/fresh-i18n` as our core i18n plugin for Fresh v2.
  :contentReference[oaicite:0]{index=0}
- We support locale detection based on URL prefix, falling back to default
  language when necessary.
- For client-side / interactive components (islands), we maintain translation
  data using Preact **signals** (`useSignal`) rather than using
  `@elsoul/fresh-atom` as shown in the original library README.
- When the user switches language, we perform a full page reload to render with
  the new locale rather than managing reactive locale switching. This simplifies
  state and avoids adding unnecessary global state complexity.
- We store the user's language preference in cookies for persistence across
  sessions.
- The import name is aliased as `@i18n` in `deno.json` for easier imports.

---

## Oficial docs of library usage

### `@elsoul/fresh-i18n`

`@elsoul/fresh-i18n` is an efficient and adaptable internationalization (i18n)
plugin designed specifically for Deno's Fresh v2 framework. It enables easy
language management within your Fresh app, providing JSON-based translations,
automatic locale detection, and optimized data loading for an edge-native
experience.

#### Features

- **Automatic Locale Detection**: Seamlessly detects the user's language from
  URL parameters, defaulting to a specified language when needed.
- **Modular Translation Loading**: Organize translations by namespaces for
  structured, optimized JSON loading.
- **Intuitive API**: Fetch translations via `useTranslation()` and access or
  switch locales with `useLocale()`.
- **Optimized for Deno Edge**: Designed to work efficiently in edge
  environments, leveraging Deno's performance.
- **Dynamic Language Switching**: Allows for real-time language changes within
  components without a page reload.

#### Installation

##### Install via JSR

```typescript
import { i18nPlugin } from "jsr:@elsoul/fresh-i18n";
```

##### Install via Deno Land

```typescript
import { i18nPlugin } from "https://deno.land/x/fresh_i18n/mod.ts";
```

#### Usage

##### Step 1: Register the Plugin

In your `main.ts`, initialize the plugin with available languages, default
locale, and translation directory. This setup automatically detects the
preferred locale based on the URL.

```typescript
import { App, fsRoutes, staticFiles, trailingSlashes } from "fresh";
import { i18nPlugin } from "fresh-i18n";
import type { ExtendedState } from "@/utils/state.ts";

export const app = new App<ExtendedState>({
  root: import.meta.url,
})
  .use(staticFiles())
  .use(trailingSlashes("never"))
  .use(i18nPlugin({
    languages: ["en", "ja"],
    defaultLanguage: "en",
    localesDir: "./locales",
  }));

await fsRoutes(app, {
  loadIsland: (path) => import(`./islands/${path}`),
  loadRoute: (path) => import(`./routes/${path}`),
});

if (import.meta.main) {
  await app.listen();
}
```

###### Project-specific App setup (with `i18n` namespacing)

If you prefer to keep translation state inside a namespace `i18n` on
`ctx.state`, then use the `State` interface exported from `app/utils.ts` and
initialize `App` with it like:

```typescript
import type { State } from "@/utils/state.ts";

export const app = new App<State>({
  root: import.meta.url,
})
  .use(staticFiles())
  .use(trailingSlashes("never"))
  .use(i18nPlugin({
    languages: ["en", "ja"],
    defaultLanguage: "en",
    localesDir: "./locales",
  }));
```

###### Define an Extended State with TranslationState

If you are managing additional global state in your Fresh app, such as metadata
or theme settings, you can extend TranslationState to include your own
properties. This extended state can then be used across your app, with
translation data (t) accessible directly in request handlers, enabling
Server-Side Rendering (SSR) with fully localized content.

###### Example

In the following example, TranslationState from @elsoul/fresh-i18n is combined
with a custom State interface to create ExtendedState. This ExtendedState
includes both translation data and other application-specific properties, making
it convenient for global state management.

ExtendedState can then be used in request handlers to access translation data
directly via ctx.state.t, enabling SSR with localized data.

```typescript
import { createDefine } from "fresh";
import type { TranslationState } from "fresh-i18n";

interface State {
  title?: string;
  theme?: string;
  description?: string;
  ogImage?: string;
  noIndex?: boolean;
}

export type ExtendedState = State & TranslationState;

export const define = createDefine<ExtendedState>();
```

###### Project-specific approach: namespace translation state under `i18n`

In this repository, we prefer to namespace translation-related state under a
single `i18n` property on `ctx.state`. This helps avoid accidental property name
collisions and keeps translation data grouped and easily identifiable in the
shared state.

Add the translation state into your `State` interface like this:

```typescript
import { createDefine } from "fresh";
import type { TranslationState } from "@i18n";

// This example matches the approach used in `app/utils.ts`.
interface State {
  shared?: string;
  // i18n namespace contains fields from TranslationState
  i18n: TranslationState;
}

export const define = createDefine<State>();
```

With this approach the translation data lives under
`ctx.state.i18n.translationData`, and the current locale is
`ctx.state.i18n.locale`.

```
###### Create [locale] Directory on routes

Update Routing Structure to Include [locale] Folder Important: The [locale]
folder is now mandatory in your routing structure. All your route files should
be placed inside the [locale] directory to handle language prefixes in URLs
effectively.

Directory Structure Your routes directory should look like this:
```

routes/ ├── [locale]/ │ ├── index.tsx │ ├── about.tsx │ ├── contact.tsx │ └──
...other routes

````
##### Step 2: Create Locale JSON Files

Inside the `locales` directory, create subfolders for each locale and organize
translation keys in namespace files. These files are loaded dynamically based on
the URL structure.

For example, if the URL is `https://example.com/en/company/profile`, the plugin
will load the following files (if they exist):

- `./locales/en/common.json` (always loaded as the base translation)
- `./locales/en/metadata.json` (always loaded as the base translation)
- `./locales/en/error.json` (always loaded as the base translation)
- `./locales/en/company.json`
- `./locales/en/profile.json`

Each of these files corresponds to a "namespace" in the translation data. If a
file does not exist, it is skipped without an error, ensuring flexibility.

###### Example: `locales/en/common.json`

```json
{
  "welcome": "Welcome",
  "title": "Home"
}
````

###### Example: `locales/ja/common.json`

```json
{
  "welcome": "ようこそ",
  "title": "ホーム"
}
```

##### Step 3: Use Translations in Routes

```tsx
import { define } from "@/utils/state.ts";
import { createTranslator } from "jsr:@elsoul/fresh-i18n";

export const handler = define.handlers({
  GET(ctx) {
    // If using the default ExtendedState approach:
    // console.log('ctx', ctx.state.translationData)

    // In this project we namespace translation state under ctx.state.i18n:
    console.log("ctx", ctx.state.i18n.translationData); // Access translation data under i18n
    return page();
  },
});

export default define.page<typeof handler>(function Home(props) {
  // If using the default `ExtendedState` approach:
  // const t = createTranslator(props.state.translationData)

  // With project-specific `i18n` namespacing:
  const t = createTranslator(props.state.i18n.translationData);
  return (
    <div>
      {t("common.title")} // Home or ホーム
    </div>
  );
});
```

##### Step 4: Use Translation in Islands

You need to share ctx.state data with islands.

```tsx:./routes/_layouts.tsx
import type { PageProps } from 'fresh'
import StateShareLayer from '@/islands/layouts/StateShareLayer.tsx'
import type { ExtendedState } from '@/utils/state.ts'

export default function RootLayout(
  { Component, state }: PageProps,
) {
  return (
    <>
      <StateShareLayer state={state as ExtendedState} />
      <Component />
    </>
  )
}
```

```tsx:./islands/layouts/StateShareLayer.tsx
import { type State } from '@/utils/state.ts'
import { atom, useAtom } from 'fresh-atom'
import { useEffect } from 'preact/hooks'

type Props = {
  state: State
}

export const stateAtom = atom<State>({
  shared: '',
  // i18n contains translation fields from TranslationState
  i18n: {
    locale: 'en',
    translationData: {},
  },
  path: '/',
})

export default function StateShareLayer({ state }: Props) {
  const [, setState] = useAtom(stateAtom)

  useEffect(() => {
    // Update the atom with the full shared state; note translations are available under state.i18n
    setState(state)
  }, [state])

  return null
}
```

###### Useful hooks

You can create useful hooks to access translation data on islands.

```tsx:./hooks/i18n/useTranslation.ts
import { useAtom } from 'fresh-atom'
import { stateAtom } from '@/islands/layouts/StateShareLayer.tsx'

export function useTranslation() {
  const [state] = useAtom(stateAtom)

  /**
   * Translates a key string like 'common.title' or 'common.titlerow.title.example'
   * by traversing the nested structure of `state.t`.
   *
   * @param key - The translation key in dot notation (e.g., 'common.title').
   * @returns The translated string, or an empty string if the key is not found.
   */
  const t = (key: string): string => {
    const keys = key.split('.')
    // Access nested translation data from state.i18n
    let result: Record<string, unknown> | string = state.i18n?.translationData ?? {}

    for (const k of keys) {
      if (typeof result === 'object' && result !== null && k in result) {
        result = result[k] as Record<string, unknown> | string
      } else {
        return '' // Key not found, return empty string or default text
      }
    }

    return typeof result === 'string' ? result : '' // Return the result if it's a string
  }

  return  t 
}
```

```tsx:./hooks/i18n/usePathname.ts
import { useAtom } from 'fresh-atom'
import { stateAtom } from '@/islands/layouts/StateShareLayer.tsx'
import { useCallback } from 'preact/hooks'

export function usePathname() {
  const [state] = useAtom(stateAtom)
  const isActivePath = useCallback((path: string) => {
    return state.path === path
  }, [state.path])
  return { pathname: state.path, isActivePath }
}
```

```tsx:./hooks/i18n/useLocale.ts
import { useAtom } from 'fresh-atom'
import { stateAtom } from '@/islands/layouts/StateShareLayer.tsx'

export function useLocale() {
  const [state, setState] = useAtom(stateAtom)

  /**
   * Sets a new locale, updates the global state, and redirects
   * to the new locale's URL path to update page content.
   *
   * @param locale - The new locale string (e.g., 'en', 'ja').
   */
  const setLocale = (locale: string) => {
    // Set locale inside the i18n namespace
    setState((prevState) => ({ ...prevState, i18n: { ...(prevState.i18n ?? {}), locale } }))

    const newPath = `/${locale}${state.path}`
    globalThis.location.href = newPath
  }

  return { locale: state.i18n?.locale, setLocale }
}
```

```tsx:./components/utils/Link.tsx
import { useLocale } from '@/hooks/i18n/useLocale.ts'
import { JSX } from 'preact'

interface LinkProps extends JSX.HTMLAttributes<HTMLAnchorElement> {
  href: string
  children: preact.ComponentChildren
}

export default function Link({ href, children, ...props }: LinkProps) {
  const { locale } = useLocale()

  const localizedHref = `/${locale}${href}`

  return (
    <a href={localizedHref} {...props}>
      {children}
    </a>
  )
}
```

###### Usage

```tsx
import { useTranslation } from "@/hooks/i18n/useTranslation.ts";
import { usePathname } from "@/hooks/i18n/usePathname.ts";
import { useLocale } from "@/hooks/i18n/useLocale.ts";

export default function IslandsComponent() {
  const t = useTranslation();
  const path = usePathname();
  const { locale } = useLocale();

  console.log("path", path);
  console.log("locale", locale);
  return (
    <div>
      {t("common.title")} // Home or ホーム
    </div>
  );
}
```
