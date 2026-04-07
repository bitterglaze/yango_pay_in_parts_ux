import type { NavProps } from '../App'
import { SafeAreaBottom, TEXT_PRIMARY, FILL_DEFAULT, YANGO_RED, YangoLogoSVG } from './shared'
import { BACKGROUND, TEXT_INVERTED, RADIUS_LG, RADIUS_XL, SECONDARY_BG, SHADOW_MEDIUM, FONT_SIZE_BASE, FONT_SIZE_LG, FONT_SIZE_XL, FONT_FAMILY } from './yango-tokens'
import { PRODUCTS } from './merchant-shared'

// Local assets (public/checkout/)
const ASSET_CHECK        = '/checkout/Check.svg'
const ASSET_FAQ          = '/checkout/FAQ.svg'
const ASSET_CHEVRON_SM   = '/checkout/Chevron small.svg'
const ASSET_OUTFITTERS   = '/checkout/Outfitters.png'
const ASSET_YANGO_PAY    = '/checkout/Yango x Pay.png'

// Figma MCP — payment method SVG marks (Figma node 44:47068 / SelectPaymentScreen)
const ASSET_JAZZCASH_IMG  = '/checkout/Method-JazzCash.png'
const ASSET_EASYPAISA_IMG = '/checkout/Method-Easypaisa.png'

const NUM_VARIANT: React.CSSProperties = { fontVariantNumeric: 'lining-nums proportional-nums' }

function toTitleCase(str: string) {
  return str.toLowerCase().replace(/\b\w/g, c => c.toUpperCase())
}

function fmtRs(n: number) {
  return `Rs.${n.toLocaleString('en-PK')}`
}

function addDays(baseDate: Date, days: number) {
  const d = new Date(baseDate)
  d.setDate(d.getDate() + days)
  return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }).toLowerCase()
}

