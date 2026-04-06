import { useState } from 'react'
import type { NavProps } from '../App'
import { OutfittersLogo, PRODUCTS, OUT_BLACK, OUT_WHITE, OUT_BORDER, OUT_GRAY, OUT_BG, OUT_FONT, CHECKOUT_BLUE } from './merchant-shared'

type PayMethod = 'cod' | 'card' | 'baadmay' | 'yango'
type ShipMethod = 'flat' | 'free'

const ACCENT = CHECKOUT_BLUE
const SELECTED_BG = '#eef2fc'
const EXPAND_BG = '#f5f5f5'

/* Focus ring style injected once */
const FOCUS_CSS = `
  .co-input:focus { border-color: ${ACCENT} !important; box-shadow: 0 0 0 1px ${ACCENT} !important; }
`

export default function CheckoutScreen({ goTo, goBack, selectedProductId, cartCount }: NavProps) {
  const product = PRODUCTS.find(p => p.id === selectedProductId) ?? PRODUCTS[0]
  const qty = cartCount > 0 ? cartCount : 1
  const itemTotal = product.price * qty

  const [payMethod, setPayMethod] = useState<PayMethod>('cod')
  const [shipMethod, setShipMethod] = useState<ShipMethod>('flat')
  const [orderOpen, setOrderOpen] = useState(false)
  const [newsletter, setNewsletter] = useState(true)
  const [saveInfo, setSaveInfo] = useState(false)
  const [city, setCity] = useState('LAHORE')
  const [billingSame, setBillingSame] = useState(true)

  const shipCost = shipMethod === 'flat' ? 250 : 1
  const total = itemTotal + shipCost

  const fmtPrice = (n: number) => `Rs.${n.toLocaleString('en-PK')}`

  const handleComplete = () => {
    if (payMethod === 'yango') goTo('yango-checkout')
    else goTo('bnpl-auth')
  }

  const inputBase: React.CSSProperties = {
    width: '100%', height: 50, border: '1px solid #d1d1d1', borderRadius: 5,
    padding: '0 12px', fontSize: 14, color: OUT_BLACK, outline: 'none',
    boxSizing: 'border-box', fontFamily: OUT_FONT, background: OUT_WHITE,
    transition: 'border-color 150ms, box-shadow 150ms',
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', background: OUT_WHITE, overflow: 'hidden', fontFamily: OUT_FONT }}>
      <style>{FOCUS_CSS}</style>

      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px 16px', borderBottom: `1px solid ${OUT_BORDER}`, flexShrink: 0, paddingTop: 48 }}>
        <OutfittersLogo width={120} />
        <button onClick={goBack} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 4 }}>
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
            <path d="M6 2L3 6V20C3 21.1 3.9 22 5 22H19C20.1 22 21 21.1 21 20V6L18 2H6Z" stroke={ACCENT} strokeWidth="1.4" strokeLinecap="round"/>
            <path d="M3 6H21" stroke={ACCENT} strokeWidth="1.4"/>
            <path d="M16 10C16 12.2 14.2 14 12 14C9.8 14 8 12.2 8 10" stroke={ACCENT} strokeWidth="1.4" strokeLinecap="round"/>
          </svg>
        </button>
      </div>

      <div style={{ flex: 1, overflowY: 'auto', WebkitOverflowScrolling: 'touch' }}>
        {/* ── Order summary toggle bar ── */}
        <div
          onClick={(e) => { e.stopPropagation(); setOrderOpen(prev => !prev) }}
          style={{ background: OUT_BG, borderBottom: `1px solid ${OUT_BORDER}`, padding: '14px 16px', cursor: 'pointer', userSelect: 'none' }}
        >
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
              <span style={{ fontSize: 14, color: ACCENT, fontWeight: 400 }}>Order summary</span>
              <svg width="11" height="11" viewBox="0 0 12 12" fill="none" style={{ transform: orderOpen ? 'rotate(180deg)' : 'none', transition: 'transform 200ms' }}>
                <path d="M3 4.5L6 7.5L9 4.5" stroke={ACCENT} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <span style={{ fontSize: 16, fontWeight: 600, color: OUT_BLACK }}>{fmtPrice(total)}</span>
          </div>
        </div>

        {/* Order summary expanded */}
        {orderOpen && (
          <div style={{ background: OUT_BG, borderBottom: `1px solid ${OUT_BORDER}`, padding: '0 16px 16px' }}>
            <div style={{ display: 'flex', gap: 12, alignItems: 'center', padding: '12px 0' }}>
              <div style={{ width: 64, height: 64, flexShrink: 0, borderRadius: 8, overflow: 'visible', position: 'relative', border: `1px solid ${OUT_BORDER}`, background: OUT_WHITE }}>
                <img src={product.img} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: 8 }} />
                <div style={{ position: 'absolute', top: -8, right: -8, width: 20, height: 20, borderRadius: '50%', background: OUT_BLACK, color: OUT_WHITE, fontSize: 11, fontWeight: 600, display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 2 }}>{qty}</div>
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontSize: 13, fontWeight: 500, color: OUT_BLACK, lineHeight: 1.3 }}>
                  {product.name.split(' ').map(w => w.charAt(0) + w.slice(1).toLowerCase()).join(' ')}
                </div>
                <div style={{ fontSize: 11, color: OUT_GRAY, marginTop: 2 }}>Black / M / SS-26</div>
              </div>
              <div style={{ fontSize: 13, color: OUT_BLACK, flexShrink: 0 }}>{fmtPrice(itemTotal)}</div>
            </div>

            <div style={{ display: 'flex', marginBottom: 12 }}>
              <input placeholder="Discount code or gift card" className="co-input" style={{ ...inputBase, flex: 1, borderRight: 'none', borderRadius: '5px 0 0 5px', height: 44 }} />
              <button style={{ background: OUT_BG, color: OUT_GRAY, border: '1px solid #d1d1d1', padding: '0 16px', fontSize: 13, fontWeight: 600, cursor: 'pointer', borderRadius: '0 5px 5px 0', fontFamily: OUT_FONT }}>Apply</button>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', padding: '4px 0', fontSize: 14 }}>
              <span style={{ color: OUT_BLACK }}>Subtotal</span>
              <span style={{ color: OUT_BLACK }}>{fmtPrice(itemTotal)}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', padding: '4px 0', fontSize: 14 }}>
              <span style={{ color: OUT_BLACK }}>Shipping</span>
              <span style={{ color: OUT_BLACK }}>{fmtPrice(shipCost)}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', paddingTop: 10, marginTop: 6, borderTop: `1px solid ${OUT_BORDER}` }}>
              <span style={{ fontSize: 18, fontWeight: 700, color: OUT_BLACK }}>Total</span>
              <div>
                <span style={{ fontSize: 11, color: OUT_GRAY, marginRight: 6 }}>PKR</span>
                <span style={{ fontSize: 20, fontWeight: 700, color: OUT_BLACK }}>{fmtPrice(total)}</span>
              </div>
            </div>
          </div>
        )}

        <div style={{ padding: '0 16px 32px' }}>
          {/* ── Contact ── */}
          <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', margin: '24px 0 12px' }}>
            <h2 style={{ fontSize: 18, fontWeight: 700, color: OUT_BLACK, margin: 0 }}>Contact</h2>
            <span style={{ fontSize: 13, color: ACCENT, cursor: 'pointer', textDecoration: 'underline' }}>Sign in</span>
          </div>
          <input placeholder="Email" type="email" className="co-input" style={{ ...inputBase, marginBottom: 10 }} />
          <CheckboxRow checked={newsletter} onChange={() => setNewsletter(prev => !prev)} label="Email me with news and offers" />

          {/* ── Delivery ── */}
          <SectionTitle>Delivery</SectionTitle>

          {/* City */}
          <div style={{ position: 'relative', marginBottom: 8 }}>
            <label style={{ position: 'absolute', top: 5, left: 12, fontSize: 10, color: OUT_GRAY, zIndex: 1 }}>City</label>
            <input value={city} onChange={e => setCity(e.target.value)} className="co-input" style={{ ...inputBase, paddingTop: 16, paddingBottom: 0, paddingRight: 48 }} />
            <div style={{ position: 'absolute', right: 40, top: '50%', transform: 'translateY(-50%)' }}>
              <svg width="10" height="6" viewBox="0 0 10 6" fill="none"><path d="M1 1L5 5L9 1" stroke="#888" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/></svg>
            </div>
            <div style={{ position: 'absolute', right: 0, top: 0, width: 44, height: 50, display: 'flex', alignItems: 'center', justifyContent: 'center', borderLeft: '1px solid #d1d1d1', cursor: 'pointer' }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                <circle cx="10.5" cy="10.5" r="6.5" stroke={ACCENT} strokeWidth="1.6"/>
                <path d="M15.5 15.5L20 20" stroke={ACCENT} strokeWidth="1.6" strokeLinecap="round"/>
              </svg>
            </div>
          </div>

          {/* Country/Region */}
          <div style={{ position: 'relative', marginBottom: 8 }}>
            <label style={{ position: 'absolute', top: 5, left: 12, fontSize: 10, color: OUT_GRAY, zIndex: 1 }}>Country/Region</label>
            <input value="Pakistan" readOnly className="co-input" style={{ ...inputBase, paddingTop: 16, paddingBottom: 0 }} />
            <div style={{ position: 'absolute', right: 12, top: '50%', transform: 'translateY(-50%)' }}>
              <svg width="10" height="6" viewBox="0 0 10 6" fill="none"><path d="M1 1L5 5L9 1" stroke="#888" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/></svg>
            </div>
          </div>

          <input placeholder="First name" className="co-input" style={{ ...inputBase, marginBottom: 8 }} />
          <input placeholder="Last name" className="co-input" style={{ ...inputBase, marginBottom: 8 }} />
          <input placeholder="Address" className="co-input" style={{ ...inputBase, marginBottom: 8 }} />
          <input placeholder="City" className="co-input" style={{ ...inputBase, marginBottom: 8 }} />
          <input placeholder="Postal code (optional)" className="co-input" style={{ ...inputBase, marginBottom: 8 }} />

          {/* Phone */}
          <div style={{ position: 'relative', marginBottom: 10 }}>
            <input placeholder="Phone" className="co-input" style={{ ...inputBase, paddingRight: 40 }} />
            <div style={{ position: 'absolute', right: 12, top: '50%', transform: 'translateY(-50%)' }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                <circle cx="12" cy="12" r="9" stroke="#ccc" strokeWidth="1.4"/>
                <path d="M12 16V12M12 8H12.01" stroke="#ccc" strokeWidth="1.6" strokeLinecap="round"/>
              </svg>
            </div>
          </div>
          <CheckboxRow checked={saveInfo} onChange={() => setSaveInfo(prev => !prev)} label="Save this information for next time" />

          {/* ── Shipping method ── */}
          <SectionTitle>Shipping method</SectionTitle>
          <div style={{ border: '1px solid #d1d1d1', borderRadius: 5, overflow: 'hidden', marginBottom: 20 }}>
            <ShipRow selected={shipMethod === 'flat'} onSelect={() => setShipMethod('flat')} label="FLAT SHIPPING 249 PKR + FBR POS FEE 1 PKR" sub="Cash on Delivery (COD)" price="Rs.250" first />
            <ShipRow selected={shipMethod === 'free'} onSelect={() => setShipMethod('free')} label="FREE SHIPPING + FBR POS FEE 1 PKR" sub="Debit - Credit Card" price="Rs.1" oldPrice="Rs.250" />
          </div>

          {/* ── Payment ── */}
          <SectionTitle>Payment</SectionTitle>
          <p style={{ fontSize: 12, color: OUT_GRAY, margin: '0 0 10px', lineHeight: 1.5 }}>All transactions are secure and encrypted.</p>
          <div style={{ border: '1px solid #d1d1d1', borderRadius: 5, overflow: 'hidden', marginBottom: 20 }}>
            <PayRow selected={payMethod === 'cod'} onSelect={() => setPayMethod('cod')} label="Cash on Delivery (COD)" first />

            <PayRow selected={payMethod === 'card'} onSelect={() => setPayMethod('card')} label="Debit - Credit Card" />

            <PayRow selected={payMethod === 'baadmay'} onSelect={() => setPayMethod('baadmay')} label="BaadMay | Buy Now. Pay Later" />
            {payMethod === 'baadmay' && (
              <div style={{ padding: '16px', background: EXPAND_BG, borderTop: `1px solid ${OUT_BORDER}`, textAlign: 'center' }}>
                <p style={{ fontSize: 13, color: OUT_BLACK, margin: '0 0 6px', lineHeight: 1.5 }}>
                  You'll be redirected to BaadMay | Buy Now. Pay Later to complete your purchase.
                </p>
              </div>
            )}

            <PayRow selected={payMethod === 'yango'} onSelect={() => setPayMethod('yango')} label="Yango | Pay in Parts" />
            {payMethod === 'yango' && (
              <div style={{ padding: '16px', background: EXPAND_BG, borderTop: `1px solid ${OUT_BORDER}`, textAlign: 'center' }}>
                <p style={{ fontSize: 13, color: OUT_BLACK, margin: '0 0 6px', lineHeight: 1.5 }}>
                  You'll be redirected to Yango | Pay in Parts to complete your purchase.
                </p>
              </div>
            )}
          </div>

          {/* ── Billing address ── */}
          <SectionTitle>Billing address</SectionTitle>
          <div style={{ border: '1px solid #d1d1d1', borderRadius: 5, overflow: 'hidden', marginBottom: 24 }}>
            <RadioRow selected={billingSame} onSelect={() => setBillingSame(true)} label="Same as shipping address" first />
            <RadioRow selected={!billingSame} onSelect={() => setBillingSame(false)} label="Use a different billing address" />
          </div>

          {/* ── Order summary (bottom) ── */}
          <SectionTitle>Order summary</SectionTitle>
          <div style={{ display: 'flex', gap: 12, alignItems: 'center', marginBottom: 16, padding: '4px 0' }}>
            <div style={{ width: 64, height: 64, flexShrink: 0, borderRadius: 8, overflow: 'visible', position: 'relative', border: `1px solid ${OUT_BORDER}`, background: OUT_BG }}>
              <img src={product.img} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: 8 }} />
              <div style={{ position: 'absolute', top: -8, right: -8, width: 20, height: 20, borderRadius: '50%', background: OUT_BLACK, color: OUT_WHITE, fontSize: 11, fontWeight: 600, display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 2 }}>{qty}</div>
            </div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontSize: 13, fontWeight: 500, color: OUT_BLACK, lineHeight: 1.3 }}>
                {product.name.split(' ').map(w => w.charAt(0) + w.slice(1).toLowerCase()).join(' ')}
              </div>
              <div style={{ fontSize: 11, color: OUT_GRAY, marginTop: 2 }}>Black / M / SS-26</div>
            </div>
            <div style={{ fontSize: 13, color: OUT_BLACK, flexShrink: 0 }}>{fmtPrice(itemTotal)}</div>
          </div>

          {/* Discount code */}
          <div style={{ display: 'flex', marginBottom: 16 }}>
            <input placeholder="Discount code or gift card" className="co-input" style={{ ...inputBase, flex: 1, borderRight: 'none', borderRadius: '5px 0 0 5px', height: 44 }} />
            <button style={{ background: OUT_BG, color: OUT_GRAY, border: '1px solid #d1d1d1', padding: '0 16px', fontSize: 13, fontWeight: 600, cursor: 'pointer', borderRadius: '0 5px 5px 0', fontFamily: OUT_FONT }}>Apply</button>
          </div>

          {/* Totals */}
          <div style={{ marginBottom: 20 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', padding: '6px 0', fontSize: 14 }}>
              <span style={{ color: OUT_BLACK }}>Subtotal</span>
              <span style={{ color: OUT_BLACK }}>{fmtPrice(itemTotal)}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', padding: '6px 0', fontSize: 14 }}>
              <span style={{ color: OUT_BLACK }}>Shipping</span>
              <span style={{ color: OUT_BLACK }}>{fmtPrice(shipCost)}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', paddingTop: 12, marginTop: 8, borderTop: `1px solid ${OUT_BORDER}` }}>
              <span style={{ fontSize: 18, fontWeight: 700, color: OUT_BLACK }}>Total</span>
              <div>
                <span style={{ fontSize: 11, color: OUT_GRAY, marginRight: 6 }}>PKR</span>
                <span style={{ fontSize: 20, fontWeight: 700, color: OUT_BLACK }}>{fmtPrice(total)}</span>
              </div>
            </div>
          </div>

          {/* Complete order */}
          <button onClick={handleComplete} style={{
            width: '100%', height: 52, background: ACCENT, color: OUT_WHITE,
            border: 'none', borderRadius: 5, fontSize: 16, fontWeight: 600, cursor: 'pointer',
            fontFamily: OUT_FONT, letterSpacing: 0.2, marginBottom: 16,
          }}>
            Complete order
          </button>

          {/* Footer links */}
          <div style={{ display: 'flex', gap: 16, marginBottom: 16 }}>
            <span style={{ fontSize: 12, color: ACCENT, cursor: 'pointer', textDecoration: 'underline' }}>Refund policy</span>
            <span style={{ fontSize: 12, color: ACCENT, cursor: 'pointer', textDecoration: 'underline' }}>Terms of service</span>
          </div>
        </div>
      </div>
    </div>
  )
}

