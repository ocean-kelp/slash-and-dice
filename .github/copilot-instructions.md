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

### Utilities

#### enviroments.ts

- isClient(): boolean - Returns true if running in a browser (client-side): use this to guard any code that requires browser APIs, for example adding cookies, accessing an env var, etc.

### Internationalization (i18n)

- Use `@elsoul/fresh-i18n` for localization and follow the conventions in `docs/i18n/i18n-system.md`.
- All user-facing strings MUST be added to the translation JSON files and NOT left as inline text in components. This keeps translations centralized and consistent across locales.
- Translation files live under `locales/` using this layout: `locales/<locale>/<namespace>.json` (for example, `locales/en/common.json`). The base namespaces `common.json`, `metadata.json` and `error.json` should be added when possible.
- For a new locale, add a new folder under `locales/` and create the corresponding namespace files. If you add route-specific keys, add a namespace file for that route (e.g., `company.json`) in every locale you support.
- Preserve placeholders and interpolation tokens exactly between locales (for example `{{name}}`).
- If you add or rename translation keys, update `locales/en` first and then add a corresponding entry (even an empty value) in other locales; include details in the PR description.
- When updating the `i18nPlugin` languages list in `main.ts` you must add the locale slug to the `languages` array to enable detection and routing for that locale.
- If translations are used inside islands (client-interactive components), ensure translation data is shared via the `StateShareLayer` or follow the pattern in `docs/i18n/i18n-system.md`.
- Keep changes small
