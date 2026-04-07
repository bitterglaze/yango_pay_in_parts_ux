import type { NavProps } from '../App'
import { YangoHeader, SafeAreaBottom, TEXT_PRIMARY, TEXT_SECONDARY, FILL_DEFAULT, YANGO_RED } from './shared'
import { BACKGROUND, TEXT_INVERTED, RADIUS_LG, RADIUS_XL, GREEN_100, FONT_SIZE_BASE, FONT_SIZE_2XL } from './yango-tokens'
import { PRODUCTS } from './merchant-shared'

// Same assets as PaymentPlanScreen for consistency
const ASSET_SPLIT_ICON = '/checkout/Split.png'
const ASSET_RECT_MASK  = 'https://www.figma.com/api/mcp/asset/d44285ac-8cdf-42e7-8aa0-ed5118ee266e'

const NUM_VARIANT: React.CSSProperties = { fontVariantNumeric: 'lining-nums proportional-nums' }

function fmtRs(n: number): string {
  return `Rs.${n.toLocaleString('en-PK')}`
}

export default function BNPLAuthScreen({ goTo, goBack, selectedProductId, checkoutData, cart }: NavProps) {
  const cartItems = cart.length > 0
    ? cart.map(ci => ({ ...ci, product: PRODUCTS.find(p => p.id === ci.productId)! })).filter(ci => ci.product)
    : [{ productId: selectedProductId, qty: 1, product: PRODUCTS.find(p => p.id === selectedProductId) ?? PRODUCTS[0] }]
  const productsTotal = cartItems.reduce((sum, ci) => sum + ci.product.price * ci.qty, 0)
  const shipping = checkoutData.shippingMethod === 'fast' ? 800 : 500
  const displayPrice = productsTotal + shipping
  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', background: BACKGROUND }}>
      {/* Header / Checkout — DI + navbar */}
      <YangoHeader onBack={goBack} />

      {/* Summary — H1 amount + merchant */}
      <div style={{ padding: '12px 0 20px', textAlign: 'center', flexShrink: 0 }}>
        <div style={{
          fontSize: 32, fontWeight: 500, letterSpacing: -0.5, lineHeight: '34px',
          color: TEXT_PRIMARY, ...NUM_VARIANT,
        }}>
          {fmtRs(displayPrice)}
        </div>
        <div style={{
          fontSize: FONT_SIZE_BASE, color: TEXT_SECONDARY, marginTop: 4, lineHeight: '18px',
          ...NUM_VARIANT,
        }}>
          Outfitters
        </div>
      </div>

      {/* Widget / Schedule — scrollable */}
      <div style={{
        flex: 1, overflowY: 'auto',
        padding: '8px 24px 16px',
        display: 'flex', flexDirection: 'column', gap: 8,
      }}>
        {/* Split promo card — same gradient as PaymentPlanScreen */}
        <div style={{
          background: FILL_DEFAULT,
          borderRadius: RADIUS_XL,
          padding: '20px 20px 24px',
          position: 'relative',
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column',
          gap: 32,
          alignItems: 'center',
        }}>
          {/* Masked green gradient at top — identical to PaymentPlanScreen */}
          <div style={{
            position: 'absolute',
            top: 0, left: 0, right: 0, height: 100,
            background: `linear-gradient(180deg, ${GREEN_100} 0%, transparent 100%)`,
            maskImage: `url('${ASSET_RECT_MASK}')`,
            maskSize: '327px 100px',
            maskRepeat: 'no-repeat',
            pointerEvents: 'none',
          } as React.CSSProperties} />

          {/* Content: icon + title + subtitle */}
          <div style={{
            position: 'relative',
            display: 'flex', flexDirection: 'column',
            gap: 12, alignItems: 'center',
            width: '100%',
          }}>
            {/* Split icon — same as PaymentPlanScreen */}
            <div style={{ width: 44, height: 44, borderRadius: 32, overflow: 'hidden', flexShrink: 0 }}>
              <img src={ASSET_SPLIT_ICON} alt="Pay in parts" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </div>

            {/* Headline + subtitle */}
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4, width: '100%' }}>
              <div style={{
                fontSize: FONT_SIZE_2XL, fontWeight: 500, color: TEXT_PRIMARY,
                lineHeight: '24px', textAlign: 'center', ...NUM_VARIANT,
              }}>
                Confirm phone number{'\n'}+92 3** *** 38 47{'\n'}to pay in parts
              </div>
              <div style={{
                fontSize: FONT_SIZE_BASE, color: TEXT_PRIMARY,
                lineHeight: '18px', textAlign: 'center', ...NUM_VARIANT,
              }}>
                The purchase amount will be divided into{'\n'}several payments
              </div>
            </div>
          </div>

          {/* CTA button inside card */}
          <div style={{ width: '100%', position: 'relative' }}>
            <button
              onClick={() => goTo('otp-empty')}
              style={{
                background: YANGO_RED,
                border: 'none',
                borderRadius: RADIUS_LG,
                height: 56,
                width: '100%',
                color: TEXT_INVERTED,
                fontSize: 18,
                fontWeight: 500,
                cursor: 'pointer',
                lineHeight: '20px',
                ...NUM_VARIANT,
              }}
            >
              Log in with this number
            </button>
          </div>
        </div>

        {/* Disclaimer */}
        <div style={{
          fontSize: 11, color: TEXT_SECONDARY,
          lineHeight: '12px', textAlign: 'center', ...NUM_VARIANT,
        }}>
          Pay in parts may not be available to all users
        </div>
      </div>

      <SafeAreaBottom />
    </div>
  )
}
