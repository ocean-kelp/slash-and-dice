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