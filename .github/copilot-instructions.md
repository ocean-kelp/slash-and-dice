# Slash and Dice Copilot Instructions

## Tech

- Tailwind CSS V4
- Deno
- Fresh Framework 2.2.0

## Guidelines

### General Guidelines

- use @ for root level imports
- use relative imports for same-folder imports
- every route must as server side as possible unless it needs to run on client
- For color system guidance (palette, semantic usage, accessibility), reference the canonical file at `docs/color-guidelines.md` rather than duplicating it here. This keeps design tokens centralized and avoids needing to update multiple places.
- For CSS custom property token names (e.g., `--color-ocean-deep-500`) and their canonical values, reference `app/assets/styles.css` rather than copying tokens here. This ensures the codebase uses one authoritative source for tokens.
- **JSX/TSX Formatting**: Add a blank line before comments that introduce a new logical block of JSX elements to improve readability. Note that auto-formatters like `deno fmt` may remove these, which is acceptable.

```tsx
// ✅ Preferred style
<div>
  {/* First section */}
  <svg>...</svg>
  <span>Text</span>

  {/* Second section */}
  <button>Click</button>
</div>

// ❌ Avoid
<div>
  {/* First section */}
  <svg>...</svg>
  <span>Text</span>
  {/* Second section */}
  <button>Click</button>
</div>
```

### Dark Theme Pages

For full-page dark themed interfaces (login, authentication, onboarding, or immersive experiences), follow this pattern established in the login page:

**Page Structure:**
```tsx
<main class="min-h-screen bg-linear-to-br from-gray-900 via-gray-800 to-ocean-deep-900 flex flex-col">
  {/* Header */}
  <header class="p-6">...</header>
  
  {/* Centered content */}
  <div class="flex-1 flex items-center justify-center p-6">
    <div class="w-full max-w-md">
      {/* Title */}
      <div class="text-center mb-8">
        <h1 class="text-4xl font-bold text-white mb-3">{title}</h1>
        <p class="text-lg text-gray-400">{subtitle}</p>
      </div>
      
      {/* Card */}
      <div class="bg-gray-800/80 backdrop-blur-sm rounded-2xl shadow-2xl border border-gray-700 overflow-hidden">
        {/* Content */}
      </div>
    </div>
  </div>
</main>
```

**Key Classes:**
- Page background: `bg-linear-to-br from-gray-900 via-gray-800 to-ocean-deep-900`
- Cards: `bg-gray-800/80 backdrop-blur-sm rounded-2xl shadow-2xl border border-gray-700`
- Inner sections: `bg-gray-700/50 border-gray-600`
- Titles: `text-4xl font-bold text-white`
- Subtitles: `text-lg text-gray-400`
- Body text: `text-gray-300`
- Links: `text-ocean-deep-400 hover:text-ocean-deep-300`
- Focus rings: `focus:ring-ocean-deep-500 focus:ring-offset-gray-800`
- Warnings: `bg-amber-500/10 border-amber-500/30 text-amber-400`

**Reference implementation:** See `app/routes/(ui)/[locale]/(public)/login.tsx` and `app/islands/auth/LoginProviders.tsx`

### Fresh Framework

- For handlers use this pattern:

```ts
import { define } from "../utils.ts";

export const handler = define.middleware(async (ctx) => {
  console.log("my middleware");
  return await ctx.next();
});
```

- Avoid serialization issues by not attaching non-serializable data (like functions or DOM elements) to the context object.

```tsx
<CountdownTimer
    targetDate={data.endTime}
    onTimeUp={() => { // ❌ ERROR: Function in server-rendered JSX
    console.log("Timer expired!");
    window.location.reload();
    }}
/>
```

### I18N

- For now only entires for en language should be added/modified in the translation files. Other languages will be added later.
- **Always use `t()` function calls for internationalization without fallback values** - this helps identify missing translation keys and ensures the i18n system is working properly. Never use fallback values like `t("key") || "fallback"` as this masks issues with missing translations.

### Utilities

#### enviroments.ts

- isClient(): boolean - Returns true if running in a browser (client-side): use this to guard any code that requires browser APIs, for example adding cookies, accessing an env var, etc.

#### config.ts