/* ── Sub-components ── */

function SectionTitle({ children }: { children: React.ReactNode }) {
  return <h2 style={{ fontSize: 18, fontWeight: 700, color: OUT_BLACK, margin: '24px 0 12px' }}>{children}</h2>
}

function CheckboxRow({ checked, onChange, label }: { checked: boolean; onChange: () => void; label: string }) {
  return (
    <div
      onClick={onChange}
      style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16, cursor: 'pointer', userSelect: 'none' }}
    >
      <div style={{
        width: 18, height: 18, borderRadius: 3, flexShrink: 0,
        border: `1.5px solid ${checked ? ACCENT : '#bbb'}`,
        background: checked ? ACCENT : 'transparent',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        transition: 'all 150ms',
      }}>
        {checked && (
          <svg width="11" height="11" viewBox="0 0 12 12" fill="none">
            <path d="M2.5 6L5 8.5L9.5 3.5" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        )}
      </div>
      <span style={{ fontSize: 13, color: OUT_BLACK }}>{label}</span>
    </div>
  )
}

function RadioDot({ selected }: { selected: boolean }) {
  return (
    <div style={{
      width: 18, height: 18, borderRadius: '50%', flexShrink: 0,
      border: `2px solid ${selected ? ACCENT : '#ccc'}`,
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      transition: 'all 150ms',
    }}>
      {selected && <div style={{ width: 8, height: 8, borderRadius: '50%', background: ACCENT }} />}
    </div>
  )
}

