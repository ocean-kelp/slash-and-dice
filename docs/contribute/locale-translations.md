# Contributing Translations

Thank you for helping to make Slash and Dice accessible to more users!

This document outlines how our i18n system works and how contributors can add or
edit translations in a consistent, reviewable way.

## What we use

- `@elsoul/fresh-i18n` plugin for Fresh v2 drives our localization system.
- Translation files are JSON, grouped by locale and namespace inside `locales/`
  (e.g., `locales/en/common.json`).
- Our routes are placed in a `[locale]` folder so URLs are localized (e.g.,
  `/<locale>/`).

## Locale and Directory structure

The `locales/` folder uses this structure:

```
locales/
	├─ en/
	│  ├─ common.json
	│  ├─ metadata.json
	│  └─ ...
	├─ ja/
	│  ├─ common.json
	│  └─ ...
	└─ ...
```

- `common.json`, `metadata.json`, and `error.json` are considered base
  namespaces and are always loaded if present.
- Other namespaces live in JSON files matching route or component names (for
  example, `company.json` or `profile.json`).
- Locale identifiers follow standard tags like `en`, `es`, `ja`, `ko`,
  `zh-Hans`, and `zh-Hant`.

## What to translate

- Translate any string that appears in the UI and is represented in the
  translation JSON files.
- Keep keys stable: avoid renaming translation keys in bulk unless you update
  all locales and the usage locations.
- Only add files that are meaningful — the i18n plugin will skip missing
  namespaces gracefully.

## Adding a new language

1. Create a new folder under `locales/` with the locale tag (for example,
   `locales/fr/`).
2. Add `common.json`, `metadata.json`, and `error.json` with translations. You
   may copy from `locales/en` as a starting point.
3. Add any namespace files needed by the application or by new routes you plan
   to localize.
4. If you want the app to detect that locale by default, update the `i18nPlugin`
   registration in `main.ts` (see `i18n-system.md`) and add the locale string to
   the `languages` array.

Example:

```json
// locales/fr/common.json
{
    "welcome": "Bienvenue",
    "title": "Accueil"
}
```

## Updating or adding translations to a locale

1. Find the relevant namespace file in `locales/<locale>/` that includes the key
   you want to change.
2. If the key does not exist, add it to the appropriate namespace file; DO NOT
   add translations into arbitrary files — prefer the namespace that best groups
   related text.
3. Preserve placeholders: when strings contain placeholders like `{{name}}` or
   similar, keep the same placeholders in the translated string.
4. Keep pluralization and gender in mind; where appropriate, follow the JSON
   structure used in other locales to provide pluralization rules.

## Key Naming and Namespace conventions

- Use dot notation for lookups in code (for example: `common.title`). The JSON
  file organizes nested keys which correspond to this dot notation.
- Keep translation keys semantic and stable across files. Avoid embedding the UI
  content as a key name; prefer short and semantic keys (e.g., `button.confirm`,
  `header.title`).

## Best practices and quality checks

- Context: Give translators context in comments or in the translation copy where
  necessary (in code review, use comments or PR descriptions to explain UI
  context).
- Keep translations short and avoid line breaks unless the original text
  contains them.
- Avoid duplicating keys — reuse existing keys when the same text appears in
  multiple places.
- Don't modify the key style (such as changing case or separators) — maintain
  the pattern used across locales.
- If you'd like to change wording in the original language, discuss in a PR and
  update all locales appropriately.

## Testing your changes locally

1. Run the app locally and ensure the locale is loaded via the URL prefix:
   `http://localhost:8000/<locale>/` (for example, `http://localhost:8000/fr/`).
2. Check the UI for both content and layout issues (strings that are too long
   may break UI components).
3. Validate JSON to ensure there are no syntax errors.

## Pull requests and reviews

- Use a clear PR title — e.g., "i18n: Add French translations for common and
  error namespaces".
- Describe any key decisions in the PR description (context, placeholders,
  selection choices).
- Add a link to screenshots if you changed UI copy that might affect layout.
- When reviewing PRs, check for:
  - Accuracy and tone of translation.
  - Proper placeholder use and escaped characters.
  - Correct file/namespace placement.
  - No accidental changes to other files or to English source strings.

## Machine translations

- Machine translations (automatic or generated without review) may be used only
  as a first pass. Please ensure at least one native speaker or experienced
  translator reviews any machine-assisted translations before merging.

## Accessibility and security

- Keep ARIA labels and accessible strings updated where necessary. Do not change
  machine-generated IDs used in code when editing translations.
- Be careful when translating strings containing user-generated values or HTML.
  The plugin surface should handle string interpolation; avoid injecting raw
  HTML from translations.

## Adding or removing namespaces

- If you extract or split UI text into a new namespace, add a new JSON file
  under every relevant locale with the same key set — even if initially left
  empty — to keep consistency.
- Remove unused keys carefully, and ensure code no longer references them before
  deleting them.

## Where to find more information

- See `docs/i18n/i18n-system.md` for details about the `@elsoul/fresh-i18n`
  setup and how the translation data is consumed in both server-rendered pages
  and islands.
- Check the `islands/layouts/StateShareLayer.tsx` for the shape of the shared
  state and how translation data flows to islands.
 - Note: this project stores translation state under `state.i18n` (see
   `app/utils.ts` — `i18n: TranslationState`). Use `state.i18n.translationData`
   and `state.i18n.locale` when you need to access translation data in server
   or island code.

## Troubleshooting

- Translation does not appear: ensure the route is using a `[locale]` prefix and
  the proper namespace keys exist.
- Syntax error in JSON: use `jq` or any JSON validator to check the file before
  PRs.
- Missing keys: confirm the plugin loads the namespace and that your
  route/component is requesting the correct namespace/keys.

## Thank you

Thank you for contributing translations to Slash and Dice! If you have any
questions, open a discussion or ask for reviews from native speakers and
maintainers. Your work helps make the project welcoming to more people
worldwide.
