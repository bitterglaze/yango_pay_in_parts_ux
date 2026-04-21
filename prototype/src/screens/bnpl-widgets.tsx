// Reusable BNPL widgets — used in PDP and Cart
import { bnplBaadmay, bnplYango, OUT_BLACK, OUT_FONT } from './merchant-shared'
import { FONT_FAMILY } from './yango-tokens'

// ── Baadmay Widget ───────────────────────────────────────────────────────────
export function BaadmayWidget({ price, size = 'sm' }: { price: number; size?: 'sm' | 'lg' }) {
  const installment = bnplBaadmay(price)
  const isLg = size === 'lg'
  const logoH = isLg ? 20 : 16
  const fontSize = isLg ? 12 : 11
  return (
    <div style={{
      display: 'flex', alignItems: 'center', gap: isLg ? 3 : 3,
      padding: isLg ? '3px 0' : '2px 0',
    }}>
      <img src="/checkout/baadmay-logo.svg" alt="baadmay"
        style={{ height: logoH, width: Math.round(logoH * 116 / 36), display: 'block', flexShrink: 0, objectFit: 'contain' }} />
      <span style={{ fontSize, color: OUT_BLACK, fontFamily: OUT_FONT, fontStyle: 'normal' }}>
        Pay in 3 Installments of{' '}
        <span style={{ fontWeight: 700, color: '#6016EB' }}>{installment}</span>
      </span>
    </div>
  )
}

// ── Yango Pay in Parts Widget ────────────────────────────────────────────────
export function YangoWidget({ price, onBuy }: { price: number; size?: 'sm' | 'lg'; onBuy: () => void }) {
  const perPart = bnplYango(price)
  const NUM: React.CSSProperties = { fontVariantNumeric: 'lining-nums proportional-nums' }

  return (
    <button
      type="button"
      onClick={onBuy}
      style={{
        width: '100%',
        border: '1px solid rgba(0,0,0,0.08)',
        borderRadius: 12,
        padding: '12px 20px 12px 12px',
        background: 'transparent',
        display: 'flex',
        alignItems: 'center',
        gap: 6,
        cursor: 'pointer',
        textAlign: 'left',
        fontFamily: FONT_FAMILY,
      }}
    >
      <div style={{ width: 40, height: 40, flexShrink: 0 }}>
        <img src="/checkout/YangoPnP-logo.svg" alt="Yango Pay in Parts" style={{ width: 40, height: 40, display: 'block' }} />
      </div>
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 2, minWidth: 0 }}>
        <div style={{ fontSize: 14, fontWeight: 500, lineHeight: '16px', color: 'rgba(0,0,0,0.86)', ...NUM }}>
          Pay in 4 parts of {perPart}
        </div>
        <div style={{ fontSize: 13, fontWeight: 400, lineHeight: '16px', color: 'rgba(0,0,0,0.86)', ...NUM }}>
          Service fee applies
        </div>
      </div>
      <svg width="24" height="24" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ flexShrink: 0, display: 'block' }} aria-hidden="true">
        <path d="M5.52876 3.8047C5.26841 3.54435 5.26841 3.12224 5.52876 2.86189C5.78911 2.60154 6.21122 2.60154 6.47157 2.86189L10.9025 7.29285C11.2931 7.68338 11.2931 8.31654 10.9025 8.70707L6.47157 13.138C6.21122 13.3984 5.78911 13.3984 5.52876 13.138C5.26841 12.8777 5.26841 12.4556 5.52876 12.1952L9.72402 7.99996L5.52876 3.8047Z" fill="black"/>
      </svg>
    </button>
  )
}
