# Yango FinTech — Design Tokens Reference

Pre-extracted design tokens for the Yango FinTech (Pay in Parts / BNPL) product.

**Last updated:** 2026-04-26
**Source of truth:** Figma libraries (see SKILL.md) + `prototype/src/index.css` + `prototype/src/screens/yango-tokens.ts`.

> When tokens here change, also update `../SKILL.md`, `prototype/src/index.css`, and
> `prototype/src/screens/yango-tokens.ts` — keep all three in sync.

---

## Color Tokens

> Source: Colors file `gvtfryYfADrPjCKYaSqvGG`, node `8505:74489`

```css
:root {
  /* Brand */
  --color-primary:        #FF4930;            /* Yango red */
  --color-primary-hover:  #e6412b;            /* hover (~8% darker) */
  --color-primary-active: #cc3a26;            /* pressed (~16% darker) */
  --color-accent-yellow:  #FCE000;            /* Yango yellow */

  /* Surfaces */
  --color-background:           #FFFFFF;
  --color-surface:              #f3f5f7;
  --color-surface-secondary:    #EDEFF2;
  --color-surface-success-soft: #e1fae7;

  /* Text */
  --color-text-primary:   rgba(0, 0, 0, 0.86);
  --color-text-secondary: rgba(0, 0, 0, 0.5);
  --color-text-inverted:  rgba(255, 255, 255, 0.98);
  --color-text-dark:      #21201F;

  /* Borders */
  --color-border:      #E5E5E5;
  --color-border-soft: rgba(0, 0, 0, 0.08);

  /* Status */
  --color-success: #56c776;
  --color-error:   #FF4C52;

  /* Third-party brand (partner logos / payment methods only) */
  --color-easypaisa: #00A651;
  --color-jazzcash:  #E63B2E;
}
```

---

## Typography Tokens

> Source: Typography file `NBeHMily2P29iqMWqqfn8C`, node `937:638`
> Font files: `prototype/public/fonts/YS Text-{Light,Regular,Medium,Bold}.ttf`

```css
:root {
  --font-family-base: 'YS Text', -apple-system, 'SF Pro Text', 'Helvetica Neue', sans-serif;

  /* Core scale */
  --font-size-xs:   11px; /* Caption/C3 — lh 12 */
  --font-size-sm:   13px; /* Caption/C1 — lh 16 */
  --font-size-base: 14px; /* Body/B3   — lh 18 */
  --font-size-lg:   16px; /* Body/B2   — lh 20 */
  --font-size-xl:   18px; /* Title/T1  — lh 20 */

  /* Extended scale */
  --font-size-caption: 12px; /* Caption/C2 — lh 14 */
  --font-size-2xl:     20px; /* Headline/H4 — lh 24 */
  --font-size-h3:      22px; /* Headline/H3 — lh 24 */
  --font-size-num-sm:  24px; /* Numbers/N6 — lh 26 */
  --font-size-h2:      28px; /* Numbers/N5 — lh 30 */
  --font-size-display: 32px; /* Numbers/N4 — lh 36 */

  /* Weights */
  --font-weight-light:    300;
  --font-weight-regular:  400;
  --font-weight-medium:   500;
  --font-weight-semibold: 600;
  --font-weight-bold:     700;

  --line-height-base: 1.4;
}
```

### Type roles (per Figma)

| Role          | Size | Line-height | Weight    | Use                                   |
|---------------|------|-------------|-----------|---------------------------------------|
| Display / N4  | 32   | 36          | bold      | Hero amounts, big numbers             |
| H2 / N5       | 28   | 30          | bold      | Page titles                           |
| H3            | 22   | 24          | semibold  | Section titles                        |
| H4 / 2xl      | 20   | 24          | semibold  | Card titles                           |
| Title / T1    | 18   | 20          | medium    | Subsection / button label             |
| Body / B2     | 16   | 20          | regular   | Default body text, list items         |
| Body / B3     | 14   | 18          | regular   | Dense body text, helper text          |
| Caption / C1  | 13   | 16          | regular   | Captions                              |
| Caption / C2  | 12   | 14          | regular   | Small captions                        |
| Caption / C3  | 11   | 12          | regular   | Smallest legal / metadata             |

---

## Spacing & Layout Tokens

> Source: Widgets file `nMAKVZN3Glht02DGkrDHWO`, node `1:5`
> 4px base grid.

```css
:root {
  --space-1:  4px;
  --space-2:  8px;
  --space-3:  12px;
  --space-4:  16px;
  --space-6:  24px;
  --space-8:  32px;
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
  --radius-lg: 16px;  /* default for buttons, cards */
  --radius-xl: 20px;  /* bottom sheets, hero cards */
}
```

### Shadows / Elevation

```css
:root {
  --shadow-bottom-bar: 0 -4px 20px rgba(0, 0, 0, 0.12);
  --shadow-float:      0 2px 40px rgba(0, 0, 0, 0.1);
  --shadow-medium:     0 7px 23px rgba(33, 34, 36, 0.17);
}
```

### Layout constants

