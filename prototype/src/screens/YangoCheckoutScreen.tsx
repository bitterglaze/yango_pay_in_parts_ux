import { useState } from 'react'
import type { NavProps } from '../App'
import { PRODUCTS } from './merchant-shared'
import {
  YANGO_RED, TEXT_SECONDARY, DARK_TEXT, TEXT_INVERTED,
  BACKGROUND, FONT_FAMILY, RADIUS_LG, SHADOW_BOTTOM_BAR, GREEN,
} from './yango-tokens'

// ── Yango FinTech Design System tokens ────────────────────────────────────────
const BACKGROUND_MINOR = '#f5f4f2'            // --background-minor
const DIVIDER_COLOR    = 'rgba(138,135,132,0.4)' // --line
const PROGRESS_INACTIVE = 'rgba(49,34,12,0.16)'  // --basic/system/bg-progressbar

// ── Typography helpers ────────────────────────────────────────────────────────
// YST/Caption 1/Tight · Regular  — 13px 400 lh14 ls0
const T_CAP1R: React.CSSProperties = { fontSize: 13, fontWeight: 400, lineHeight: '14px', letterSpacing: 0 }
// YST/Caption 1/Tight · Medium   — 13px 500 lh14 ls0
const T_CAP1M: React.CSSProperties = { fontSize: 13, fontWeight: 500, lineHeight: '14px', letterSpacing: 0 }
// YST/Caption 1/Normal · Medium  — 13px 500 lh15 ls0
const T_CAP1NM: React.CSSProperties = { fontSize: 13, fontWeight: 500, lineHeight: '15px', letterSpacing: 0 }
// YST/Body 2/Tight · Medium      — 16px 500 lh17 ls-0.5
const T_B2TM: React.CSSProperties = { fontSize: 16, fontWeight: 500, lineHeight: '17px', letterSpacing: -0.5 }
// YST/Body 2/Normal · Medium     — 16px 500 lh19 ls-0.5
const T_B2NM: React.CSSProperties = { fontSize: 16, fontWeight: 500, lineHeight: '19px', letterSpacing: -0.5 }
// YST/Body 2/Normal · Bold       — 16px 700 lh19 ls-0.5
const T_B2NB: React.CSSProperties = { fontSize: 16, fontWeight: 700, lineHeight: '19px', letterSpacing: -0.5 }
// YST/Body 1/Tight · Medium      — 20px 500 lh20 ls-1
const T_B1TM: React.CSSProperties = { fontSize: 20, fontWeight: 500, lineHeight: '20px', letterSpacing: -1 }
// YST/Body 2/Normal · Regular    — 16px 400 lh19 ls-0.5
const T_B2NR: React.CSSProperties = { fontSize: 16, fontWeight: 400, lineHeight: '19px', letterSpacing: -0.5 }
// YST/Body 2/Tight · Regular    — 16px 400 lh17 ls0
const T_B2TR: React.CSSProperties = { fontSize: 16, fontWeight: 400, lineHeight: '17px', letterSpacing: 0 }

const NUM_VARIANT: React.CSSProperties = { fontVariantNumeric: 'lining-nums proportional-nums' }

// ── Assets ────────────────────────────────────────────────────────────────────
// Merchant logo — Outfitters (local PNG from public/checkout/)
const imgMerchantLogo = '/checkout/MerchLogo.png'
// Green Pacman / watermelon split icon (from Figma node 64:12994 context)
const imgSplitIcon  = '/checkout/SplitIcon.svg'
// CrossRoundFill icon — gray circle with × (Figma node 64:3612 / Trail area)

