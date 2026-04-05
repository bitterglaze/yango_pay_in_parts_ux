import type { NavProps } from '../App'
import { OutfittersLogo, PRODUCTS, formatPrice, OUT_BLACK, OUT_WHITE, OUT_BORDER, OUT_GRAY, OUT_BG, LINK_BLUE, WARNING_BG, WARNING_BORDER, WARNING_TEXT, MERCHANT_AVATAR_BG, MERCHANT_AVATAR_TEXT } from './merchant-shared'
import { YANGO_RED, TEXT_INVERTED } from './yango-tokens'
import { GREEN } from './shared'

const item = PRODUCTS[0]

export default function MerchantScreen({ goTo }: NavProps) {
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
        <OutfittersLogo size={18} />
      </div>

      {/* Scrollable */}
      <div style={{ flex: 1, overflowY: 'auto', padding: '20px 16px 32px' }}>

        {/* Order summary link */}
        <div style={{
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          marginBottom: 20, fontSize: 13, color: LINK_BLUE,
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 4, cursor: 'pointer' }}>
            <span>Order summary</span>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
              <path d="M9 18L15 12L9 6" stroke={LINK_BLUE} strokeWidth="1.8" strokeLinecap="round"/>
            </svg>
          </div>
          <span style={{ fontWeight: 600, color: OUT_BLACK }}>{formatPrice(item.price)}</span>
        </div>

        {/* Order number + date */}
        <div style={{ marginBottom: 4 }}>
          <h2 style={{ margin: '0 0 4px', fontSize: 22, fontWeight: 700, color: OUT_BLACK }}>
            Order #OUT-2438856
          </h2>
          <p style={{ margin: 0, fontSize: 13, color: OUT_GRAY }}>Confirmed 20 Mar</p>
        </div>

        {/* Buy again */}
        <button style={{
          display: 'block', width: '100%', height: 40,
          border: `1px solid ${OUT_BORDER}`, borderRadius: 4,
          background: OUT_WHITE, color: LINK_BLUE,
          fontSize: 13, fontWeight: 500, cursor: 'pointer',
          marginTop: 16, marginBottom: 16,
        }}>
          Buy again
        </button>

        {/* Pending BNPL payment notice */}
        <div style={{
          background: WARNING_BG,
          border: `1px solid ${WARNING_BORDER}`,
          borderRadius: 6,
          padding: '12px 14px',
          marginBottom: 16,
          fontSize: 13,
          color: WARNING_TEXT,
          lineHeight: 1.5,
        }}>
          <strong>{formatPrice(item.price)} PKR</strong>
          <br />
          This order has a pending BNPL payment via Yango. The balance will be updated when payment is received.
        </div>

        {/* Status */}
        <div style={{
          border: `1px solid ${OUT_BORDER}`, borderRadius: 6,
          padding: '14px 14px', marginBottom: 10,
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <circle cx="8" cy="8" r="7.5" stroke={GREEN} strokeWidth="1"/>
              <path d="M4.5 8L7 10.5L11.5 5.5" stroke={GREEN} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <div>
              <div style={{ fontSize: 13, fontWeight: 600, color: GREEN }}>Confirmed</div>
              <div style={{ fontSize: 12, color: OUT_GRAY }}>20 Mar</div>
            </div>
          </div>
        </div>

        {/* Contact information */}
        <InfoCard title="Contact information">
          <div style={{ fontSize: 13, color: OUT_BLACK }}>aniutabry1@gmail.com</div>
        </InfoCard>

        {/* Shipping address */}
        <InfoCard title="Shipping address">
          <div style={{ fontSize: 13, color: OUT_BLACK, lineHeight: 1.6 }}>
            kjmkj test<br />
            skj, ojsifo<br />
            ISLAMABAD 96799<br />
            Pakistan
          </div>
        </InfoCard>

        {/* Payment method */}
        <InfoCard title="Payment method">
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 13, color: OUT_BLACK }}>
            <div style={{
              width: 32, height: 22, borderRadius: 4,
              background: YANGO_RED, display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>
              <span style={{ fontSize: 7, fontWeight: 900, color: TEXT_INVERTED, fontStyle: 'italic' }}>YANGO</span>
            </div>
            Yango Pay in Parts
          </div>
          <div style={{ fontSize: 12, color: OUT_GRAY, marginTop: 4 }}>
            1st installment: {formatPrice(Math.round(item.price / 4))} today
          </div>
        </InfoCard>

        {/* Billing address */}
        <InfoCard title="Billing address">
          <div style={{ fontSize: 13, color: OUT_BLACK }}>Same as shipping address</div>
        </InfoCard>

        {/* Order item */}
        <InfoCard title="Items in order">
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
        </InfoCard>

        {/* Back to store */}
        <div style={{ textAlign: 'center', marginTop: 8 }}>
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
          {['Refund policy', 'Shipping policy', 'Privacy policy', 'Terms of service'].map(link => (
            <span key={link} style={{ fontSize: 11, color: OUT_GRAY, cursor: 'pointer', textDecoration: 'underline' }}>
              {link}
            </span>
          ))}
        </div>

      </div>
    </div>
  )
}

function InfoCard({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div style={{
      border: `1px solid ${OUT_BORDER}`, borderRadius: 6,
      padding: '12px 14px', marginBottom: 10,
    }}>
      <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.06em', color: OUT_GRAY, marginBottom: 6 }}>
        {title.toUpperCase()}
      </div>
      {children}
    </div>
  )
}
