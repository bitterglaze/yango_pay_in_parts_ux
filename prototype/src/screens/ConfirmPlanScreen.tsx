import type { NavProps } from '../App'
import { YangoHeader, SafeAreaBottom, TEXT_PRIMARY, TEXT_SECONDARY, FILL_DEFAULT, YANGO_RED } from './shared'
import { BACKGROUND, OTHER_BORDER, TEXT_INVERTED, RADIUS_LG, RADIUS_XL, GREEN_100, SHADOW_MEDIUM, FONT_SIZE_BASE, FONT_SIZE_XL } from './yango-tokens'

// Local public assets (work in all environments)
const ASSET_SPLIT_ICON = '/checkout/Watermelon.png'
const ASSET_RECT_MASK  = 'https://www.figma.com/api/mcp/asset/d44285ac-8cdf-42e7-8aa0-ed5118ee266e'

const ASSET_METHOD_JAZZCASH   = '/checkout/Method-JazzCash.png'
const ASSET_METHOD_EASYPAISA  = '/checkout/Method-Easypaisa.png'

// Inline SVG chevron right (from Chevron Right.svg, 16×16)
function ChevronRight() {
  return (
    <svg width="8" height="13" viewBox="0 0 16 16" fill="none">
      <path d="M5.52876 3.8047C5.26841 3.54435 5.26841 3.12224 5.52876 2.86189C5.78911 2.60154 6.21122 2.60154 6.47157 2.86189L10.9025 7.29285C11.2931 7.68338 11.2931 8.31654 10.9025 8.70707L6.47157 13.138C6.21122 13.3984 5.78911 13.3984 5.52876 13.138C5.26841 12.8777 5.26841 12.4556 5.52876 12.1952L9.72402 7.99996L5.52876 3.8047Z" fill="black" fillOpacity="0.3"/>
    </svg>
  )
}

const NUM_VARIANT: React.CSSProperties = { fontVariantNumeric: 'lining-nums proportional-nums' }

import { PRODUCTS } from './merchant-shared'

function fmtRs(n: number): string {
  return `Rs.${n.toLocaleString('en-PK')}`
}

function addWeeks(w: number) {
  const d = new Date()
  d.setDate(d.getDate() + w * 7)
  return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }).toLowerCase()
}