function RadioRow({ selected, onSelect, label, first }: { selected: boolean; onSelect: () => void; label: string; first?: boolean }) {
  return (
    <div onClick={onSelect} style={{
      display: 'flex', alignItems: 'center', gap: 12, padding: '14px 16px',
      borderTop: first ? 'none' : '1px solid #d1d1d1',
      background: selected ? SELECTED_BG : OUT_WHITE, cursor: 'pointer',
    }}>
      <RadioDot selected={selected} />
      <span style={{ fontSize: 14, color: OUT_BLACK }}>{label}</span>
    </div>
  )
}

function ShipRow({ selected, onSelect, label, sub, price, oldPrice, first }: {
  selected: boolean; onSelect: () => void; label: string; sub: string; price: string; oldPrice?: string; first?: boolean
}) {
  return (
    <div onClick={onSelect} style={{
      display: 'flex', alignItems: 'flex-start', gap: 12, padding: '14px 16px',
      borderTop: first ? 'none' : '1px solid #d1d1d1',
      background: selected ? SELECTED_BG : OUT_WHITE, cursor: 'pointer',
    }}>
      <div style={{ paddingTop: 2 }}><RadioDot selected={selected} /></div>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ fontSize: 13, fontWeight: 500, color: OUT_BLACK, lineHeight: 1.4 }}>{label}</div>
        <div style={{ fontSize: 12, color: OUT_GRAY }}>{sub}</div>
      </div>
      <div style={{ textAlign: 'right', flexShrink: 0 }}>
        {oldPrice && <div style={{ fontSize: 12, color: OUT_GRAY, textDecoration: 'line-through' }}>{oldPrice}</div>}
        <div style={{ fontSize: 14, fontWeight: 600, color: OUT_BLACK }}>{price}</div>
      </div>
    </div>
  )
}

function PayRow({ selected, onSelect, label, first }: {
  selected: boolean; onSelect: () => void; label: string; first?: boolean
}) {
  return (
    <div onClick={onSelect} style={{
      display: 'flex', alignItems: 'center', gap: 12, padding: '14px 16px',
      borderTop: first ? 'none' : '1px solid #d1d1d1',
      background: selected ? SELECTED_BG : OUT_WHITE, cursor: 'pointer',
    }}>
      <RadioDot selected={selected} />
      <span style={{ flex: 1, fontSize: 14, color: OUT_BLACK }}>{label}</span>
    </div>
  )
}
