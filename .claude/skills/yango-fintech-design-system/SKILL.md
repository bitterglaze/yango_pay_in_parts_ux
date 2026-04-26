---
name: yango-fintech-design-system
description: >
  Build or refactor HTML/CSS/React UI to match the Yango FinTech design system using explicit design tokens.
  Use this skill whenever the user asks to build a UI screen, page, component, widget, form, card, button,
  modal, or any visual element, OR when the user provides existing code to update/refactor to match the design system.
  Trigger on: "build me", "create a screen", "make a component", "implement this UI", "refactor this",
  "update to match design system", "apply tokens", "fix colors", "Yango", "FinTech", "BNPL", "Pay in parts",
  or any request to produce or update front-end code consistent with the Yango FinTech product.
  Two modes: Build Mode (create from scratch) and Refactor Mode (update existing code).
---

# Yango FinTech Design System

This skill generates or refactors UI code using a strict design token system.
Token values below are extracted from the Yango FinTech Figma libraries and validated against
the production prototype in `prototype/src/index.css` + `prototype/src/screens/yango-tokens.ts`.

⚠️ CRITICAL RULES — always enforced:
- NEVER invent or approximate token values
- NEVER hardcode colors, spacing, or font values directly in component styles
- If a token genuinely does not exist for the situation → STOP and ask the user before adding a new one
- DO NOT call Figma MCP tools unless the user explicitly provides a Figma URL and asks you to inspect it

---

## MODES

### 🟢 Build Mode (default)
Use when the user asks to create new UI.

**Rules:**
- Use ONLY the design tokens defined in this skill
- Follow the layout from the user's description
- Use semantic HTML (`<button>`, `<input>`, `<label>`, `<nav>`, `<main>`, etc.)
- Match typography, spacing, and colors exactly — from tokens only
- For React/TSX, import tokens from `prototype/src/screens/yango-tokens.ts`
- For plain HTML, use the CSS custom properties below in an embedded `<style>` block

### 🔵 Refactor Mode
Use when the user provides existing code to update.

**Core rule: DO NOT CHANGE STRUCTURE.**

**Allowed:**
- Replace hardcoded colors → tokens
- Replace hardcoded typography → tokens
- Replace hardcoded spacing → tokens
- Replace hardcoded borders, radii, and shadows → tokens

**Conditional — only if structure stays identical:**
- Replace component styles if layout and DOM are unchanged

**Forbidden:**
- No layout changes
- No DOM restructuring
- No adding or removing HTML elements
- No rewriting logic or behavior

If a change would require structural modification → skip it silently and note it at the end.

---

## DESIGN TOKENS (SOURCE OF TRUTH)

### Colors

```css
:root {
  /* Brand */
  --color-primary: #FF4930;            /* Yango red — primary brand, primary buttons */
  --color-primary-hover: #e6412b;      /* ~8% darker, hover state */
  --color-primary-active: #cc3a26;     /* ~16% darker, active/pressed state */
  --color-accent-yellow: #FCE000;      /* Yango yellow — secondary brand accent */

  /* Surfaces */
  --color-background: #FFFFFF;         /* Page / app background */
  --color-surface: #f3f5f7;            /* Default fill — cards, list rows */
  --color-surface-secondary: #EDEFF2;  /* Inputs, secondary buttons (light theme) */
  --color-surface-success-soft: #e1fae7; /* Subtle green tint, success badges */

  /* Text */
  --color-text-primary: rgba(0, 0, 0, 0.86);    /* Primary text */
  --color-text-secondary: rgba(0, 0, 0, 0.5);   /* Secondary text, captions */
  --color-text-inverted: rgba(255, 255, 255, 0.98); /* Text on dark / brand bg */
  --color-text-dark: #21201F;          /* Theme/Default/Day/Text — high-contrast headings */

  /* Borders */
  --color-border: #E5E5E5;             /* Default border / divider */
  --color-border-soft: rgba(0, 0, 0, 0.08); /* Other/Border — subtle dividers */

  /* Status */
  --color-success: #56c776;            /* Success state */
  --color-error: #FF4C52;              /* Error state */

  /* Third-party brand colors (NOT Yango — only for partner logos / payment methods) */
  --color-easypaisa: #00A651;
  --color-jazzcash: #E63B2E;
}
```

