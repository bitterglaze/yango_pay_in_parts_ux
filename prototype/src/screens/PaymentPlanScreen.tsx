import { useState } from 'react'
import type { NavProps } from '../App'
import { YangoHeader, SafeAreaBottom, TEXT_PRIMARY, TEXT_SECONDARY, FILL_DEFAULT, GREEN, YANGO_RED } from './shared'
import { PRODUCTS } from './merchant-shared'
import {
  BACKGROUND, TEXT_INVERTED,
  RADIUS_LG, RADIUS_XL,
  GREEN_100, OTHER_BORDER, SHADOW_MEDIUM,
  FONT_FAMILY,
  FONT_SIZE_XS, FONT_SIZE_SM, FONT_SIZE_BASE, FONT_SIZE_CAPTION,
  FONT_SIZE_XL, FONT_SIZE_2XL, FONT_SIZE_DISPLAY,
} from './yango-tokens'
import SelectPaymentScreen from './SelectPaymentScreen'

// Local public assets
const ASSET_SPLIT_ICON = '/checkout/Watermelon.png'
const ASSET_RECT_MASK  = 'https://www.figma.com/api/mcp/asset/d44285ac-8cdf-42e7-8aa0-ed5118ee266e'
const ASSET_METHOD_JAZZCASH  = '/checkout/Method-JazzCash.png'
const ASSET_METHOD_EASYPAISA = '/checkout/Method-Easypaisa.png'

function fmtRs(n: number): string {
  return `Rs.${n.toLocaleString('en-PK')}`
}

const NUM_VARIANT: React.CSSProperties = { fontVariantNumeric: 'lining-nums proportional-nums' }

