import type { NavProps } from '../App'
import { SafeAreaBottom, TEXT_PRIMARY, TEXT_SECONDARY, FILL_DEFAULT, YANGO_RED } from './shared'
import {
  BACKGROUND, TEXT_INVERTED, RADIUS_LG, FONT_FAMILY,
  FONT_SIZE_BASE, FONT_SIZE_LG, FONT_SIZE_XL,
} from './yango-tokens'
import { PRODUCTS } from './merchant-shared'

const NUM_VARIANT: React.CSSProperties = { fontVariantNumeric: 'lining-nums proportional-nums' }

function fmtRs(n: number): string {
  return `Rs. ${n.toLocaleString('en-PK')}`
}

export default function OrderBreakdownScreen({ goBack, selectedProductId, checkoutData, cart }: NavProps) {
  const cartItems = cart.length > 0
    ? cart.map(ci => ({ ...ci, product: PRODUCTS.find(p => p.id === ci.productId)! })).filter(ci => ci.product)
    : [{ productId: selectedProductId, qty: 1, product: PRODUCTS.find(p => p.id === selectedProductId) ?? PRODUCTS[0] }]

  const productsTotal = cartItems.reduce((sum, ci) => sum + ci.product.price * ci.qty, 0)
  const DELIVERY = checkoutData.shippingMethod === 'fast' ? 800 : 500
  const TOTAL = productsTotal + DELIVERY

  return (
    <div style={{
      display: 'flex', flexDirection: 'column', height: '100%',
      background: BACKGROUND, fontFamily: FONT_FAMILY,
    }}>
      {/* Header — back arrow + merchant name */}
      <div style={{ background: BACKGROUND, flexShrink: 0 }}>
        <div style={{
          height: 60,
          display: 'flex', alignItems: 'center',
          padding: '6px 16px',
        }}>
          {/* Left: back arrow */}
          <button
            onClick={goBack}
            style={{
              width: 40, height: 40, padding: 8,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              background: 'none', border: 'none', cursor: 'pointer', flexShrink: 0,
            }}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M15 6L9 12L15 18" stroke={TEXT_PRIMARY} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>

          {/* Center: merchant name */}
          <div style={{
            flex: 1, display: 'flex', justifyContent: 'center', alignItems: 'center',
            fontSize: FONT_SIZE_LG, fontWeight: 500, lineHeight: '20px',
            color: TEXT_PRIMARY, ...NUM_VARIANT,
          }}>
            Outfitters
          </div>

          {/* Right: empty placeholder for symmetry */}
          <div style={{ width: 40, flexShrink: 0 }} />
        </div>
      </div>

      {/* Scrollable content */}
      <div style={{
        flex: 1, overflowY: 'auto',
        padding: '8px 24px 16px',
        display: 'flex', flexDirection: 'column', gap: 16,
      }}>
        {/* Card 1: items + delivery */}
        <div style={{
          background: FILL_DEFAULT,
          borderRadius: 24,
          padding: 16,
          display: 'flex', flexDirection: 'column', gap: 16,
        }}>
          {cartItems.map((ci) => (
            <div key={ci.productId} style={{
              display: 'flex', alignItems: 'center', gap: 12,
            }}>
              <p style={{
                flex: 1, margin: 0,
                fontSize: FONT_SIZE_BASE, fontWeight: 500, lineHeight: '18px',
                color: TEXT_PRIMARY, ...NUM_VARIANT,
              }}>
                {ci.product.name}
              </p>
              <span style={{
                fontSize: FONT_SIZE_BASE, lineHeight: '18px', color: TEXT_SECONDARY,
                textAlign: 'right', flexShrink: 0, ...NUM_VARIANT,
              }}>
                ×{ci.qty}
              </span>
              <span style={{
                fontSize: FONT_SIZE_BASE, lineHeight: '18px', color: TEXT_PRIMARY,
                textAlign: 'right', whiteSpace: 'nowrap', flexShrink: 0, ...NUM_VARIANT,
              }}>
                {fmtRs(ci.product.price * ci.qty)}
              </span>
            </div>
          ))}

          {/* Divider */}
          <div style={{ height: 1, background: 'rgba(0,0,0,0.08)', width: '100%' }} />

          {/* Delivery */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <p style={{
              flex: 1, margin: 0,
              fontSize: FONT_SIZE_BASE, fontWeight: 500, lineHeight: '18px',
              color: TEXT_PRIMARY, ...NUM_VARIANT,
            }}>
              Delivery
            </p>
            <span style={{
              fontSize: FONT_SIZE_BASE, lineHeight: '18px', color: TEXT_PRIMARY,
              textAlign: 'right', whiteSpace: 'nowrap', ...NUM_VARIANT,
            }}>
              {fmtRs(DELIVERY)}
            </span>
          </div>
        </div>

        {/* Card 2: total */}
        <div style={{
          background: FILL_DEFAULT,
          borderRadius: 24,
          padding: 16,
          display: 'flex', alignItems: 'center', gap: 12,
        }}>
          <p style={{
            flex: 1, margin: 0,
            fontSize: FONT_SIZE_BASE, fontWeight: 500, lineHeight: '18px',
            color: TEXT_PRIMARY, ...NUM_VARIANT,
          }}>
            Total
          </p>
          <span style={{
            fontSize: FONT_SIZE_BASE, fontWeight: 500, lineHeight: '18px',
            color: TEXT_PRIMARY, textAlign: 'right', whiteSpace: 'nowrap', ...NUM_VARIANT,
          }}>
            {fmtRs(TOTAL)}
          </span>
        </div>
      </div>

      {/* Footer — Back button */}
      <div style={{
        background: BACKGROUND,
        padding: '16px 16px 12px',
        flexShrink: 0,
      }}>
        <button
          onClick={goBack}
          style={{
            width: '100%', height: 56,
            background: YANGO_RED, color: TEXT_INVERTED,
            border: 'none', borderRadius: RADIUS_LG,
            fontSize: FONT_SIZE_XL, fontWeight: 500, cursor: 'pointer',
            lineHeight: '20px', fontFamily: FONT_FAMILY, ...NUM_VARIANT,
          }}
        >
          Back
        </button>
      </div>

      <SafeAreaBottom />
    </div>
  )
}