### Typography

Font family: **YS Text** (proprietary). Files in `prototype/public/fonts/`: Light/Regular/Medium/Bold.

```css
:root {
  --font-family-base: 'YS Text', -apple-system, 'SF Pro Text', 'Helvetica Neue', sans-serif;

  /* Core scale — from Figma Typography (NBeHMily2P29iqMWqqfn8C) */
  --font-size-xs: 11px;       /* Caption/C3 — lh 12 */
  --font-size-sm: 13px;       /* Caption/C1 — lh 16 */
  --font-size-base: 14px;     /* Body/B3   — lh 18 */
  --font-size-lg: 16px;       /* Body/B2   — lh 20 */
  --font-size-xl: 18px;       /* Title/T1  — lh 20 */

  /* Extended scale */
  --font-size-caption: 12px;  /* Caption/C2 — lh 14 */
  --font-size-2xl: 20px;      /* Headline/H4 — lh 24 */
  --font-size-h3: 22px;       /* Headline/H3 — lh 24 */
  --font-size-num-sm: 24px;   /* Numbers/N6 — lh 26 */
  --font-size-h2: 28px;       /* Numbers/N5 — lh 30 */
  --font-size-display: 32px;  /* Numbers/N4 — lh 36 */

  /* Weights */
  --font-weight-light: 300;
  --font-weight-regular: 400;
  --font-weight-medium: 500;
  --font-weight-semibold: 600;
  --font-weight-bold: 700;

  --line-height-base: 1.4;
}
```

### Spacing

4px base grid.

```css
:root {
  --space-1: 4px;
  --space-2: 8px;
  --space-3: 12px;
  --space-4: 16px;
  --space-6: 24px;
  --space-8: 32px;
  --space-10: 40px;
  --space-12: 48px;
  --space-16: 64px;
}
```

### Border Radius

```css
:root {
  --radius-sm: 8px;
  --radius-md: 12px;
  --radius-lg: 16px;   /* Default for buttons, cards */
  --radius-xl: 20px;   /* Bottom sheets, hero cards */
}
```

### Shadows

```css
:root {
  --shadow-bottom-bar: 0 -4px 20px rgba(0, 0, 0, 0.12); /* Sticky CTA bar above content */
  --shadow-float: 0 2px 40px rgba(0, 0, 0, 0.1);        /* Floating cards / popovers */
  --shadow-medium: 0 7px 23px rgba(33, 34, 36, 0.17);   /* Elevated cards */
}
```

---

## COMPONENT PATTERNS

### Primary Button (red — main CTA, always use these — no exceptions)

```css
.btn-primary {
  background: var(--color-primary);
  color: var(--color-text-inverted);
  border: none;
  border-radius: var(--radius-lg);
  height: 56px;
  width: 100%;
  font-family: var(--font-family-base);
  font-size: var(--font-size-xl);
  font-weight: var(--font-weight-medium);
  cursor: pointer;
  transition: background-color 0.15s ease;
}
.btn-primary:hover  { background: var(--color-primary-hover); }
.btn-primary:active { background: var(--color-primary-active); }
.btn-primary:disabled { opacity: 0.4; cursor: not-allowed; }
```

### Secondary Button (yellow — promotional / secondary CTA)

```css
.btn-yellow {
  background: var(--color-accent-yellow);
  color: var(--color-text-primary);
  border: none;
  border-radius: var(--radius-lg);
  height: 56px;
  width: 100%;
  font-family: var(--font-family-base);
  font-size: var(--font-size-xl);
  font-weight: var(--font-weight-medium);
  cursor: pointer;
}
```

### Tertiary Button (light grey)

```css
.btn-secondary {
  background: var(--color-surface-secondary);
  color: var(--color-text-primary);
  border: none;
  border-radius: var(--radius-lg);
  height: 56px;
  width: 100%;
  font-family: var(--font-family-base);
  font-size: var(--font-size-lg);
  font-weight: var(--font-weight-medium);
  cursor: pointer;
}
```

### Card

```css
.card {
  background: var(--color-background);
  border-radius: var(--radius-lg);
  padding: var(--space-4);
  box-shadow: var(--shadow-float);
}
```

