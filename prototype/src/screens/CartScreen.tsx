import { useState } from 'react'
import type { NavProps } from '../App'
import { OutfittersHeader, PRODUCTS, formatPrice, OUT_BLACK, OUT_WHITE, OUT_BORDER, OUT_GRAY, OUT_BG, OUT_FONT } from './merchant-shared'
import { BuyNowModal } from './BuyNowModal'
import { BaadmayWidget, YangoWidget } from './bnpl-widgets'

export default function CartScreen({ goTo, goBack, goToProduct, selectedProductId, cartCount, setCartCount }: NavProps) {
  const [showModal, setShowModal] = useState(false)
  const qty = cartCount > 0 ? cartCount : 1
  const [removed, setRemoved] = useState(false)

  const item = PRODUCTS.find(p => p.id === selectedProductId) ?? PRODUCTS[0]
  const totalPrice = item.price * qty

  // #33 — 7 products for "You may also like"
  const recommendations = PRODUCTS.filter(p => p.id !== item.id).slice(0, 7)

  return (
    <div style={{ position: 'relative', display: 'flex', flexDirection: 'column', height: '100%', background: OUT_WHITE, overflow: 'hidden', fontFamily: OUT_FONT }}>
      <OutfittersHeader onBack={goBack} onCart={() => {}} cartCount={qty > 0 && !removed ? qty : 0} />

      {/* #34 — Title: 16px, no counter */}
      <div style={{ padding: '16px 20px 12px', flexShrink: 0 }}>
        <div style={{ fontSize: 16, fontWeight: 400, color: OUT_BLACK, fontFamily: OUT_FONT }}>
          ADDED TO YOUR BASKET
        </div>
      </div>

      <div style={{ flex: 1, overflowY: 'auto', padding: '0 0 16px' }}>
        {removed ? (
          <div style={{ padding: '48px 16px', textAlign: 'center', color: OUT_GRAY }}>
            <div style={{ fontSize: 48, marginBottom: 12 }}>🛍️</div>
            <div style={{ fontSize: 16, fontWeight: 600, color: OUT_BLACK, marginBottom: 8 }}>Your bag is empty</div>
            <div style={{ fontSize: 13, color: OUT_GRAY, marginBottom: 24 }}>Add items to get started</div>
            <button onClick={() => goTo('plp')} style={{
              background: OUT_BLACK, color: OUT_WHITE, border: 'none', borderRadius: 2,
              padding: '12px 28px', fontSize: 12, fontWeight: 700, letterSpacing: '0.1em', cursor: 'pointer',
            }}>CONTINUE SHOPPING</button>
          </div>
        ) : (
          <>
            <div style={{ padding: '0 20px' }}>
              {/* Cart item */}
              <div style={{ display: 'flex', gap: 16, paddingBottom: 12 }}>
                <div style={{ width: 100, height: 130, flexShrink: 0, overflow: 'hidden', background: OUT_BG }}>
                  <img src={item.img} alt={item.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </div>
                <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                  <div>
                    <div style={{ fontSize: 14, fontWeight: 700, color: OUT_BLACK, marginBottom: 4, fontFamily: OUT_FONT }}>
                      {item.name.split(' ').map(w => w.charAt(0) + w.slice(1).toLowerCase()).join(' ')}
                    </div>
                    <div style={{ fontSize: 12, color: OUT_GRAY, marginBottom: 2, fontFamily: OUT_FONT }}>Black / M / SS-26</div>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', marginTop: 12 }}>
                    <div style={{ fontSize: 13, color: OUT_GRAY, fontFamily: OUT_FONT, marginRight: 8 }}>{qty}x</div>
                    <div style={{ fontSize: 14, fontWeight: 700, color: OUT_BLACK, fontFamily: OUT_FONT }}>{formatPrice(totalPrice)}</div>
                  </div>
                </div>
                <button onClick={() => { setCartCount(0); setRemoved(true) }} style={{
                  background: 'none', border: 'none', cursor: 'pointer', alignSelf: 'flex-start', padding: 0, flexShrink: 0,
                }}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                    <path d="M3 6H5H21" stroke={OUT_GRAY} strokeWidth="1.5" strokeLinecap="round"/>
                    <path d="M8 6V4C8 3.44772 8.44772 3 9 3H15C15.5523 3 16 3.44772 16 4V6" stroke={OUT_GRAY} strokeWidth="1.5" strokeLinecap="round"/>
                    <path d="M19 6L18.1 19.1C18.0432 19.6 17.6133 20 17.1 20H6.9C6.38666 20 5.95666 19.6 5.9 19.1L5 6" stroke={OUT_GRAY} strokeWidth="1.5" strokeLinecap="round"/>
                  </svg>
                </button>
              </div>

              <div style={{ height: 1, background: OUT_BORDER, marginBottom: 10 }} />

              {/* Total + price as unified block, right-aligned price */}
              <div style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'baseline', gap: 8, marginBottom: 6 }}>
                <span style={{ fontSize: 14, fontWeight: 700, color: OUT_BLACK, fontFamily: OUT_FONT }}>Total:</span>
                <span style={{ fontSize: 16, fontWeight: 700, color: OUT_BLACK, fontFamily: OUT_FONT }}>{formatPrice(totalPrice)}</span>
              </div>

              {/* Baadmay → Yango, right-aligned, tight gap */}
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 2 }}>
                <BaadmayWidget price={totalPrice} size="lg" />
                <YangoWidget price={totalPrice} size="sm" onBuy={() => setShowModal(true)} />
              </div>

              {/* #32 — Delivery note: right-aligned, 9px */}
              <div style={{
                fontSize: 9, color: OUT_GRAY, textTransform: 'uppercase' as const,
                letterSpacing: '0.03em', lineHeight: 1.5, marginTop: 10, marginBottom: 14,
                fontFamily: OUT_FONT, textAlign: 'right',
              }}>
                *ALL ORDERS MAY TAKE UPTO 5 to 7 WORKING DAYS TO BE DELIVERED TO YOUR DOORSTEP
              </div>

              {/* Checkout */}
              <button onClick={() => goTo('checkout')} style={{
                width: '100%', height: 52, background: OUT_BLACK, color: OUT_WHITE,
                border: 'none', borderRadius: 0, fontSize: 16, fontWeight: 500,
                cursor: 'pointer', marginBottom: 10, fontFamily: OUT_FONT,
              }}>Check out</button>

              <button onClick={() => {}} style={{
                width: '100%', height: 52, background: OUT_WHITE, color: OUT_BLACK,
                border: `1px solid ${OUT_BLACK}`, borderRadius: 0, fontSize: 14, fontWeight: 600,
                letterSpacing: '0.05em', cursor: 'pointer', marginBottom: 20, fontFamily: OUT_FONT,
              }}>VIEW SHOPPING BASKET</button>
            </div>

            {/* #33 — You may also like: centered title 15px regular, 7 products, edge-to-edge */}
            <div style={{ paddingBottom: 32 }}>
              <div style={{
                fontSize: 15, fontWeight: 400, color: OUT_BLACK, marginBottom: 12,
                textAlign: 'center', fontFamily: OUT_FONT,
              }}>
                YOU MAY ALSO LIKE
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 1 }}>
                {recommendations.map(p => (
                  <div key={p.id} onClick={() => goToProduct(p.id)} style={{ cursor: 'pointer' }}>
                    <div style={{ aspectRatio: '3/4', overflow: 'hidden', background: OUT_BG }}>
                      <img src={p.img} alt={p.name} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </>
        )}
      </div>

      {showModal && (
        <BuyNowModal price={totalPrice} onClose={() => setShowModal(false)} onSplit={() => { setShowModal(false); goTo('yango-checkout') }} />
      )}
    </div>
  )
}