// ── Inline SVG icons ──────────────────────────────────────────────────────────
function ProductFillIcon() {
  return (
    <svg width="21" height="20" viewBox="0 0 21 20" fill="none" style={{ flexShrink: 0 }}>
      <path fillRule="evenodd" clipRule="evenodd" d="M0.804482 4.46927C0.5 5.20435 0.5 6.13623 0.5 8L0.5 12C0.5 13.8638 0.5 14.7956 0.804482 15.5307C1.21046 16.5108 1.98915 17.2895 2.96927 17.6955C3.70435 18 4.63623 18 6.5 18H13.1745C14.2527 18 14.7918 18 15.2844 17.8726C15.9413 17.7028 16.5441 17.3687 17.0362 16.9017C17.4053 16.5515 17.6911 16.0943 18.2625 15.18L20.0094 12.385C20.4896 11.6166 20.7297 11.2324 20.846 10.827C21.001 10.2866 21.001 9.71342 20.846 9.17295C20.7297 8.7676 20.4896 8.3834 20.0094 7.61501L18.2625 4.82001C17.6911 3.90569 17.4053 3.44853 17.0362 3.09831C16.5441 2.63135 15.9413 2.29723 15.2844 2.12739C14.7918 2 14.2527 2 13.1745 2L6.5 2C4.63623 2 3.70435 2 2.96927 2.30448C1.98915 2.71046 1.21046 3.48915 0.804482 4.46927ZM15.5 12C16.6046 12 17.5 11.1046 17.5 10C17.5 8.89543 16.6046 8 15.5 8C14.3954 8 13.5 8.89543 13.5 10C13.5 11.1046 14.3954 12 15.5 12Z" fill="#21201F"/>
    </svg>
  )
}

function ChevronUpIcon({ color = '#21201F', size = 24 }: { color?: string; size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" style={{ flexShrink: 0 }}>
      <path d="M7.5 14.5L12 10L16.5 14.5" stroke={color} strokeWidth="1.75" strokeLinecap="square"/>
    </svg>
  )
}

function ChevronDownIcon({ color = '#21201F', size = 24 }: { color?: string; size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" style={{ flexShrink: 0 }}>
      <path d="M7.5 9.5L12 14L16.5 9.5" stroke={color} strokeWidth="1.75" strokeLinecap="square"/>
    </svg>
  )
}

function ChevronRightIcon({ color = '#21201F', size = 24 }: { color?: string; size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" style={{ flexShrink: 0 }}>
      <path d="M10 7L14.5 11.5L10 16" stroke={color} strokeWidth="1.75" strokeLinecap="square"/>
    </svg>
  )
}

function InfoIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" style={{ flexShrink: 0 }}>
      <path d="M8 1.33276C11.6819 1.33276 14.6669 4.3179 14.667 7.99976C14.667 11.6817 11.6819 14.6667 8 14.6667C4.3181 14.6667 1.33301 11.6817 1.33301 7.99976C1.33305 4.31789 4.31813 1.33276 8 1.33276ZM8 2.66675C5.05451 2.66675 2.66704 5.05427 2.66699 7.99976C2.66699 10.9453 5.05448 13.3328 8 13.3328C10.9455 13.3328 13.333 10.9453 13.333 7.99976C13.333 5.05427 10.9455 2.66675 8 2.66675ZM8.16699 6.33374C8.44298 6.33392 8.66699 6.55771 8.66699 6.83374V9.49976C8.66712 9.77579 8.89093 9.99976 9.16699 9.99976H9.33398V10.6667H6.66699V9.99976H6.83398C7.10975 9.9994 7.33385 9.77557 7.33398 9.49976V7.49976C7.33381 7.22398 7.10972 7.00011 6.83398 6.99976H6.66699V6.33374H8.16699ZM8 4.66675C8.36804 4.66692 8.66699 4.96566 8.66699 5.33374C8.66668 5.70156 8.36785 5.99958 8 5.99976C7.63215 5.99958 7.33429 5.70156 7.33398 5.33374C7.33398 4.96566 7.63196 4.66692 8 4.66675Z" fill="#21201F" fillOpacity="0.5"/>
    </svg>
  )
}

function RadioSelected() {
  return (
    <svg width="32" height="32" viewBox="0 0 32 32" fill="none" style={{ flexShrink: 0 }}>
      <rect width="32" height="32" rx="16" fill="#21201F"/>
      <path d="M14.0025 23L6.50391 15.5L8.00126 13.9988L14.0025 20.06L23.5029 10.4962L25.0029 11.9962L14.0025 23Z" fill="white"/>
    </svg>
  )
}

function RadioUnselected() {
  return (
    <div style={{
      width: 32, height: 32, borderRadius: '50%', flexShrink: 0,
      background: 'rgba(92,90,87,0.1)',
      boxShadow: 'inset 0 1.5px 3px rgba(0,0,0,0.07)',
    }} />
  )
}

// ── Main screen component ─────────────────────────────────────────────────────

// Convert ALL CAPS product names to Title Case for display
function toTitleCase(str: string) {
  return str.toLowerCase().replace(/\b\w/g, c => c.toUpperCase())
}