### List row / Fill surface

```css
.list-row {
  background: var(--color-surface);
  border-radius: var(--radius-md);
  padding: var(--space-3) var(--space-4);
}
```

### Input

```css
.input {
  background: var(--color-surface-secondary);
  border: none;
  border-radius: var(--radius-md);
  height: 56px;
  padding: 0 var(--space-4);
  font-family: var(--font-family-base);
  font-size: var(--font-size-lg);
  color: var(--color-text-primary);
}
.input::placeholder { color: var(--color-text-secondary); }
.input:focus { outline: 2px solid var(--color-primary); outline-offset: -2px; }
```

### Bottom sheet / Modal

```css
.sheet {
  background: var(--color-background);
  border-radius: var(--radius-xl) var(--radius-xl) 0 0;
  padding: var(--space-6) var(--space-4) var(--space-6);
  box-shadow: var(--shadow-bottom-bar);
}
```

---

## LAYOUT CONVENTIONS

- **Mobile viewport**: 390px (iPhone 14+). Desktop centers a 390px-wide frame.
- **Status bar**: 56px height, transparent — real device status bar shows through; no fake mock-status in production.
- **Header**: 60px height, padding 6px 16px. Logo centered, single icon button (40×40) on each side.
- **Bottom safe area**: 24px padding for iOS home indicator.
- **Sticky CTA**: `position: sticky; bottom: 0;` with `--shadow-bottom-bar`.

---

## WORKFLOW

### Step 1 — Detect Mode
- User provides existing code → **Refactor Mode**
- User describes what to build → **Build Mode**

### Step 2 — Validate Tokens
- Check that all needed tokens exist in this file
- If a needed token genuinely does not exist → STOP and ask the user

### Step 3 — Audit (Refactor Mode only)
Scan the provided code. List every hardcoded color, font value, spacing, radius, and shadow that should
use a token. Do NOT rewrite the code yet.

### Step 4 — Apply Changes
**Build Mode:** semantic HTML + tokens, all interactive states for buttons/inputs.
**Refactor Mode:** work through the audit list one property at a time. Leave everything else untouched.

### Step 5 — Self-Check
- [ ] No hardcoded colors (except `#ffffff` text on primary if not tokenized)
- [ ] No hardcoded font sizes or weights
- [ ] No hardcoded spacing values
- [ ] No hardcoded radii or shadows
- [ ] No invented tokens
- [ ] Structure unchanged (Refactor Mode)
- [ ] Primary buttons use `--color-primary` / `--color-primary-hover` / `--color-primary-active`

If any check fails → fix it before responding.

---

## OUTPUT RULES

- Return the **full updated file** — never a partial diff
- No explanations inside the code
- After the code, add a brief note (2–4 lines max) listing any skipped changes and why

---

## Figma Source Files (inspect only when user provides a URL)

Do NOT call Figma tools automatically. Only use them if the user explicitly asks to inspect a specific design.

| File | Purpose | Key |
|------|---------|-----|
| 🌸 Colors | Color tokens | `gvtfryYfADrPjCKYaSqvGG` node `8505:74489` |
| ❖ Typography | Type styles | `NBeHMily2P29iqMWqqfn8C` node `937:638` |
| 🥪 Widgets | UI components | `nMAKVZN3Glht02DGkrDHWO` node `1:5` |
| 💝 Graphics | Icons & illustrations | `UzuTZFnEVRDQTyr6PGCKlA` node `0:1` |
| Shopify Integration | Product screens | `6ITv4gePgPFe2a2g5zZsSs` node `667:78704` |
| 🍕 BOX Components A | Box UI set A | `lZzTT0UijMAXhkCIQygtVD` node `50:7065` |
| 🍕 BOX Components B | Box UI set B | `lZzTT0UijMAXhkCIQygtVD` node `3591:94492` |
| 3 · Checkout (Offers/Success) | Offers & success screens | `ooLwIFzbUj3ZRMj1uwUF4l` node `2169:42990` |
| 3 · Checkout (Full flow) | Full checkout flow | `ooLwIFzbUj3ZRMj1uwUF4l` node `2169:49758` |
