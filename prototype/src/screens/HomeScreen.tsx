import { useState, useEffect, useRef } from 'react'
import type { NavProps } from '../App'
import { OutfittersHeader, CategoryTabs, PRODUCTS, formatPrice, bnplYango, bnplBaadmay, OUT_BLACK, OUT_WHITE, OUT_BORDER, OUT_BG, OUT_FONT } from './merchant-shared'

// Per-tab hero images (3 per tab for auto-slider) + category strip
type Tab = 'MEN' | 'WOMEN' | 'JUNIORS'
type FocusCategory = 'T-Shirts & Polos' | 'Denim' | 'Trousers'

const TAB_CONTENT: Record<Tab, {
  heroes: { img: string; label: string }[]
  categories: { img: string; label: string }[]
}> = {
  MEN: {
    heroes: [
      { img: 'https://outfitters.com.pk/cdn/shop/files/F1726106901_2_copy.jpg?v=1774500764', label: 'NEW ARRIVALS' },
      { img: 'https://outfitters.com.pk/cdn/shop/files/F1748106801_2.jpg?v=1773914778', label: 'FRESH DROPS' },
      { img: 'https://outfitters.com.pk/cdn/shop/files/F1745106006_3.jpg?v=1773904640', label: 'SPRING COLLECTION' },
    ],
    categories: [
      { img: 'https://outfitters.com.pk/cdn/shop/files/F1748106801_2.jpg?v=1773914778', label: 'T-SHIRTS' },
      { img: 'https://outfitters.com.pk/cdn/shop/files/F1730106628_2.jpg?v=1773904544', label: 'POLOS' },
      { img: 'https://outfitters.com.pk/cdn/shop/files/F1745106006_3.jpg?v=1773904640', label: 'SHIRTS' },
    ],
  },
  WOMEN: {
    heroes: [
      { img: 'https://outfitters.com.pk/cdn/shop/files/F1608206001_3_copy.jpg?v=1774441087', label: 'NEW ARRIVALS' },
      { img: 'https://outfitters.com.pk/cdn/shop/files/F1392206998.jpg?v=1773655084', label: 'FRESH DROPS' },
      { img: 'https://outfitters.com.pk/cdn/shop/files/F1376206911_7.jpg?v=1773205261', label: 'SPRING COLLECTION' },
    ],
    categories: [
      { img: 'https://outfitters.com.pk/cdn/shop/files/F1392206998.jpg?v=1773655084', label: 'T-SHIRTS' },
      { img: 'https://outfitters.com.pk/cdn/shop/files/F1267206306_4.jpg?v=1772084487', label: 'TOPS' },
      { img: 'https://outfitters.com.pk/cdn/shop/files/F1376206911_7.jpg?v=1773205261', label: 'DENIM' },
    ],
  },
  JUNIORS: {
    heroes: [
      { img: 'https://outfitters.com.pk/cdn/shop/files/F0243605901SUIT_6.jpg?v=1770879638', label: 'NEW ARRIVALS' },
      { img: 'https://outfitters.com.pk/cdn/shop/files/F0246605413SUIT_3_cc92f779-ebc6-473f-b2de-271d6d3b38b9.jpg?v=1772523313', label: 'FRESH DROPS' },
      { img: 'https://outfitters.com.pk/cdn/shop/files/F0256609625_3_copy.jpg?v=1771216046', label: 'SPRING COLLECTION' },
    ],
    categories: [
      { img: 'https://outfitters.com.pk/cdn/shop/files/F0246605413SUIT_3_cc92f779-ebc6-473f-b2de-271d6d3b38b9.jpg?v=1772523313', label: 'CO-ORD SETS' },
      { img: 'https://outfitters.com.pk/cdn/shop/files/F0256609625_3_copy.jpg?v=1771216046', label: 'JEANS' },
      { img: 'https://outfitters.com.pk/cdn/shop/files/F0510608001LOWER_3.jpg?v=1772098856', label: 'TROUSERS' },
    ],
  },
}

// Map focus categories to product name keywords — works across all tabs
const FOCUS_KEYWORDS: Record<FocusCategory, string[]> = {
  'T-Shirts & Polos': ['T-SHIRT', 'POLO', 'TANK TOP', 'CO-ORD'],
  'Denim': ['JEANS', 'DENIM'],
  'Trousers': ['TROUSERS', 'CARGO TROUSERS', 'MARINE FIT TROUSERS'],
}

