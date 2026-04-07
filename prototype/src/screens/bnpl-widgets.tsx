// Reusable BNPL widgets — used in PDP and Cart
import { bnplBaadmay, bnplYango, OUT_BLACK, OUT_WHITE, OUT_BORDER, OUT_FONT } from './merchant-shared'
import { YANGO_RED } from './shared'
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
export function YangoWidget({ price, size = 'sm', onBuy }: { price: number; size?: 'sm' | 'lg'; onBuy: () => void }) {
  const perPart = bnplYango(price)
  const NUM: React.CSSProperties = { fontVariantNumeric: 'lining-nums proportional-nums' }

  const isSm = size === 'sm'
  const titleSize = isSm ? 12 : 14
  const titleLH = isSm ? '16px' : '18px'
  const subSize = isSm ? 11 : 11
  const subLH = isSm ? '14px' : '14px'
  const logoSize = isSm ? 40 : 40

  return (
    <div style={{
      border: `1px solid ${OUT_BORDER}`, borderRadius: 4,
      padding: `12px 16px 12px 12px`,
      background: OUT_WHITE,
      display: 'flex', alignItems: 'center', gap: 8,
    }}>
      <div style={{ width: logoSize, height: logoSize, flexShrink: 0 }}>
        <img src="/checkout/YangoPnP-logo.svg" alt="Yango Pay in Parts" style={{ width: logoSize, height: logoSize, display: 'block' }} />
      </div>
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 1, fontFamily: FONT_FAMILY }}>
        <div style={{ fontSize: titleSize, fontWeight: 700, lineHeight: titleLH, color: 'rgba(0,0,0,0.86)', ...NUM }}>
          {perPart} × 4 payments
        </div>
        <div style={{ fontSize: subSize, fontWeight: 400, lineHeight: subLH, color: 'rgba(0,0,0,0.5)', ...NUM }}>
          Every 2 weeks
        </div>
      </div>
      <button onClick={onBuy} style={{
        background: YANGO_RED, border: 'none', borderRadius: 8, height: 32, padding: '0 12px',
        color: 'rgba(255,255,255,0.98)', fontSize: 13, fontWeight: 500, lineHeight: '14px',
        cursor: 'pointer', whiteSpace: 'nowrap', flexShrink: 0, fontFamily: FONT_FAMILY,
      }}>
        Buy in parts
      </button>
    </div>
  )
}