export default function ConfirmPlanScreen({ goTo, goBack, selectedProductId, selectedPaymentMethod }: NavProps) {
  const product = PRODUCTS.find(p => p.id === selectedProductId) ?? PRODUCTS[0]
  const DELIVERY = 500
  const CART_TOTAL = product.price + DELIVERY
  const PNP_FEE = Math.floor(CART_TOTAL * 0.03)
  const GRAND_TOTAL = CART_TOTAL + PNP_FEE
  const PER_PAYMENT = Math.round(GRAND_TOTAL / 4)
  const isEasypaisa = selectedPaymentMethod === 'easypaisa'
  const paymentLabel   = isEasypaisa ? 'Easypaisa' : 'JazzCash'
  const paymentIconSrc = isEasypaisa ? ASSET_METHOD_EASYPAISA : ASSET_METHOD_JAZZCASH
  const paymentIconBg  = isEasypaisa ? '#332c3d' : '#010101'
  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', background: BACKGROUND }}>
      {/* Header / Checkout */}
      <YangoHeader onBack={goBack} />

      {/* Summary — H1 + merchant */}
      <div style={{ padding: '12px 0 20px', textAlign: 'center', flexShrink: 0 }}>
        <div style={{ fontSize: 32, fontWeight: 500, letterSpacing: -0.5, lineHeight: '34px', color: TEXT_PRIMARY, ...NUM_VARIANT }}>
          {fmtRs(product.price)}
        </div>
        <div style={{ fontSize: FONT_SIZE_BASE, color: TEXT_SECONDARY, marginTop: 4, lineHeight: '18px', ...NUM_VARIANT }}>
          Outfitters
        </div>
      </div>

      {/* Widget / Schedule — scrollable */}
      <div style={{
        flex: 1, overflowY: 'auto',
        padding: '8px 24px 16px',
        display: 'flex', flexDirection: 'column', gap: 4,
      }}>
        {/* Split promo card */}
        <div style={{
          background: FILL_DEFAULT,
          borderRadius: RADIUS_XL,
          padding: 20,
          position: 'relative',
          overflow: 'hidden',
          display: 'flex', flexDirection: 'column', gap: 20, alignItems: 'center',
        }}>
          {/* GREEN_100 gradient mask at top */}
          <div style={{
            position: 'absolute', top: 0, left: 0, right: 0, height: 100,
            background: `linear-gradient(180deg, ${GREEN_100} 0%, transparent 100%)`,
            maskImage: `url('${ASSET_RECT_MASK}')`,
            maskSize: '327px 100px',
            maskRepeat: 'no-repeat',
            pointerEvents: 'none',
          }} />

          {/* Icon + title + subtitle + badge */}
          <div style={{ position: 'relative', display: 'flex', flexDirection: 'column', gap: 12, alignItems: 'center', width: '100%' }}>
            {/* Split icon 44×44, rounded 32 */}
            <div style={{ width: 44, height: 44, borderRadius: 32, overflow: 'hidden', flexShrink: 0 }}>
              <img src={ASSET_SPLIT_ICON} alt="" style={{ width: '100%', height: '100%' }} />
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4, width: '100%' }}>
              {/* H4 title */}
              <div style={{
                fontSize: 20, fontWeight: 500, lineHeight: '24px', color: TEXT_PRIMARY,
                textAlign: 'center', ...NUM_VARIANT,
              }}>
                Pay every 2 weeks
              </div>
              {/* B3 subtitle */}
              <div style={{
                fontSize: FONT_SIZE_BASE, color: TEXT_PRIMARY, lineHeight: '18px',
                textAlign: 'center', ...NUM_VARIANT,
              }}>
                {fmtRs(GRAND_TOTAL)} — total to Yango Pay in Parts
              </div>
              {/* "no hidden fees" badge */}
              <div style={{
                background: '#56c776', borderRadius: 48,
                padding: '1px 5px 1px 4px',
                display: 'inline-flex', alignItems: 'center',
              }}>
                <span style={{
                  fontSize: 12, fontWeight: 500, lineHeight: '14px',
                  color: 'rgba(255,255,255,0.98)', ...NUM_VARIANT,
                }}>
                  no hidden fees
                </span>
              </div>
            </div>
          </div>

          {/* Slots row — overflow hidden clips 4th slot */}
          <div style={{
            display: 'flex', gap: 4, width: '100%',
            overflow: 'hidden',
          }}>
            {[
              { label: 'now',       amount: fmtRs(PER_PAYMENT), isPrimary: true  },
              { label: addWeeks(2), amount: fmtRs(PER_PAYMENT), isPrimary: false },
              { label: addWeeks(4), amount: fmtRs(PER_PAYMENT), isPrimary: false },
              { label: addWeeks(6), amount: fmtRs(PER_PAYMENT), isPrimary: false },
            ].map((slot, i) => (
              <div key={i} style={{
                width: 88, flexShrink: 0,
                background: BACKGROUND,
                borderRadius: 16,
                paddingLeft: 12, paddingRight: 25, paddingTop: 12, paddingBottom: 12,
                display: 'flex', flexDirection: 'column', gap: 4, justifyContent: 'flex-end',
              }}>
                <div style={{
                  fontSize: 13, color: slot.isPrimary ? TEXT_PRIMARY : TEXT_SECONDARY,
                  lineHeight: '16px', ...NUM_VARIANT, whiteSpace: 'nowrap',
                }}>
                  {slot.label}
                </div>
                <div style={{
                  fontSize: 13, fontWeight: 500, color: TEXT_PRIMARY,
                  lineHeight: '16px', ...NUM_VARIANT, whiteSpace: 'nowrap',
                }}>
                  {slot.amount}
                </div>
              </div>
            ))}
          </div>

          {/* First payment + selected method display */}
          <div style={{
            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            width: '100%',
          }}>
            <span style={{ fontSize: FONT_SIZE_BASE, color: TEXT_PRIMARY, lineHeight: '18px', ...NUM_VARIANT }}>
              First payment
            </span>
            <div style={{
              display: 'flex', alignItems: 'center', gap: 6,
              border: `1px solid ${OTHER_BORDER}`,
              borderRadius: 8,
              padding: '4px 6px 4px 10px',
            }}>
              <div style={{
                width: 24, height: 24,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                flexShrink: 0,
              }}>
                <div style={{
                  width: 23.5, height: 15.7, borderRadius: 3,
                  background: paymentIconBg, overflow: 'hidden',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}>
                  <img src={paymentIconSrc} alt={paymentLabel} style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
                </div>
              </div>
              <span style={{ fontSize: FONT_SIZE_BASE, color: TEXT_PRIMARY, lineHeight: '18px', ...NUM_VARIANT }}>
                {paymentLabel}
              </span>
              <div style={{ width: 16, height: 16, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <ChevronRight />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer — shadow top, rounded tl/tr 24 */}
      <div style={{
        background: BACKGROUND,
        borderRadius: '24px 24px 0 0',
        boxShadow: SHADOW_MEDIUM,
        padding: '12px 20px 20px',
        display: 'flex', flexDirection: 'column', gap: 8,
        flexShrink: 0,
      }}>
        {/* CTA — "Confirm plan" */}
        <button
          onClick={() => goTo('processing')}
          style={{
            width: '100%', height: 56,
            background: YANGO_RED, color: TEXT_INVERTED,
            border: 'none', borderRadius: RADIUS_LG,
            fontSize: FONT_SIZE_XL, fontWeight: 500, cursor: 'pointer',
            lineHeight: '20px', ...NUM_VARIANT,
          }}
        >
          Confirm plan
        </button>

        {/* Terms — C3 11px, rgba(0,0,0,0.2) */}
        <p style={{
          fontSize: 11, lineHeight: '12px', textAlign: 'center',
          color: 'rgba(0,0,0,0.2)', margin: 0, ...NUM_VARIANT,
        }}>
          By clicking you accept the{' '}
          <span style={{ textDecoration: 'underline', cursor: 'pointer' }}>terms</span>
        </p>
      </div>

      <SafeAreaBottom />
    </div>
  )
}
