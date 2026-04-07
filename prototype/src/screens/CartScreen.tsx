import { useState } from 'react'
import type { NavProps } from '../App'
import { OutfittersHeader, PRODUCTS, formatPrice, OUT_BLACK, OUT_WHITE, OUT_BORDER, OUT_GRAY, OUT_BG, OUT_FONT } from './merchant-shared'
import { BuyNowModal } from './BuyNowModal'
import { BaadmayWidget, YangoWidget } from './bnpl-widgets'

export default function CartScreen({ goTo, goBack, goToProduct, cart, removeFromCart, updateCartQty }: NavProps) {
  const [showModal, setShowModal] = useState(false)

  const cartItems = cart
    .map(ci => ({ ...ci, product: PRODUCTS.find(p => p.id === ci.productId) }))
    .filter(ci => ci.product)

  const totalPrice = cartItems.reduce((sum, ci) => sum + ci.product!.price * ci.qty, 0)
  const totalQty = cartItems.reduce((sum, ci) => sum + ci.qty, 0)
  const isEmpty = cartItems.length === 0

  // 7 products for "You may also like", excluding cart items
  const cartIds = new Set(cart.map(ci => ci.productId))
  const recommendations = PRODUCTS.filter(p => !cartIds.has(p.id)).slice(0, 7)

  return (
    <div style={{ position: 'relative', display: 'flex', flexDirection: 'column', height: '100%', background: OUT_WHITE, overflow: 'hidden', fontFamily: OUT_FONT }}>
      <OutfittersHeader onBack={goBack} onCart={() => {}} cartCount={totalQty} />

      {/* Title */}
      <div style={{ padding: '16px 20px 12px', flexShrink: 0 }}>
        <div style={{ fontSize: 30, fontWeight: 400, color: OUT_BLACK, fontFamily: OUT_FONT }}>
          Shopping Basket
        </div>
      </div>

      <div style={{ flex: 1, overflowY: 'auto', padding: '0 0 16px' }}>
        {isEmpty ? (
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
              {/* Cart items */}
              {/* PRODUCT / TOTAL header */}
              <div style={{ display: 'flex', justifyContent: 'space-between', paddingBottom: 8, borderBottom: `1.5px solid ${OUT_BLACK}`, marginBottom: 16 }}>
                <span style={{ fontSize: 8, fontWeight: 400, letterSpacing: '0.05em', color: '#202020', fontFamily: OUT_FONT }}>PRODUCT</span>
                <span style={{ fontSize: 8, fontWeight: 400, letterSpacing: '0.05em', color: '#202020', fontFamily: OUT_FONT }}>TOTAL</span>
              </div>

              {cartItems.map((ci, idx) => {
                const item = ci.product!
                return (
                  <div key={item.id}>
                    <div style={{ display: 'flex', gap: 16, paddingBottom: 16 }}>
                      {/* Product image */}
                      <div style={{ width: 120, flexShrink: 0 }}>
                        <div style={{ width: 120, height: 160, overflow: 'hidden', background: OUT_BG }}>
                          <img src={item.img} alt={item.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                        </div>
                      </div>
                      {/* Product info */}
                      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 2 }}>
                        {/* Name + total price row */}
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                          <div style={{ fontSize: 14, fontWeight: 700, color: OUT_BLACK, fontFamily: OUT_FONT, lineHeight: '18px' }}>
                            {item.name.split(' ').map(w => w.charAt(0) + w.slice(1).toLowerCase()).join(' ')}
                          </div>
                          <div style={{ fontSize: 14, fontWeight: 700, color: OUT_BLACK, fontFamily: OUT_FONT, flexShrink: 0, marginLeft: 8 }}>
                            PKR {(item.price * ci.qty).toLocaleString('en-PK')}
                          </div>
                        </div>
                        {/* Unit price */}
                        <div style={{ fontSize: 12, color: OUT_BLACK, fontFamily: OUT_FONT }}>
                          PKR {item.price.toLocaleString('en-PK')}
                        </div>
                        {/* Details */}
                        <div style={{ fontSize: 12, color: OUT_BLACK, fontFamily: OUT_FONT, lineHeight: '18px' }}>
                          <div>Color: Black</div>
                          <div>Size: M</div>
                          <div>Season: SS-26</div>
                        </div>
                        {/* Counter + trash */}
                        <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginTop: 8 }}>
                          {/* Bordered counter */}
                          <div style={{
                            display: 'flex', alignItems: 'center',
                            border: `1px solid ${OUT_BORDER}`, borderRadius: 0,
                            height: 40, overflow: 'hidden',
                          }}>
                            <button onClick={() => updateCartQty(item.id, ci.qty - 1)} style={{
                              width: 40, height: 40, background: 'none', border: 'none',
                              borderRight: `1px solid ${OUT_BORDER}`,
                              cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
                              fontSize: 18, color: OUT_BLACK, padding: 0, fontFamily: OUT_FONT,
                            }}>−</button>
                            <span style={{
                              width: 44, textAlign: 'center', fontSize: 14, fontWeight: 700,
                              color: OUT_BLACK, fontFamily: OUT_FONT,
                            }}>{ci.qty}</span>
                            <button onClick={() => updateCartQty(item.id, ci.qty + 1)} style={{
                              width: 40, height: 40, background: 'none', border: 'none',
                              borderLeft: `1px solid ${OUT_BORDER}`,
                              cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
                              fontSize: 18, color: OUT_BLACK, padding: 0, fontFamily: OUT_FONT,
                            }}>+</button>
                          </div>
                          {/* Trash icon — right-aligned */}
                          <button onClick={() => removeFromCart(item.id)} style={{
                            background: 'none', border: 'none', cursor: 'pointer', padding: 0, marginLeft: 'auto',
                          }}>
                            <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                              <path d="M3 6H5H21" stroke={OUT_BLACK} strokeWidth="1.5" strokeLinecap="round"/>
                              <path d="M8 6V4C8 3.44772 8.44772 3 9 3H15C15.5523 3 16 3.44772 16 4V6" stroke={OUT_BLACK} strokeWidth="1.5" strokeLinecap="round"/>
                              <path d="M19 6L18.1 19.1C18.0432 19.6 17.6133 20 17.1 20H6.9C6.38666 20 5.95666 19.6 5.9 19.1L5 6" stroke={OUT_BLACK} strokeWidth="1.5" strokeLinecap="round"/>
                            </svg>
                          </button>
                        </div>
                      </div>
                    </div>
                    {/* Divider between items */}
                    <div style={{ height: 1, background: OUT_BORDER, marginBottom: 16 }} />
                  </div>
                )
              })}

              {/* Spacing before total */}

              {/* Total */}
              <div style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'baseline', gap: 8, marginBottom: 12 }}>
                <span style={{ fontSize: 14, fontWeight: 700, color: OUT_BLACK, fontFamily: OUT_FONT }}>Total:</span>
                <span style={{ fontSize: 16, fontWeight: 700, color: OUT_BLACK, fontFamily: OUT_FONT }}>{formatPrice(totalPrice)}</span>
              </div>

              {/* BNPL widgets */}
              <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: 2 }}>
                <BaadmayWidget price={totalPrice} size="lg" />
              </div>
              <div style={{ paddingTop: 8, paddingBottom: 8 }}>
                <YangoWidget price={totalPrice} size="lg" onBuy={() => setShowModal(true)} />
              </div>

              {/* Delivery note */}
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

              <button onClick={() => goBack()} style={{
                width: '100%', height: 52, background: OUT_WHITE, color: OUT_BLACK,
                border: `1px solid ${OUT_BLACK}`, borderRadius: 0, fontSize: 14, fontWeight: 600,
                letterSpacing: '0.05em', cursor: 'pointer', marginBottom: 20, fontFamily: OUT_FONT,
              }}>Continue shopping</button>
            </div>

            {/* You may also like */}
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
