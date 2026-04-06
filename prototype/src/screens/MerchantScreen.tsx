import { useState } from 'react'
import type { NavProps } from '../App'
import { OutfittersLogo, PRODUCTS, formatPrice, OUT_BLACK, OUT_WHITE, OUT_BORDER, OUT_GRAY, OUT_BG, LINK_BLUE } from './merchant-shared'
import { GREEN } from './shared'

export default function MerchantScreen({ goTo, selectedProductId, checkoutData }: NavProps) {
  const item = PRODUCTS.find(p => p.id === selectedProductId) ?? PRODUCTS[0]
  const [orderSummaryOpen, setOrderSummaryOpen] = useState(false)

  const totalFormatted = `Rs ${item.price.toLocaleString('en-PK')}.00`
  const today = new Date()
  const paymentDate = today.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })

  const cd = checkoutData
  const fullName = [cd.firstName, cd.lastName].filter(Boolean).join(' ') || 'Ahmed Khan'
  const addressLines = [
    fullName,
    cd.address || 'House 12, Street 5, DHA Phase 6',
    cd.apartment,
    `Lahore ${cd.postalCode || '54000'}`,
    'Pakistan',
    cd.phone || '+92 300 1234567',
  ].filter(Boolean)

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', background: OUT_WHITE, overflow: 'hidden' }}>

      {/* Header */}
      <div style={{
        borderBottom: `1px solid ${OUT_BORDER}`,
        padding: '14px 16px 12px',
        textAlign: 'center',
        paddingTop: 48,
        flexShrink: 0,
      }}>
        <OutfittersLogo width={108} />
      </div>

      {/* Scrollable */}
      <div style={{ flex: 1, overflowY: 'auto', padding: '0 0 32px' }}>

        {/* Order summary toggle row */}
        <div
          onClick={() => setOrderSummaryOpen(o => !o)}
          style={{
            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            padding: '14px 16px',
            borderBottom: `1px solid ${OUT_BORDER}`,
            cursor: 'pointer',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 4, fontSize: 14, color: LINK_BLUE }}>
            <span>Order summary</span>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" style={{
              transform: orderSummaryOpen ? 'rotate(270deg)' : 'rotate(90deg)',
              transition: 'transform 200ms ease',
            }}>
              <path d="M9 18L15 12L9 6" stroke={LINK_BLUE} strokeWidth="1.8" strokeLinecap="round"/>
            </svg>
          </div>
          <span style={{ fontSize: 18, fontWeight: 600, color: OUT_BLACK }}>{totalFormatted}</span>
        </div>

        {orderSummaryOpen && (
          <div style={{ padding: '12px 16px', borderBottom: `1px solid ${OUT_BORDER}` }}>
            <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
              <div style={{ width: 54, height: 72, overflow: 'hidden', background: OUT_BG, flexShrink: 0 }}>
                <img src={item.img} alt={item.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 12, fontWeight: 600, color: OUT_BLACK }}>{item.name}</div>
                <div style={{ fontSize: 11, color: OUT_GRAY }}>Black · M · ×1</div>
                <div style={{ fontSize: 13, fontWeight: 700, color: OUT_BLACK, marginTop: 4 }}>{formatPrice(item.price)}</div>
              </div>
            </div>
          </div>
        )}

        <div style={{ padding: '20px 16px 0' }}>

          {/* Order number + date */}
          <div style={{ marginBottom: 4 }}>
            <h2 style={{ margin: '0 0 4px', fontSize: 22, fontWeight: 700, color: OUT_BLACK }}>
              Order #OUT-2438856
            </h2>
            <p style={{ margin: 0, fontSize: 14, color: OUT_GRAY }}>Confirmed {paymentDate}</p>
          </div>

          {/* Buy again */}
          <button style={{
            display: 'block', width: '100%', height: 44,
            border: `1px solid ${OUT_BORDER}`, borderRadius: 6,
            background: OUT_WHITE, color: LINK_BLUE,
            fontSize: 14, fontWeight: 500, cursor: 'pointer',
            marginTop: 20, marginBottom: 20,
          }}>
            Buy again
          </button>

          {/* Pending payment notice */}
          <Card>
            <div style={{ padding: '14px 16px' }}>
              <div style={{ fontSize: 14, fontWeight: 700, color: OUT_BLACK, marginBottom: 6 }}>
                {totalFormatted} PKR
              </div>
              <div style={{ fontSize: 14, color: OUT_GRAY, lineHeight: 1.5 }}>
                This order has a pending payment. The balance will be updated when payment is received.
              </div>
            </div>
          </Card>

          <Spacer />

          {/* Confirmed status */}
          <Card>
            <div style={{ padding: '14px 16px', display: 'flex', alignItems: 'center', gap: 8 }}>
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path d="M5 10L8.5 13.5L15 6.5" stroke={GREEN} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              <div>
                <div style={{ fontSize: 14, fontWeight: 700, color: OUT_BLACK }}>Confirmed</div>
                <div style={{ fontSize: 13, color: OUT_GRAY }}>{paymentDate}</div>
              </div>
            </div>
          </Card>

          <Spacer />

          {/* All info in one card */}
          <Card>
            <div style={{ padding: '16px 16px 20px' }}>
              <SectionBlock title="Contact information">
                <p style={infoText}>{cd.email || 'user@example.com'}</p>
              </SectionBlock>

              <SectionBlock title="Shipping address">
                <p style={infoText}>
                  {addressLines.map((line, i) => (
                    <span key={i}>{line}{i < addressLines.length - 1 && <br />}</span>
                  ))}
                </p>
              </SectionBlock>

              <SectionBlock title="Shipping method">
                <p style={infoText}>{cd.shippingMethod === 'fast' ? 'Fast' : 'Standard'}</p>
              </SectionBlock>

              <SectionBlock title="Payment">
                <p style={infoText}>
                  Yango Pay in Parts<br />
                  <span style={{ color: OUT_GRAY }}>{totalFormatted} PKR</span><br />
                  <span style={{ color: OUT_GRAY }}>{paymentDate}</span>
                </p>
              </SectionBlock>

              <SectionBlock title="Billing address" last>
                <p style={infoText}>
                  {addressLines.map((line, i) => (
                    <span key={i}>{line}{i < addressLines.length - 1 && <br />}</span>
                  ))}
                </p>
              </SectionBlock>
            </div>
          </Card>

          {/* Continue shopping */}
          <div style={{ textAlign: 'center', marginTop: 16 }}>
            <span
              onClick={() => goTo('home')}
              style={{ fontSize: 13, color: LINK_BLUE, cursor: 'pointer', textDecoration: 'underline' }}
            >
              ← Continue shopping
            </span>
          </div>

          {/* Footer links */}
          <div style={{
            display: 'flex', justifyContent: 'center', gap: 16, marginTop: 24,
            flexWrap: 'wrap',
          }}>
            {['Refund policy', 'Shipping', 'Privacy policy', 'Terms of service'].map(link => (
              <span key={link} style={{ fontSize: 12, color: LINK_BLUE, cursor: 'pointer', textDecoration: 'underline' }}>
                {link}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

const infoText: React.CSSProperties = {
  margin: 0, fontSize: 14, color: '#000', lineHeight: 1.6,
}

function Card({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ border: `1px solid #e0e0e0`, borderRadius: 10, overflow: 'hidden' }}>
      {children}
    </div>
  )
}

function Spacer() {
  return <div style={{ height: 20 }} />
}

function SectionBlock({ title, children, last }: { title: string; children: React.ReactNode; last?: boolean }) {
  return (
    <div style={{ marginBottom: last ? 0 : 20 }}>
      <div style={{ fontSize: 14, fontWeight: 700, color: '#000', marginBottom: 4 }}>{title}</div>
      {children}
    </div>
  )
}