| Token             | Value    | Use                                          |
|-------------------|----------|----------------------------------------------|
| Mobile viewport   | 390px    | iPhone 14+ frame, also desktop preview width |
| Status bar        | 56px     | Transparent — real device shows through      |
| Header            | 60px     | Padding 6px 16px; centered logo              |
| CTA button height | 56px     | Primary / secondary / yellow                 |
| Icon button       | 40 × 40  | Header / list-row affordances                |
| Bottom safe area  | 24px     | iOS home indicator clearance                 |

---

## Component Patterns

> Patterns observed from the Widgets file (`nMAKVZN3Glht02DGkrDHWO`) and verified in the prototype.

### Buttons

```css
.btn-primary {
  background: var(--color-primary);
  color: var(--color-text-inverted);
  border: none;
  border-radius: var(--radius-lg);
  height: 56px;
  font: var(--font-weight-medium) var(--font-size-xl) / 1 var(--font-family-base);
  cursor: pointer;
  transition: background-color 0.15s ease;
}
.btn-primary:hover  { background: var(--color-primary-hover); }
.btn-primary:active { background: var(--color-primary-active); }
.btn-primary:disabled { opacity: 0.4; cursor: not-allowed; }

.btn-yellow {
  background: var(--color-accent-yellow);
  color: var(--color-text-primary);
  border: none;
  border-radius: var(--radius-lg);
  height: 56px;
  font: var(--font-weight-medium) var(--font-size-xl) / 1 var(--font-family-base);
}

.btn-secondary {
  background: var(--color-surface-secondary);
  color: var(--color-text-primary);
  border: none;
  border-radius: var(--radius-lg);
  height: 56px;
  font: var(--font-weight-medium) var(--font-size-lg) / 1 var(--font-family-base);
}
```

### Cards

```css
.card {
  background: var(--color-background);
  border-radius: var(--radius-lg);
  padding: var(--space-4);
  box-shadow: var(--shadow-float);
}

.card-elevated {
  background: var(--color-background);
  border-radius: var(--radius-lg);
  padding: var(--space-4);
  box-shadow: var(--shadow-medium);
}

.list-row {
  background: var(--color-surface);
  border-radius: var(--radius-md);
  padding: var(--space-3) var(--space-4);
}
```

### Forms / Inputs

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

.input-error {
  outline: 2px solid var(--color-error);
  outline-offset: -2px;
}
```

### Navigation

```css
.app-header {
  height: 60px;
  padding: 6px var(--space-4);
  background: var(--color-background);
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.icon-button {
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: none;
  border: none;
  cursor: pointer;
  padding: var(--space-2);
}

.sticky-cta-bar {
  position: sticky;
  bottom: 0;
  padding: var(--space-4);
  padding-bottom: calc(var(--space-4) + env(safe-area-inset-bottom));
  background: var(--color-background);
  box-shadow: var(--shadow-bottom-bar);
}
```

### Bottom Sheet / Modal

```css
.sheet {
  background: var(--color-background);
  border-radius: var(--radius-xl) var(--radius-xl) 0 0;
  padding: var(--space-6) var(--space-4);
  box-shadow: var(--shadow-bottom-bar);
}

.sheet-handle {
  width: 36px;
  height: 4px;
  border-radius: 2px;
  background: var(--color-border);
  margin: 0 auto var(--space-4);
}
```

---

## Figma Variable Mappings

| Figma variable                    | CSS custom property              | Value                       |
|-----------------------------------|----------------------------------|-----------------------------|
| Brand/Primary                     | `--color-primary`                | `#FF4930`                   |
| Brand/Yellow                      | `--color-accent-yellow`          | `#FCE000`                   |
| Theme/Default/Day/Background      | `--color-background`             | `#FFFFFF`                   |
| Theme/Default/Day/Text            | `--color-text-dark`              | `#21201F`                   |
| Fill/Default                      | `--color-surface`                | `#f3f5f7`                   |
| Fill/Secondary                    | `--color-surface-secondary`      | `#EDEFF2`                   |
| Fill/Color4-100                   | `--color-surface-success-soft`   | `#e1fae7`                   |
| Text/Primary                      | `--color-text-primary`           | `rgba(0,0,0,0.86)`          |
| Text/Secondary                    | `--color-text-secondary`         | `rgba(0,0,0,0.5)`           |
| Text/Inverted                     | `--color-text-inverted`          | `rgba(255,255,255,0.98)`    |
| Other/Border                      | `--color-border-soft`            | `rgba(0,0,0,0.08)`          |
| Border/Default                    | `--color-border`                 | `#E5E5E5`                   |
| Status/Success                    | `--color-success`                | `#56c776`                   |
| Status/Error                      | `--color-error`                  | `#FF4C52`                   |
| Effect/Bottom-bar shadow          | `--shadow-bottom-bar`            | `0 -4px 20px rgba(0,0,0,0.12)` |
| Effect/Float                      | `--shadow-float`                 | `0 2px 40px rgba(0,0,0,0.1)`   |
| Effect/Medium                     | `--shadow-medium`                | `0 7px 23px rgba(33,34,36,0.17)` |
