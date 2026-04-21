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
        border: 'none',
        borderRadius: 12,
        padding: '12px 20px 12px 12px',
        background: 'rgba(27,36,45,0.05)',
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
      <img
        src="/checkout/ChevronRight.svg"
        alt=""
        aria-hidden="true"
        style={{ width: 24, height: 24, display: 'block', flexShrink: 0 }}
      />
    </button>
  )
}