export default function PaymentPlanScreen({ goTo, goBack, selectedProductId, selectedPaymentMethod, setPaymentMethod }: NavProps) {
  const product = PRODUCTS.find(p => p.id === selectedProductId) ?? PRODUCTS[0]
  const DELIVERY_FEE = 500
  const CART_TOTAL = product.price + DELIVERY_FEE
  const PNP_FEE = Math.floor(CART_TOTAL * 0.03)
  const GRAND_TOTAL = CART_TOTAL + PNP_FEE
  const PER_PAYMENT = Math.round(GRAND_TOTAL / 4)

  const addWeeks = (w: number) => {
    const d = new Date()
    d.setDate(d.getDate() + w * 7)
    return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }).toLowerCase()
  }
  const slots = [
    { label: 'now',       amount: fmtRs(PER_PAYMENT), isPrimary: true  },
    { label: addWeeks(2), amount: fmtRs(PER_PAYMENT), isPrimary: false },
    { label: addWeeks(4), amount: fmtRs(PER_PAYMENT), isPrimary: false },
    { label: addWeeks(6), amount: fmtRs(PER_PAYMENT), isPrimary: false },
  ]
  const [showModal, setShowModal] = useState(false)

  const hasMethod = selectedPaymentMethod && selectedPaymentMethod !== ''
  const isEasypaisa = selectedPaymentMethod === 'easypaisa'
  const paymentLabel   = isEasypaisa ? 'Easypaisa' : 'JazzCash'
  const paymentIconSrc = isEasypaisa ? ASSET_METHOD_EASYPAISA : ASSET_METHOD_JAZZCASH
  const paymentIconBg  = isEasypaisa ? '#332c3d' : '#010101'

  return (
    <div style={{
      display: 'flex', flexDirection: 'column', height: '100%',
      background: BACKGROUND, fontFamily: FONT_FAMILY,
      position: 'relative',
    }}>
      <YangoHeader />

      {/* Summary — amount + merchant */}
      <div style={{
        background: BACKGROUND, flexShrink: 0,
        display: 'flex', justifyContent: 'center',
        padding: '12px 24px 20px',
      }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 4, alignItems: 'center' }}>
          <p style={{
            fontSize: FONT_SIZE_DISPLAY, fontWeight: 500,
            lineHeight: '34px', letterSpacing: -0.5,
            color: TEXT_PRIMARY, margin: 0, textAlign: 'center', whiteSpace: 'nowrap',
            ...NUM_VARIANT,
          }}>{fmtRs(product.price)}</p>
          <p style={{
            fontSize: FONT_SIZE_BASE, fontWeight: 400,
            lineHeight: '18px', color: TEXT_SECONDARY,
            margin: 0, textAlign: 'center', ...NUM_VARIANT,
          }}>Outfitters</p>
        </div>
      </div>

      {/* Widget / Schedule — scrollable */}
      <div style={{
        flex: 1, overflowY: 'auto', overflowX: 'hidden',
        padding: '8px 24px 16px',
      }}>
        {/* Split promo card */}
        <div style={{
          background: FILL_DEFAULT,
          borderRadius: RADIUS_XL,
          padding: 20,
          position: 'relative',
          overflow: 'hidden',
          display: 'flex', flexDirection: 'column',
          gap: 20, alignItems: 'center',
        }}>
          {/* Masked green gradient at top */}
          <div style={{
            position: 'absolute', top: 0, left: 0, right: 0, height: 100,
            background: `linear-gradient(180deg, ${GREEN_100} 0%, transparent 100%)`,
            maskImage: `url('${ASSET_RECT_MASK}')`,
            maskSize: '327px 100px',
            maskRepeat: 'no-repeat',
            pointerEvents: 'none',
          } as React.CSSProperties} />

          {/* Icon + title + badge */}
          <div style={{
            position: 'relative',
            display: 'flex', flexDirection: 'column',
            gap: 12, alignItems: 'center', maxWidth: 350, width: '100%',
          }}>
            <div style={{ width: 44, height: 44, borderRadius: 32, overflow: 'hidden', flexShrink: 0 }}>
              <img src={ASSET_SPLIT_ICON} alt="Pay in parts" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8, alignItems: 'center' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 4, alignItems: 'center', textAlign: 'center' }}>
                <p style={{ fontSize: FONT_SIZE_2XL, fontWeight: 500, lineHeight: '24px', color: TEXT_PRIMARY, margin: 0, ...NUM_VARIANT }}>
                  Pay every 2 weeks
                </p>
                <p style={{ fontSize: FONT_SIZE_BASE, fontWeight: 400, lineHeight: '18px', color: TEXT_PRIMARY, margin: 0, ...NUM_VARIANT }}>
                  {fmtRs(GRAND_TOTAL)} — total to Yango Pay in Parts
                </p>
              </div>
              <div style={{ background: GREEN, borderRadius: 48, padding: '1px 5px 1px 4px', display: 'inline-flex', alignItems: 'center' }}>
                <span style={{ fontSize: FONT_SIZE_CAPTION, fontWeight: 500, lineHeight: '14px', color: TEXT_INVERTED, whiteSpace: 'nowrap', ...NUM_VARIANT }}>
                  no hidden fees
                </span>
              </div>
            </div>
          </div>

          {/* Payment slots — horizontally scrollable, extends to card edge */}
          <div style={{
            width: 'calc(100% + 40px)',
            marginLeft: -20,
            marginRight: -20,
            overflowX: 'auto',
            display: 'flex', gap: 4,
            paddingLeft: 20,
            paddingRight: 20,
            boxSizing: 'border-box',
          }}>
            {slots.map((slot, i) => (
              <div key={i} style={{
                flexShrink: 0,
                minWidth: 80,
                background: BACKGROUND,
                borderRadius: RADIUS_LG,
                padding: '12px 16px 12px 12px',
                display: 'flex', flexDirection: 'column',
                gap: 4, justifyContent: 'flex-end',
              }}>
                <p style={{
                  fontSize: FONT_SIZE_SM, fontWeight: 400, lineHeight: '16px',
                  color: slot.isPrimary ? TEXT_PRIMARY : TEXT_SECONDARY,
                  margin: 0, whiteSpace: 'nowrap', ...NUM_VARIANT,
                }}>{slot.label}</p>
                <p style={{
                  fontSize: FONT_SIZE_SM, fontWeight: 500, lineHeight: '16px',
                  color: TEXT_PRIMARY, margin: 0, whiteSpace: 'nowrap', ...NUM_VARIANT,
                }}>{slot.amount}</p>
              </div>
            ))}
          </div>

          {/* First payment + method selector */}
          <div style={{
            display: 'flex', justifyContent: 'space-between', alignItems: 'center',
            width: '100%',
          }}>
            <p style={{ fontSize: FONT_SIZE_BASE, fontWeight: 400, lineHeight: '18px', color: TEXT_PRIMARY, margin: 0, whiteSpace: 'nowrap', ...NUM_VARIANT }}>
              First payment
            </p>
            <button
              onClick={() => setShowModal(true)}
              style={{
                display: 'flex', alignItems: 'center', gap: 6,
                background: 'transparent',
                border: `1px solid ${OTHER_BORDER}`,
                borderRadius: 8,
                padding: '4px 6px 4px 10px',
                height: 32, boxSizing: 'border-box',
                cursor: 'pointer',
              }}
            >
              {hasMethod ? (
                <>
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
                  <span style={{ fontSize: FONT_SIZE_BASE, fontWeight: 400, lineHeight: '18px', color: TEXT_PRIMARY, whiteSpace: 'nowrap', ...NUM_VARIANT }}>
                    {paymentLabel}
                  </span>
                </>
              ) : (
                <>
                  {/* Rounded-rect plus icon */}
                  <div style={{
                    width: 24, height: 16, borderRadius: 4,
                    background: 'rgba(0,0,0,0.06)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    flexShrink: 0,
                  }}>
                    <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                      <path d="M5 1V9M1 5H9" stroke="rgba(0,0,0,0.35)" strokeWidth="1.2" strokeLinecap="round"/>
                    </svg>
                  </div>
                  <span style={{ fontSize: FONT_SIZE_BASE, fontWeight: 400, lineHeight: '18px', color: TEXT_PRIMARY, whiteSpace: 'nowrap', ...NUM_VARIANT }}>
                    Select method
                  </span>
                </>
              )}
              {/* Arrow Short Forward — 16×16, rgba(0,0,0,0.3) */}
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" style={{ flexShrink: 0 }}>
                <path d="M9.5 6L15.5 12L9.5 18" stroke="rgba(0,0,0,0.3)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Footer — CTA button */}
      <div style={{
        background: BACKGROUND,
        borderRadius: `${RADIUS_XL}px ${RADIUS_XL}px 0 0`,
        boxShadow: SHADOW_MEDIUM,
        padding: '12px 20px 20px',
        flexShrink: 0,
        display: 'flex', flexDirection: 'column', gap: 8,
      }}>
        <button
          onClick={() => {
            if (hasMethod) goTo('processing')
            else setShowModal(true)
          }}
          style={{
            width: '100%', height: 56,
            background: YANGO_RED, color: TEXT_INVERTED,
            border: 'none', borderRadius: RADIUS_LG,
            fontSize: FONT_SIZE_XL, fontWeight: 500, lineHeight: '20px',
            cursor: 'pointer', ...NUM_VARIANT,
          }}
        >
          {hasMethod ? 'Confirm plan' : 'Select payment method'}
        </button>
        <p style={{ fontSize: FONT_SIZE_XS, fontWeight: 400, lineHeight: '12px', color: TEXT_SECONDARY, textAlign: 'center', margin: 0 }}>
          By clicking, you accept the{' '}
          <span style={{ textDecoration: 'underline' }}>terms</span>
        </p>
      </div>

      <SafeAreaBottom />

      {/* Payment method modal overlay */}
      {showModal && (
        <div style={{ position: 'absolute', inset: 0, zIndex: 20 }}>
          <SelectPaymentScreen
            goTo={goTo}
            goBack={goBack}
            currentScreen={'select-payment' as any}
            selectedProductId={0}
            goToProduct={() => {}}
            addToCart={() => {}}
            selectedPaymentMethod={selectedPaymentMethod}
            setPaymentMethod={setPaymentMethod}
            cartCount={0}
            setCartCount={() => {}}
            checkoutData={{
              email: '',
              firstName: '',
              lastName: '',
              address: '',
              apartment: '',
              postalCode: '',
              phone: '',
              shippingMethod: 'standard',
            }}
            setCheckoutData={() => {}}
            onCloseModal={() => setShowModal(false)}
            onConfirmModal={(method) => {
              setPaymentMethod(method)
              setShowModal(false)
            }}
          />
        </div>
      )}
    </div>
  )
}
