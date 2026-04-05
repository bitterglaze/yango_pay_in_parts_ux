import { useState } from 'react'
import type { NavProps } from '../App'
import { OutfittersLogo, PRODUCTS, formatPrice, bnplYango, bnplBaadmay, OUT_BLACK, OUT_WHITE, OUT_BORDER, OUT_GRAY, OUT_BG, OUT_FONT } from './merchant-shared'

type PayMethod = 'cod' | 'card' | 'baadmay' | 'yango'
type ShipMethod = 'flat' | 'free'

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

  const shipCost = shipMethod === 'flat' ? 250 : 1
  const total = itemTotal + shipCost

  const handleComplete = () => {
    if (payMethod === 'yango') goTo('yango-checkout')
    else goTo('bnpl-auth')
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', background: OUT_WHITE, overflow: 'hidden', fontFamily: OUT_FONT }}>
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '14px 16px', borderBottom: `1px solid ${OUT_BORDER}`, flexShrink: 0, paddingTop: 48 }}>
        <OutfittersLogo width={108} />
        <button onClick={goBack} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 4 }}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
            <path d="M6 2L3 6V20C3 21.1 3.9 22 5 22H19C20.1 22 21 21.1 21 20V6L18 2H6Z" stroke={OUT_BLACK} strokeWidth="1.6" strokeLinecap="round"/>
            <path d="M3 6H21" stroke={OUT_BLACK} strokeWidth="1.6"/>
            <path d="M16 10C16 12.2 14.2 14 12 14C9.8 14 8 12.2 8 10" stroke={OUT_BLACK} strokeWidth="1.6" strokeLinecap="round"/>
          </svg>
        </button>
      </div>

      <div style={{ flex: 1, overflowY: 'auto', padding: '0 0 24px' }}>
        {/* Order summary toggle */}
        <div style={{ background: OUT_BG, borderBottom: `1px solid ${OUT_BORDER}`, padding: '12px 16px' }}>
          <div onClick={() => setOrderOpen(!orderOpen)} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', cursor: 'pointer' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
              <span style={{ fontSize: 12, color: '#1773b0' }}>Order summary {orderOpen ? '▲' : '▼'}</span>
            </div>
            <span style={{ fontSize: 14, fontWeight: 400, color: OUT_BLACK }}>Rs {total.toLocaleString('en-PK')}.00</span>
          </div>
          {orderOpen && (
            <div style={{ marginTop: 12, display: 'flex', gap: 12, alignItems: 'center' }}>
              <div style={{ width: 54, height: 72, flexShrink: 0, overflow: 'hidden', position: 'relative' }}>
                <img src={product.img} alt={product.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                <div style={{ position: 'absolute', top: -4, right: -4, width: 18, height: 18, borderRadius: 9, background: OUT_GRAY, color: OUT_WHITE, fontSize: 10, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{qty}</div>
              </div>
              <div>
                <div style={{ fontSize: 12, fontWeight: 500, color: OUT_BLACK }}>
                  {product.name.split(' ').map(w => w.charAt(0) + w.slice(1).toLowerCase()).join(' ')}
                </div>
                <div style={{ fontSize: 10, color: OUT_GRAY }}>Black / M / SS-26</div>
                <div style={{ fontSize: 12, fontWeight: 700, color: OUT_BLACK, marginTop: 2 }}>Rs {itemTotal.toLocaleString('en-PK')}.00</div>
              </div>
            </div>
          )}
        </div>

        <div style={{ padding: '16px 16px 0' }}>
          {/* Contact */}
          <SectionHead>Contact</SectionHead>
          <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: 4 }}>
            <span style={{ fontSize: 12, color: '#1773b0', cursor: 'pointer' }}>Sign in</span>
          </div>
          <Input placeholder="Email" type="email" />
          <Checkbox checked={newsletter} onChange={setNewsletter} label="Email me with news and offers" />

          {/* Delivery */}
          <SectionHead>Delivery</SectionHead>
          <div style={{ marginBottom: 8 }}>
            <div style={{ position: 'relative' }}>
              <label style={{ fontSize: 10, color: OUT_GRAY, position: 'absolute', top: 6, left: 12 }}>City</label>
              <input value={city} onChange={e => setCity(e.target.value)} style={{
                width: '100%', height: 52, border: `1px solid ${OUT_BORDER}`, borderRadius: 4,
                padding: '20px 12px 6px', fontSize: 14, color: OUT_BLACK, outline: 'none', boxSizing: 'border-box',
              }} />
            </div>
          </div>
          <div style={{ marginBottom: 8 }}>
            <select style={{ width: '100%', height: 48, border: `1px solid ${OUT_BORDER}`, borderRadius: 4, padding: '0 12px', fontSize: 14, color: OUT_BLACK, outline: 'none', background: OUT_WHITE, appearance: 'none' as const }}>
              <option>Pakistan</option>
            </select>
          </div>
          <div style={{ display: 'flex', gap: 8 }}>
            <Input placeholder="First name" />
            <Input placeholder="Last name" />
          </div>
          <Input placeholder="Address" />
          <div style={{ display: 'flex', gap: 8 }}>
            <Input placeholder="City" />
            <Input placeholder="Postal code (optional)" />
          </div>
          <div style={{ position: 'relative', marginBottom: 8 }}>
            <input placeholder="Phone" style={{
              width: '100%', height: 48, border: `1px solid ${OUT_BORDER}`, borderRadius: 4,
              padding: '0 40px 0 12px', fontSize: 14, color: OUT_BLACK, outline: 'none', boxSizing: 'border-box',
            }} />
            <span style={{ position: 'absolute', right: 12, top: '50%', transform: 'translateY(-50%)', fontSize: 16, color: OUT_GRAY }}>ⓘ</span>
          </div>
          <Checkbox checked={saveInfo} onChange={setSaveInfo} label="Save this information for next time" />

          {/* Shipping method */}
          <SectionHead>Shipping method</SectionHead>
          <div style={{ border: `1px solid ${OUT_BORDER}`, borderRadius: 8, overflow: 'hidden', marginBottom: 16 }}>
            <ShipOption
              selected={shipMethod === 'flat'} onSelect={() => setShipMethod('flat')}
              label="FLAT SHIPPING 249 PKR + FBR POS FEE 1 PKR"
              sublabel="Cash on Delivery (COD)"
              price="Rs 250.00"
            />
            <div style={{ height: 1, background: OUT_BORDER }} />
            <ShipOption
              selected={shipMethod === 'free'} onSelect={() => setShipMethod('free')}
              label="FREE SHIPPING + FBR POS FEE 1 PKR"
              sublabel="Debit - Credit Card"
              price="Rs 1.00"
              oldPrice="Rs 250.00"
            />
          </div>

          {/* Payment */}
          <SectionHead>Payment</SectionHead>
          <div style={{ fontSize: 11, color: OUT_GRAY, marginBottom: 10 }}>All transactions are secure and encrypted.</div>
          <div style={{ border: `1px solid ${OUT_BORDER}`, borderRadius: 8, overflow: 'hidden', marginBottom: 16 }}>
            <PayOption selected={payMethod === 'cod'} onSelect={() => setPayMethod('cod')} label="Cash on Delivery (COD)" />
            <PayOption selected={payMethod === 'card'} onSelect={() => setPayMethod('card')} label="Debit - Credit Card" badges={['VISA', 'MC']} />
            <PayOption selected={payMethod === 'baadmay'} onSelect={() => setPayMethod('baadmay')}
              label="BaadMay | Buy Now. Pay Later" badges={['VISA', 'MC']} />
            {/* Yango Pay in Parts */}
            <div style={{ borderTop: `1px solid ${OUT_BORDER}` }}>
              <div onClick={() => setPayMethod('yango')} style={{
                display: 'flex', alignItems: 'center', gap: 12, padding: '14px 16px',
                background: payMethod === 'yango' ? '#f0f5ff' : OUT_WHITE, cursor: 'pointer',
              }}>
                <RadioDot selected={payMethod === 'yango'} />
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 13, color: OUT_BLACK }}>Yango Pay in Parts</div>
                  {payMethod === 'yango' && (
                    <div style={{ fontSize: 12, color: OUT_GRAY, marginTop: 2 }}>
                      Pay in 4 Installments · {bnplYango(total)} each
                    </div>
                  )}
                </div>
                <img src="/checkout/PacmanIcon.png" alt="" style={{ width: 20, height: 20, flexShrink: 0 }} />
              </div>
            </div>
          </div>

          {/* Billing address */}
          <SectionHead>Billing address</SectionHead>
          <div style={{ border: `1px solid ${OUT_BORDER}`, borderRadius: 8, overflow: 'hidden', marginBottom: 16 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '14px 16px', background: '#f0f5ff', cursor: 'pointer' }}>
              <RadioDot selected={true} />
              <span style={{ fontSize: 13, color: OUT_BLACK }}>Same as shipping address</span>
            </div>
            <div style={{ borderTop: `1px solid ${OUT_BORDER}`, display: 'flex', alignItems: 'center', gap: 12, padding: '14px 16px', cursor: 'pointer' }}>
              <RadioDot selected={false} />
              <span style={{ fontSize: 13, color: OUT_BLACK }}>Use a different billing address</span>
            </div>
          </div>

          {/* Order summary */}
          <SectionHead>Order summary</SectionHead>
          <div style={{ display: 'flex', gap: 12, alignItems: 'center', marginBottom: 12, padding: '8px 0' }}>
            <div style={{ width: 54, height: 72, flexShrink: 0, overflow: 'hidden', position: 'relative' }}>
              <img src={product.img} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              <div style={{ position: 'absolute', top: -4, right: -4, width: 18, height: 18, borderRadius: 9, background: OUT_GRAY, color: OUT_WHITE, fontSize: 10, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{qty}</div>
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 12, fontWeight: 500, color: OUT_BLACK }}>
                {product.name.split(' ').map(w => w.charAt(0) + w.slice(1).toLowerCase()).join(' ')}
              </div>
              <div style={{ fontSize: 10, color: OUT_GRAY }}>Black / M / SS-26</div>
            </div>
            <div style={{ fontSize: 12, fontWeight: 400, color: OUT_BLACK }}>Rs {itemTotal.toLocaleString('en-PK')}.00</div>
          </div>

          {/* Discount code */}
          <div style={{ display: 'flex', gap: 0, marginBottom: 12 }}>
            <input placeholder="Discount code or gift card" style={{
              flex: 1, border: `1px solid ${OUT_BORDER}`, borderRight: 'none',
              padding: '10px 12px', fontSize: 13, outline: 'none', borderRadius: '4px 0 0 4px', background: OUT_WHITE,
            }} />
            <button style={{
              background: OUT_BG, color: OUT_GRAY, border: `1px solid ${OUT_BORDER}`,
              padding: '0 16px', fontSize: 13, fontWeight: 500, cursor: 'pointer', borderRadius: '0 4px 4px 0',
            }}>Apply</button>
          </div>

          {/* Totals */}
          <div style={{ marginBottom: 16 }}>
            <TotalRow label="Subtotal" value={`Rs ${itemTotal.toLocaleString('en-PK')}.00`} />
            <TotalRow label="Shipping" value={`Rs ${shipCost.toLocaleString('en-PK')}.00`} />
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', padding: '8px 0', marginTop: 8 }}>
              <span style={{ fontSize: 16, fontWeight: 700, color: OUT_BLACK }}>Total</span>
              <div style={{ textAlign: 'right' }}>
                <span style={{ fontSize: 11, color: OUT_GRAY, marginRight: 6 }}>PKR</span>
                <span style={{ fontSize: 18, fontWeight: 700, color: OUT_BLACK }}>Rs {total.toLocaleString('en-PK')}.00</span>
              </div>
            </div>
          </div>

          {/* Complete order */}
          <button onClick={handleComplete} style={{
            width: '100%', height: 50, background: '#1773b0', color: OUT_WHITE,
            border: 'none', borderRadius: 4, fontSize: 15, fontWeight: 600, cursor: 'pointer', marginBottom: 16,
          }}>
            Complete order
          </button>

          {/* Footer links */}
          <div style={{ display: 'flex', justifyContent: 'center', gap: 16, flexWrap: 'wrap' }}>
            {['Refund policy', 'Terms of service'].map(link => (
              <span key={link} style={{ fontSize: 11, color: '#1773b0', cursor: 'pointer', textDecoration: 'underline' }}>{link}</span>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

function SectionHead({ children }: { children: React.ReactNode }) {
  return <div style={{ fontSize: 16, fontWeight: 700, color: OUT_BLACK, margin: '20px 0 10px' }}>{children}</div>
}

function Input({ placeholder, type = 'text' }: { placeholder: string; type?: string }) {
  return (
    <input type={type} placeholder={placeholder} style={{
      width: '100%', height: 48, border: `1px solid ${OUT_BORDER}`, borderRadius: 4,
      padding: '0 12px', fontSize: 14, color: OUT_BLACK, outline: 'none', marginBottom: 8, boxSizing: 'border-box',
    }} />
  )
}

function Checkbox({ checked, onChange, label }: { checked: boolean; onChange: (v: boolean) => void; label: string }) {
  return (
    <label style={{ display: 'flex', alignItems: 'flex-start', gap: 8, marginBottom: 16, cursor: 'pointer' }}>
      <input type="checkbox" checked={checked} onChange={e => onChange(e.target.checked)} style={{ marginTop: 2, accentColor: '#1773b0' }} />
      <span style={{ fontSize: 12, color: OUT_GRAY, lineHeight: 1.4 }}>{label}</span>
    </label>
  )
}

function RadioDot({ selected }: { selected: boolean }) {
  return (
    <div style={{
      width: 18, height: 18, borderRadius: '50%', flexShrink: 0,
      border: `2px solid ${selected ? '#1773b0' : OUT_BORDER}`,
      background: selected ? '#1773b0' : 'transparent',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
    }}>
      {selected && <div style={{ width: 6, height: 6, borderRadius: '50%', background: OUT_WHITE }} />}
    </div>
  )
}

function ShipOption({ selected, onSelect, label, sublabel, price, oldPrice }: {
  selected: boolean; onSelect: () => void; label: string; sublabel: string; price: string; oldPrice?: string
}) {
  return (
    <div onClick={onSelect} style={{
      display: 'flex', alignItems: 'flex-start', gap: 12, padding: '14px 16px',
      background: selected ? '#f0f5ff' : OUT_WHITE, cursor: 'pointer',
    }}>
      <RadioDot selected={selected} />
      <div style={{ flex: 1 }}>
        <div style={{ fontSize: 13, fontWeight: 500, color: OUT_BLACK }}>{label}</div>
        <div style={{ fontSize: 12, color: OUT_GRAY }}>{sublabel}</div>
      </div>
      <div style={{ textAlign: 'right', flexShrink: 0 }}>
        {oldPrice && <div style={{ fontSize: 12, color: OUT_GRAY, textDecoration: 'line-through' }}>{oldPrice}</div>}
        <div style={{ fontSize: 13, fontWeight: 600, color: OUT_BLACK }}>{price}</div>
      </div>
    </div>
  )
}

function PayOption({ selected, onSelect, label, badges }: {
  selected: boolean; onSelect: () => void; label: string; badges?: string[]
}) {
  return (
    <div onClick={onSelect} style={{
      display: 'flex', alignItems: 'center', gap: 12, padding: '14px 16px',
      borderTop: `1px solid ${OUT_BORDER}`, background: selected ? '#f0f5ff' : OUT_WHITE, cursor: 'pointer',
    }}>
      <RadioDot selected={selected} />
      <span style={{ flex: 1, fontSize: 13, color: OUT_BLACK }}>{label}</span>
      {badges && (
        <div style={{ display: 'flex', gap: 4 }}>
          {badges.map(b => (
            <div key={b} style={{
              padding: '2px 4px', border: `1px solid ${OUT_BORDER}`, borderRadius: 2,
              fontSize: 8, fontWeight: 700, color: b === 'VISA' ? '#1a1f71' : '#eb001b',
            }}>{b}</div>
          ))}
        </div>
      )}
    </div>
  )
}

function TotalRow({ label, value }: { label: string; value: string }) {
  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', padding: '4px 0', fontSize: 13, color: OUT_BLACK }}>
      <span>{label}</span>
      <span>{value}</span>
    </div>
  )
}
