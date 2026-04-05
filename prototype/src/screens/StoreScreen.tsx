import type { NavProps } from '../App'
import { SplitBadge, TEXT_PRIMARY, TEXT_SECONDARY, YANGO_RED, FILL_DEFAULT } from './shared'
import { BACKGROUND, BORDER_DEFAULT, TEXT_INVERTED, RADIUS_LG, FONT_SIZE_BASE, FONT_SIZE_CAPTION, FONT_SIZE_SM, FONT_SIZE_XL } from './yango-tokens'
import { MERCHANT_AVATAR_BG, MERCHANT_AVATAR_TEXT } from './merchant-shared'

const NISHAT_BRAND = '#c8922a'  // Nishat merchant brand color

// Figma assets
const photo1 = 'http://localhost:3845/assets/d4bc1679c0f7c67dd67e6fc861c5cee3a4d97ff1.png'
const photo2 = 'http://localhost:3845/assets/c1a592024346454fd7b15d04ffa75ed8c10231ba.png'
const photo3 = 'http://localhost:3845/assets/45aa66b83e6473220b7ef5574fb082975b004b12.png'
const photo4 = 'http://localhost:3845/assets/ed3b7f3411a77303a726fae81443dd124e2e20ce.png'

export default function StoreScreen({ goTo }: NavProps) {
  const products = [
    { id: 1, img: photo1, name: 'Pink dress with flowers, summer 2026', price: 'Rs. 13 990', bnplPrice: 'Rs. 3 498' },
    { id: 2, img: photo3, name: 'Blue kurti set, cotton blend', price: 'Rs. 14 490', bnplPrice: 'Rs. 3 623' },
    { id: 3, img: photo2, name: 'Embroidered lawn suit', price: 'Rs. 12 800', bnplPrice: 'Rs. 3 200' },
    { id: 4, img: photo4, name: 'Premium silk kurta', price: 'Rs. 18 500', bnplPrice: 'Rs. 4 625' },
  ]

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', background: BACKGROUND, overflow: 'hidden' }}>
      {/* Store header */}
      <div style={{ padding: '8px 16px 12px', borderBottom: `1px solid ${BORDER_DEFAULT}`, flexShrink: 0 }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <div style={{
              width: 32,
              height: 32,
              borderRadius: 8,
              background: MERCHANT_AVATAR_BG,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
              <span style={{ fontSize: FONT_SIZE_BASE, fontWeight: 700, color: MERCHANT_AVATAR_TEXT }}>N</span>
            </div>
            <span style={{ fontSize: FONT_SIZE_XL, fontWeight: 700, color: NISHAT_BRAND, fontFamily: 'serif' }}>nishat</span>
          </div>
          <div style={{ display: 'flex', gap: 12 }}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <circle cx="11" cy="11" r="7" stroke={TEXT_PRIMARY} strokeWidth="1.8"/>
              <path d="M16.5 16.5L21 21" stroke={TEXT_PRIMARY} strokeWidth="1.8" strokeLinecap="round"/>
            </svg>
            <div style={{ position: 'relative' }}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path d="M6 2L3 6V20C3 21.1 3.9 22 5 22H19C20.1 22 21 21.1 21 20V6L18 2H6Z" stroke={TEXT_PRIMARY} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M3 6H21" stroke={TEXT_PRIMARY} strokeWidth="1.8"/>
                <path d="M16 10C16 12.2 14.2 14 12 14C9.8 14 8 12.2 8 10" stroke={TEXT_PRIMARY} strokeWidth="1.8" strokeLinecap="round"/>
              </svg>
              <div style={{
                position: 'absolute', top: -3, right: -3,
                width: 14, height: 14, borderRadius: 7,
                background: YANGO_RED, border: `2px solid ${BACKGROUND}`,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>
                <span style={{ fontSize: 8, color: TEXT_INVERTED, fontWeight: 700 }}>2</span>
              </div>
            </div>
          </div>
        </div>

        {/* Category tabs */}
        <div style={{ display: 'flex', gap: 8, marginTop: 12, overflowX: 'auto' }}>
          {['All', 'Lawn', 'Formal', 'Casual', 'Kids'].map((cat, i) => (
            <div key={cat} style={{
              padding: '6px 14px',
              borderRadius: 20,
              background: i === 0 ? TEXT_PRIMARY : FILL_DEFAULT,
              color: i === 0 ? TEXT_INVERTED : TEXT_PRIMARY,
              fontSize: FONT_SIZE_SM,
              fontWeight: 500,
              whiteSpace: 'nowrap',
              cursor: 'pointer',
              flexShrink: 0,
            }}>{cat}</div>
          ))}
        </div>
      </div>

      {/* Product grid */}
      <div style={{ flex: 1, overflowY: 'auto', padding: '12px 12px 20px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
          {products.map((p) => (
            <div
              key={p.id}
              onClick={() => goTo('pdp')}
              style={{ cursor: 'pointer', borderRadius: RADIUS_LG, overflow: 'hidden', background: FILL_DEFAULT }}
            >
              <div style={{ aspectRatio: '3/4', overflow: 'hidden' }}>
                <img src={p.img} alt={p.name} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
              </div>
              <div style={{ padding: '8px 10px 10px' }}>
                <div style={{ fontSize: FONT_SIZE_CAPTION, color: TEXT_SECONDARY, marginBottom: 2, lineHeight: 1.3 }}>{p.name}</div>
                <div style={{ fontSize: FONT_SIZE_BASE, fontWeight: 600, color: TEXT_PRIMARY }}>{p.price}</div>
                {/* BNPL badge */}
                <div style={{ display: 'flex', alignItems: 'center', gap: 4, marginTop: 4 }}>
                  <SplitBadge size="sm" />
                  <span style={{ fontSize: 10, color: TEXT_SECONDARY }}>4 × {p.bnplPrice}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
