import type { NavProps } from '../App'
import { SplitBadge, TEXT_PRIMARY, TEXT_SECONDARY, YANGO_RED, FILL_DEFAULT } from './shared'
import { BACKGROUND, BORDER_DEFAULT, TEXT_INVERTED, RADIUS_MD, RADIUS_LG, FONT_SIZE_SM, FONT_SIZE_BASE, FONT_SIZE_LG, FONT_SIZE_XL, FONT_SIZE_H3 } from './yango-tokens'

const photo1 = 'http://localhost:3845/assets/45aa66b83e6473220b7ef5574fb082975b004b12.png'
const photo2 = 'http://localhost:3845/assets/c1a592024346454fd7b15d04ffa75ed8c10231ba.png'

export default function ProductDetailScreen({ goTo, goBack }: NavProps) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', background: FILL_DEFAULT, overflow: 'hidden' }}>
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, zIndex: 10 }}>
        <div style={{ padding: '4px 16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <button onClick={goBack} style={{
            background: 'rgba(255,255,255,0.85)',
            border: 'none',
            borderRadius: 20,
            width: 36,
            height: 36,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            backdropFilter: 'blur(8px)',
          }}>
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path d="M13 16L7 10L13 4" stroke={TEXT_PRIMARY} strokeWidth="1.8" strokeLinecap="round"/>
            </svg>
          </button>
          <button style={{
            background: 'rgba(255,255,255,0.85)',
            border: 'none',
            borderRadius: 20,
            width: 36,
            height: 36,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
          }}>
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path d="M10 3C10 3 4 7.5 4 11.5C4 14.5 6.7 17 10 17C13.3 17 16 14.5 16 11.5C16 7.5 10 3 10 3Z" stroke={TEXT_PRIMARY} strokeWidth="1.5"/>
            </svg>
          </button>
        </div>
      </div>

      {/* Scrollable content */}
      <div style={{ flex: 1, overflowY: 'auto' }}>
        {/* Main product image */}
        <div style={{ height: 420, overflow: 'hidden' }}>
          <img src={photo1} alt="Product" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        </div>

        {/* Product info card */}
        <div style={{ background: BACKGROUND, margin: '0 0 0 0', padding: '16px 18px 0' }}>
          {/* BNPL + Buy now row */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '8px 0' }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 4 }}>
                <SplitBadge size="md" />
                <span style={{ fontSize: FONT_SIZE_LG, fontWeight: 500, color: TEXT_PRIMARY }}>Now Rs. 3 856</span>
              </div>
              <div style={{ fontSize: FONT_SIZE_SM, color: TEXT_SECONDARY }}>The rest later in 3 payments</div>
            </div>
            <button
              onClick={() => goTo('bnpl-auth')}
              style={{
                background: YANGO_RED,
                border: 'none',
                borderRadius: 12,
                height: 40,
                padding: '0 20px',
                color: 'rgba(255,255,255,0.98)',
                fontSize: FONT_SIZE_BASE,
                fontWeight: 500,
                cursor: 'pointer',
                whiteSpace: 'nowrap',
              }}
            >Buy now</button>
          </div>

          {/* Divider */}
          <div style={{ height: 1, background: BORDER_DEFAULT, margin: '4px 0' }} />

          {/* Product details */}
          <div style={{ padding: '12px 0' }}>
            <div style={{ fontSize: FONT_SIZE_XL, fontWeight: 600, color: TEXT_PRIMARY, marginBottom: 4 }}>
              Blue kurti set, cotton blend
            </div>
            <div style={{ fontSize: FONT_SIZE_H3, fontWeight: 700, color: TEXT_PRIMARY, marginBottom: 8 }}>
              Rs. 14 490
            </div>
            <div style={{ display: 'flex', gap: 8, marginBottom: 12 }}>
              {['XS', 'S', 'M', 'L', 'XL'].map((size, i) => (
                <div key={size} style={{
                  width: 36, height: 36, borderRadius: 8,
                  border: `1.5px solid ${i === 2 ? TEXT_PRIMARY : BORDER_DEFAULT}`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: FONT_SIZE_SM, fontWeight: i === 2 ? 600 : 400, color: TEXT_PRIMARY,
                  cursor: 'pointer',
                }}>{size}</div>
              ))}
            </div>
          </div>
        </div>

        {/* More images */}
        <div style={{ height: 160, overflow: 'hidden' }}>
          <img src={photo2} alt="Detail" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        </div>

        {/* Description */}
        <div style={{ background: BACKGROUND, padding: '16px 18px 24px' }}>
          <div style={{ fontSize: FONT_SIZE_BASE, fontWeight: 600, color: TEXT_PRIMARY, marginBottom: 8 }}>Description</div>
          <div style={{ fontSize: FONT_SIZE_BASE, color: TEXT_SECONDARY, lineHeight: 1.6 }}>
            Beautiful blue kurti set with intricate embroidery. Made from premium cotton blend fabric. Perfect for casual and semi-formal occasions.
          </div>
        </div>
      </div>

      {/* Bottom buy bar */}
      <div style={{
        padding: '12px 18px',
        background: BACKGROUND,
        borderTop: `1px solid ${BORDER_DEFAULT}`,
        flexShrink: 0,
      }}>
        <button
          onClick={() => goTo('bnpl-auth')}
          style={{
            width: '100%',
            height: 52,
            background: TEXT_PRIMARY,
            color: TEXT_INVERTED,
            border: 'none',
            borderRadius: 14,
            fontSize: FONT_SIZE_LG,
            fontWeight: 600,
            cursor: 'pointer',
          }}
        >Add to cart — Rs. 14 490</button>
      </div>
    </div>
  )
}
