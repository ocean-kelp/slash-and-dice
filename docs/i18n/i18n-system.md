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
- We use a custom `translate` utility function from `@/utilities/languages.ts`
  for server-side translation instead of `createTranslator` from
  `@elsoul/fresh-i18n`.

---

## Usage on routes

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

export default function Home(props) {
  const t = translate(props.translationData);
  return (
    <div>
      {t("common.title")} // Home or ホーム
    </div>
  );
}
```

## Usage in islands

Same as routes - use the `translate` function to create a translator instance:

```tsx
import { translate } from "@/utilities/languages.ts";

export default function MyIsland({ translationData }) {
  const t = translate(translationData);
  return (
    <div>
      {t("common.title")} // Home or ホーム
    </div>
  );
}
```
