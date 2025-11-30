# Color Guidelines

## Overview

This document defines the color system for the design system. It specifies the
color palette, how to use each color semantically, accessibility rules, and
theming guidance.

## 1. Color Palette

Here are the primary color families and their intended roles:

| Color Name        | Description                                                                |
| ----------------- | -------------------------------------------------------------------------- |
| **Grey Olive**    | Neutral, earthy tone for backgrounds, borders, and neutral UI elements.    |
| **Alice Blue**    | Very light, soft blue for surfaces, cards, or subtle backgrounds.          |
| **Ocean Deep**    | Bold, vivid blue for primary actions, links, and focal UI elements.        |
| **Vintage Grape** | Muted purple accent for secondary elements, highlights, or decorative use. |
| **Carbon Black**  | Deep, neutral black/grey for text, dark backgrounds, and strong contrast.  |

Each color has a scale from 50 (lightest) to 950 (darkest) to provide
flexibility for UI states (hover, active, background, text, etc.).

### Palette Values

```text
Grey Olive:
  50:   #f3f2f1  
  100:  #e7e5e4  
  200:  #cfcbc9  
  300:  #b7b1ae  
  400:  #9f9793  
  500:  #877d78  
  600:  #6c6460  
  700:  #514b48  
  800:  #363230  
  900:  #1b1918  
  950:  #131211  

Alice Blue:
  50:   #e7f4fd  
  100:  #cfe9fc  
  200:  #a0d3f8  
  300:  #70bef5  
  400:  #40a8f2  
  500:  #1192ee  
  600:  #0d75bf  
  700:  #0a588f  
  800:  #073a5f  
  900:  #031d30  
  950:  #021421  

Ocean Deep:
  50:   #e6f3ff  
  100:  #cde7fe  
  200:  #9acffe  
  300:  #68b7fd  
  400:  #35a0fd  
  500:  #0388fc  
  600:  #026dca  
  700:  #025197  
  800:  #013665  
  900:  #011b32  
  950:  #001323  

Vintage Grape:
  50:   #f5eff4  
  100:  #ebe0ea  
  200:  #d7c1d4  
  300:  #c3a2bf  
  400:  #af83a9  
  500:  #9c6394  
  600:  #7c5076  
  700:  #5d3c59  
  800:  #3e283b  
  900:  #1f141e  
  950:  #160e15  

Carbon Black:
  50:   #f1f3f4  
  100:  #e3e7e8  
  200:  #c7cfd1  
  300:  #abb8ba  
  400:  #8fa0a3  
  500:  #73888c  
  600:  #5c6d70  
  700:  #455254  
  800:  #2e3638  
  900:  #171b1c  
  950:  #101314
```

## 2. Semantic Usage

Define roles for each color to guide consistent usage:

Primary: Ocean Deep (especially 500–700) for buttons, links, active UI elements.

Secondary / Accent: Vintage Grape (mid tones) for secondary buttons, highlights,
or decorative UI.

Neutral / Background: Grey Olive for page backgrounds, cards, borders.

Surfaces: Alice Blue for lighter surfaces, containers, or soft backgrounds.

Text / High Contrast: Carbon Black for text, dark backgrounds, or when strong
contrast is required.

## 3. Accessibility and Contrast

Ensure text placed on any background has a contrast ratio of at least 4.5:1 for
normal text, per accessibility guidelines.

When using lighter shades (50–200) of a color as a background, pair with darker
text (700–950) or with Carbon Black variants.

For very dark backgrounds (e.g., Grey Olive 900 or Carbon Black 900), white or
very light text (e.g., Alice Blue 50) is appropriate, but always verify
contrast.

## 4. Dark Theme Design Pattern

For full-page dark themed interfaces (such as login, authentication, or
immersive experiences), follow this established pattern:

### Page Background

Use a gradient background combining gray tones with Ocean Deep accents:

```css
bg-linear-to-br from-gray-900 via-gray-800 to-ocean-deep-900
```

### Card/Container Styling

- Background: `bg-gray-800/80` with `backdrop-blur-sm` for depth
- Border: `border-gray-700`
- Shadow: `shadow-2xl`
- Border radius: `rounded-2xl`

### Typography

- Page titles: `text-4xl font-bold text-white`
- Subtitles: `text-lg text-gray-400`
- Section headers: `text-sm font-medium text-gray-300`
- Body text: `text-gray-300` or `text-gray-400`
- Muted text: `text-gray-500`

### Interactive Elements

- Links: `text-ocean-deep-400 hover:text-ocean-deep-300` or
  `text-gray-400 hover:text-white`
- Focus rings: `focus:ring-ocean-deep-500 focus:ring-offset-gray-800`

### Inner Sections (within cards)

- Background: `bg-gray-700/50`
- Border: `border-gray-600`
- Hover states: `hover:bg-gray-600/50`

### Icons and Accents

- Primary accent icons: `text-ocean-deep-400`
- Icon containers: `bg-ocean-deep-500/20`
- Checkmarks/success: `text-ocean-deep-400`

### Form Elements

- Checkbox borders: `border-gray-500` → `peer-checked:border-ocean-deep-500`
- Input backgrounds: Dark variants of gray-700/gray-800

### Warning/Alert States

- Background: `bg-amber-500/10`
- Border: `border-amber-500/30`
- Text: `text-amber-400`

### Example Implementation

Reference `app/routes/(ui)/[locale]/(public)/login.tsx` and
`app/islands/auth/LoginProviders.tsx` for a complete implementation of this
pattern.
