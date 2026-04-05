// Yango FinTech Design System — Centralized Tokens
// Re-exports from shared.tsx + adds missing tokens from Figma extraction

export { YANGO_RED, YANGO_YELLOW, TEXT_PRIMARY, TEXT_SECONDARY, FILL_DEFAULT, GREEN } from './shared'

// Secondary button
export const SECONDARY_BG = '#EDEFF2'       // Secondary Normal button bg (light theme)

// Text
export const TEXT_INVERTED = 'rgba(255,255,255,0.98)'
export const DARK_TEXT = '#21201F'           // Theme/Default/Day/Text

// Surfaces
export const BACKGROUND = '#FFFFFF'
export const SURFACE_SECONDARY = SECONDARY_BG  // Alias — input backgrounds

// Borders & dividers
export const BORDER_DEFAULT = '#E5E5E5'

// Shadows
export const SHADOW_COLOR = 'rgba(0,0,0,0.12)'
export const SHADOW_BOTTOM_BAR = '0 -4px 20px rgba(0,0,0,0.12)'
export const SHADOW_FLOAT = '0 2px 40px rgba(0,0,0,0.1)'

// Typography
export const FONT_FAMILY = "'YS Text', -apple-system, 'SF Pro Text', 'Helvetica Neue', sans-serif"

// Border Radius
export const RADIUS_SM = 8
export const RADIUS_MD = 12
export const RADIUS_LG = 16
export const RADIUS_XL = 20

// Borders
export const OTHER_BORDER = 'rgba(0,0,0,0.08)'  // Other/Border — variable from Figma

// Surfaces (additional)
export const GREEN_100 = '#e1fae7'          // Fill/Color4-100 — subtle green tint

// Shadows
export const SHADOW_MEDIUM = '0px 7px 23px 0px rgba(33,34,36,0.17)'  // Medium effect

// Third-party brand colors (not Yango-owned, kept for reference)
export const EASYPAISA_GREEN = '#00A651'    // Third-party brand
export const JAZZCASH_RED = '#E63B2E'       // Third-party brand

// Font sizes — from Figma Typography (NBeHMily2P29iqMWqqfn8C)
// Core scale
export const FONT_SIZE_XS      = 11   // Caption/C3: 11px / lh 12
export const FONT_SIZE_SM      = 13   // Caption/C1: 13px / lh 16
export const FONT_SIZE_BASE    = 14   // Body/B3:    14px / lh 18
export const FONT_SIZE_LG      = 16   // Body/B2:    16px / lh 20
export const FONT_SIZE_XL      = 18   // Title/T1:   18px / lh 20
// Extended scale
export const FONT_SIZE_CAPTION = 12   // Caption/C2: 12px / lh 14
export const FONT_SIZE_2XL     = 20   // Headline/H4: 20px / lh 24
export const FONT_SIZE_H3      = 22   // Headline/H3: 22px / lh 24
export const FONT_SIZE_NUM_SM  = 24   // Numbers/N6:  24px / lh 26
export const FONT_SIZE_H2      = 28   // Numbers/N5:  28px / lh 30
export const FONT_SIZE_DISPLAY = 32   // Numbers/N4:  32px / lh 36