export default function HomeScreen({ goTo, goToProduct, addToCart, cartCount }: NavProps) {
  const [activeTab, setActiveTab] = useState<Tab>('MEN')
  const [focusCategory, setFocusCategory] = useState<FocusCategory>('T-Shirts & Polos')

  // #8 — Hero auto-slider
  const [heroIdx, setHeroIdx] = useState(0)
  const timerRef = useRef<ReturnType<typeof setInterval>>(undefined)

  const { heroes, categories } = TAB_CONTENT[activeTab]

  // Auto-slide every 4s (Shopify standard)
  useEffect(() => {
    setHeroIdx(0)
    timerRef.current = setInterval(() => {
      setHeroIdx(prev => (prev + 1) % heroes.length)
    }, 4000)
    return () => clearInterval(timerRef.current)
  }, [activeTab])

  // #7 — Category filtering for all tabs
  const tabProducts = PRODUCTS.filter(p => p.category === activeTab)
  const keywords = FOCUS_KEYWORDS[focusCategory]
  const filteredProducts = tabProducts.filter(p =>
    keywords.some(kw => p.name.toUpperCase().includes(kw))
  )
  const featuredProducts = filteredProducts.length > 0 ? filteredProducts : tabProducts

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', background: OUT_WHITE, overflow: 'hidden', fontFamily: OUT_FONT }}>
      <OutfittersHeader onCart={() => goTo('cart')} cartCount={cartCount} />
      <CategoryTabs active={activeTab} onChange={(tab) => { setActiveTab(tab); setFocusCategory('T-Shirts & Polos') }} />

      <div style={{ flex: 1, overflowY: 'auto' }}>

        {/* #8+9 — Hero banner with auto-slider */}
        <div style={{ position: 'relative', width: '100%', aspectRatio: '375/460', overflow: 'hidden', flexShrink: 0, background: '#1a1a1a' }}>
          {heroes.map((h, i) => (
            <img
              key={h.img}
              src={h.img}
              alt={h.label}
              style={{
                position: 'absolute', inset: 0, width: '100%', height: '100%',
                objectFit: 'cover', display: 'block',
                opacity: 1,
                zIndex: i === heroIdx ? 2 : 1,
                transition: 'none',
              }}
            />
          ))}
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.55) 0%, transparent 50%)', zIndex: 3 }} />
          <div style={{ position: 'absolute', bottom: 24, left: 0, right: 0, textAlign: 'center', zIndex: 4 }}>
            <div style={{
              fontSize: 28, fontWeight: 500, color: OUT_WHITE, letterSpacing: '0.1em', fontFamily: OUT_FONT,
            }}>
              {heroes[heroIdx].label}
            </div>
          </div>
          {/* Dot indicators */}
          <div style={{ position: 'absolute', bottom: 8, left: 0, right: 0, display: 'flex', justifyContent: 'center', gap: 5, zIndex: 4 }}>
            {heroes.map((_, i) => (
              <div key={i} onClick={() => setHeroIdx(i)} style={{
                width: i === heroIdx ? 18 : 6, height: 4, borderRadius: 2,
                background: i === heroIdx ? OUT_WHITE : 'rgba(255,255,255,0.4)',
                cursor: 'pointer', transition: 'width 300ms ease',
              }} />
            ))}
          </div>
        </div>

        {/* Category strip */}
        <div style={{ display: 'grid', gridTemplateColumns: `repeat(${categories.length}, 1fr)`, gap: 2, padding: '2px 0', flexShrink: 0 }}>
          {categories.map(({ img, label }) => (
            <div key={label} onClick={() => goTo('plp')} style={{ position: 'relative', cursor: 'pointer' }}>
              <img src={img} alt={label} style={{ width: '100%', aspectRatio: '3/4', objectFit: 'cover', display: 'block' }} />
              <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.5) 0%, transparent 50%)' }} />
              <div style={{ position: 'absolute', bottom: 10, left: 0, right: 0, textAlign: 'center', fontSize: 10, fontWeight: 700, color: OUT_WHITE, letterSpacing: '0.1em' }}>
                {label}
              </div>
            </div>
          ))}
        </div>

        {/* Categories in Focus */}
        <div style={{ padding: '20px 16px 0', borderTop: `1px solid ${OUT_BORDER}` }}>
          <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.1em', color: OUT_BLACK, marginBottom: 12 }}>
            CATEGORIES IN FOCUS
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 6, marginBottom: 16 }}>
            {(['T-Shirts & Polos', 'Denim', 'Trousers'] as FocusCategory[]).map(cat => (
              <div key={cat} onClick={() => setFocusCategory(cat)} style={{
                fontSize: 15,
                fontWeight: focusCategory === cat ? 700 : 400,
                color: OUT_BLACK,
                textDecoration: focusCategory === cat ? 'underline' : 'none',
                cursor: 'pointer',
              }}>
                {cat}
              </div>
            ))}
          </div>
          <button onClick={() => goTo('plp')} style={{
            background: OUT_BLACK, color: OUT_WHITE, border: 'none', borderRadius: 4,
            padding: '10px 24px', fontSize: 12, fontWeight: 700, letterSpacing: '0.1em',
            cursor: 'pointer', marginBottom: 20,
          }}>
            SHOP ALL
          </button>
        </div>

        {/* #6 — Featured products grid — goToProduct navigates correctly */}
        <div style={{ padding: '16px 10px 32px' }}>
          <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.1em', color: OUT_BLACK, marginBottom: 12, paddingLeft: 6 }}>
            FEATURED PRODUCTS
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 2 }}>
            {featuredProducts.map(p => (
              <div key={p.id} onClick={() => goToProduct(p.id)} style={{ cursor: 'pointer' }}>
                <div style={{ aspectRatio: '3/4', overflow: 'hidden', position: 'relative', background: OUT_BG }}>
                  <img src={p.img} alt={p.name} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
                  {/* Add to cart — rounded rect, light gray bg, thin plus — matches Outfitters */}
                  <div onClick={(e) => { e.stopPropagation(); addToCart(p.id) }} style={{
                    position: 'absolute', bottom: 6, right: 6, width: 28, height: 28,
                    background: 'rgba(220,220,220,0.75)', borderRadius: 0,
                    display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer',
                  }}>
                    <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                      <path d="M9 3V15M3 9H15" stroke={OUT_BLACK} strokeWidth="1"/>
                    </svg>
                  </div>
                </div>
                <div style={{ padding: '6px 4px 15px', fontFamily: OUT_FONT }}>
                  {/* Name: 11px, SemiBold — visually prominent */}
                  <div style={{ fontSize: 11, fontWeight: 600, color: '#000000', lineHeight: 1.3, marginBottom: 0 }}>{p.name}</div>
                  {/* Fit: 8px, #202020, margin-top 3px */}
                  <div style={{ fontSize: 8, color: '#202020', letterSpacing: '0.03em', marginTop: 3, marginBottom: 3 }}>{p.fit}</div>
                  {/* Price: 11px, bold, #121212 */}
                  <div style={{ fontSize: 11, fontWeight: 700, color: '#121212', marginBottom: 3 }}>{formatPrice(p.price)}</div>
                  {/* BNPL badges — Pay only Rs.X now */}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                    {/* Baadmay */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: 3 }}>
                      <img src="/checkout/baadmay-icon.svg" alt="" style={{ width: 12, height: 12, display: 'block', flexShrink: 0 }} />
                      <span style={{ fontSize: 8, fontWeight: 400, color: '#202020', lineHeight: '10px', whiteSpace: 'nowrap', fontFamily: OUT_FONT, textTransform: 'uppercase' as const, letterSpacing: '0.03em', fontVariantNumeric: 'lining-nums proportional-nums' }}>
                        Pay only <span style={{ color: '#690ff5', fontWeight: 700 }}>{bnplBaadmay(p.price)}</span> now
                      </span>
                    </div>
                    {/* Yango */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: 3 }}>
                      <img src="/checkout/Yango-logo.svg" alt="" style={{ width: 24.86, height: 12, display: 'block', flexShrink: 0 }} />
                      <span style={{ fontSize: 8, fontWeight: 400, color: '#202020', lineHeight: '10px', whiteSpace: 'nowrap', fontFamily: OUT_FONT, textTransform: 'uppercase' as const, letterSpacing: '0.03em', fontVariantNumeric: 'lining-nums proportional-nums' }}>
                        Pay only <span style={{ color: '#029154', fontWeight: 700 }}>{bnplYango(p.price)}</span> now
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