- **Always use `appConfig` from `@/utilities/config.ts` to access environment variables** - never call `Deno.env.get()` directly. This centralizes configuration, provides proper validation, and ensures server-side only access is enforced.

```ts
// ✅ correct
import { appConfig } from "@/utilities/config.ts";
const baseUrl = appConfig.authBaseUrl;

// ❌ avoid
const baseUrl = Deno.env.get("BETTER_AUTH_URL");
```

- If you need a new environment variable, add it to `config.ts` with a getter in `appConfig`.

### Internationalization (i18n)

- Use `@elsoul/fresh-i18n` for localization and follow the conventions in `docs/i18n/i18n-system.md`.

- All user-facing strings MUST be added to the translation JSON files and NOT left as inline text in components. This keeps translations centralized and consistent across locales.

- **Use relative URLs for navigation within locale routes** - When linking between pages in the same locale context, use relative paths (e.g., `href="characters"`) instead of absolute paths with locale prefixes (e.g., `href={/${locale}/characters}`). Fresh's routing will automatically maintain the correct locale context. This prevents hardcoding locale paths and ensures proper locale persistence across navigation.

- Translation files live under `locales/` using this layout: `locales/<locale>/<namespace>.json` (for example, `locales/en/common.json`). The base namespaces `common.json`, `metadata.json` and `error.json` should be added when possible.

- For a new locale, add a new folder under `locales/` and create the corresponding namespace files. If you add route-specific keys, add a namespace file for that route (e.g., `company.json`) in every locale you support.

- Preserve placeholders and interpolation tokens exactly between locales (for example `{{name}}`).

- If you add or rename translation keys, update `locales/en` first and then add a corresponding entry (even an empty value) in other locales; include details in the PR description.

- When updating the `i18nPlugin` languages list in `main.ts` you must add the locale slug to the `languages` array to enable detection and routing for that locale.

- If translations are used inside islands (client-interactive components), ensure translation data is shared via the `StateShareLayer` or follow the pattern in `docs/i18n/i18n-system.md`.

- Example usage on route:

```tsx
import { define } from "@/utils/state.ts";
import { translate } from "@/utilities/languages.ts";

export const handler = define.handlers({
  GET(ctx) {
    console.log("ctx", ctx.state.translationData); // Access translation data directly
    return {
      data: {
        translationData: ctx.state.translationData,
      },
    };
  },
});

// Prefer using Fresh's `PageProps<T>` typing and destructuring `data` for
// route components. This ensures TypeScript knows the shape of `data` that
// the handler returned and keeps server/handler contract explicit.
import { PageProps } from "fresh";

export default function Home({ data }: PageProps<{ translationData?: Record<string, unknown> }>) {
  const t = translate(data?.translationData ?? {});
  return (
    <div>
      {t("common.home.title")} // Use full namespace.path format
    </div>
  );
}
```


- Example usage in islands:

Islands receive the translation data via props from the parent route/component. Then we can create a translator instance using `createTranslator` and use it to get translated strings. Same as routes.

```tsx
import { translate } from "@/utilities/languages.ts";

export default function MyIsland({ translationData }) {
  const t = translate(translationData);
  return (
    <div>
      {t("common.header.userOptions.openMenu")} // Always use full path with namespace
    </div>
  );
}
```

**Translation Key Format:**
All translation keys must include the namespace prefix (`common.`, `error.`, etc.) followed by the full path to the translation. The translation data structure mirrors the JSON files:

```json
{
  "common": {
    "home": {
      "title": "Welcome to Slash & Dice"
    },
    "header": {
      "userOptions": {
        "openMenu": "Open menu"
      }
    }
  },
  "error": {
    "title": "Something went wrong"
  }
}
```

**Correct usage:**
- ✅ `t("common.home.title")` 
- ✅ `t("common.header.userOptions.openMenu")`
- ✅ `t("error.title")`

**Incorrect usage:**
- ❌ `t("home.title")` (missing namespace)
- ❌ `t("header.userOptions.openMenu")` (missing namespace)

### Errors to avoid

