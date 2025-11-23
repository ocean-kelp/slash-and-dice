# Color Guidelines

## Overview

This document defines the color system for the design system. It specifies the color palette, how to use each color semantically, accessibility rules, and theming guidance.

## 1. Color Palette

Here are the primary color families and their intended roles:

| Color Name | Description |
|---|---|
| **Grey Olive** | Neutral, earthy tone for backgrounds, borders, and neutral UI elements. |
| **Alice Blue** | Very light, soft blue for surfaces, cards, or subtle backgrounds. |
| **Ocean Deep** | Bold, vivid blue for primary actions, links, and focal UI elements. |
| **Vintage Grape** | Muted purple accent for secondary elements, highlights, or decorative use. |
| **Carbon Black** | Deep, neutral black/grey for text, dark backgrounds, and strong contrast. |

Each color has a scale from 50 (lightest) to 950 (darkest) to provide flexibility for UI states (hover, active, background, text, etc.).

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

Secondary / Accent: Vintage Grape (mid tones) for secondary buttons, highlights, or decorative UI.

Neutral / Background: Grey Olive for page backgrounds, cards, borders.

Surfaces: Alice Blue for lighter surfaces, containers, or soft backgrounds.

Text / High Contrast: Carbon Black for text, dark backgrounds, or when strong contrast is required.

## 3. Accessibility and Contrast

Ensure text placed on any background has a contrast ratio of at least 4.5:1 for normal text, per accessibility guidelines.

When using lighter shades (50–200) of a color as a background, pair with darker text (700–950) or with Carbon Black variants.

For very dark backgrounds (e.g., Grey Olive 900 or Carbon Black 900), white or very light text (e.g., Alice Blue 50) is appropriate, but always verify contrast.