export default function YangoCheckoutScreen({ goTo, goBack, selectedProductId, checkoutData, setCheckoutData }: NavProps) {
  const product = PRODUCTS.find(p => p.id === selectedProductId) ?? PRODUCTS[0]
  const productName = toTitleCase(product.name)

  const fmtRs = (n: number) => `Rs.${n.toLocaleString('en-PK')}`

  // ── State ──
  const [orderOpen, setOrderOpen] = useState(true)
  const [shippingMethod, setShippingMethod] = useState<'standard' | 'fast'>('standard')

  // Dynamic shipping + total
  const shipping = shippingMethod === 'fast' ? 800 : 500
  const pnpFee = Math.floor((product.price + shipping) * 0.03)
  const grandTotal = product.price + shipping + pnpFee
  const perPart = Math.round(grandTotal / 4)

  const addWeeks = (w: number) => {
    const d = new Date('2026-04-06')
    d.setDate(d.getDate() + w * 7)
    return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }).toLowerCase()
  }

  const paySlots = [
    { date: 'now',       amount: fmtRs(perPart) },
    { date: addWeeks(2), amount: fmtRs(perPart) },
    { date: addWeeks(4), amount: fmtRs(perPart) },
    { date: addWeeks(6), amount: fmtRs(perPart) },
  ]
  const [email,      setEmail]      = useState(checkoutData.email)
  const [firstName,  setFirstName]  = useState(checkoutData.firstName)
  const [lastName,   setLastName]   = useState(checkoutData.lastName)
  const [address,    setAddress]    = useState(checkoutData.address)
  const [apartment,  setApartment]  = useState(checkoutData.apartment)
  const [postalCode, setPostalCode] = useState(checkoutData.postalCode)
  const [phone,      setPhone]      = useState(checkoutData.phone)

  return (
    <div style={{
      display: 'flex', flexDirection: 'column', height: '100%',
      background: BACKGROUND, overflow: 'hidden', fontFamily: FONT_FAMILY,
    }}>
      {/* Global input placeholder colour */}
      <style>{`.yco-input::placeholder{color:${TEXT_SECONDARY};opacity:1;font-weight:400}`}</style>

      {/* ── Header ── */}
      <div style={{
        background: BACKGROUND, height: 64, flexShrink: 0,
        display: 'flex', alignItems: 'center',
        paddingLeft: 8, paddingRight: 0, gap: 8,
      }}>
        <div style={{
          width: 48, height: 48, borderRadius: 1000,
          overflow: 'hidden', flexShrink: 0, background: BACKGROUND_MINOR,
        }}>
          <img src={imgMerchantLogo} alt="Outfitters"
            style={{ width: '100%', height: '100%', objectFit: 'contain', display: 'block' }} />
        </div>
        <p style={{
          fontFamily: FONT_FAMILY, fontSize: 20, fontWeight: 700,
          lineHeight: '20px', letterSpacing: -0.2, color: DARK_TEXT, margin: 0,
          ...NUM_VARIANT,
        }}>Outfitters</p>

        {/* Close (×) button — Trail, right side: 20×20 icon → 24×24 container → 52w×40h block */}
        <button
          onClick={goBack}
          style={{
            marginLeft: 'auto', flexShrink: 0,
            width: 52, height: 40,
            paddingLeft: 8, paddingRight: 20,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            background: 'none', border: 'none', cursor: 'pointer',
          }}
        >
          <div style={{ width: 24, height: 24, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <img src="/checkout/CrossRoundFill.svg" alt="Close" style={{ width: 20, height: 20, display: 'block' }} />
          </div>
        </button>
      </div>

      {/* ── Scrollable body ── */}
      <div style={{ flex: 1, overflowY: 'auto', paddingBottom: 84 }}>

        {/* Order details — two separate cards with 4px gap */}
        <div style={{ padding: '8px 12px 20px', display: 'flex', flexDirection: 'column', gap: 4 }}>

          {/* Card 1: Collapsible header */}
          <Card>
            <div
              onClick={() => setOrderOpen(o => !o)}
              style={{
                display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                padding: '0 16px', cursor: 'pointer', height: 54,
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <ProductFillIcon />
                <span style={{ ...T_B2TR, color: DARK_TEXT }}>Order details</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                <span style={{ ...T_B2TR, color: DARK_TEXT }}>1 item</span>
                {orderOpen
                  ? <ChevronUpIcon color={DARK_TEXT} size={24} />
                  : <ChevronDownIcon color={DARK_TEXT} size={24} />
                }
              </div>
            </div>
          </Card>

          {/* Card 2: Item details (visible when expanded) */}
          {orderOpen && (
            <Card>
              <div style={{
                display: 'flex', gap: 16, alignItems: 'flex-start',
                padding: '12px 16px 12px 12px',
              }}>
                {/* Product image */}
                <div style={{
                  width: 70, height: 70, borderRadius: 10,
                  overflow: 'hidden', flexShrink: 0, background: '#f4f4f4',
                }}>
                  <img src={product.img} alt={product.name}
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </div>

                {/* Product info */}
                <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between', minHeight: 70 }}>
                  <div>
                    <p style={{ margin: '0 0 2px', ...T_CAP1NM, color: DARK_TEXT, ...NUM_VARIANT }}>
                      {productName}
                    </p>
                    <p style={{ margin: 0, ...T_CAP1R, color: TEXT_SECONDARY }}>
                      Size · M
                    </p>
                  </div>
                  {/* Bottom row: 1 item + price on same line */}
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                    <span style={{ ...T_B2NB, color: DARK_TEXT }}>1 item</span>
                    <span style={{ ...T_B2NB, color: DARK_TEXT, ...NUM_VARIANT }}>{fmtRs(product.price)}</span>
                  </div>
                </div>
              </div>
            </Card>
          )}
        </div>

        {/* ── Contact ── */}
        <SectionTitle>Contact</SectionTitle>
        <div style={{ padding: '0 12px 20px' }}>
          <Card>
            <EditableField label="Email or phone number" value={email} onChange={setEmail} />
          </Card>
        </div>

        {/* ── Delivery ── */}
        <SectionTitle>Delivery</SectionTitle>
        <div style={{ padding: '0 12px 20px', display: 'flex', flexDirection: 'column', gap: 8 }}>
          <Card>
            <EditableField label="First name" value={firstName} onChange={setFirstName} />
            <Divider />
            <EditableField label="Last name" value={lastName} onChange={setLastName} />
          </Card>
          <Card>
            <AddressField address={address} setAddress={setAddress} />
            <Divider />
            <EditableField label="Apartment, suite, etc. (optional)" value={apartment} onChange={setApartment} />
            <Divider />
            <EditableField label="Postal code (optional)" value={postalCode} onChange={setPostalCode} />
            <Divider />
            <EditableField label="Phone" value={phone} onChange={setPhone} />
          </Card>
        </div>

        {/* ── Shipping method ── */}
        <SectionTitle>Shipping method</SectionTitle>
        <div style={{ padding: '0 12px 20px' }}>
          <Card>
            <ShippingItem
              label="Standard" price={fmtRs(500)}
              selected={shippingMethod === 'standard'}
              onSelect={() => setShippingMethod('standard')}
            />
            {/* Inset divider — starts after radio button (16+32+8=56px) */}
            <div style={{ paddingLeft: 56, paddingRight: 16 }}>
              <div style={{ height: 0.5, background: DIVIDER_COLOR }} />
            </div>
            <ShippingItem
              label="Fast" price={fmtRs(800)}
              selected={shippingMethod === 'fast'}
              onSelect={() => setShippingMethod('fast')}
            />
          </Card>
        </div>

        {/* ── Payment schedule ── */}
        <SectionTitle>Payment schedule</SectionTitle>
        <div style={{ padding: '0 12px 20px', display: 'flex', flexDirection: 'column', gap: 8 }}>

          {/* Schedule card */}
          <Card>
            {/* Icon + total header */}
            <div style={{
              display: 'flex', alignItems: 'center', gap: 0,
              padding: '10px 10px 0 10px',
            }}>
              <img
                src={imgSplitIcon} alt=""
                style={{ width: 40, height: 40, display: 'block', flexShrink: 0 }}
              />
              <span style={{ ...T_B2TM, color: DARK_TEXT, ...NUM_VARIANT }}>
                4 × {fmtRs(perPart)}
              </span>
            </div>

            {/* 4-segment schedule bars */}
            <div style={{
              display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 1fr',
              gap: 6, padding: '12px 16px 0',
            }}>
              {paySlots.map((slot, i) => (
                <div key={i} style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                  <div style={{
                    height: 4, borderRadius: i === 0 ? 16 : 2,
                    background: i === 0 ? GREEN : PROGRESS_INACTIVE,
                  }} />
                  {/* Date + amount — gap 1px */}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                    <p style={{ margin: 0, ...T_CAP1R, color: i === 0 ? DARK_TEXT : TEXT_SECONDARY, ...NUM_VARIANT }}>
                      {slot.date}
                    </p>
                    <p style={{ margin: 0, ...T_CAP1M, color: DARK_TEXT, ...NUM_VARIANT }}>
                      {slot.amount}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Info note */}
            <div style={{
              display: 'flex', alignItems: 'center', gap: 4,
              padding: '10px 14px 14px',
            }}>
              <InfoIcon />
              <span style={{ ...T_CAP1R, color: TEXT_SECONDARY }}>
                Based on initial assessment
              </span>
            </div>
          </Card>

          {/* Price breakdown card */}
          <Card>
            <div style={{
              display: 'flex', flexDirection: 'column', gap: 4,
              paddingTop: 12, paddingBottom: 4,
            }}>
              {[
                { label: 'Item',                 val: fmtRs(product.price) },
                { label: 'Delivery',             val: fmtRs(shipping) },
                { label: 'Pay in parts service', val: fmtRs(pnpFee) },
              ].map(row => (
                <div key={row.label} style={{
                  display: 'flex', justifyContent: 'space-between', alignItems: 'baseline',
                  paddingLeft: 16, paddingRight: 16, height: 14,
                }}>
                  <span style={{ ...T_CAP1R, color: DARK_TEXT }}>
                    {row.label}
                  </span>
                  <span style={{ ...T_CAP1R, color: DARK_TEXT, ...NUM_VARIANT }}>
                    {row.val}
                  </span>
                </div>
              ))}
            </div>

            {/* Divider 5px below last row */}
            <div style={{ padding: '5px 16px 0' }}>
              <div style={{ height: 0.5, background: DIVIDER_COLOR }} />
            </div>

            {/* Total row */}
            <div style={{
              display: 'flex', justifyContent: 'space-between', alignItems: 'center',
              padding: '0 16px', minHeight: 48,
            }}>
              <span style={{ ...T_CAP1R, color: DARK_TEXT }}>Total</span>
              <span style={{ ...T_B1TM, color: DARK_TEXT, ...NUM_VARIANT }}>
                {fmtRs(grandTotal)}
              </span>
            </div>
          </Card>
        </div>

        {/* ── Buy with confidence ── */}
        <SectionTitle>Buy with confidence</SectionTitle>
        <div style={{ padding: '0 16px 24px' }}>
          {CONFIDENCE_ITEMS.map(item => (
            <div key={item.title} style={{
              display: 'flex', gap: 12, alignItems: 'center',
              paddingTop: 8, paddingBottom: 8,
            }}>
              {/* Icon image — no background wrapper */}
              <img
                src={item.icon} alt=""
                style={{ width: 44, height: 44, objectFit: 'contain', flexShrink: 0 }}
              />
              <div>
                <p style={{ margin: '0 0 2px', ...T_B2NM, color: DARK_TEXT }}>
                  {item.title}
                </p>
                <p style={{ margin: 0, ...T_CAP1R, color: TEXT_SECONDARY }}>
                  {item.sub}
                </p>
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* ── Bottom CTA ── */}
      <div style={{
        position: 'absolute', bottom: 0, left: 0, right: 0,
        background: BACKGROUND,
        boxShadow: SHADOW_BOTTOM_BAR,
        borderTopLeftRadius: 24, borderTopRightRadius: 24,
        paddingTop: 4, paddingLeft: 8, paddingRight: 8, paddingBottom: 12,
      }}>
        <div style={{ padding: '8px 4px 0' }}>
          <button
            onClick={() => {
              setCheckoutData({ email, firstName, lastName, address, apartment, postalCode, phone, shippingMethod })
              goTo('bnpl-auth')
            }}
            style={{
              width: '100%', height: 56,
              background: YANGO_RED, color: TEXT_INVERTED,
              border: 'none', borderRadius: RADIUS_LG,
              cursor: 'pointer', fontFamily: FONT_FAMILY,
              display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6,
              ...T_B2NM,
            }}
          >
            Complete order with
            <img
              src="/checkout/Yango BNPL badge.png"
              alt="Yango BNPL"
              style={{ height: 20, display: 'block', flexShrink: 0 }}
            />
          </button>
        </div>
      </div>
    </div>
  )
}

// ── Constants ─────────────────────────────────────────────────────────────────

const CONFIDENCE_ITEMS = [
  {
    icon: '/checkout/Calendar Desktop.png',
    title: 'Confirm payment plan',
    sub: 'After instant verification',
  },
  {
    icon: '/checkout/Wallet Sber Tin Rotated.png',
    title: 'Make first payment',
    sub: "Full refund if you don't accept the order",
  },
  {
    icon: '/checkout/Box Split.png',
    title: 'Receive your order',
    sub: 'Track delivery in the app',
  },
  {
    icon: '/checkout/Phone Ok.png',
    title: 'Pay the rest in the Yango App',
    sub: "We'll send payment reminders",
  },
]

// ── Sub-components ────────────────────────────────────────────────────────────

function Card({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ background: BACKGROUND_MINOR, borderRadius: 16, overflow: 'hidden' }}>
      {children}
    </div>
  )
}

function Divider() {
  return (
    <div style={{ padding: '0 16px' }}>
      <div style={{ height: 0.5, background: DIVIDER_COLOR }} />
    </div>
  )
}

function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <p style={{
      margin: 0, padding: '8px 12px 14px',
      fontSize: 20, fontWeight: 700, lineHeight: '20px', letterSpacing: -0.2,
      color: DARK_TEXT, fontFamily: FONT_FAMILY,
      ...NUM_VARIANT,
    }}>
      {children}
    </p>
  )
}

function EditableField({
  label, value, onChange,
}: {
  label: string; value: string; onChange: (v: string) => void
}) {
  const filled = value.trim() !== ''
  return (
    <div style={{
      padding: '0 16px', minHeight: 56,
      display: 'flex', flexDirection: 'column', justifyContent: 'center',
    }}>
      {filled && (
        <p style={{
          margin: 0, marginBottom: 1,
          fontSize: 11, fontWeight: 400, lineHeight: '13px',
          color: TEXT_SECONDARY,
        }}>
          {label}
        </p>
      )}
      <input
        className="yco-input"
        value={value}
        onChange={e => onChange(e.target.value)}
        placeholder={filled ? undefined : label}
        style={{
          border: 'none', outline: 'none', background: 'transparent',
          fontSize: 14, fontWeight: filled ? 400 : 400,
          fontFamily: FONT_FAMILY, lineHeight: '18px',
          color: filled ? DARK_TEXT : TEXT_SECONDARY,
          padding: 0, margin: 0, width: '100%',
        }}
      />
    </div>
  )
}

function AddressField({
  address, setAddress,
}: {
  address: string; setAddress: (v: string) => void
}) {
  const filled = address.trim() !== ''
  return (
    <div style={{
      padding: '0 12px 0 16px', minHeight: 56,
      display: 'flex', alignItems: 'center', gap: 4,
    }}>
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
        {filled && (
          <p style={{
            margin: 0, marginBottom: 1,
            fontSize: 11, fontWeight: 400, lineHeight: '13px',
            color: TEXT_SECONDARY,
          }}>
            Address
          </p>
        )}
        <input
          className="yco-input"
          value={address}
          onChange={e => setAddress(e.target.value)}
          placeholder={filled ? undefined : 'Add address'}
          style={{
            border: 'none', outline: 'none', background: 'transparent',
            fontSize: 14, fontFamily: FONT_FAMILY, lineHeight: '18px',
            color: filled ? DARK_TEXT : TEXT_SECONDARY,
            padding: 0, margin: 0, width: '100%',
          }}
        />
      </div>
      {filled
        ? <ChevronUpIcon color={DARK_TEXT} size={24} />
        : <ChevronRightIcon color={DARK_TEXT} size={24} />
      }
    </div>
  )
}

function ShippingItem({
  label, price, selected, onSelect,
}: {
  label: string; price: string; selected: boolean; onSelect: () => void
}) {
  return (
    <div
      onClick={onSelect}
      style={{
        display: 'flex', alignItems: 'center', gap: 8,
        padding: '0 16px 0 12px', minHeight: 56, cursor: 'pointer',
      }}
    >
      {selected ? <RadioSelected /> : <RadioUnselected />}
      <span style={{ flex: 1, ...T_B2NR, color: DARK_TEXT }}>
        {label}
      </span>
      <span style={{ ...T_B2TM, color: DARK_TEXT, ...NUM_VARIANT }}>
        {price}
      </span>
    </div>
  )
}