#### Relative redirects without a base (Fresh / new URL)

  - The problem: calling `Response.redirect` with a path-only string can trigger
    Fresh (or internal code) to call `new URL("/es/error")` with no base URL,
    which throws `Invalid URL`.

  - ❌ Wrong (may throw):

  ```ts
  // This can lead to `new URL("/es/error")` internally which is invalid
  // unless a base is provided.
  return Response.redirect(`/${lang}/error`, 302);
  ```

  - ✅ Fix: build an absolute URL using the request URL as the base.

  ```ts
  // Option A
  return Response.redirect(
    new URL(`/${lang}/error`, ctx.url),
    302,
  );

  // Option B (equivalent)
  const url = new URL(ctx.url);
  url.pathname = `/${lang}/error`;
  return Response.redirect(url, 302);
  ```

  - Short rationale: `new URL(path, base)` ensures the URL constructor has a base
    and prevents runtime failures when the platform calls `new URL()` internally.

#### PageProps in route components

- Prefer using Fresh's `PageProps<T>` typing and destructuring `{ data }` in route components to avoid reading the wrong props shape. Handlers return values under `data` (for example `{ data: { translationData } }`) and components should use the typed signature below to avoid missing translation data at runtime:

```tsx
import { PageProps } from "fresh";

export default function Home({ data }: PageProps<{ translationData?: Record<string, unknown> }>) {
  const t = translate(data?.translationData ?? {});
  return <div>{t("common.title")}</div>;
}
```

  - Rationale: Destructuring `data` with `PageProps<T>` makes the handler/component contract explicit and prevents subtle bugs where `props.translationData` is undefined while `props.data.translationData` contains the translations.

#### Translation key validation

- The `translate()` function includes built-in validation that helps identify missing translation keys during development
- In development mode, missing keys will show as `[key.name]` in the UI and log detailed warnings to the console
- In production, missing keys return empty strings for a clean user experience
- Always use the full namespace path (e.g., `common.header.userOptions.openMenu`) to avoid validation errors


#### Accessing translation data

- The translations are stored at /locale, there is a folder per locale and under each locale folder there jsons, the base ones: `common.json`, `metadata.json`, and `error.json` and other namespace jsons that match route or component names. If the translated text is not being shown on the page then check that the code is calling the correct key, for example `t("common.title")` to get the title from `common.json`, do not use `t("title")` as it will not find the key.

### Static assets

- Files placed under `app/static/` are served by the Fresh static handler and should be referenced from templates as if they live at the site root (for example `/logos/DS-logo.webp`), not with a `/static/` prefix. Copilot and contributors should assume the static folder is already mounted at the expected public path when writing HTML/JSX. Example:

```tsx
// ✅ correct
<img src="/logos/DS-logo.webp" alt="DS logo" />

// ❌ avoid
<img src="/static/logos/DS-logo.webp" alt="DS logo" />
```

- If your project customizes the static mount point, follow that configuration; otherwise default to root paths. If you need to reference files via special query-mounts (for example `?logos` in some environments), prefer the project's convention — but don't hardcode `/static/...` paths in components or routes.

### Game Data Structure

For comprehensive documentation on how game data is organized, see `docs/data/game-data-structure.md`. Key points:

**Data Storage Pattern:**
- Use static JSON files for character metadata, stats, and abilities (`app/data/characters/characters.json`)
- Use static assets for images/GIFs following convention: `/characters/{character-name}/{asset-type}.{ext}`
- Use Deno KV only for user-specific data (favorites, ratings, collections)

**Naming Conventions:**
- Character `name` field is the ID (lowercase, used in URLs and paths)
- All JSON properties use **camelCase** (e.g., `critRate`, `atkSpeed`, not `crit-rate`)
- Asset types: `thumbnail.png`, `idle.gif`, `attack.gif`, `special.gif`

**Service Layer:**
```typescript
import { characterService } from "@/services/local/data/characterService.ts";

// Get all characters (lightweight - name + thumbnail only)
const characters = characterService.getAllCharacters();

// Get full character data
const knight = characterService.getByName("knight");

// Get asset path
const thumbnail = characterService.getThumbnail("knight");
```

**Convention Over Configuration:**
- Don't store asset paths in JSON - they're generated by the service based on character name
- Follow the pattern: `/characters/{name}/{assetType}.{ext}`
- Only add paths to JSON if you have inconsistent naming or CDN URLs

**Adding New Characters:**
1. Add entry to `app/data/characters/characters.json`
2. Add assets to `app/static/characters/{name}/` folder
3. Service automatically picks up new characters