export default function OrderPaidScreen({ goTo, selectedProductId, selectedPaymentMethod }: NavProps) {
  const product = PRODUCTS.find(p => p.id === selectedProductId) ?? PRODUCTS[0]
  const DELIVERY = 500
  const CART_TOTAL = product.price + DELIVERY
  const PNP_FEE = Math.floor(CART_TOTAL * 0.15)
  const GRAND_TOTAL = CART_TOTAL + PNP_FEE
  const perPart = Math.round(GRAND_TOTAL / 4)
  const today = new Date()

  const chartSlots = [
    { label: 'today',             amount: fmtRs(perPart), isPrimary: true  },
    { label: addDays(today, 14),  amount: fmtRs(perPart), isPrimary: false },
    { label: addDays(today, 28),  amount: fmtRs(perPart), isPrimary: false },
    { label: addDays(today, 42),  amount: fmtRs(perPart), isPrimary: false },
  ]

  const isJazzCash = !selectedPaymentMethod || selectedPaymentMethod === 'jazzcash'
  const paymentLabel   = isJazzCash ? 'JazzCash' : 'Easypaisa'
  const paymentIconSvg = isJazzCash ? ASSET_JAZZCASH_IMG : ASSET_EASYPAISA_IMG
  const paymentIconBg  = isJazzCash ? '#010101' : '#332c3d'

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', background: BACKGROUND, fontFamily: FONT_FAMILY }}>

      {/* ── Header ── */}
      <div style={{ background: '#fff', flexShrink: 0 }}>
        <div style={{
          height: 60,
          display: 'flex', alignItems: 'center',
          padding: '6px 16px',
        }}>
          {/* Left: FAQ icon — larger than default SupportIcon */}
          <button style={{
            width: 40, height: 40, padding: 8,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            background: 'none', border: 'none', cursor: 'pointer', flexShrink: 0,
          }}>
            <img src={ASSET_FAQ} alt="FAQ" style={{ width: 24, height: 24 }} />
          </button>

          {/* Center: Yango logo */}
          <div style={{ flex: 1, display: 'flex', justifyContent: 'center' }}>
            <YangoLogoSVG />
          </div>

          {/* Right: empty */}
          <div style={{ width: 40, flexShrink: 0 }} />
        </div>
      </div>

      {/* ── Scrollable content ── */}
      <div style={{ flex: 1, overflowY: 'auto', paddingBottom: 20 }}>

        {/* "Order paid" header */}
        <div style={{
          display: 'flex', flexDirection: 'column', gap: 12, alignItems: 'center',
          paddingTop: 32, paddingBottom: 32, paddingLeft: 20, paddingRight: 20,
        }}>
          {/* Green circle + gradient "Order paid" */}
          <div style={{ display: 'flex', gap: 6, alignItems: 'center', justifyContent: 'center' }}>
            {/* Status: green circle 28×28 */}
            <div style={{
              background: '#56c776', borderRadius: '50%',
              width: 28, height: 28, flexShrink: 0,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>
              {/* Check.svg — 17×17 icon, fits within 28px circle with comfortable padding */}
              <img src={ASSET_CHECK} alt="" style={{ width: 14, height: 14, display: 'block' }} />
            </div>
            {/* Gradient text */}
            <div style={{
              fontSize: 32, fontWeight: 500, lineHeight: '34px', letterSpacing: -0.5,
              backgroundImage: 'linear-gradient(270deg, rgba(0,0,0,0.344) 58.586%, rgba(86,199,118,0.4) 96.97%), linear-gradient(90deg, rgba(0,0,0,0.86) 0%, rgba(0,0,0,0.86) 100%)',
              WebkitBackgroundClip: 'text',
              backgroundClip: 'text',
              color: 'transparent',
              ...NUM_VARIANT,
            }}>
              Order paid
            </div>
          </div>

          {/* Subtitle */}
          <div style={{
            fontSize: FONT_SIZE_LG, lineHeight: '20px', textAlign: 'center',
            backgroundImage: 'linear-gradient(-11.3deg, rgba(85,199,118,0) 49.469%, rgba(85,199,118,0.4) 94.513%), linear-gradient(90deg, rgba(0,0,0,0.86) 0%, rgba(0,0,0,0.86) 100%)',
            WebkitBackgroundClip: 'text',
            backgroundClip: 'text',
            color: 'transparent',
            ...NUM_VARIANT,
          }}>
            You'll receive a confirmation e-mail soon
          </div>
        </div>

        {/* Cards */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8, paddingLeft: 20, paddingRight: 20 }}>

          {/* ── Track payments and delivery ── */}
          <div style={{
            background: FILL_DEFAULT, borderRadius: RADIUS_XL,
            padding: 20,
            display: 'flex', flexDirection: 'column', gap: 16,
          }}>
            {/* Top row: text + icon */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12 }}>
              {/* Text block */}
              <div onClick={() => window.open('https://apps.apple.com/us/app/yango-taxi-and-delivery/id1437157286?l=ru', '_blank')} style={{ flex: 1, minWidth: 0, display: 'flex', flexDirection: 'column', gap: 2, cursor: 'pointer' }}>
                {/* Title — must fit on one line */}
                <div style={{
                  fontSize: FONT_SIZE_LG, fontWeight: 500, lineHeight: '20px',
                  color: TEXT_PRIMARY, whiteSpace: 'nowrap', ...NUM_VARIANT,
                }}>
                  Track payments and delivery
                </div>
                {/* "in the Yango app" + chevron */}
                <div style={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                  <span style={{ fontSize: FONT_SIZE_BASE, lineHeight: '18px', color: TEXT_PRIMARY, ...NUM_VARIANT }}>
                    in the Yango app
                  </span>
                  <img src={ASSET_CHEVRON_SM} alt="" style={{ width: 16, height: 16 }} />
                </div>
              </div>

              {/* Yango x Pay icon — 53×53, no masks */}
              <div style={{ width: 53, height: 53, flexShrink: 0 }}>
                <img src={ASSET_YANGO_PAY} alt="Yango Pay" style={{ width: '100%', height: '100%', objectFit: 'contain', display: 'block' }} />
              </div>
            </div>

            {/* Payment chart — 4 segments */}
            <div style={{ display: 'flex', gap: 6, alignItems: 'flex-start', width: '100%' }}>
              {chartSlots.map((slot, i) => (
                <div key={i} style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 3 }}>
                  {/* Segment bar */}
                  <div style={{ paddingTop: 3, paddingBottom: 3 }}>
                    <div style={{
                      height: 4, borderRadius: slot.isPrimary ? 16 : 2,
                      background: slot.isPrimary ? '#56C776' : '#e1e3e8',
                    }} />
                  </div>
                  {/* Date + amount */}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                    <div style={{
                      fontSize: 13, lineHeight: '16px',
                      color: slot.isPrimary ? TEXT_PRIMARY : 'rgba(0,0,0,0.5)',
                      ...NUM_VARIANT,
                    }}>
                      {slot.label}
                    </div>
                    <div style={{
                      fontSize: 14, fontWeight: 500, lineHeight: '18px',
                      color: TEXT_PRIMARY, whiteSpace: 'nowrap', ...NUM_VARIANT,
                    }}>
                      {slot.amount}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* ── How was the process? ── */}
          <div style={{
            background: FILL_DEFAULT, borderRadius: RADIUS_XL,
            paddingLeft: 20, paddingRight: 20, paddingTop: 12, paddingBottom: 12,
            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            minHeight: 64,
          }}>
            <div style={{
              fontSize: FONT_SIZE_LG, fontWeight: 500, lineHeight: '20px',
              color: TEXT_PRIMARY, overflow: 'hidden', textOverflow: 'ellipsis',
              whiteSpace: 'nowrap', ...NUM_VARIANT,
            }}>
              How was the process?
            </div>
            <div style={{ display: 'flex', gap: 12, alignItems: 'center', flexShrink: 0 }}>
              <img src="/checkout/emoji-sad.png" alt="sad" style={{ width: 40, height: 40, cursor: 'pointer' }} />
              <img src="/checkout/emoji-happy.png" alt="happy" style={{ width: 40, height: 40, cursor: 'pointer' }} />
            </div>
          </div>

          {/* ── Paid by e-wallet ── */}
          <div style={{
            background: FILL_DEFAULT, borderRadius: RADIUS_XL,
            padding: 20,
            display: 'flex', flexDirection: 'column', gap: 16,
          }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div style={{ fontSize: FONT_SIZE_LG, fontWeight: 500, lineHeight: '20px', color: TEXT_PRIMARY, ...NUM_VARIANT }}>
                Paid by e-wallet
              </div>
              {/* Dynamic payment method badge — Figma 44:47068: no border, pl:10 pr:6 radius:8 */}
              <div style={{
                display: 'flex', alignItems: 'center', gap: 6,
                borderRadius: 8,
                paddingLeft: 10, paddingRight: 6,
              }}>
                {/* Method icon */}
                <div style={{
                  width: 24, height: 16, flexShrink: 0,
                  background: paymentIconBg, borderRadius: 3, overflow: 'hidden',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}>
                  <img src={paymentIconSvg} alt={paymentLabel} style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
                </div>
                {/* Label — Figma: 14px Regular */}
                <span style={{ fontSize: 14, fontWeight: 400, lineHeight: '18px', color: TEXT_PRIMARY, ...NUM_VARIANT }}>
                  {paymentLabel}
                </span>
              </div>
            </div>
          </div>

          {/* ── Order / cart ── */}
          <div style={{
            background: FILL_DEFAULT, borderRadius: RADIUS_XL,
            padding: 20,
            display: 'flex', flexDirection: 'column', gap: 16,
          }}>
            {/* Merchant header: Outfitters logo + name */}
            <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
              {/* Outfitters logo 32×32 — plain img, no mask */}
              <div style={{ width: 32, height: 32, flexShrink: 0, overflow: 'hidden', borderRadius: 8 }}>
                <img src={ASSET_OUTFITTERS} alt="Outfitters" style={{ width: '100%', height: '100%', objectFit: 'contain', display: 'block' }} />
              </div>
              <div style={{ fontSize: FONT_SIZE_LG, fontWeight: 500, lineHeight: '20px', color: TEXT_PRIMARY, ...NUM_VARIANT }}>
                Outfitters
              </div>
            </div>

            {/* Order line: dynamic product name + price */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <p style={{ flex: 1, margin: 0, fontSize: FONT_SIZE_BASE, lineHeight: '18px', color: TEXT_PRIMARY, ...NUM_VARIANT }}>
                {toTitleCase(product.name)}
              </p>
              <span style={{
                fontSize: 13, lineHeight: '16px', color: 'rgba(0,0,0,0.3)',
                textAlign: 'right', flexShrink: 0, width: 24, ...NUM_VARIANT,
              }}>
                ×1
              </span>
              <div style={{ flexShrink: 0, display: 'flex', justifyContent: 'flex-end' }}>
                <span style={{ fontSize: 14, fontWeight: 500, lineHeight: '18px', color: TEXT_PRIMARY, whiteSpace: 'nowrap', ...NUM_VARIANT }}>
                  {fmtRs(product.price)}
                </span>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* ── Footer — no points row ── */}
      <div style={{
        background: BACKGROUND,
        borderRadius: '24px 24px 0 0',
        boxShadow: SHADOW_MEDIUM,
        paddingTop: 12, paddingBottom: 24, paddingLeft: 20, paddingRight: 20,
        display: 'flex', flexDirection: 'column', gap: 8,
        flexShrink: 0,
      }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          <button
            onClick={() => goTo('merchant')}
            style={{
              width: '100%', height: 56,
              background: YANGO_RED, color: TEXT_INVERTED,
              border: 'none', borderRadius: RADIUS_LG,
              fontSize: FONT_SIZE_XL, fontWeight: 500, cursor: 'pointer',
              lineHeight: '20px', fontFamily: FONT_FAMILY, ...NUM_VARIANT,
            }}
          >
            Order details
          </button>
          <button
            onClick={() => window.open('https://apps.apple.com/us/app/yango-taxi-and-delivery/id1437157286?l=ru', '_blank')}
            style={{
              width: '100%', height: 56,
              background: SECONDARY_BG, color: TEXT_PRIMARY,
              border: 'none', borderRadius: RADIUS_LG,
              fontSize: FONT_SIZE_XL, fontWeight: 500, cursor: 'pointer',
              lineHeight: '20px', fontFamily: FONT_FAMILY, ...NUM_VARIANT,
            }}
          >
            Open Yango
          </button>
        </div>
      </div>

      <SafeAreaBottom />
    </div>
  )
}
