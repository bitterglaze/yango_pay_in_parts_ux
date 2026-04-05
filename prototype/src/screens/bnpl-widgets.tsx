// Reusable BNPL widgets — used in PDP and Cart
import { bnplBaadmay, bnplYango, OUT_BLACK, OUT_WHITE, OUT_FONT } from './merchant-shared'
import { YANGO_RED } from './shared'
import { FONT_FAMILY } from './yango-tokens'

// ── Baadmay Widget ───────────────────────────────────────────────────────────
export function BaadmayWidget({ price, size = 'sm' }: { price: number; size?: 'sm' | 'lg' }) {
  const installment = bnplBaadmay(price)
  const isLg = size === 'lg'
  const logoH = isLg ? 24 : 18
  const logoW = isLg ? 85 : undefined
  const fontSize = isLg ? 14 : 11
  return (
    <div style={{
      display: 'flex', alignItems: 'center', gap: isLg ? 4 : 6,
      padding: isLg ? '4px 0' : '3px 0',
    }}>
      <img src="/checkout/baadmay-logo.svg" alt="baadmay"
        style={{ height: logoH, width: logoW, display: 'block', flexShrink: 0, objectFit: 'contain' }} />
      <span style={{ fontSize, color: OUT_BLACK, fontFamily: OUT_FONT, fontStyle: 'normal' }}>
        Pay in 3 Installments of{' '}
        <span style={{ fontWeight: 700, color: '#6016EB' }}>{installment}</span>
      </span>
    </div>
  )
}

// ── Yango Pay in Parts Widget ────────────────────────────────────────────────
export function YangoWidget({ price, size = 'sm', onBuy }: { price: number; size?: 'sm' | 'lg'; onBuy: () => void }) {
  const perPart = bnplYango(price)
  const NUM: React.CSSProperties = { fontVariantNumeric: 'lining-nums proportional-nums' }

  // #30 — sm: title T3 14/18/500, caption C3 11/12, padding 12/12/12/16
  // lg keeps original sizing
  const isSm = size === 'sm'
  const titleSize = isSm ? 14 : 16
  const titleLH = isSm ? '18px' : '20px'
  const subSize = isSm ? 11 : 13
  const subLH = isSm ? '12px' : '16px'
  const padLeft = isSm ? 12 : 16
  const padTop = isSm ? 12 : 16
  const padBot = isSm ? 12 : 16
  const padRight = isSm ? 16 : 20

  return (
    <div style={{
      border: '1px solid rgba(0,0,0,0.08)', borderRadius: 12,
      padding: `${padTop}px ${padRight}px ${padBot}px ${padLeft}px`,
      background: OUT_WHITE,
      display: 'flex', alignItems: 'center', gap: 8,
    }}>
      <div style={{ width: 49, height: 49, flexShrink: 0 }}>
        <img src="/checkout/YangoPnP-logo.svg" alt="Yango Pay in Parts" style={{ width: 49, height: 49, display: 'block' }} />
      </div>
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 2, fontFamily: FONT_FAMILY }}>
        <div style={{ fontSize: titleSize, fontWeight: 500, lineHeight: titleLH, color: 'rgba(0,0,0,0.86)', ...NUM }}>
          Now {perPart}
        </div>
        <div style={{ fontSize: subSize, fontWeight: 400, lineHeight: subLH, color: 'rgba(0,0,0,0.5)', ...NUM }}>
          Later 3 × {perPart}
        </div>
      </div>
      <button onClick={onBuy} style={{
        background: YANGO_RED, border: 'none', borderRadius: 12, height: 40, padding: '0 20px',
        color: 'rgba(255,255,255,0.98)', fontSize: 14, fontWeight: 500, lineHeight: '12px',
        cursor: 'pointer', whiteSpace: 'nowrap', flexShrink: 0, fontFamily: FONT_FAMILY,
      }}>
        Buy
      </button>
    </div>
  )
}
